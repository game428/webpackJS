import proFormat from './proFormat.js';
import declare from './declare.js'
import localWs from './ws.js';
import localNotice from './localNotice.js';
import tool from './tool.js';
import localDexie from './dexieDB.js';
// import COS from './cos-js-sdk-v5.min.js';

/**
 *
 */
const IM = {
  testId: 22, // 测试 用户ID
  timeOut: 60000,
  EVENT: {
    "CONNECT_SUC": 'onConnectSuc', // 连接成功
    "CONNECT_ERR": 'onConnectErr', // 连接失败
    "RECONNECTION": 'onReconnection', // 开始重连
    "LOGIN": 'onLogin', // 登录成功
    "LOGOUT": 'onLogout', // 退出成功
    "MESSAGE_RECEIVED": 'onMessageReceived', // 接收消息监听
    "MESSAGE_REVOKED": 'onMessageRevoked', // 撤回消息
    "CONVERSATION_LIST_UPDATED": 'onConversationListUpdated', // 会话列表更新
    "KICKED_OUT": 'onKickedOut', // 被踢下线
    "TOKEN_NOT_FOUND": 'onTokenNotFound' // token未找到或过期
  },
  create,
  getWSState,
}

let Global = {};

function initGlobal() {
  Global = {
    tabId: Global.tabId,
    chatPageSize: 20,
    maxChatPageSize: 100,
    msgPageSize: 20,
    maxMsgPageSize: 100,
    // bucket: 'msim-1252460681',
    // region: 'ap-chengdu',
    // cos: new COS({
    //   SecretId: 'AKIDiARZwekKIK7f18alpjsqdOzmQAplexA5',
    //   SecretKey: 'f7MLJ3YnoX2KLKBmBeAVeWNVLaYEmGYa',
    // }),
    logoutState: false,
    loginState: false,
    curTab: false,
    wsUrl: null,
    imToken: null,
    userId: null,
    callEvent: {},
    hasChatMore: true,
    chatList: [],
    chatSetKeys: new Set(),
    msgList: {},
    msgSetKeys: {},
  }
}

/**
 * 获取ws连接状态
 */
function getWSState() {
  let wsState = window.localStorage.getItem("wsState") || declare.WS_STATE.Disconnect;
  return wsState === declare.WS_STATE.Disconnect;
}

/** im初始化
 * @param {String} wsUrl websocket地址
 * @param {String} imToken im服务器token
 */
function create() {
  let tabId = tool.uuid();
  let imWsTab = window.localStorage.getItem("imWsTab") || "";
  if (imWsTab) {
    imWsTab = JSON.parse(imWsTab);
  } else {
    imWsTab = []
  }
  imWsTab.push(tabId);
  window.localStorage.setItem("imWsTab", JSON.stringify(imWsTab));
  initGlobal();
  Global.tabId = tabId;

  var IMSDK = {
    login,
    logout,
    sendMessage,
    resendMessage,
    revokeMessage,
    getMessageList,
    setMessageRead,
    getConversationList,
    // getConversationProfile,
    deleteConversation,
    createTextMessage,
    createImageMessage,
    createCustomMessage,
    on,
    off,
    getToken,
  }
  Global.userId = JSON.parse(window.localStorage.getItem("userId") || "null");
  var result = new Promise((resolve, reject) => {
    localDexie.initDB().then(res => {
      resolve(IMSDK)
    }).catch(err => {
      let errResult = tool.resultErr(err, 'init', declare.ERROR_CODE.DBERR)
      reject(errResult)
    });
  });

  window.onunload = () => {
    onunload()
  };
  window.addEventListener("storage", storage => {
    localNotice.watchStorage(storage, IMSDK, Global, (data) => {
      onMessage(IMSDK, data)
    });
  });
  return result;
}

/** 连接关闭
 * 
 */
function onunload() {
  let imWsTab = window.localStorage.getItem("imWsTab") || "";
  if (imWsTab) {
    imWsTab = JSON.parse(imWsTab);
  } else {
    imWsTab = []
  }
  imWsTab = imWsTab.filter(tab => tab != Global.tabId);
  window.localStorage.setItem("imWsTab", JSON.stringify(imWsTab));
  if (imWsTab.length === 0) {
    window.localStorage.clear();
    localWs.close();
    localDexie.deleteDB();
  } else {
    let wsCurId = window.localStorage.getItem("wsCurId") || "";
    if (wsCurId === Global.tabId) {
      window.localStorage.setItem('wsState', declare.WS_STATE.Disconnect);
      window.localStorage.setItem('wsConnTab', imWsTab[0]);
    }
  }
}

/** 登录
 * 
 * @param {string} wsUrl ws服务器地址
 * @param {string} imToken 用户在ws服务器的token
 */
