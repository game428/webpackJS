import tool from './tool';
import declare from './declare'
import proFormat from './proFormat';
import localWs from './ws';
import localNotice from './localNotice';
import localDexie from './dexieDB';

// 重连获取最新会话，同步以获取过的用户的最新消息
// 增量同步，会话及消息组装好后，一次通知
// 同步更新
export function syncChats(Global) {
  Global.handleMessage({
    "type": declare.HANDLE_TYPE.SyncChatsChange,
    "state": declare.SYNC_CHAT.SyncChatStart,
  })
  let callSign = tool.createSign();
  tool.createCallEvent(Global, {
    "type": declare.OPERATION_TYPE.GetChats,
    "callSign": callSign,
    "callSuc": (res) => {
      if (res.updateTime && res.updateTime > Global.updateTime) {
        Global.updateTime = res.updateTime;
      }
      if (res.chats.length > 0) {
        if (Global.chatsSync === declare.SYNC_CHAT.SyncChatSuccess) {
          syncMsgs(Global, res.chats)
        } else {
          getChatsSuc(Global, res.chats)
        }
      } else {
        Global.handleMessage({
          "type": declare.HANDLE_TYPE.SyncChatsChange,
          "state": declare.SYNC_CHAT.SyncChatSuccess,
          "chats": []
        })
      }
    },
    "callErr": (err) => {
      // 增量更新失败
      Global.handleMessage({
        "type": declare.HANDLE_TYPE.SyncChatsChange,
        "state": declare.SYNC_CHAT.SyncChatFailed,
      })
    },
  });
  let msg = proFormat.chatListPro(callSign, Global.updateTime);
  localWs.sendMessage(msg, declare.PID.GetChatList);
}

// 初始化同步
function getChatsSuc(Global, chats) {
  mergeChats(Global, chats);
}

// 增量同步
function syncMsgs(Global, chats) {
  localDexie.getChatKeys().then(chathistorys => {
    mergeChats(Global, chats, chathistorys);
  })
}

// 处理会话列表合并
function mergeChats(Global, chats, chathistorys) {
  let deleteSet = new Set();
  let newArr = chats.map(chatItem => {
    chatItem.showTime = parseInt(chatItem.showMsgTime / 1000);
    let conversationID = tool.splicingC2CId(chatItem.uid);
    chatItem.conversationID = conversationID
    let oldChat = Global.chatKeys[conversationID];
    if (chathistorys && chathistorys.find(history => history.conversationID === conversationID)) {
      getSyncMsgs(Global, oldChat, chatItem);
    }
    if (!chatItem.deleted) {
      // 如果内存已有该chat，则通过对象合并更新
      if (!oldChat) {
        Global.chatKeys[conversationID] = chatItem;
        Global.chatList.push(chatItem);
      } else {
        Object.assign(oldChat, chatItem)
      }
    } else if (oldChat) {
      deleteSet.add(conversationID);
      delete Global.chatKeys[conversationID];
    }
    return chatItem;
  });
  // 如果内存有已删除的会话，则过滤掉
  if (deleteSet.size > 0) {
    Global.chatList = Global.chatList.filter(chat => !deleteSet.has(chat.conversationID));
  }
  if (newArr && newArr.length > 0) {
    localDexie.addChatList(newArr)
  }

  Global.handleMessage({
    "type": declare.HANDLE_TYPE.SyncChatsChange,
    "state": declare.SYNC_CHAT.SyncChatSuccess,
    "chats": newArr,
  })
  return newArr;
}

