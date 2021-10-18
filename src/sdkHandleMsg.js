import tool from "./tool";
import {
  EVENT,
  MSG_TYPE,
  SYNC_CHAT,
  ERROR_CODE,
  HANDLE_TYPE,
  IM_LOGIN_STATE,
  CHAT_UPDATE_EVENT,
  LOCAL_MESSAGE_TYPE,
} from "./sdkTypes";
import localNotice from "./localNotice";
import localDexie from "./dexieDB";
import { getConversationProvider } from "./sdkChats";

let Global, msim;

// 处理消息
function handleMessage(GlobalObj, msimObj, options) {
  if (!GlobalObj.curTab === !options.curTabId) return;
  if (GlobalObj.curTab) {
    options.curTabId = GlobalObj.tabId;
  }
  Global = GlobalObj;
  msim = msimObj;
  switch (options.type) {
    case HANDLE_TYPE.WsStateChange:
      handleWsChange(options);
      break;
    case HANDLE_TYPE.SyncChatsChange:
      handleChatChange(options);
      break;
    case HANDLE_TYPE.SyncMsgs:
      handleSyncMsgs(options);
      break;
    case HANDLE_TYPE.ImLogin:
      handleLogin(options);
      break;
    case HANDLE_TYPE.ImLogout:
      handleLogout(options);
      break;
    case HANDLE_TYPE.ChatItemUpdate:
      updateChat(options.data);
      break;
    case HANDLE_TYPE.ResultError:
      handleError(options);
      break;
    case HANDLE_TYPE.ChatR:
      handleMsg(options);
      break;
  }
}

// 处理同步消息成功
function handleSyncMsgs(options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.SyncMsgs, options);
  }
  if (options.msgList.length > 0 && msim[EVENT.MESSAGE_RECEIVED]) {
    let msgList = tool.resultNotice(EVENT.MESSAGE_RECEIVED, options.msgList);
    msim[EVENT.MESSAGE_RECEIVED](msgList);
  }
  if (options.revokeList.length > 0 && msim[EVENT.MESSAGE_REVOKED]) {
    let revokeList = tool.resultNotice(
      EVENT.MESSAGE_REVOKED,
      options.revokeList
    );
    msim[EVENT.MESSAGE_REVOKED](revokeList);
  }
}

// 处理同步会话状态变更
function handleChatChange(options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.SyncChatsChange, options);
  } else if (options.state === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
    options.chats.forEach((chat) => {
      if (Global.chatKeys.hasOwnProperty(chat.conversationID)) {
        let oldChat = Global.chatKeys[chat.conversationID];
        Object.assign(oldChat, chat);
      } else {
        Global.chatKeys[chat.conversationID] = chat;
        Global.chatList.push(chat);
      }
    });
  }

  if (options.state !== SYNC_CHAT.SYNC_CHAT_START) {
    // 处理同步期间收到的会话列表回调
    for (let key in Global.chatCallEvents) {
      if (options.state === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
        Global.chatCallEvents[key].callSuc();
      } else if (options.state === SYNC_CHAT.SYNC_CHAT_FAILED) {
        Global.chatCallEvents[key].callErr(options.err);
      }
    }
    // 增量同步
    if (Global.chatsSync === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
      if (msim[EVENT.CONVERSATION_LIST_UPDATED]) {
        let result = tool.resultNotice(
          EVENT.CONVERSATION_LIST_UPDATED,
          options.chats
        );
        msim[EVENT.CONVERSATION_LIST_UPDATED](result);
      }
    } else {
      // 初次同步
      Global.chatsSync = options.state;
      localDexie.updateInfo({ chatsSync: options.state });
    }
  }

  if (msim[EVENT.SYNC_CHATS_CHANGE]) {
    let result = tool.resultNotice(EVENT.SYNC_CHATS_CHANGE, {
      state: options.state,
    });
    msim[EVENT.SYNC_CHATS_CHANGE](result);
  }
}

