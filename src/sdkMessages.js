import tool from './tool';
import declare from './declare'
import proFormat from './proFormat';
import localWs from './ws';
import localNotice from './localNotice';
import localDexie from './dexieDB';

/** 获取消息列表
 * 本tab内存 》 本地DB 》 服务器
 * 如果不是本Tab从服务器获取数据，则不存内存
 * @param {*} conversationID 获取用户的id
 * @param {*} msgEnd 消息id，从哪一条开始往后取
 * @param {number} pageSize 分页条数，默认20
 * @returns 
 */
export function getMessageList(Global, options) {
  return new Promise((resolve, reject) => {
    try {
      if (!tool.preJudge(Global, reject)) {
        return
      } else if (tool.isNotObject(options, 'conversationID', 'string')) {
        let errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.GetMsgs, 'key': 'conversationID' });
        return reject(errResult)
      } else if (options.pageSize && options.pageSize > Global.maxMsgPageSize) {
        let errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.GetMsgs, 'msg': `最大条数不能超过${Global.maxMsgPageSize}条` });
        return reject(errResult)
      }
      if (options.msgEnd === 1) {
        let result = tool.resultSuc(declare.OPERATION_TYPE.GetMsgs, {
          conversationID: options.conversationID,
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
      if (defaultOption.tabId !== Global.tabId) {
        getWsMsgs(Global, defaultOption, resolve, reject);
      } else {
        localDexie.addChatKey(defaultOption.conversationID);
        localDexie.getMsgList(defaultOption).then((data) => {
          if (data.length < 1 || (data[0].msgId > 1 && data.length < defaultOption.pageSize)) {
            // 如果本地没有msgId等于1的消息,且本地消息不足一页则去服务器获取
            getWsMsgs(Global, defaultOption, resolve, reject, data);
          } else {
            resultMsgs(defaultOption, resolve, data);
          }
        })
      }
    } catch (err) {
      reject(err);
    }
  })
}

// 从服务器获取消息列表
function getWsMsgs(Global, defaultOption, resolve, reject, msgs) {
  let callSign = tool.createSign();
  tool.createCallEvent(Global, {
    "type": declare.OPERATION_TYPE.GetMsgs,
    "callSign": callSign,
    "callSuc": (res) => {
      if (res.messages && res.messages.length > 0) {
        getMsgsSuc(Global, defaultOption, res, resolve, msgs)
      } else {
        let result = tool.resultSuc(declare.OPERATION_TYPE.GetMsgs, {
          conversationID: defaultOption.conversationID,
          messages: [],
          hasMore: false
        });
        resolve(result);
      }
    },
    "callErr": (err) => {
      let errResult = tool.serverErr(err, declare.OPERATION_TYPE.GetMsgs)
      reject(errResult)
    }
  });
  if (Global.curTab) {
    let uid = tool.reformatC2CId(defaultOption.conversationID);
    let msg = proFormat.getMsgPro({
      sign: callSign,
      uid: uid,
      msgEnd: defaultOption.msgEnd
    });
    localWs.sendMessage(msg, declare.PID.GetHistory);
  } else {
    localNotice.getMsgNotice({
      "tabId": Global.tabId,
      "callSign": callSign,
      "options": defaultOption,
      "state": declare.LOCAL_OPERATION_STATUS.Pending,
    })
  }
}

// TODO 
// 获取消息列表成功回调
function getMsgsSuc(Global, defaultOption, res, resolve, msgs) {
  if (Global.curTab) {
    let newMsgs = [];
    res.messages.forEach(msg => {
      // TODO 非增量更新，不处理指令消息
      if (tool.isSo(msg.type)) {
        let newMsg = tool.formatMsg(msg, defaultOption.conversationID)
        newMsgs.push(newMsg);
      }
    });
    if (newMsgs.length > 0) {
      localDexie.addMsgList(newMsgs)
    }
    if (msgs && msgs.length > 0) {
      newMsgs.push(...msgs);
    }
    resultMsgs(defaultOption, resolve, newMsgs.reverse())
  } else {
    resultMsgs(defaultOption, resolve, res.messages)
  }
}