function login(options) {
  return new Promise((resolve, reject) => {
    try {
      if (Global.userId) {
        let errResult = tool.resultErr('已登录', 'login', declare.ERROR_CODE.SIGNED)
        return reject(errResult);
      } else if (tool.isNotObject(options, 'imToken')) {
        let errResult = tool.parameterErr('imToken参数错误', 'login');
        return reject(errResult)
      } else if (tool.isNotWs(options.wsUrl)) {
        let errResult = tool.parameterErr('wsUrl参数错误', 'login');
        return reject(errResult)
      }
      if (Global.loginState) {
        return reject({
          "code": declare.ERROR_CODE.REPEAT,
          "msg": "正在登录中，请勿重复操作",
        });
      } else {
        Global.loginState = true;
      }
      window.localStorage.setItem("wsCurId", Global.tabId);
      // TODO 临时
      IM.testId = options.testId;
      Global.curTab = true;
      Global.wsUrl = options.wsUrl;
      Global.imToken = options.imToken;
      window.localStorage.setItem('wsUrl', options.wsUrl);
      window.localStorage.setItem('imToken', options.imToken);
      localWs.connect(Global, (res) => {
        connSuc(this, resolve, reject)
      }, (err) => {
        connClose(this, reject, err)
      }, (data) => {
        onMessage(this, data)
      });
    } catch (err) {
      Global.loginState = false;
      reject(err)
    }
  })
}

// webSocket连接成功回调
function connSuc(im, resolve, reject) {
  if (im[IM.EVENT.CONNECT_SUC]) {
    let result = tool.resultNotice(IM.EVENT.CONNECT_SUC, '连接成功')
    im[IM.EVENT.CONNECT_SUC](result);
  }
  // demo环境
  im.getToken(IM.testId).then((res) => {
    Global.imToken = res.data.msg;
    window.localStorage.setItem('imToken', Global.imToken);
    let callSign = tool.createSign();
    createCallEvent({
      "type": "login",
      "callSign": callSign,
      "callSuc": (res) => {
        if (Global.curTab) {
          handleLogin(im, {
            "type": declare.PID.ImLogin,
            "data": res.data,
          })
        }
        let result = tool.resultSuc('login', {
          msg: res.data.msg,
          updateTime: res.data.nowTime,
        });
        resolve(result);
      },
      "callErr": (err) => {
        window.localStorage.setItem('wsState', declare.WS_STATE.Disconnect);
        // 可能出现code 9 11
        reject(err)
      },
    });
    var msg = proFormat.compress(proFormat.loginPro(callSign, Global.imToken), declare.PID.ImLogin);
    localWs.sendMessage(msg);
  })

  // 正式环境
  // let callSign = tool.createSign();
  // createCallEvent({
  //   "type": "getToken",
  //   "callSign": callSign,
  //   "callSuc": (res) => {
  //     if (Global.curTab) {
  //       handleLogin(im, {
  //         "type": declare.PID.ImLogin,
  //         "data": res,
  //       })
  //     }
  //     let result = tool.resultSuc('login', {
  //       msg: res.data.msg,
  //       updateTime: res.data.nowTime,
  //     });
  //     resolve(result);
  //   },
  //   "callErr": (err) => {
  //     window.localStorage.setItem('wsState', declare.WS_STATE.Disconnect);
  //     reject(err)
  //   },
  // });
  // var msg = proFormat.compress(proFormat.loginPro(callSign, Global.imToken), declare.PID.Login);
  // localWs.sendMessage(msg);
}

// webSocket连接失败回调
function connClose(im, reject, err) {
  Global.loginState = false;
  window.localStorage.setItem('wsState', declare.WS_STATE.Disconnect);
  let errResult = tool.resultErr(err, 'login', declare.ERROR_CODE.CONNECTERR)
  return reject(errResult);
}

/** DEMO 使用 获取Token
 * 
 */
function getToken(uid) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    createCallEvent({
      "type": "getToken",
      "callSign": callSign,
      "callSuc": (res) => {
        resolve(res)
      },
      "callErr": (err) => reject(err)
    });
    var msg = proFormat.compress(proFormat.tokenPro(callSign, uid), declare.PID.GetImToken);
    localWs.sendMessage(msg);
  })
}

// 公共判断
function preJudge(reject) {
  if (Global.curTab && !Global.loginState) {
    let errResult = tool.resultErr('未连接', 'wsConnect', declare.ERROR_CODE.DISCONNECT)
    reject ? reject(errResult) : console.error(errResult);
    return false;
  } else if (!Global.userId) {
    let errResult = tool.resultErr('IMSDK未登录', 'login', declare.ERROR_CODE.NOLOGIN)
    reject ? reject(errResult) : console.error(errResult);
    return false;
  }
  return true;
}

/** 退出登录
 * TODO 是服务器还是客户端断开连接
 */
function logout() {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (Global.logoutState) {
        let errResult = tool.resultErr("正在退出中，请勿重复操作", 'logout', declare.ERROR_CODE.REPEAT)
        return reject(errResult);
      } else {
        Global.logoutState = true;
      }
      let callSign = tool.createSign();
      createCallEvent({
        "type": "logout",
        "callSign": callSign,
        "callSuc": (res) => {
          if (Global.curTab) {
            handleLogout(this, {
              "type": declare.PID.ImLogout,
              "data": res.data,
            })
          }
          let result = tool.resultSuc('logout', {
            code: res.data.code,
            msg: res.data.msg
          });
          resolve(result);
        },
        "callErr": (err) => {
          let errResult = tool.resultErr(err, 'logout')
          reject(errResult)
        }
      });
      if (Global.curTab) {
        var msg = proFormat.compress(proFormat.logoutPro(callSign), declare.PID.ImLogout);
        localWs.sendMessage(msg);
      } else {
        localNotice.logoutNotice({
          "callSign": callSign,
          "tabId": Global.tabId,
          "state": declare.LOCAL_OPERATION_STATUS.Pending,
        })
      }
    } catch (err) {
      let errResult = tool.resultErr(err, 'logout')
      reject(errResult)
    } finally {
      Global.logoutState = false;
    }
  });
}