// 处理网络状态变更
function handleWsChange(options) {
  Global.connState = options.state;
  if (Global.curTab) {
    localDexie.updateInfo({ connState: options.state });
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.WsStateChange, options);
  }
  if (msim[EVENT.CONNECT_CHANGE]) {
    let result = tool.resultNotice(EVENT.CONNECT_CHANGE, {
      state: options.state,
    });
    msim[EVENT.CONNECT_CHANGE](result);
  }
}

// 处理登录通知
function handleLogin(options) {
  Global.loginState = IM_LOGIN_STATE.LOGGED;
  if (Global.curTab) {
    Global.updateTabs = [Global.tabId];
    window.localStorage.setItem("im_wsTabs", JSON.stringify(Global.updateTabs));
    localDexie.updateInfo({
      loginState: Global.loginState,
      uid: options.data.uid,
    });
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.Online, options);
  } else {
    let key = "im_update_tabs_" + Global.tabId;
    window.localStorage.setItem(key, Global.tabId);
    window.localStorage.removeItem(key);
  }
  Global.uid = options.data.uid;
  if (msim[EVENT.LOGIN]) {
    let result = tool.resultNotice(EVENT.LOGIN, {
      code: options.data.code,
      msg: options.data.msg,
      uid: options.data.uid,
      updateTime: options.data.updateTime,
    });
    msim[EVENT.LOGIN](result);
  }
}

// 处理退出通知
function handleLogout(options) {
  Global.loginState = IM_LOGIN_STATE.NOT_LOGIN;
  if (Global.curTab) {
    localDexie.updateInfo({ loginState: Global.loginState });
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.Offline, options);
  }
  Global.clearData();
  if (msim[EVENT.LOGOUT]) {
    let result = tool.resultNotice(EVENT.LOGOUT, {
      code: options.data.code,
      msg: options.data.msg,
    });
    msim[EVENT.LOGOUT](result);
  }
}

// 处理被动错误
function handleError(options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.ErrorType, options);
  }
  Global.clearData();
  switch (options.data.code) {
    case ERROR_CODE.KICKED_OUT:
    case ERROR_CODE.NO_REGISTER:
      if (msim[EVENT.KICKED_OUT]) {
        let result = tool.resultNotice(EVENT.KICKED_OUT, options.data);
        msim[EVENT.KICKED_OUT](result);
      }
      break;
    case ERROR_CODE.TOKEN_NOT_FOUND:
      if (msim[EVENT.TOKEN_NOT_FOUND]) {
        let result = tool.resultNotice(EVENT.TOKEN_NOT_FOUND, options.data);
        msim[EVENT.TOKEN_NOT_FOUND](result);
      }
      break;
  }
}

// 处理被动消息
function handleMsg(options) {
  if (options.shift) {
    Global.msgHandleList.unshift(options);
  } else {
    Global.msgHandleList.push(options);
  }
  if (Global.handleMsgState) return;
  handleMsgStack();
}

// 处理消息队列
function handleMsgStack() {
  new Promise((resolve, reject) => {
    try {
      let curMsg = Global.msgHandleList.shift();
      let msg = curMsg.data;
      if (!msg.onlyId) {
        let uid = Global.uid === msg.fromUid ? msg.toUid : msg.fromUid;
        let conversationID = tool.splicingC2CId(uid);
        msg = tool.formatMsg(msg, conversationID);
      }
      switch (msg.type) {
        case MSG_TYPE.Recall:
          handleRevokeMsg(msg, resolve);
          break;
        case MSG_TYPE.Notification:
          handleNotificationMsg(msg, resolve);
          break;
        default:
          handleShowMsg(msg, resolve);
          break;
      }
    } catch (err) {
      reject(err);
    }
  }).finally(() => {
    if (Global.msgHandleList.length > 0) {
      handleMsgStack();
    } else {
      Global.handleMsgState = false;
    }
  });
}

