import tool from "./tool";
import localData from "./localData";
import {
  PID,
  EVENT,
  MSG_TYPE,
  SYNC_CHAT,
  ERROR_CODE,
  HANDLE_TYPE,
  IM_LOGIN_STATE,
  CHAT_UPDATE_EVENT,
  LOCAL_MESSAGE_TYPE,
  LOCAL_STORAGE_KEYS,
} from "./sdkTypes";
import localNotice from "./localNotice";
import proFormat from "./proFormat";
import { sendWsMsg } from "./ws";
import { getConversationProvider } from "./sdkChats";
// TODO Demo 相关 打包屏蔽
import {
  handleProfileUpdate,
  handleUsrOffline,
  handleUsrOnline,
} from "./demo/demoHandle";

let Global, msim;

// 处理消息
function handleMessage(GlobalObj, msimObj, options) {
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
    // TODO Demo 相关 打包屏蔽
    case HANDLE_TYPE.DemoUpdateProfile:
      handleProfileUpdate(GlobalObj, msimObj, options);
      break;
    case HANDLE_TYPE.DemoUsrOffline:
      handleUsrOffline(GlobalObj, msimObj, options);
      break;
    case HANDLE_TYPE.DemoUsrOnline:
      handleUsrOnline(GlobalObj, msimObj, options);
      break;
  }
}

// 处理同步消息成功
function handleSyncMsgs(options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.SyncMsgs, options);
  }
  if (options.isDeleteMsgsHistory) {
    localData.deleteMsgs(Global, options.conversationID);
  }
  if (options.msgList.length > 0) {
    localData.addMsgList(Global, options.conversationID, options.msgList);
    if (msim[EVENT.MESSAGE_RECEIVED]) {
      let msgList = tool.resultNotice(EVENT.MESSAGE_RECEIVED, options.msgList);
      msim[EVENT.MESSAGE_RECEIVED](msgList);
    }
  }
  if (options.deleteMsgIds.length > 0) {
    localData.deleteMsgs(Global, options.conversationID, options.deleteMsgIds);
    if (msim[EVENT.MESSAGE_DELETE]) {
      let deleteList = tool.resultNotice(EVENT.MESSAGE_DELETE, {
        conversationID: options.conversationID,
        msgIds: options.deleteMsgIds,
      });
      msim[EVENT.MESSAGE_DELETE](deleteList);
    }
  }
  if (options.revokeList.length > 0 && msim[EVENT.MESSAGE_REVOKED]) {
    localData.updateMsgs(Global, options.conversationID, options.revokeList);
    if (msim[EVENT.MESSAGE_REVOKED]) {
      let revokeList = tool.resultNotice(
        EVENT.MESSAGE_REVOKED,
        options.revokeList
      );
      msim[EVENT.MESSAGE_REVOKED](revokeList);
    }
  }
}

// 处理同步会话状态变更
function handleChatChange(options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.SyncChatsChange, options);
  } else if (options.state === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
    options.chats.forEach((chat) => {
      if (chat.delete) {
        Global.chatKeys.delete(chat.conversationID);
      } else {
        Global.chatKeys.set(chat.conversationID, chat);
      }
    });
  }

  if (options.state !== SYNC_CHAT.SYNC_CHAT_START) {
    // 处理同步期间收到的会话列表回调
    Global.chatCallEvents.forEach((callEvent, key) => {
      if (options.state === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
        callEvent.callSuc();
      } else if (options.state === SYNC_CHAT.SYNC_CHAT_FAILED) {
        callEvent.callErr(options.err);
      }
    });
    // 增量同步
    if (Global.sdkState.chatsSync === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
      if (msim[EVENT.CONVERSATION_LIST_UPDATED] && options.chats?.length > 0) {
        let result = tool.resultNotice(
          EVENT.CONVERSATION_LIST_UPDATED,
          options.chats
        );
        msim[EVENT.CONVERSATION_LIST_UPDATED](result);
      }
    } else {
      // 初次同步
      Global.sdkState.chatsSync = SYNC_CHAT.SYNC_CHAT_SUCCESS;
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
  Global.sdkState.connState = options.state;
  if (Global.curTab) {
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
  Object.assign(Global.sdkState, options.data);
  if (Global.curTab) {
    Global.updateTabs = [Global.tabId];
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.WsTabs,
      JSON.stringify(Global.updateTabs)
    );
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.Online, options);
  } else {
    let key = LOCAL_STORAGE_KEYS.UpdateTabs + Global.tabId;
    window.localStorage.setItem(key, Global.tabId);
    window.localStorage.removeItem(key);
  }
  if (msim[EVENT.LOGIN]) {
    let result = tool.resultNotice(EVENT.LOGIN, {
      code: ERROR_CODE.SUCCESS,
      loginState: options.data.loginState,
      uid: options.data.uid,
    });
    msim[EVENT.LOGIN](result);
  }
}