/** 获取会话列表 TODO 如果已经获取到hasMore 为 false的数据则不在发送请求
 * 
 * @param {*} uid 用户id，从哪一条开始往后取
 * @param {number} pageSize 分页条数，默认20
 */
function getConversationList(options) {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (options && options.pageSize && options.pageSize > Global.maxChatPageSize) {
        return reject(tool.parameterErr(`最大条数不能超过${Global.maxChatPageSize}条`, 'getConversationList'))
      }
      let defaultOption = {
        tabId: Global.tabId,
        pageSize: Global.chatPageSize,
        updateTime: null,
      }
      if (typeof options === 'object') {
        Object.assign(defaultOption, options);
      }
      let resultData = [];
      if (Global.chatList.length > 0) {
        resultData = tool.getPageSize(defaultOption.uid, 'uid', Global.chatList);
      }
      if (resultData.length > 0) {
        resultChats(defaultOption, resolve, resultData)
      } else {
        localDexie.getChatList().then((data) => {
          if (data && data.length > Global.chatList.length) {
            let newChats = [];
            data.forEach(chatItem => {
              if (!Global.chatSetKeys.has(chatItem.uid) && !chatItem.deleted) {
                Global.chatSetKeys.add(chatItem.uid);
                newChats.push(chatItem);
              }
            });
            if (newChats.length > 0) {
              Global.chatList.concat(newChats);
              let allArr = [].concat(Global.chatList, newChats)
              Global.chatList = tool.sort(allArr, 'showTime')
              resultData = tool.getPageSize(defaultOption.uid, 'uid', Global.chatList);
            }
          }
          if (resultData.length > 0) {
            resultChats(defaultOption, resolve, resultData)
          } else {
            getWsChats(defaultOption, resolve, reject);
          }
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

// 从服务器获取会话列表
function getWsChats(defaultOption, resolve, reject) {
  let callSign = tool.createSign();
  createCallEvent({
    "type": "getConversationList",
    "callSign": callSign,
    "callSuc": (res) => {
      if (res.chats && res.chats.length > 0) {
        getChatsSuc(defaultOption, res, resolve)
      } else {
        let result = tool.resultSuc('getConversationList', {
          chats: [],
          hasMore: false
        });
        return resolve(result);
      }
    },
    "callErr": (err) => reject(err)
  });
  if (Global.curTab) {
    var msg = proFormat.compress(proFormat.chatListPro(callSign, defaultOption.uid, defaultOption.updateTime), declare.PID.GetChatList);
    localWs.sendMessage(msg);
  } else {
    localNotice.getChatListNotice({
      "tabId": Global.tabId,
      "callSign": callSign,
      "options": defaultOption,
      "state": declare.LOCAL_OPERATION_STATUS.Pending,
    })
  }
}

// 获取会话列表成功回调
function getChatsSuc(defaultOption, res, resolve) {
  let newArr = [];
  let resultArr = [];
  let resultData = [];
  res.chats.forEach(chatItem => {
    if (!Global.chatSetKeys.has(chatItem.uid)) {
      let newChatItem = chatItem;
      newChatItem.showTime = parseInt(newChatItem.showMsgTime / 1000);
      newChatItem.chatId = tool.splicingSingleId(chatItem.uid);
      newArr.push(newChatItem);
      if (!chatItem.deleted) {
        Global.chatSetKeys.add(chatItem.uid);
        resultArr.push(newChatItem);
      }
    }
  });
  if (newArr.length > 0 && Global.curTab) {
    localDexie.addChatList(newArr)
  }
  if (resultArr.length > 0) {
    let allArr = [].concat(resultArr, Global.chatList);
    Global.chatList = tool.sort(allArr, 'showTime')
    resultData = tool.getPageSize(defaultOption.uid, 'uid', Global.chatList);
  }
  resultChats(defaultOption, resolve, resultData, res)
}

// 返回获取到的消息列表
function resultChats(defaultOption, resolve, chats, res) {
  let resultData = chats;
  if (defaultOption.tabId === Global.tabId) {
    resultData = chats.slice(0, defaultOption.pageSize)
  }
  // TODO hasMore 判断
  let hasMore = true;
  if (res) {
    hasMore = res.hasMore;
  }
  let result = tool.resultSuc('getConversationList', {
    chats: resultData,
    hasMore: hasMore
  });
  resolve(result);
}

/** 获取会话资料
 */
// function getConversationProfile() {}

/** 删除会话 TODO
 * 
 * @param {*} uid 会话用户id
 */
function deleteConversation(options) {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (tool.isNotObject(options, 'uid')) {
        let errResult = tool.parameterErr('uid参数不存在', 'deleteConversation');
        return reject(errResult)
      }
      let callSign = tool.createSign();
      createCallEvent({
        "type": "deleteConversation",
        "callSign": callSign,
        "callSuc": (res) => {
          if (Global.chatSetKeys.has(options.uid)) {
            Global.chatSetKeys.delete(options.uid);
            Global.chatList = Global.chatList.filter(chat => chat.uid != options.uid);
          }

          let result = tool.resultSuc('deleteConversation', {
            uid: options.uid,
            updateTime: res.data.updateTime,
            deleted: res.data.deleted,
          });
          return resolve(result);
        },
        "callErr": (err) => reject(err)
      });
      if (Global.curTab) {
        var msg = proFormat.compress(proFormat.delChatPro(callSign, options.uid), declare.PID.DelChat);
        localWs.sendMessage(msg);
      } else {
        localNotice.delChatNotice({
          "callSign": callSign,
          "tabId": Global.tabId,
          "options": options,
          "state": declare.LOCAL_OPERATION_STATUS.Pending,
        })
      }
    } catch (err) {
      reject(err);
    }
  });
}

/** 获取消息列表
 * 
 * @param {*} uid 获取用户的id
 * @param {*} msgEnd 消息id，从哪一条开始往后取
 * @param {number} pageSize 分页条数，默认20
 * @returns 
 */
function getMessageList(options) {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (tool.isNotObject(options, 'uid')) {
        let errResult = tool.parameterErr('uid参数不存在', 'getMessageList');
        return reject(errResult)
      } else if (options.pageSize && options.pageSize > Global.maxMsgPageSize) {
        let errResult = tool.parameterErr(`最大条数不能超过${Global.maxMsgPageSize}条`, 'getMessageList');
        return reject(errResult)
      }
      if (options.msgEnd === 1) {
        let result = tool.resultSuc('getMessageList', {
          uid: options.uid,
          messages: [],
          hasMore: false
        });
        return resolve(result);
      }
      let defaultOption = {
        tabId: Global.tabId,
        pageSize: Global.msgPageSize,
      }
      Object.assign(defaultOption, options)
      let resultData = [];
      let chatId = tool.splicingSingleId(defaultOption.uid);
      if (!Global.msgSetKeys[chatId]) {
        Global.msgSetKeys[chatId] = new Set();
        Global.msgList[chatId] = [];
      };
      let msgs = Global.msgList[chatId];
      let setKeys = Global.msgSetKeys[chatId];
      if (msgs.length > 0) {
        resultData = tool.getPageSize(defaultOption.msgEnd, 'msgId', msgs);
      }
      if (resultData.length > 0) {
        resultMsgs(defaultOption, resolve, resultData)
      } else {
        localDexie.getMsgList(chatId).then((data) => {
          if (data && data.length > msgs.length) {
            let newMsgs = [];
            data.forEach(msg => {
              if (!setKeys.has(msg.msgId)) {
                setKeys.add(msg.msgId);
                newMsgs.push(msg);
              }
            });
            if (newMsgs.length) {
              let allArr = [].concat(msgs, newMsgs)
              Global.msgList[chatId] = tool.sort(allArr, 'showMsgTime')
              resultData = tool.getPageSize(defaultOption.msgEnd, 'msgId', Global.msgList[chatId]);
            }
          }
          if (resultData.length > 0) {
            resultMsgs(defaultOption, resolve, resultData)
          } else {
            getWsMsgs(defaultOption, resolve, reject);
          }
        });
      }
    } catch (err) {
      reject(err);
    }
  })
}