// 处理撤回消息
function handleRevokeMsg(msg, resolve) {
  if (Global.curTab) {
    let msgId = parseInt(msg.text);
    localDexie
      .getMsg({
        conversationID: msg.conversationID,
        msgId: msgId,
      })
      .then((newMsg) => {
        if (newMsg) {
          newMsg.type = MSG_TYPE.Revoked;
          if (msim[EVENT.MESSAGE_REVOKED]) {
            let result = tool.resultNotice(EVENT.MESSAGE_REVOKED, [newMsg]);
            msim[EVENT.MESSAGE_REVOKED](result);
          }
          localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.ReceivedMsg, {
            type: HANDLE_TYPE.ChatR,
            data: newMsg,
          });
          localDexie.updateMsg(newMsg);
          updateChat({
            conversationID: msg.conversationID,
            msgEnd: msg.msgId,
            showMsgId: newMsg.msgId,
            showMsgTime: msg.msgTime,
            showMsgType: MSG_TYPE.Recall,
          }).finally(() => {
            resolve();
            return;
          });
        }
      });
  } else {
    if (msim[EVENT.MESSAGE_REVOKED]) {
      let result = tool.resultNotice(EVENT.MESSAGE_REVOKED, [msg]);
      msim[EVENT.MESSAGE_REVOKED](result);
    }
  }
  resolve();
}

// 处理通知消息
function handleNotificationMsg(msg, resolve) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.NotificationMsg, {
      type: HANDLE_TYPE.ChatR,
      data: msg,
    });
  }
  if (msim[EVENT.MESSAGE_NOTIFICATION]) {
    let result = tool.resultNotice(EVENT.MESSAGE_NOTIFICATION, msg);
    msim[EVENT.MESSAGE_NOTIFICATION](result);
  }
  resolve();
}

// 处理需要显示的消息
function handleShowMsg(msg, resolve) {
  let newMsg = msg;
  if (msim[EVENT.MESSAGE_RECEIVED]) {
    let result = tool.resultNotice(EVENT.MESSAGE_RECEIVED, [newMsg]);
    msim[EVENT.MESSAGE_RECEIVED](result);
  }
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.ReceivedMsg, {
      type: HANDLE_TYPE.ChatR,
      data: newMsg,
    });
    localDexie.addMsg(newMsg);
    // TODO 根据type返回，目前只有text返回，其他暂定
    let showMsg;
    if (newMsg.type === MSG_TYPE.Text) {
      showMsg = newMsg.text;
    } else {
      showMsg = newMsg.content;
    }

    let updataChatObj = {
      conversationID: newMsg.conversationID,
      msgEnd: newMsg.msgId,
      showMsgId: newMsg.msgId,
      showMsgType: newMsg.type,
      showMsg: showMsg,
      showMsgTime: newMsg.msgTime,
      myMove: newMsg.fromUid !== Global.uid,
      showMsgFromUid: newMsg.fromUid,
    };
    if (newMsg.fromUid !== Global.uid) {
      updataChatObj.unread = 1;
    }

    // 目前只有文本，图片，音视频类型的消息，0 - 30才修改uChatI,iChatU;
    if (newMsg.type >= 0 && newMsg.type <= 30) {
      if (newMsg.fromUid !== Global.uid) {
        updataChatObj.uChatI = true;
      } else {
        updataChatObj.iChatU = true;
      }
    }
    updateChat(updataChatObj).finally(() => {
      resolve();
    });
  } else {
    resolve();
  }
}

