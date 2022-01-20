import tool from "./tool";
import {
  PID,
  MSG_TYPE,
  SYNC_CHAT,
  ERROR_CODE,
  HANDLE_TYPE,
  OPERATION_TYPE,
  LOCAL_OPERATION_STATUS,
} from "./sdkTypes";
import proFormat from "./google/proFormat";
import { sendWsMsg } from "./ws";
import localNotice from "./localNotice";
import localDexie from "./dexieDB";

/**
 * 会话对象
 * @typedef {Object} Chat 消息对象
 * @property {string} Chat.conversationID - 会话id
 * @property {string} Chat.uid - 用户Id
 * @property {string} Chat.msgEnd - 最后一条消息id
 * @property {string} Chat.msgLastRead - 对方最后一条标记为已读的消息id
 * @property {string} Chat.showMsgId - 显示的最后一条显示的消息id
 * @property {number} Chat.showMsgType - 显示的最后一条消息类型
 * @property {string} Chat.showMsg - 显示的最后一条消息内容
 * @property {number} Chat.showMsgTime - 显示的最后一条消息服务器时间
 * @property {number} Chat.showTime - 显示的最后一条消息客户端显示时间
 * @property {string} Chat.showMsgFromUid - 显示的最后一条消息的发送方id
 * @property {number} Chat.unread - 未读消息数
 * @property {boolean} Chat.matched - 是否是matched
 * @property {boolean} Chat.newMsg - 是否以newmessage显示
 * @property {boolean} Chat.myMove - 是否显示my move
 * @property {boolean} Chat.iceBreak - 是否要显示破冰文案
 * @property {boolean} Chat.tipFree - 是否要显示 xx can reply you for free/ you can reply xx for free
 * @property {boolean} Chat.topAlbum - 是否要显示顶部tool bar 相册
 * @property {boolean} Chat.iBlockU - 我是否把你block了
 * @property {boolean} Chat.iChatU - 我给你发过消息了 （业务方的 realchat）
 * @property {boolean} Chat.uChatI - 你给我发过消息了 （业务方的 realchat）
 * @property {boolean} Chat.deleted - 该会话已删除
 */

// 重连获取最新会话，同步以获取过的用户的最新消息
// 增量同步，会话及消息组装好后，一次通知
// 同步更新
function syncChats(Global) {
  Global.handleMessage({
    type: HANDLE_TYPE.SyncChatsChange,
    state: SYNC_CHAT.SYNC_CHAT_START,
  });
  let callSign = tool.createSign();
  Global.callEvents.has(callSign) && (callSign += 1);
  tool.createCallEvent(Global, {
    type: OPERATION_TYPE.GetChats,
    callSign: callSign,
    callSuc: (res) => {
      if (res.updateTime && res.updateTime > Global.updateTime) {
        Global.updateTime = res.updateTime;
      }
      if (res.chats.length > 0) {
        if (Global.sdkState.chatsSync === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
          syncMsgs(Global, res.chats);
        } else {
          getChatsSuc(Global, res.chats);
        }
      } else {
        Global.handleMessage({
          type: HANDLE_TYPE.SyncChatsChange,
          state: SYNC_CHAT.SYNC_CHAT_SUCCESS,
          chats: [],
        });
      }
    },
    callErr: (err) => {
      // 增量更新失败
      Global.handleMessage({
        type: HANDLE_TYPE.SyncChatsChange,
        state: SYNC_CHAT.SYNC_CHAT_FAILED,
        err,
      });
    },
  });
  let msg = proFormat.chatListPro(callSign, Global.updateTime);
  sendWsMsg(msg, PID.GetChatList);
}

// 初始化同步
function getChatsSuc(Global, chats) {
  mergeChats(Global, chats);
}

// 增量同步
function syncMsgs(Global, chats) {
  localDexie.getChatKeys().then((chathistorys) => {
    mergeChats(Global, chats, chathistorys);
  });
}

// 处理会话列表合并
function mergeChats(Global, chats, chathistorys) {
  let newArr = chats.map((chatItem) => {
    let newChat = tool.formatChat(chatItem, Global.sdkState.uid);
    let conversationID = newChat.conversationID;
    if (
      chathistorys?.find((history) => history.conversationID === conversationID)
    ) {
      let oldChat = Global.chatKeys.get(conversationID);
      getSyncMsgs(Global, oldChat?.msgEnd, newChat);
    }
    if (newChat.deleted) {
      Global.chatKeys.delete(conversationID);
    } else {
      Global.chatKeys.set(conversationID, newChat);
    }
    return newChat;
  });
  if (newArr?.length) {
    localDexie.addChatList(newArr);
  }
  Global.handleMessage({
    type: HANDLE_TYPE.SyncChatsChange,
    state: SYNC_CHAT.SYNC_CHAT_SUCCESS,
    chats: newArr,
  });
  return newArr;
}