// 从服务器获取消息列表
function getWsMsgs(defaultOption, resolve, reject) {
  let callSign = tool.createSign();
  createCallEvent({
    "type": "getMessageList",
    "callSign": callSign,
    "callSuc": (res) => {
      if (res.messages && res.messages.length > 0) {
        getMsgsSuc(defaultOption, res, resolve)
      } else {
        let result = tool.resultSuc('getMessageList', {
          uid: defaultOption.uid,
          messages: [],
          hasMore: false
        });
        resolve(result);
      }
    },
    "callErr": (err) => reject(err)
  });
  if (Global.curTab) {
    var msg = proFormat.compress(proFormat.getMsgPro(callSign, defaultOption.uid, defaultOption.msgEnd, defaultOption.pageSize), declare.PID.GetHistory);
    localWs.sendMessage(msg);
  } else {
    localNotice.getMsgNotice({
      "tabId": Global.tabId,
      "callSign": callSign,
      "options": defaultOption,
      "state": declare.LOCAL_OPERATION_STATUS.Pending,
    })
  }
}

// 获取消息列表成功回调
function getMsgsSuc(defaultOption, res, resolve) {
  let newMsgs = [];
  let chatId = tool.splicingSingleId(defaultOption.uid);
  let setKeys = Global.msgSetKeys[chatId];
  let msgs = Global.msgList[chatId];
  let resultData = [];
  res.messages.forEach(msg => {
    if (msg.type === declare.MSG_TYPE.Revoke) {
      let msgId = parseInt(msg.body);
      if (setKeys.has(msgId)) {
        let revokeMsg = msgs.find(msgItem => msgItem.msgId === msgId);
        revokeMsg.type = declare.MSG_TYPE.Revoked;
        if (Global.curTab) {
          localDexie.updateMsg(revokeMsg);
        }
      }
    } else if (!setKeys.has(msg.msgId)) {
      setKeys.add(msg.msgId);
      let newMsg = tool.formatMsg(msg, defaultOption.uid)
      newMsgs.push(newMsg);
    }
  });
  if (newMsgs.length > 0) {
    if (Global.curTab) {
      localDexie.addMsgList(newMsgs)
    }
    let allArr = [].concat(msgs, newMsgs)
    Global.msgList[chatId] = tool.sort(allArr, 'showMsgTime')
    resultData = tool.getPageSize(defaultOption.msgEnd, 'msgId', Global.msgList[chatId]);
  }
  resultMsgs(defaultOption, resolve, resultData)
}