// 返回获取到的消息列表
function resultMsgs(defaultOption, resolve, msgs) {
  let resultData = msgs.slice(0 - defaultOption.pageSize);
  let hasMore = false;
  if (resultData.length > 0) {
    hasMore = resultData[resultData.length - 1].msgId !== 1;
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.GetMsgs, {
    conversationID: defaultOption.conversationID,
    messages: resultData,
    hasMore: hasMore
  });
  resolve(result);
}

/** 设置已读
 * @param {*} conversationID 会话用户id
 */
export function setMessageRead(Global, options) {
  return new Promise((resolve, reject) => {
    try {
      if (!tool.preJudge(Global, reject)) {
        return
      } else if (tool.isNotObject(options, 'conversationID', 'string')) {
        let errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Read, 'key': 'conversationID' });
        return reject(errResult)
      }
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        "type": declare.OPERATION_TYPE.Read,
        "callSign": callSign,
        "callSuc": (res) => {
          let result = tool.resultSuc(declare.OPERATION_TYPE.Read, {
            conversationID: res.conversationID,
            msgId: options.msgId,
            msgTime: res.updateTime,
          });
          resolve(result);
        },
        "callErr": (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Read)
          reject(errResult)
        }
      });
      if (Global.curTab) {
        let uid = tool.reformatC2CId(options.conversationID);
        let msg = proFormat.readMsgPro(callSign, uid);
        localWs.sendMessage(msg, declare.PID.MsgRead);
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

// 消息参数判断
function isMsgError(Global, msgObj, reject, proOptions) {
  let errResult = null;
  if (!tool.preJudge(Global, reject)) {
    return true;
  } else if (tool.isNotObject(msgObj, 'type', 'number')) {
    errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'key': 'type' });
  } else {
    switch (msgObj.type) {
      case declare.MSG_TYPE.Text:
        if (tool.isNotString(msgObj.text)) {
          errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'key': 'text' });
        } else if (tool.isNotSize(msgObj.text)) {
          errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'msg': 'text长度超过3K' });
        }
        proOptions.body = msgObj.text
        break;
      case declare.MSG_TYPE.Img:
        if (tool.isNotHttp(msgObj.url)) {
          errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'key': 'url' });
        } else if (tool.isNotEmpty(msgObj.height)) {
          errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'key': 'height' });
        } else if (tool.isNotEmpty(msgObj.width)) {
          errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'key': 'width' });
        }
        proOptions.body = msgObj.url;
        break;
      case declare.MSG_TYPE.Custom:
        if (tool.isNotString(msgObj.content)) {
          errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'key': 'content' });
        } else if (tool.isNotSize(msgObj.content)) {
          errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Send, 'msg': 'content长度超过3K' });
        }
        proOptions.body = msgObj.data;
        break;
    }
  }
  if (errResult) {
    reject(errResult)
    return true;
  } else {
    return false;
  }
}

/** 发送消息
 * @param {object} msgObj 消息对象
 */