// 获取指定区间的消息
function getSyncMsgs(Global, msgEnd, chat) {
  let callSign = tool.createSign();
  Global.callEvents.has(callSign) && (callSign += 1);
  tool.createCallEvent(Global, {
    type: OPERATION_TYPE.GetMsgs,
    callSign: callSign,
    callSuc: async (res) => {
      if (!res?.messages?.length) return;
      let i = res.messages.length - 1;
      if (res.messages[i].msgId > msgEnd + 1) {
        //删除本地数据库
        localDexie.deleteMsgs(chat.conversationID);
      }
      let revokeList = [];
      let msgList = [];
      let deleteMsgIds = [];
      for (; i >= 0; i--) {
        let msg = res.messages[i];
        if (msg.type === MSG_TYPE.Recall) {
          let newMsg = {
            conversationID: msg.conversationID,
            msgId: parseInt(msg.body),
            type: MSG_TYPE.Revoked,
          };
          revokeList.push(newMsg);
          localDexie.updateMsg(newMsg);
        } else if (msg.type === MSG_TYPE.SysDelete) {
          msg.content.split(",").forEach((id) => {
            deleteMsgIds.push(Number(id));
          });
        } else if (msg.type < 64) {
          let newMsg = tool.formatMsg(msg, chat.conversationID);
          msgList.push(newMsg);
        }
      }

      if (deleteMsgIds.length > 0) {
        localDexie.deleteMsgs(chat.conversationID, deleteMsgIds);
      }

      let localMsg = revokeList.concat(msgList);
      localDexie.addMsgList(localMsg);

      if (chat.deleted !== true) {
        Global.handleMessage({
          type: HANDLE_TYPE.SyncMsgs,
          conversationID: chat.conversationID,
          revokeList: revokeList,
          msgList: msgList,
          deleteMsgIds: deleteMsgIds,
        });
      }
    },
    callErr: (err) => {},
  });
  let msg = proFormat.getMsgPro({
    sign: callSign,
    toUid: chat.uid,
    pageSize: 100,
    msgStart: msgEnd,
  });
  sendWsMsg(msg, PID.GetHistory);
}

/**
 * 获取会话列表
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {?string} options.conversationID - 会话id，从哪一条开始往后取, 为空则获取最新的
 * @param {number} [options.pageSize = 20] - 分页条数，默认20
 * @return {Promise}
 */
function getConversationList(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.GetChats)) {
      return;
    } else if (options?.pageSize && tool.isNotNumer(options?.pageSize)) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.GetChats,
        key: "pageSize",
      });
      return reject(errResult);
    }
    if (Global.sdkState.chatsSync === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
      // 已同步，直接从内存获取
      resultChats(Global, options, resolve);
    } else {
      // 注册异步回调
      let callSign = tool.createSign();
      Global.chatCallEvents.has(callSign) && (callSign += 1);
      Global.chatCallEvents.set(callSign, {
        callSuc: () => {
          Global.chatCallEvents.delete(callSign);
          resultChats(Global, options, resolve);
        },
        callErr: (err) => {
          Global.chatCallEvents.delete(callSign);
          let errResult = tool.resultErr(
            err?.msg || "Failed to get the conversation list",
            OPERATION_TYPE.GetChats,
            err?.code || ERROR_CODE.ERROR
          );
          reject(errResult);
        },
      });
    }
  });
}

// 返回获取到的消息列表
function resultChats(Global, options, resolve) {
  let chats = tool.sort(Array.from(Global.chatKeys.values()), "showMsgTime");
  if (options?.pageSize > 0) {
    chats = tool.getPageSize(
      options?.conversationID,
      "conversationID",
      chats,
      options?.pageSize
    );
  }
  let result = tool.resultSuc(OPERATION_TYPE.GetChats, {
    chats: chats,
    hasMore: options?.pageSize > 0 && chats.length > options?.pageSize,
  });
  resolve(result);
}

/**
 * 删除会话
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID 会话用户id
 * @return {Promise}
 */
function deleteConversation(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.DelChat)) {
      return;
    } else if (tool.isNotObject(options, "conversationID", "string")) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.DelChat,
        key: "conversationID",
      });
      return reject(errResult);
    }
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.DelChat,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.DelChat, {
          conversationID: options.conversationID,
          updateTime: res.data.updateTime,
          deleted: res.data.deleted,
        });
        return resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.DelChat);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let uid = tool.reformatC2CId(options.conversationID);
      let msg = proFormat.delChatPro(callSign, parseInt(uid));
      sendWsMsg(msg, PID.DelChat);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.DelChat, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 获取指定会话信息
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID - 会话id
 * @return {Promise}
 */