// 处理退出通知
function handleLogout(options) {
  if (Global.curTab && Global.sdkState.loginState === IM_LOGIN_STATE.LOGGED) {
    let callSign = tool.createSign();
    let msg = proFormat.logoutPro(callSign);
    sendWsMsg(msg, PID.ImLogout);
  }
  Global.clearData();
  if (options.data.isBroadcast) {
    options.data.isBroadcast = false;
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.Offline, options);
  }
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
    case ERROR_CODE.SUBAPP_NOT_EXIST:
      if (msim[EVENT.KICKED_OUT]) {
        let result = tool.resultNotice(EVENT.KICKED_OUT, options.data);
        msim[EVENT.KICKED_OUT](result);
      }
      break;
    case ERROR_CODE.TOKEN_NOT_FOUND:
      if (msim[EVENT.TOKEN_NOT_FOUND]) {
        let result = tool.resultNotice(
          EVENT.TOKEN_NOT_FOUND,
          options.data?.msg,
          options.data.code
        );
        msim[EVENT.TOKEN_NOT_FOUND](result);
      }
      break;
    default:
      if (msim[EVENT.LOGIN_FAILED]) {
        let result = tool.resultNotice(EVENT.LOGIN_FAILED, options.data);
        msim[EVENT.LOGIN_FAILED](result);
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
        let uid = Global.sdkState.uid === msg.fromUid ? msg.toUid : msg.fromUid;
        let conversationID = tool.splicingC2CId(uid);
        msg = tool.formatMsg(msg, conversationID);
      }
      if (msg.type === MSG_TYPE.Notification) {
        // 处理通知消息
        handleNotificationMsg(msg, resolve);
      } else if (msg.type >= 64 && msg.type <= 99) {
        // 处理指令消息
        instructMsg(msg, resolve);
      } else {
        // 处理显示消息
        handleShowMsg(msg, resolve);
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

// 处理指令消息
function instructMsg(msg, resolve) {
  switch (msg.type) {
    case MSG_TYPE.Recall:
      handleRevokeMsg(msg, resolve);
      break;
    case MSG_TYPE.Unmatch:
      handleUnmatchMsg(msg, resolve);
      break;
    case MSG_TYPE.SysDelete:
      handleSysDeleteMsg(msg, resolve);
      break;
    case MSG_TYPE.ClickView:
      handleFlashMsg(msg, resolve);
      break;
  }
}

// 处理撤回指令
function handleRevokeMsg(msg, resolve) {
  let newMsg = {
    conversationID: msg.conversationID,
    msgId: parseInt(msg.text),
    type: MSG_TYPE.Revoked,
  };
  localData.updateMsgs(Global, msg.conversationID, [newMsg]);
  if (msim[EVENT.MESSAGE_REVOKED]) {
    let result = tool.resultNotice(EVENT.MESSAGE_REVOKED, [newMsg]);
    msim[EVENT.MESSAGE_REVOKED](result);
  }
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.ReceivedMsg, {
      type: HANDLE_TYPE.ChatR,
      data: msg,
    });
    updateChat({
      conversationID: msg.conversationID,
      msgEnd: msg.msgId,
      showMsgType: MSG_TYPE.Recall,
      customContent: newMsg.msgId,
      updateTime: msg.msgTime,
    });
  }
  resolve();
}