// 返回获取到的消息列表
function resultMsgs(defaultOption, resolve, msgs) {
  let resultData = msgs;
  if (defaultOption.tabId === Global.tabId) {
    resultData = msgs.slice(0, defaultOption.pageSize)
  }
  let hasMore = false;
  if (resultData.length > 0) {
    hasMore = resultData[resultData.length - 1].msgId !== 1;
  }
  let result = tool.resultSuc('getMessageList', {
    uid: defaultOption.uid,
    messages: resultData,
    hasMore: hasMore
  });
  resolve(result);
}

/** 设置已读
 * @param {*} uid 会话用户id
 */
function setMessageRead(options) {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (tool.isNotObject(options, 'uid')) {
        let errResult = tool.parameterErr('uid参数不存在', 'setMessageRead');
        return reject(errResult)
      }
      let callSign = tool.createSign();
      createCallEvent({
        "type": "setMessageRead",
        "callSign": callSign,
        "callSuc": (res) => {
          let result = tool.resultSuc('setMessageRead', {
            uid: res.uid,
            msgId: options.msgId,
            msgTime: res.updateTime,
          });
          resolve(result);
        },
        "callErr": (err) => reject(err)
      });
      if (Global.curTab) {
        var msg = proFormat.compress(proFormat.readMsgPro(callSign, options), declare.PID.MsgRead);
        localWs.sendMessage(msg);
      } else {
        localNotice.readMsgNotice({
          "callSign": callSign,
          "tabId": Global.tabId,
          "options": options,
          "state": declare.LOCAL_OPERATION_STATUS.Pending,
        })
      }
    } catch (err) {
      reject(err);
    }
  })
}

/** 发送消息 TODO 参数待定
 * @param {object} msgObj 消息对象
 */
function sendMessage(msgObj) {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (tool.isNotObject(msgObj, 'type')) {
        let errResult = tool.parameterErr('type参数不存在', 'sendMessage');
        return reject(errResult)
      }
      switch (msgObj.type) {
        case declare.MSG_TYPE.Text:
          if (tool.isNotString(msgObj.text)) {
            let errResult = tool.parameterErr('text参数不存在', 'sendMessage');
            return reject(errResult)
          } else if (new Blob([msgObj.text], {type : 'application/json'}).size > 3 * 1024) {
            let errResult = tool.parameterErr('长度超过3K', 'sendMessage');
            return reject(errResult)
          }
          break;
        case declare.MSG_TYPE.Img:
          if (tool.isNotHttp(msgObj.url)) {
            let errResult = tool.parameterErr('url参数错误', 'sendMessage');
            return reject(errResult)
          } else if (tool.isNotEmpty(msgObj.height)) {
            let errResult = tool.parameterErr('height参数不存在', 'sendMessage');
            return reject(errResult)
          } else if (tool.isNotEmpty(msgObj.width)) {
            let errResult = tool.parameterErr('width参数不存在', 'sendMessage');
            return reject(errResult)
          }
          break;
        case declare.MSG_TYPE.Custom:
          if (tool.isNotEmpty(msgObj.data)) {
            let errResult = tool.parameterErr('data参数不存在', 'sendMessage');
            return reject(errResult)
          }
          break;
      }

      let callSign = tool.createSign(msgObj.showMsgTime);
      createCallEvent({
        "type": "sendMessage",
        "callSign": callSign,
        "callSuc": (res) => {
          sendMsgSuc(this, msgObj, res, resolve)
        },
        "callErr": (err) => reject(err)
      });
      if (Global.curTab) {
        var msg = proFormat.compress(proFormat.sendMsgPro(callSign, msgObj), declare.PID.ChatS);
        localWs.sendMessage(msg);
      } else {
        localNotice.sendMsgNotice({
          "callSign": callSign,
          "tabId": Global.tabId,
          "options": msgObj,
          "state": declare.LOCAL_OPERATION_STATUS.Pending,
        })
      }
    } catch (err) {
      reject(err);
    }
  })
}

// 发送消息成功回调
function sendMsgSuc(im, msgObj, res, resolve) {
  if (Global.curTab) {
    let newMsg = JSON.parse(JSON.stringify(msgObj));
    newMsg.msgId = res.data.msgId;
    newMsg.msgTime = res.data.msgTime;
    newMsg.sendStatus = declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
    handleMsg(im, {
      "type": declare.PID.ChatR,
      "data": newMsg,
    })
  }
  let result = tool.resultSuc('sendMessage', {
    uid: msgObj.toUid,
    msgId: res.data.msgId,
    msgTime: res.data.msgTime,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  });
  resolve(result);
}

/** 重发消息 TODO 参数待定
 * @param {object} msgObj 消息对象
 */