function getConversationProvider(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.GetChat)) {
      return;
    } else if (tool.isNotObject(options, "conversationID", "string")) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.GetChat,
        key: "conversationID",
      });
      return reject(errResult);
    }
    if (Global.chatKeys.has(options.conversationID)) {
      let newChat = Global.chatKeys.get(options.conversationID);
      let result = tool.resultSuc(OPERATION_TYPE.GetChat, newChat);
      resolve(result);
    } else {
      localDexie.getChat(options.conversationID).then((chat) => {
        if (chat) {
          let result = tool.resultSuc(OPERATION_TYPE.GetChat, chat);
          return resolve(result);
        } else {
          getWsChat(Global, options.conversationID, resolve, reject);
        }
      });
    }
  });
}

function getWsChat(Global, conversationID, resolve, reject) {
  let callSign = tool.createSign();
  Global.callEvents.has(callSign) && (callSign += 1);
  tool.createCallEvent(Global, {
    type: OPERATION_TYPE.GetChat,
    callSign: callSign,
    callSuc: (res) => {
      if (res.data) {
        let newChat = tool.formatChat(res.data, Global.sdkState.uid);
        localDexie.updateChat(newChat);
        let result = tool.resultSuc(OPERATION_TYPE.GetChat, newChat);
        resolve(result);
      }
    },
    callErr: (err) => {
      let errResult = tool.serverErr(err, OPERATION_TYPE.GetChat);
      reject(errResult);
    },
  });
  if (Global.curTab) {
    let uid = tool.reformatC2CId(conversationID);
    let msg = proFormat.chatPro(callSign, uid);
    sendWsMsg(msg, PID.GetChat);
  } else {
    localNotice.onWebSocketNotice(OPERATION_TYPE.GetChat, {
      callSign: callSign,
      tabId: Global.tabId,
      options: options,
      state: LOCAL_OPERATION_STATUS.Pending,
    });
  }
}

/**
 * 更新指定会话本地信息
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID - 会话id
 * @return {Promise}
 */
function updateConversationProvider(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.UpdateLocalChat)) {
      return;
    } else if (tool.isNotObject(options, "conversationID", "string")) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.UpdateLocalChat,
        key: "conversationID",
      });
      return reject(errResult);
    }
    if (Global.chatKeys.has(options.conversationID)) {
      let newChat = Global.chatKeys.get(options.conversationID);
      Object.assign(newChat, options);
      let result = tool.resultSuc(OPERATION_TYPE.UpdateLocalChat, newChat);
      resolve(result);
    } else {
      localDexie.getChat(options.conversationID).then((chat) => {
        if (chat) {
          let newChat = Object.assign(chat, options);
          let result = tool.resultSuc(OPERATION_TYPE.UpdateLocalChat, newChat);
          resolve(result);
        } else {
          let errResult = tool.resultErr(
            "Failed to update local session information",
            OPERATION_TYPE.UpdateLocalChat,
            ERROR_CODE.ERROR
          );
          reject(errResult);
        }
      });
    }
  });
}

/**
 * 获取未读总数
 * @return {Promise<number>}
 */
function getAllUnreadCount(Global) {
  return new Promise((resolve, reject) => {
    if (Global.sdkState.chatsSync === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
      // 已同步，直接从内存获取
      let chatList = Array.from(Global.chatKeys.values());
      let unread = chatList.reduce((pre, cur) => pre + cur.unread, 0);
      let result = tool.resultSuc(OPERATION_TYPE.GetAllUnread, {
        unread: unread || 0,
      });
      resolve(result);
    } else {
      // 注册异步回调
      let callSign = tool.createSign();
      Global.chatCallEvents.has(callSign) && (callSign += 1);
      Global.chatCallEvents.set(callSign, {
        callSuc: () => {
          Global.chatCallEvents.delete(callSign);
          let chatList = Array.from(Global.chatKeys.values());
          let unread = chatList.reduce((pre, cur) => pre + cur.unread, 0);
          let result = tool.resultSuc(OPERATION_TYPE.GetAllUnread, {
            unread: unread,
          });
          resolve(result);
        },
        callErr: () => {
          Global.chatCallEvents.delete(callSign);
          let errResult = tool.resultErr(
            "Failed to get no reading",
            OPERATION_TYPE.GetAllUnread,
            ERROR_CODE.ERROR
          );
          reject(errResult);
        },
      });
    }
  });
}

export {
  syncChats,
  getConversationList,
  getAllUnreadCount,
  getConversationProvider,
  updateConversationProvider,
  deleteConversation,
};