// 处理取消匹配消息
function handleUnmatchMsg(msg, resolve) {
  if (Global.chatKeys.has(msg.conversationID)) {
    if (Global.curTab) {
      localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.ReceivedMsg, {
        type: HANDLE_TYPE.ChatR,
        data: msg,
      });
    }
    updateChat({
      conversationID: msg.conversationID,
      showMsgType: MSG_TYPE.Unmatch,
      msgEnd: msg.msgId,
      updateTime: msg.msgTime,
    });
    resolve();
  }
}

// 处理删除指令
function handleSysDeleteMsg(msg, resolve) {
  if (Global.curTab) {
    let msgIds = msg.content.split(",").map(Number);
    msg.content = msgIds;
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.DeleteMsg, {
      type: HANDLE_TYPE.ChatR,
      data: msg,
    });
    updateChat({
      conversationID: msg.conversationID,
      showMsgType: MSG_TYPE.Deleted,
      msgEnd: msg.msgId,
      customContent: msg.content,
      updateTime: msg.msgTime,
    });
  }
  localData.deleteMsgs(Global, msg.conversationID, msg.content);
  if (msim[EVENT.MESSAGE_DELETE]) {
    let result = tool.resultNotice(EVENT.MESSAGE_DELETE, {
      conversationID: msg.conversationID,
      msgIds: msg.content,
    });
    msim[EVENT.MESSAGE_DELETE](result);
  }
  resolve();
}

// 处理闪照查看指令
function handleFlashMsg(msg, resolve) {
  let newMsg = {
    conversationID: msg.conversationID,
    msgId: parseInt(msg.text),
    type: MSG_TYPE.ClickView,
    fromUid: msg.fromUid,
  };
  localData.updateFlashMsg(Global, newMsg);
  if (msim[EVENT.MESSAGE_READ]) {
    let result = tool.resultNotice(EVENT.MESSAGE_READ, [newMsg]);
    msim[EVENT.MESSAGE_READ](result);
  }
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.ReadMsg, {
      type: HANDLE_TYPE.ChatR,
      data: msg,
    });
    updateChat({
      conversationID: msg.conversationID,
      showMsgType: MSG_TYPE.ClickView,
      msgEnd: msg.msgId,
      updateTime: msg.msgTime,
    });
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
    updateChat({
      conversationID: msg.conversationID,
      showMsgType: MSG_TYPE.Notification,
      msgEnd: msg.msgId,
      updateTime: msg.msgTime,
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
  localData.addMsgList(Global, newMsg.conversationID, [newMsg]);
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.ReceivedMsg, {
      type: HANDLE_TYPE.ChatR,
      data: newMsg,
    });
    // 根据type返回，text返回body，业务自定义消息由发送方进行透传
    let showMsg;
    if (newMsg.type === MSG_TYPE.Text) {
      showMsg = newMsg.text;
    } else {
      showMsg = newMsg.content;
    }
    let uid = Global.sdkState.uid;
    let updataChatObj = {
      conversationID: newMsg.conversationID,
      msgEnd: newMsg.msgId,
      showMsgId: newMsg.msgId,
      showMsgType: newMsg.type,
      showMsg: showMsg,
      showMsgTime: newMsg.msgTime,
      myMove: newMsg.fromUid !== uid,
      showMsgFromUid: newMsg.fromUid,
    };
    if (newMsg.fromUid !== uid) {
      updataChatObj.unread = 1;
    }

    // 如果收到33
    if (newMsg.type === MSG_TYPE.Matched) {
      updataChatObj.matched = true;
    }
    if (newMsg.type >= 0 && newMsg.type <= 30) {
      // 目前只有0 - 30,243,247才修改uChatI,iChatU;
      // TODO 243 247
      if (newMsg.fromUid !== uid) {
        updataChatObj.uChatI = true;
      } else {
        updataChatObj.iChatU = true;
      }
    }
    updateChat(updataChatObj);
    resolve();
  } else {
    resolve();
  }
}