// 更新会话
function updateChat(updateChat) {
  return new Promise(async (resolve, reject) => {
    let conversationID =
      updateChat.conversationID || tool.splicingC2CId(updateChat.uid);
    let oldChat = updateChat;
    if (Global.curTab) {
      await getConversationProvider(Global, { conversationID }).then(
        ({ data }) => {
          oldChat = data;
        }
      );
    }
    let newChat;
    if (updateChat.event) {
      newChat = handleServerUpdate(updateChat, oldChat);
    } else {
      // 如果更新时间低于当前会话的时间则不更新
      if (updateChat.showMsgTime < oldChat.showMsgTime) return;
      newChat = handleNewMsgUpdate(updateChat, oldChat);
    }
    updateChatNotice(newChat, resolve);
  });
}

// 处理接收到新消息时更新会话
function handleNewMsgUpdate(updateChat, oldChat) {
  let newChat = { ...oldChat };
  // 如果更新会话时,消息时间大于所有会话标记时间
  if (updateChat.showMsgTime > Global.updateTime) {
    Global.updateTime = updateChat.showMsgTime;
  }
  if (Global.curTab) {
    switch (updateChat.showMsgType) {
      case MSG_TYPE.Recall:
        if (updateChat.showMsgId === newChat.showMsgId) {
          // 撤回的是最后一条消息
          newChat.msgEnd = updateChat.msgEnd;
          newChat.showMsgType = MSG_TYPE.Revoked;
          newChat.showMsg = "";
        } else if (newChat.msgEnd < updateChat.msgEnd) {
          // 撤回的不是最后一条消息
          newChat.msgEnd = updateChat.msgEnd;
        }
        break;
      default:
        if (updateChat.unread && updateChat.msgEnd > newChat.msgEnd) {
          updateChat.unread = (newChat.unread || 0) + updateChat.unread;
        }
        Object.assign(newChat, updateChat);
        newChat.showTime = parseInt(newChat.showMsgTime / 1000);
        newChat.deleted = false;
        break;
    }
  }
  return newChat;
}

// 处理服务器下发的更新会话
function handleServerUpdate(options, chat) {
  let newChat = { ...chat };
  switch (options.event) {
    case CHAT_UPDATE_EVENT.MsgLastRead:
      newChat.msgLastRead = options.msgLastRead;
      break;
    case CHAT_UPDATE_EVENT.Unread:
      newChat.unread = options.unread;
      break;
    case CHAT_UPDATE_EVENT.IBlockU:
      // TODO 暂未实现拉黑
      newChat.iBlockU = options.iBlockU;
      break;
    case CHAT_UPDATE_EVENT.Deleted:
      if (options.deleted) {
        newChat.deleted = options.deleted;
        if (Global.chatKeys.hasOwnProperty(chat.conversationID)) {
          delete Global.chatKeys[chat.conversationID];
          Global.chatList = Global.chatList.filter(
            (chatItem) => chatItem.conversationID != chat.conversationID
          );
        }
      }
      break;
  }
  // 如果更新会话时,更新会话时间大于所有会话标记时间
  if (options.updateTime > Global.updateTime) {
    Global.updateTime = options.updateTime;
  }
  return newChat;
}

// 更新会话通知
function updateChatNotice(newChat, resolve) {
  if (Global.chatKeys.hasOwnProperty(newChat.conversationID)) {
    let oldChat = Global.chatKeys[newChat.conversationID];
    Object.assign(oldChat, newChat);
  } else if (newChat.deleted !== true) {
    Global.chatKeys[newChat.conversationID] = newChat;
    Global.chatList.unshift(newChat);
  }
  if (msim[EVENT.CONVERSATION_LIST_UPDATED]) {
    let result = tool.resultNotice(EVENT.CONVERSATION_LIST_UPDATED, [newChat]);
    msim[EVENT.CONVERSATION_LIST_UPDATED](result);
  }
  if (Global.curTab) {
    localDexie
      .updateChat(newChat)
      .then(() => {
        localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.UpdateChat, {
          type: HANDLE_TYPE.ChatItemUpdate,
          curTabId: Global.tabId,
          data: newChat,
        });
        resolve();
      })
      .catch((err) => {
        resolve();
      });
  } else {
    resolve();
  }
}

export default handleMessage;