// 获取指定区间的消息
function getSyncMsgs(Global, oldChat, chat) {
  let callSign = tool.createSign();
  tool.createCallEvent(Global, {
    "type": declare.OPERATION_TYPE.GetMsgs,
    "callSign": callSign,
    "callSuc": async (res) => {
      if (res.messages && res.messages.length > 0) {
        let revokeList = [];
        let msgList = [];
        for (let i = res.messages.length - 1; i >= 0; i--) {
          let msg = res.messages[i];
          if (msg.type === declare.MSG_TYPE.Revoke) {
            let msgId = parseInt(msg.body);
            await localDexie.getMsg({
              "conversationID": oldChat.conversationID,
              "msgId": msgId,
            }).then(oldMsg => {
              if (oldMsg) {
                oldMsg.type = declare.MSG_TYPE.Revoked;
                revokeList.push(oldMsg)
              }
            })
          } else {
            let newMsg = tool.formatMsg(msg, oldChat.conversationID);
            msgList.push(newMsg)
          }
        }

        let localMsg = revokeList.concat(msgList);
        localDexie.addMsgList(localMsg);

        if (chat.deleted !== true) {
          Global.handleMessage({
            "type": declare.HANDLE_TYPE.SyncMsgs,
            "conversationID": oldChat.conversationID,
            "revokeList": revokeList,
            "msgList": msgList,
          })
        }
      }
    },
    "callErr": (err) => {}
  });
  let msg = proFormat.getMsgPro({
    sign: callSign,
    uid: oldChat.uid,
    // msgEnd: chat.msgEnd,
    msgStart: oldChat.msgEnd,
  });
  localWs.sendMessage(msg, declare.PID.GetHistory);
}

/** 获取会话列表
 * 本tab内存 》 本地DB 》 服务器
 * 如果不是本Tab从服务器获取数据，则不存内存
 * @param {*} conversationID 会话id，从哪一条开始往后取
 * @param {number} pageSize 分页条数，默认20
 */
export function getConversationList(Global, options) {
  return new Promise((resolve, reject) => {
    try {
      if (!tool.preJudge(Global, reject)) {
        return
      } else if (options && options.pageSize > Global.maxChatPageSize) {
        let errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.GetChats, 'msg': `最大条数不能超过${Global.maxChatPageSize}条` });
        return reject(errResult)
      }
      let defaultOption = {
        tabId: Global.tabId,
        pageSize: Global.chatPageSize,
        conversationID: "",
        updateTime: null,
      }
      if (typeof options === 'object') {
        Object.assign(defaultOption, options);
      }
      if (Global.chatsSync === declare.SYNC_CHAT.SyncChatSuccess) {
        // 已同步，直接从内存获取
        resultChats(Global, defaultOption, resolve)
      } else {
        // 注册异步回调
        let callSign = tool.createSign();
        Global.chatCallEvents[callSign] = {
          "callSuc": () => {
            delete Global.chatCallEvents[callSign];
            resultChats(Global, defaultOption, resolve)
          },
          "callErr": () => {
            delete Global.chatCallEvents[callSign];
            let errResult = tool.resultErr('获取会话列表失败', declare.OPERATION_TYPE.GetChats, declare.ERROR_CODE.ERROR)
            reject(errResult)
          },
        }
      }
      //   getWsChats(defaultOption, resolve, reject)
      // } else {
    } catch (err) {
      reject(err);
    }
  });
}

// 返回获取到的消息列表
function resultChats(Global, defaultOption, resolve) {
  tool.sort(Global.chatList, 'showMsgTime')
  let chats = tool.getPageSize(defaultOption.conversationID, 'conversationID', Global.chatList, defaultOption.pageSize);
  let result = tool.resultSuc(declare.OPERATION_TYPE.GetChats, {
    chats: chats,
    hasMore: chats.length > defaultOption.pageSize
  });
  resolve(result);
}

/** 获取会话资料
 */
// function getConversationProfile() {}

/** 删除会话
 * 
 * @param {*} conversationID 会话用户id
 */
export function deleteConversation(Global, options) {
  return new Promise((resolve, reject) => {
    try {
      if (!tool.preJudge(Global, reject)) {
        return
      } else if (tool.isNotObject(options, 'conversationID', 'string')) {
        let errResult = tool.parameterErr({ 'name': declare.OPERATION_TYPE.DelChat, 'key': 'conversationID' });
        return reject(errResult)
      }
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        "type": declare.OPERATION_TYPE.DelChat,
        "callSign": callSign,
        "callSuc": (res) => {
          let result = tool.resultSuc(declare.OPERATION_TYPE.DelChat, {
            conversationID: options.conversationID,
            updateTime: res.data.updateTime,
            deleted: res.data.deleted,
          });
          return resolve(result);
        },
        "callErr": (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.DelChat)
          reject(errResult)
        }
      });
      if (Global.curTab) {
        let uid = tool.reformatC2CId(options.conversationID);
        let msg = proFormat.delChatPro(callSign, uid);
        localWs.sendMessage(msg, declare.PID.DelChat);
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