// 更新会话
async function updateChat(updateChat) {
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
  if (updateChat.event) {
    handleServerUpdate(updateChat, oldChat);
  } else {
    handleNewMsgUpdate(updateChat, oldChat);
  }
}

// 处理接收到新消息时更新会话
function handleNewMsgUpdate(updateChat, oldChat) {
  // 如果更新时间低于当前会话的时间则不更新
  if (updateChat.msgEnd < oldChat.msgEnd) return;
  let newChat = { ...oldChat };
  // 如果更新会话时,消息时间大于所有会话标记时间
  if ((updateChat.updateTime || updateChat.showMsgTime) > Global.updateTime) {
    Global.updateTime = updateChat.updateTime || updateChat.showMsgTime;
  }
  let isUpdateNotice = true;
  if (updateChat.msgEnd < newChat.msgEnd) {
    updateChat.msgEnd = newChat.msgEnd;
  }
  if (Global.curTab) {
    switch (updateChat.showMsgType) {
      case MSG_TYPE.Recall:
        newChat.msgEnd = updateChat.msgEnd;
        if (updateChat.customContent === newChat.showMsgId) {
          // 撤回的是最后一条消息
          newChat.showMsgType = MSG_TYPE.Revoked;
          newChat.showMsg = "";
        } else {
          isUpdateNotice = false;
        }
        break;
      case MSG_TYPE.ClickView:
        newChat.msgEnd = updateChat.msgEnd;
        isUpdateNotice = false;
        break;
      case MSG_TYPE.Deleted:
        newChat.msgEnd = updateChat.msgEnd;
        if (updateChat.customContent.includes(newChat.showMsgId)) {
          // 撤回的是最后一条消息
          newChat.showMsgType = MSG_TYPE.Deleted;
          newChat.showMsg = "";
        } else {
          isUpdateNotice = false;
        }
        break;
      case MSG_TYPE.Unmatch:
        newChat.msgEnd = updateChat.msgEnd;
        newChat.matched = false;
        isUpdateNotice = false;
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
  isUpdateNotice && updateChatNotice(newChat);
}

// 处理服务器下发的更新会话
function handleServerUpdate(options, chat) {
  let newChat = { ...chat };
  // 如果更新会话时,更新会话时间大于所有会话标记时间
  if (options.updateTime > Global.updateTime) {
    Global.updateTime = options.updateTime;
  }
  let isNotice = true;
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
      isNotice = false;
      break;
    case CHAT_UPDATE_EVENT.Deleted:
      if (options.deleted) {
        newChat.deleted = options.deleted;
        if (Global.chatKeys.has(chat.conversationID)) {
          Global.chatKeys.delete(chat.conversationID);
        }
      }
      break;
  }
  isNotice && updateChatNotice(newChat);
}

// 更新会话通知
function updateChatNotice(newChat) {
  if (Global.chatKeys.has(newChat.conversationID)) {
    let oldChat = Global.chatKeys.get(newChat.conversationID);
    Object.assign(oldChat, newChat);
  } else if (newChat.deleted !== true) {
    Global.chatKeys.set(newChat.conversationID, newChat);
  }
  if (msim[EVENT.CONVERSATION_LIST_UPDATED]) {
    let result = tool.resultNotice(EVENT.CONVERSATION_LIST_UPDATED, [newChat]);
    msim[EVENT.CONVERSATION_LIST_UPDATED](result);
  }
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.UpdateChat, {
      type: HANDLE_TYPE.ChatItemUpdate,
      data: newChat,
    });
  }
}

export default handleMessage;