function resendMessage(msgObj) {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (tool.isNotObject(msgObj, 'type')) {
        let errResult = tool.parameterErr('type参数不存在', 'resendMessage');
        return reject(errResult)
      }
      switch (msgObj.type) {
        case declare.MSG_TYPE.Text:
          if (tool.isNotString(msgObj.text)) {
            let errResult = tool.parameterErr('text参数不存在', 'resendMessage');
            return reject(errResult)
          } else if (new Blob([msgObj.text], {type : 'application/json'}).size > 3 * 1024) {
            let errResult = tool.parameterErr('长度超过8K', 'resendMessage');
            return reject(errResult)
          }
          break;
        case declare.MSG_TYPE.Img:
          if (tool.isNotHttp(msgObj.url)) {
            let errResult = tool.parameterErr('url参数错误', 'resendMessage');
            return reject(errResult)
          } else if (tool.isNotEmpty(msgObj.height)) {
            let errResult = tool.parameterErr('height参数不存在', 'resendMessage');
            return reject(errResult)
          } else if (tool.isNotEmpty(msgObj.width)) {
            let errResult = tool.parameterErr('width参数不存在', 'resendMessage');
            return reject(errResult)
          }
          break;
        case declare.MSG_TYPE.Custom:
          if (tool.isNotEmpty(msgObj.data)) {
            let errResult = tool.parameterErr('data参数不存在', 'resendMessage');
            return reject(errResult)
          }
          break;
      }

      let callSign = tool.createSign(msgObj.showMsgTime);
      createCallEvent({
        "type": "resendMessage",
        "callSign": callSign,
        "callSuc": (res) => {
          resendMsgSuc(this, msgObj, res, resolve)
        },
        "callErr": (err) => reject(err)
      });
      if (Global.curTab) {
        var msg = proFormat.compress(proFormat.sendMsgPro(callSign, msgObj), declare.PID.ChatS);
        localWs.sendMessage(msg);
      } else {
        localNotice.resendMsgNotice({
          "callSign": callSign,
          "tabId": Global.tabId,
          "options": msgObj,
          "state": declare.LOCAL_OPERATION_STATUS.Pending,
        })
      }
    } catch (err) {
      reject(err);
    }
  })
}

// 重发消息成功回调
function resendMsgSuc(im, msgObj, res, resolve) {
  if (Global.curTab) {
    let newMsg = JSON.parse(JSON.stringify(msgObj));
    newMsg.msgId = res.data.msgId;
    newMsg.msgTime = res.data.msgTime;
    newMsg.sendStatus = declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
    handleMsg(im, {
      "type": declare.PID.ChatR,
      "data": newMsg,
    })
  }
  let result = tool.resultSuc('resendMessage', {
    uid: msgObj.toUid,
    msgId: res.data.msgId,
    msgTime: res.data.msgTime,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  });
  resolve(result);
}

/** 撤回消息 TODO
 * @param {*} uid 会话用户id
 * @param {*} msgId 消息id
 */
function revokeMessage(options) {
  return new Promise((resolve, reject) => {
    try {
      if (!preJudge(reject)) {
        return
      } else if (tool.isNotObject(options)) {
        let errResult = tool.parameterErr('参数错误', 'revokeMessage');
        return reject(errResult)
      } else if (tool.isNotEmpty(options.uid)) {
        let errResult = tool.parameterErr('uid参数不存在', 'revokeMessage');
        return reject(errResult)
      } else if (tool.isNotEmpty(options.msgId)) {
        let errResult = tool.parameterErr('msgId参数不存在', 'revokeMessage');
        return reject(errResult)
      }
      let callSign = tool.createSign();
      createCallEvent({
        "type": "revokeMessage",
        "callSign": callSign,
        "callSuc": (res) => {
          revokeMsgSuc(this, options, res, resolve)
        },
        "callErr": (err) => reject(err)
      });
      if (Global.curTab) {
        var msg = proFormat.compress(proFormat.revokeMsgPro(callSign, options), declare.PID.Revoke);
        localWs.sendMessage(msg);
      } else {
        localNotice.revokeMsgNotice({
          "callSign": callSign,
          "tabId": Global.tabId,
          "options": options,
          "state": declare.LOCAL_OPERATION_STATUS.Pending,
        })
      }
    } catch (err) {
      reject(err);
    }
  })
}

// 测回消息成功回调 TODO 接收参数，不在接收消息对象
function revokeMsgSuc(im, options, res, resolve) {
  if (Global.curTab) {
    handleMsg(im, {
      "type": declare.PID.ChatR,
      "data": res.data,
    })
  }
  let result = tool.resultSuc('revokeMessage', {
    uid: options.uid,
    msgId: options.msgId,
    type: declare.MSG_TYPE.Revoked,
  });
  resolve(result);
}

/** 创建文本消息 TODO
 */
function createTextMessage(options) {
  try {
    if (!preJudge()) {
      return
    } else if (tool.isNotObject(options, 'to')) {
      throw 'to参数不存在';
    } else if (tool.isNotObject(options.payload) || tool.isNotString(options.payload.text)) {
      throw 'text参数不存在';
    }
    let newMsg = tool.msgBase(options.to, Global.userId);
    Object.assign(newMsg, {
      type: declare.MSG_TYPE.Text,
      text: options.payload.text,
    })
    return newMsg;
  } catch (err) {
    console.error(tool.parameterErr(err, 'createTextMessage'))
  }
}

/** 创建图片消息 TODO
 */