export function sendMessage(Global, msgObj) {
  return new Promise((resolve, reject) => {
    try {
      let proOptions = {};
      if (isMsgError(Global, msgObj, reject, proOptions)) return;
      let callSign = tool.createSign(msgObj.showMsgTime);
      tool.createCallEvent(Global, {
        "type": declare.OPERATION_TYPE.Send,
        "callSign": callSign,
        "callSuc": (res) => {
          sendMsgSuc(Global, msgObj, res, resolve)
        },
        "callErr": (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Send);
          reject(errResult);
        }
      });
      if (Global.curTab) {
        proOptions.sign = callSign;
        Object.assign(proOptions, msgObj);
        let msg = proFormat.sendMsgPro(proOptions);
        localWs.sendMessage(msg, declare.PID.ChatS);
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
function sendMsgSuc(Global, msgObj, res, resolve) {
  if (Global.curTab) {
    let newMsg = JSON.parse(JSON.stringify(msgObj));
    newMsg.msgId = res.data.msgId;
    newMsg.msgTime = res.data.msgTime;
    newMsg.sendStatus = declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
    Global.handleMessage({
      "type": declare.HANDLE_TYPE.ChatR,
      "shift": true,
      "data": newMsg,
    })
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.Send, {
    conversationID: msgObj.conversationID,
    msgId: res.data.msgId,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  });
  resolve(result);
}

/** 重发消息
 * @param {object} msgObj 消息对象
 */
export function resendMessage(Global, msgObj) {
  return new Promise((resolve, reject) => {
    try {
      let proOptions = {};
      if (isMsgError(Global, msgObj, reject, proOptions)) return;
      let callSign = tool.createSign(msgObj.showMsgTime);
      tool.createCallEvent(Global, {
        "type": declare.OPERATION_TYPE.Resend,
        "callSign": callSign,
        "callSuc": (res) => {
          resendMsgSuc(Global, msgObj, res, resolve)
        },
        "callErr": (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Resend);
          reject(errResult);
        }
      });
      if (Global.curTab) {
        proOptions.sign = callSign;
        Object.assign(proOptions, msgObj);
        let msg = proFormat.sendMsgPro(proOptions);
        localWs.sendMessage(msg, declare.PID.ChatS);
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
function resendMsgSuc(Global, msgObj, res, resolve) {
  if (Global.curTab) {
    let newMsg = JSON.parse(JSON.stringify(msgObj));
    newMsg.msgId = res.data.msgId;
    newMsg.msgTime = res.data.msgTime;
    newMsg.sendStatus = declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
    Global.handleMessage({
      "type": declare.HANDLE_TYPE.ChatR,
      "shift": true,
      "data": newMsg,
    })
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.Resend, {
    conversationID: msgObj.conversationID,
    msgId: res.data.msgId,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  });
  resolve(result);
}

/** 撤回消息
 * @param {*} conversationID 会话用户id
 * @param {*} msgId 消息id
 */
export function revokeMessage(Global, options) {
  return new Promise((resolve, reject) => {
    try {
      if (!tool.preJudge(Global, reject)) {
        return
      } else if (tool.isNotObject(options, 'conversationID', 'string')) {
        let errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Revoke, 'key': 'conversationID' });
        return reject(errResult)
      } else if (tool.isNotNumer(options.msgId, true)) {
        let errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.Revoke, 'key': 'msgId' });
        return reject(errResult)
      }
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        "type": declare.OPERATION_TYPE.Revoke,
        "callSign": callSign,
        "callSuc": (res) => {
          revokeMsgSuc(Global, options, res, resolve)
        },
        "callErr": (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Revoke);
          reject(errResult);
        }
      });
      if (Global.curTab) {
        let uid = tool.reformatC2CId(options.conversationID);
        let msg = proFormat.revokeMsgPro(callSign, uid, options.msgId);
        localWs.sendMessage(msg, declare.PID.Revoke);
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

// 测回消息成功回调
function revokeMsgSuc(Global, options, res, resolve) {
  if (Global.curTab) {
    Global.handleMessage({
      "type": declare.HANDLE_TYPE.ChatR,
      "shift": true,
      "data": res.data,
    })
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.Revoke, {
    conversationID: options.conversationID,
    msgId: options.msgId,
    type: declare.MSG_TYPE.Revoked,
  });
  resolve(result);
}

/* 创建文本消息
 */
export function createTextMessage(Global, options) {
  try {
    let newMsg = tool.msgBase(options && options.to, Global.uid);
    let payload = (options && options.payload) || {};
    Object.assign(newMsg, {
      type: declare.MSG_TYPE.Text,
      text: payload.text,
    })
    return newMsg;
  } catch (err) {
    console.error(err)
  }
}

/* 创建图片消息
 */
export function createImageMessage(Global, options) {
  try {
    let newMsg = tool.msgBase(options && options.to, Global.uid);
    let payload = (options && options.payload) || {};
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
    console.error(err)
  }
}

// TODO 
/** 创建自定义消息
 */
export function createCustomMessage(Global, options) {
  try {
    let newMsg = tool.msgBase(options && options.to, Global.uid);
    let payload = (options && options.payload) || {};
    Object.assign(newMsg, {
      type: declare.MSG_TYPE.Custom,
      content: payload.content,
    })
    return newMsg;
  } catch (err) {
    console.error(err)
  }
}