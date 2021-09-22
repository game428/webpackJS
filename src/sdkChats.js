import tool from "./tool";
import declare from "./declare";
import proFormat from "./proFormat";
import { sendWsMsg } from "./ws";
import localNotice from "./localNotice";
import localDexie from "./dexieDB";

/**
 * 会话对象
 * @typedef {Object} Chat 消息对象
 * @property {number} [Chat.sign]
 * @property {string} Chat.conversationID - 会话id
 * @property {number} Chat.uid - 用户Id
 * @property {number} Chat.msgEnd - 最后一条消息id
 * @property {number} Chat.msgLastRead - 最后一条标记为已读的消息id
 * @property {number} Chat.showMsgId - 最后一条显示的消息id
 * @property {number} Chat.showMsgType - 最后一条消息类型
 * @property {string} Chat.showMsg - 最后一条消息内容
 * @property {number} Chat.showMsgTime - 最后一条消息服务器时间
 * @property {number} Chat.showTime - 最后一条消息客户端显示时间
 * @property {number} Chat.unread - 未读消息数
 * @property {boolean} Chat.matched - 是否是matched
 * @property {boolean} Chat.newMsg - 是否以newmessage显示
 * @property {boolean} Chat.myMove - 是否显示my move
 * @property {boolean} Chat.iceBreak - 是否要显示破冰文案
 * @property {boolean} Chat.tipFree - 是否要显示 xx can reply you for free/ you can reply xx for free
 * @property {boolean} Chat.topAlbum - 是否要显示顶部tool bar 相册
 * @property {boolean} Chat.iBlockU - 我是否把你block了
 * @property {boolean} Chat.connected - 双方互发过消息 （业务方的 realchat）
 * @property {boolean} Chat.deleted - 该会话已删除
 */

// 重连获取最新会话，同步以获取过的用户的最新消息
// 增量同步，会话及消息组装好后，一次通知
// 同步更新
function syncChats(Global) {
  Global.handleMessage({
    type: declare.HANDLE_TYPE.SyncChatsChange,
    state: declare.SYNC_CHAT.SyncChatStart,
  });
  let callSign = tool.createSign();
  tool.createCallEvent(Global, {
    type: declare.OPERATION_TYPE.GetChats,
    callSign: callSign,
    callSuc: (res) => {
      if (res.updateTime && res.updateTime > Global.updateTime) {
        Global.updateTime = res.updateTime;
      }
      if (res.chats.length > 0) {
        if (Global.chatsSync === declare.SYNC_CHAT.SyncChatSuccess) {
          syncMsgs(Global, res.chats);
        } else {
          getChatsSuc(Global, res.chats);
        }
      } else {
        Global.handleMessage({
          type: declare.HANDLE_TYPE.SyncChatsChange,
          state: declare.SYNC_CHAT.SyncChatSuccess,
          chats: [],
        });
      }
    },
    callErr: (err) => {
      // 增量更新失败
      Global.handleMessage({
        type: declare.HANDLE_TYPE.SyncChatsChange,
        state: declare.SYNC_CHAT.SyncChatFailed,
      });
    },
  });
  let msg = proFormat.chatListPro(callSign, Global.updateTime);
  sendWsMsg(msg, declare.PID.GetChatList);
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
  let deleteSet = new Set();
  let newArr = chats.map((chatItem) => {
    chatItem.showTime = parseInt(chatItem.showMsgTime / 1000);
    let conversationID = tool.splicingC2CId(chatItem.uid);
    chatItem.conversationID = conversationID;
    let oldChat = Global.chatKeys[conversationID];
    if (
      chathistorys?.find((history) => history.conversationID === conversationID)
    ) {
      getSyncMsgs(Global, oldChat, chatItem);
    }
    if (!chatItem.deleted) {
      // 如果内存已有该chat，则通过对象合并更新
      if (!oldChat) {
        Global.chatKeys[conversationID] = chatItem;
        Global.chatList.push(chatItem);
      } else {
        Object.assign(oldChat, chatItem);
      }
    } else if (oldChat) {
      deleteSet.add(conversationID);
      delete Global.chatKeys[conversationID];
    }
    return chatItem;
  });
  // 如果内存有已删除的会话，则过滤掉
  if (deleteSet.size > 0) {
    Global.chatList = Global.chatList.filter(
      (chat) => !deleteSet.has(chat.conversationID)
    );
  }
  if (newArr?.length) {
    localDexie.addChatList(newArr);
  }

  Global.handleMessage({
    type: declare.HANDLE_TYPE.SyncChatsChange,
    state: declare.SYNC_CHAT.SyncChatSuccess,
    chats: newArr,
  });
  return newArr;
}