function createImageMessage(options) {
  try {
    if (!preJudge()) {
      return
    } else if (tool.isNotObject(options, 'to')) {
      throw 'to参数不存在';
    }
    let newMsg = tool.msgBase(options.to, Global.userId);
    let payload = options.payload || {};
    Object.assign(newMsg, {
      type: declare.MSG_TYPE.Img,
      url: payload.url,
      path: payload.path,
      file: payload.file,
      width: payload.width, //图片的宽度
      height: payload.height, //图片的高度
    })
    return newMsg;
  } catch (err) {
    console.error(tool.parameterErr(err, 'createImageMessage'))
  }
}

/** 创建自定义消息 TODO
 */
function createCustomMessage(options) {
  try {
    if (!preJudge()) {
      return
    } else if (tool.isNotObject(options, 'to')) {
      throw 'to参数不存在';
    } else if (tool.isNotObject(options.payload) || tool.isNotString(options.payload.content)) {
      throw 'content参数不存在';
    }
    let newMsg = tool.msgBase(options.to, Global.userId);
    Object.assign(newMsg, {
      type: declare.MSG_TYPE.Custom,
      data: options.payload.content,
    })
    return newMsg;
  } catch (err) {
    console.error(tool.parameterErr(err, 'createCustomMessage'))
  }
}


// 更新会话
function updateChat(im, options, fromUid) {
  let newChat;
  if (Global.chatSetKeys.has(options.uid)) {
    newChat = Global.chatList.find(chat => chat.uid === options.uid);
    // 如果是撤回消息，且消息id不是最后一条则不更新
    if (options.showMsgType === declare.MSG_TYPE.Revoked && options.msgEnd !== newChat.msgEnd) return;
    // 如果更新时间低于当前会话的时间则不更新
    if (options.showMsgTime < newChat.showMsgTime) return;
    if (tool.isSo(options.showMsgType) && fromUid !== Global.userId && Global.curTab) {
      options.unread = (newChat.unread || 0) + 1;
    }
    Object.assign(newChat, options);
    newChat.showTime = parseInt(newChat.showMsgTime / 1000);
    updateChatNotice(im, newChat)
  } else {
    localDexie.getChat(options.uid).then((res) => {
      if (res && res.length === 1) {
        newChat = res[0];
        // 如果是撤回消息，且消息id不是最后一条则不更新
        if (options.showMsgType === declare.MSG_TYPE.Revoked && options.msgEnd !== newChat.msgEnd) return;
        // 如果更新时间低于当前会话的时间则不更新
        if (options.showMsgTime < newChat.showMsgTime) return;
        if (tool.isSo(options.showMsgType) && fromUid !== Global.userId && Global.curTab) {
          options.unread = (newChat.unread || 0) + 1;
        }
        Object.assign(newChat, options);
        newChat.deleted = options.deleted;
        newChat.showTime = parseInt(newChat.showMsgTime / 1000);
        Global.chatSetKeys.add(options.uid);
        Global.chatList.unshift(newChat);
        updateChatNotice(im, newChat)
      } else if (Global.curTab) {
        let callSign = tool.createSign();
        createCallEvent({
          "type": "updateChat",
          "callSign": callSign,
          "callSuc": (res) => {
            if (res.data) {
              newChat = res.data;
              newChat.showTime = parseInt(newChat.showMsgTime / 1000);
              newChat.chatId = tool.splicingSingleId(newChat.uid);
              Global.chatSetKeys.add(options.uid);
              Global.chatList.unshift(newChat);
              updateChatNotice(im, newChat)
            }
          },
          "callErr": (err) => {
            console.error(err);
          }
        });
        var msg = proFormat.compress(proFormat.chatPro(callSign, options.uid), declare.PID.GetChat);
        localWs.sendMessage(msg);
      } else {
        Global.chatList.unshift(options);
        updateChatNotice(im, options)
      }
    })
  }
}

// 更新会话通知
function updateChatNotice(im, newChat) {
  if (Global.curTab) {
    localDexie.updateChat(newChat);
    localNotice.updateChatNotice({
      type: declare.PID.ChatItemUpdate,
      data: newChat
    });
  }
  if (im[IM.EVENT.CONVERSATION_LIST_UPDATED]) {
    let result = tool.resultNotice(IM.EVENT.CONVERSATION_LIST_UPDATED, newChat)
    im[IM.EVENT.CONVERSATION_LIST_UPDATED](result);
  }
}


// 注册回调事件
function createCallEvent({
  type,
  callSign,
  callSuc,
  callErr
}) {
  let timer = null;
  if (Global.curTab) {
    setTimeout(() => {
      delete Global.callEvent[callSign];
      callErr(new Error(JSON.stringify({
        "code": declare.ERROR_CODE.TIMEOUT,
        "msg": type + ': connection timed out'
      })))
    }, IM.timeOut);
  }
  Global.callEvent[callSign] = {
    "tabId": Global.tabId,
    "timer": timer,
    "callSuc": (res) => {
      timer && clearTimeout(timer);
      delete Global.callEvent[callSign];
      callSuc(res);
    },
    "callErr": (err) => {
      timer && clearTimeout(timer);
      delete Global.callEvent[callSign];
      callErr(err)
    },
  }
}

/** 添加事件监听
 */
function on(eventName, callback) {
  this[eventName] = callback;
}
/** 注销事件监听
 */
function off(eventName) {
  this[eventName] = null;
}