// 获取指定区间的消息
function getSyncMsgs(Global, oldChat, chat) {
  let callSign = tool.createSign();
  tool.createCallEvent(Global, {
    type: declare.OPERATION_TYPE.GetMsgs,
    callSign: callSign,
    callSuc: async (res) => {
      if (!res?.messages?.length) return;
      let revokeList = [];
      let msgList = [];
      for (let i = res.messages.length - 1; i >= 0; i--) {
        let msg = res.messages[i];
        if (msg.type === declare.MSG_TYPE.Revoke) {
          let msgId = parseInt(msg.body);
          await localDexie
            .getMsg({
              conversationID: oldChat.conversationID,
              msgId: msgId,
            })
            .then((oldMsg) => {
              if (oldMsg) {
                oldMsg.type = declare.MSG_TYPE.Revoked;
                revokeList.push(oldMsg);
              }
            });
        } else {
          let newMsg = tool.formatMsg(msg, oldChat.conversationID);
          msgList.push(newMsg);
        }
      }

      let localMsg = revokeList.concat(msgList);
      localDexie.addMsgList(localMsg);

      if (chat.deleted !== true) {
        Global.handleMessage({
          type: declare.HANDLE_TYPE.SyncMsgs,
          conversationID: oldChat.conversationID,
          revokeList: revokeList,
          msgList: msgList,
        });
      }
    },
    callErr: (err) => {},
  });
  let msg = proFormat.getMsgPro({
    sign: callSign,
    toUid: oldChat.uid,
    // msgEnd: chat.msgEnd,
    msgStart: oldChat.msgEnd,
  });
  sendWsMsg(msg, declare.PID.GetHistory);
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
    try {
      if (!tool.preJudge(Global, reject)) {
        return;
      } else if (options?.pageSize > Global.maxChatPageSize) {
        let errResult = tool.parameterErr({
          name: declare.OPERATION_TYPE.GetChats,
          msg: `最大条数不能超过${Global.maxChatPageSize}条`,
        });
        return reject(errResult);
      }
      let defaultOption = {
        tabId: Global.tabId,
        pageSize: Global.chatPageSize,
        conversationID: "",
        updateTime: null,
      };
      if (typeof options === "object") {
        Object.assign(defaultOption, options);
      }
      if (Global.chatsSync === declare.SYNC_CHAT.SyncChatSuccess) {
        // 已同步，直接从内存获取
        resultChats(Global, defaultOption, resolve);
      } else {
        // 注册异步回调
        let callSign = tool.createSign();
        Global.chatCallEvents[callSign] = {
          callSuc: () => {
            delete Global.chatCallEvents[callSign];
            resultChats(Global, defaultOption, resolve);
          },
          callErr: () => {
            delete Global.chatCallEvents[callSign];
            let errResult = tool.resultErr(
              "获取会话列表失败",
              declare.OPERATION_TYPE.GetChats,
              declare.ERROR_CODE.ERROR
            );
            reject(errResult);
          },
        };
      }
    } catch (err) {
      reject(err);
    }
  });
}

// 返回获取到的消息列表
function resultChats(Global, defaultOption, resolve) {
  tool.sort(Global.chatList, "showMsgTime");
  let chats = tool.getPageSize(
    defaultOption.conversationID,
    "conversationID",
    Global.chatList,
    defaultOption.pageSize
  );
  let result = tool.resultSuc(declare.OPERATION_TYPE.GetChats, {
    chats: chats,
    hasMore: chats.length > defaultOption.pageSize,
  });
  resolve(result);
}

/** 获取会话资料
 */
// function getConversationProfile() {}

/**
 * 删除会话
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID 会话用户id
 * @return {Promise}
 */
function deleteConversation(Global, options) {
  return new Promise((resolve, reject) => {
    try {
      if (!tool.preJudge(Global, reject)) {
        return;
      } else if (tool.isNotObject(options, "conversationID", "string")) {
        let errResult = tool.parameterErr({
          name: declare.OPERATION_TYPE.DelChat,
          key: "conversationID",
        });
        return reject(errResult);
      }
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        type: declare.OPERATION_TYPE.DelChat,
        callSign: callSign,
        callSuc: (res) => {
          let result = tool.resultSuc(declare.OPERATION_TYPE.DelChat, {
            conversationID: options.conversationID,
            updateTime: res.data.updateTime,
            deleted: res.data.deleted,
          });
          return resolve(result);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.DelChat);
          reject(errResult);
        },
      });
      if (Global.curTab) {
        let uid = tool.reformatC2CId(options.conversationID);
        let msg = proFormat.delChatPro(callSign, parseInt(uid));
        sendWsMsg(msg, declare.PID.DelChat);
      } else {
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.DelChat, {
          callSign: callSign,
          tabId: Global.tabId,
          options: options,
          state: declare.LOCAL_OPERATION_STATUS.Pending,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

export { syncChats, getConversationList, deleteConversation };