function onMessage(im, options) {
  switch (options.type) {
    case declare.PID.ImLogin:
      handleLogin(im, options);
      break;
    case declare.PID.ImLogout:
      handleLogout(im, options);
      break;
    case declare.PID.ChatItemUpdate:
      console.log('更新会话列表', options.data)
      updateChat(im, options.data);
      break;
    case declare.PID.Result:
      handleError(im, options);
      break;
    case declare.PID.ChatR:
      handleMsg(im, options);
      break;
  }
}

// 处理登录通知
function handleLogin(im, options) {
  if (Global.curTab) {
    localNotice.onlineNotice(options);
    window.localStorage.setItem('userId', JSON.stringify(options.data.uid));
    window.localStorage.setItem('wsState', declare.WS_STATE.Connect);
  }
  Global.userId = options.data.uid;
  if (im[IM.EVENT.LOGIN]) {
    let result = tool.resultNotice(IM.EVENT.LOGIN, {
      "code": options.data.code,
      "msg": options.data.msg,
      "updateTime": options.data.nowTime,
    })
    im[IM.EVENT.LOGIN](result);
  }
}

// 处理退出通知
function handleLogout(im, options) {
  if (Global.curTab) {
    localWs.close();
    localDexie.clear();
    localNotice.clear();
    localNotice.offlineNotice(options);
  }
  initGlobal();
  if (im[IM.EVENT.LOGOUT]) {
    let result = tool.resultNotice(IM.EVENT.LOGOUT, {
      "code": options.data.code,
      "msg": options.data.msg,
    });
    im[IM.EVENT.LOGOUT](result);
  }
}

// 处理被动错误
function handleError(im, options) {
  if (Global.curTab) {
    localNotice.errorNotice(options);
  }
  switch (options.data.type) {
    case declare.ERROR_CODE.KICKED_OUT:
      if (im[IM.EVENT.KICKED_OUT]) {
        let result = tool.resultNotice(IM.EVENT.KICKED_OUT, options.data);
        im[IM.EVENT.KICKED_OUT](result);
      }
      break;
    case declare.ERROR_CODE.TOKEN_NOT_FOUND:
      if (im[IM.EVENT.TOKEN_NOT_FOUND]) {
        let result = tool.resultNotice(IM.EVENT.TOKEN_NOT_FOUND, options.data);
        im[IM.EVENT.TOKEN_NOT_FOUND](result);
      }
      break;
  };
}

// 处理被动消息
function handleMsg(im, options) {
  console.log('收到新消息', options.data, Global.userId)
  if (Global.curTab) {
    localNotice.receivedMsgNotice(options);
  }
  let msg = options.data;
  let uid = Global.userId === msg.fromUid ? msg.toUid : msg.fromUid;
  let chatId = tool.splicingSingleId(uid);
  let setKeys = Global.msgSetKeys[chatId];
  let msgs = Global.msgList[chatId];
  switch (msg.type) {
    case declare.MSG_TYPE.Revoke:
      let msgId = parseInt(msg.body);
      if (Global.curTab) {
        let onlyId = tool.createOnlyId(msg.fromUid, msg.sign || msg.msgTime)
        localDexie.updateMsg({
          onlyId: onlyId,
          type: declare.MSG_TYPE.Revoked,
        });
      }
      if (im[IM.EVENT.MESSAGE_REVOKED]) {
        let result = tool.resultNotice(IM.EVENT.MESSAGE_REVOKED, {
          "uid": uid,
          "fromUid": msg.fromUid,
          "toUid": msg.toUid,
          "msgId": msgId,
          "type": declare.MSG_TYPE.Revoked,
        })
        im[IM.EVENT.MESSAGE_REVOKED](result);
      }
      if (setKeys && setKeys.has(msgId)) {
        let revokeMsg = msgs.find(msgItem => msgItem.msgId === msgId);
        revokeMsg.type = declare.MSG_TYPE.Revoked;
      }
      break;
    default:
      let newMsg = msg.onlyId ? msg : tool.formatMsg(msg, uid)
      let showMsg;
      if (newMsg.type === declare.MSG_TYPE.Text) {
        showMsg = newMsg.text;
      } else if (newMsg.type === declare.MSG_TYPE.Img) {
        showMsg = newMsg.url;
      } else {
        showMsg = newMsg.data;
      }
      if (Global.curTab) {
        localDexie.addMsg(newMsg);
        updateChat(im, {
          uid: uid,
          msgEnd: newMsg.msgId,
          showMsgType: newMsg.type,
          showMsg: showMsg,
          showMsgTime: newMsg.msgTime,
        }, newMsg.fromUid)
      };
      if (im[IM.EVENT.MESSAGE_RECEIVED]) {
        let result = tool.resultNotice(IM.EVENT.MESSAGE_RECEIVED, {
          "uid": uid,
          "message": newMsg
        })
        im[IM.EVENT.MESSAGE_RECEIVED](result);
      }
      if (setKeys && !setKeys.has(msg.msgId)) {
        setKeys.add(msg.msgId);
        msgs.unshift(newMsg);
        if (msgs.length > 1 && newMsg.msgId < msgs[1].msgId) {
          Global.msgList[chatId] = tool.sort(msgs, 'showMsgTime')
        }
      }
      break;
  }
}

export default IM;