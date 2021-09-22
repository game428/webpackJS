import tool from "./tool";
import declare from "./declare";
import proFormat from "./proFormat";
import { sendWsMsg } from "./ws";
import localNotice from "./localNotice";
import localDexie from "./dexieDB";

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
    case declare.HANDLE_TYPE.WsStateChange:
      handleWsChange(options);
      break;
    case declare.HANDLE_TYPE.SyncChatsChange:
      handleChatChange(options);
      break;
    case declare.HANDLE_TYPE.SyncMsgs:
      handleSyncMsgs(options);
      break;
    case declare.HANDLE_TYPE.ImLogin:
      handleLogin(options);
      break;
    case declare.HANDLE_TYPE.ImLogout:
      handleLogout(options);
      break;
    case declare.HANDLE_TYPE.ChatItemUpdate:
      updateChat(options.data);
      break;
    case declare.HANDLE_TYPE.ResultError:
      handleError(options);
      break;
    case declare.HANDLE_TYPE.ChatR:
      handleMsg(options);
      break;
  }
}

// 处理同步消息成功
function handleSyncMsgs(options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(declare.LOCAL_MESSAGE_TYPE.SyncMsgs, options);
  }
  if (options.msgList.length > 0 && msim[declare.EVENT.MESSAGE_RECEIVED]) {
    let result = tool.resultNotice(
      declare.EVENT.MESSAGE_RECEIVED,
      options.msgList
    );
    msim[declare.EVENT.MESSAGE_RECEIVED](result);
  }
  if (options.revokeList.length > 0 && msim[declare.EVENT.MESSAGE_REVOKED]) {
    let result = tool.resultNotice(
      declare.EVENT.MESSAGE_REVOKED,
      options.revokeList
    );
    msim[declare.EVENT.MESSAGE_REVOKED](result);
  }
}

// 处理同步会话状态变更
function handleChatChange(options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(
      declare.LOCAL_MESSAGE_TYPE.SyncChatsChange,
      options
    );
  } else if (options.state === declare.SYNC_CHAT.SyncChatSuccess) {
    options.chats.forEach((chat) => {
      if (
        Object.prototype.hasOwnProperty.call(
          Global.chatKeys,
          chat.conversationID
        )
      ) {
        let oldChat = Global.chatKeys[chat.conversationID];
        Object.assign(oldChat, chat);
      } else {
        Global.chatKeys[chat.conversationID] = chat;
        Global.chatList.push(chat);
      }
    });
  }

  if (options.state !== declare.SYNC_CHAT.SyncChatStart) {
    // 处理同步期间收到的会话列表回调
    for (let key in Global.chatCallEvents) {
      if (options.state === declare.SYNC_CHAT.SyncChatSuccess) {
        Global.chatCallEvents[key].callSuc();
      } else if (options.state === declare.SYNC_CHAT.SyncChatFailed) {
        Global.chatCallEvents[key].callErr();
      }
    }
    // 增量同步
    if (Global.chatsSync === declare.SYNC_CHAT.SyncChatSuccess) {
      if (msim[declare.EVENT.CONVERSATION_LIST_UPDATED]) {
        let result = tool.resultNotice(
          declare.EVENT.CONVERSATION_LIST_UPDATED,
          options.chats
        );
        msim[declare.EVENT.CONVERSATION_LIST_UPDATED](result);
      }
    } else {
      // 初次同步
      Global.chatsSync = options.state;
      localDexie.updateInfo({ chatsSync: options.state });
    }
  }

  if (msim[declare.EVENT.SYNC_CHATS_CHANGE]) {
    let result = tool.resultNotice(declare.EVENT.SYNC_CHATS_CHANGE, {
      state: options.state,
    });
    msim[declare.EVENT.SYNC_CHATS_CHANGE](result);
  }
}

// 处理网络状态变更
function handleWsChange(options) {
  Global.connState = options.state;
  if (Global.curTab) {
    localDexie.updateInfo({ connState: options.state });
    localNotice.onMessageNotice(
      declare.LOCAL_MESSAGE_TYPE.WsStateChange,
      options
    );
  }
  if (msim[declare.EVENT.CONNECT_CHANGE]) {
    let result = tool.resultNotice(declare.EVENT.CONNECT_CHANGE, {
      state: options.state,
    });
    msim[declare.EVENT.CONNECT_CHANGE](result);
  }
}

// 处理登录通知
function handleLogin(options) {
  Global.loginState = declare.IM_LOGIN_STATE.Logged;
  if (Global.curTab) {
    Global.updateTabs = [Global.tabId];
    window.localStorage.setItem("im_wsTabs", JSON.stringify(Global.updateTabs));
    localDexie.updateInfo({
      loginState: declare.IM_LOGIN_STATE.Logged,
      uid: options.data.uid,
    });
    localNotice.onMessageNotice(declare.LOCAL_MESSAGE_TYPE.Online, options);
  } else {
    let key = "im_update_tabs_" + Global.tabId;
    window.localStorage.setItem(key, Global.tabId);
    window.localStorage.removeItem(key);
  }
  Global.uid = options.data.uid;
  if (msim[declare.EVENT.LOGIN]) {
    let result = tool.resultNotice(declare.EVENT.LOGIN, {
      code: options.data.code,
      msg: options.data.msg,
      uid: options.data.uid,
      updateTime: options.data.updateTime,
    });
    msim[declare.EVENT.LOGIN](result);
  }
}

// 处理退出通知
function handleLogout(options) {
  Global.loginState = declare.IM_LOGIN_STATE.NotLogin;
  if (Global.curTab) {
    localDexie.updateInfo({ loginState: declare.IM_LOGIN_STATE.NotLogin });
    localNotice.onMessageNotice(declare.LOCAL_MESSAGE_TYPE.Offline, options);
  }
  Global.clearData();
  if (msim[declare.EVENT.LOGOUT]) {
    let result = tool.resultNotice(declare.EVENT.LOGOUT, {
      code: options.data.code,
      msg: options.data.msg,
    });
    msim[declare.EVENT.LOGOUT](result);
  }
}

// 处理被动错误
function handleError(options) {
  if (Global.curTab) {
    localDexie.updateInfo({ loginState: declare.IM_LOGIN_STATE.NotLogin });
    localNotice.onMessageNotice(declare.LOCAL_MESSAGE_TYPE.ErrorType, options);
  }
  switch (options.data.code) {
    case declare.ERROR_CODE.KICKED_OUT:
      Global.loginState = declare.IM_LOGIN_STATE.NotLogin;
      Global.clearData();
      if (msim[declare.EVENT.KICKED_OUT]) {
        let result = tool.resultNotice(declare.EVENT.KICKED_OUT, options.data);
        msim[declare.EVENT.KICKED_OUT](result);
      }
      break;
    case declare.ERROR_CODE.TOKEN_NOT_FOUND:
      Global.loginState = declare.IM_LOGIN_STATE.NotLogin;
      Global.clearData();
      if (msim[declare.EVENT.TOKEN_NOT_FOUND]) {
        let result = tool.resultNotice(
          declare.EVENT.TOKEN_NOT_FOUND,
          options.data
        );
        msim[declare.EVENT.TOKEN_NOT_FOUND](result);
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

// TODO 指令消息，如果会话已经被删除则不通知
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
      if (tool.isSo(msg.type)) {
        handleShowMsg(msg, resolve);
      } else {
        handleDirectivesMsg(msg, resolve);
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
function handleDirectivesMsg(msg, resolve) {
  getChat(msg.conversationID).then((chatInfo) => {
    switch (msg.type) {
      case declare.MSG_TYPE.Revoke:
        handleRevokeMsg(msg, resolve, chatInfo);
        break;
      default:
        handleOtherDirectivesMsg(msg, resolve, chatInfo);
        break;
    }
  });
}

// TODO 返回修改好后的消息体
// 处理撤回消息
function handleRevokeMsg(msg, resolve, chatInfo) {
  if (Global.curTab) {
    let msgId = parseInt(msg.body);
    localDexie
      .getMsg({
        conversationID: msg.conversationID,
        msgId: msgId,
      })
      .then((newMsg) => {
        if (newMsg) {
          newMsg.type = declare.MSG_TYPE.Revoked;
          if (
            chatInfo?.deleted !== true &&
            msim[declare.EVENT.MESSAGE_REVOKED]
          ) {
            let result = tool.resultNotice(declare.EVENT.MESSAGE_REVOKED, [
              newMsg,
            ]);
            msim[declare.EVENT.MESSAGE_REVOKED](result);
          }
          if (Global.curTab) {
            localNotice.onMessageNotice(
              declare.LOCAL_MESSAGE_TYPE.ReceivedMsg,
              {
                type: declare.HANDLE_TYPE.ChatR,
                data: newMsg,
              }
            );
            localDexie.updateMsg(newMsg);
            updateChat({
              conversationID: msg.conversationID,
              msgEnd: msg.msgId,
              showMsgId: newMsg.msgId,
              showMsgTime: msg.msgTime,
              showMsgType: declare.MSG_TYPE.Revoke,
            }).finally(() => {
              resolve();
              return;
            });
          }
        }
      });
  } else {
    if (chatInfo?.deleted !== true && msim[declare.EVENT.MESSAGE_REVOKED]) {
      let result = tool.resultNotice(declare.EVENT.MESSAGE_REVOKED, [msg]);
      msim[declare.EVENT.MESSAGE_REVOKED](result);
    }
  }
  resolve();
}

// 处理其他指令消息
function handleOtherDirectivesMsg(msg, resolve, chatInfo) {
  if (Global.curTab) {
    localNotice.onMessageNotice(declare.LOCAL_MESSAGE_TYPE.ReceivedMsg, {
      type: declare.HANDLE_TYPE.ChatR,
      data: msg,
    });
  }
  if (chatInfo?.deleted !== true && msim[declare.EVENT.MESSAGE_RECEIVED]) {
    let result = tool.resultNotice(declare.EVENT.MESSAGE_RECEIVED, [msg]);
    msim[declare.EVENT.MESSAGE_RECEIVED](result);
  }
  resolve();
}

// 处理需要显示的消息
function handleShowMsg(msg, resolve) {
  let newMsg = msg;
  if (msim[declare.EVENT.MESSAGE_RECEIVED]) {
    let result = tool.resultNotice(declare.EVENT.MESSAGE_RECEIVED, [newMsg]);
    msim[declare.EVENT.MESSAGE_RECEIVED](result);
  }
  if (Global.curTab) {
    localNotice.onMessageNotice(declare.LOCAL_MESSAGE_TYPE.ReceivedMsg, {
      type: declare.HANDLE_TYPE.ChatR,
      data: newMsg,
    });
    localDexie.addMsg(newMsg);
    let showMsg;
    if (newMsg.type === declare.MSG_TYPE.Text) {
      showMsg = newMsg.text;
    } else if (newMsg.type === declare.MSG_TYPE.Img) {
      showMsg = newMsg.url;
    } else {
      showMsg = newMsg.content;
    }
    let updataChatObj = {
      conversationID: msg.conversationID,
      msgEnd: newMsg.msgId,
      showMsgId: newMsg.msgId,
      showMsgType: newMsg.type,
      showMsg: showMsg,
      showMsgTime: newMsg.msgTime,
    };
    if (newMsg.fromUid !== Global.uid && Global.curTab) {
      updataChatObj.addUnread = 1;
    }
    updateChat(updataChatObj).finally(() => {
      resolve();
    });
  } else {
    resolve();
  }
}

// 更新会话
function updateChat(options) {
  return new Promise((resolve, reject) => {
    let conversationID =
      options.conversationID || tool.splicingC2CId(options.uid);
    if (Global.curTab) {
      getChat(conversationID).then((chat) => {
        if (options.event) {
          handleServerUpdate(options, chat, conversationID);
        } else {
          // 如果更新时间低于当前会话的时间则不更新
          if (options.showMsgTime < chat.showMsgTime) return;
          handleNewMsgUpdate(options, chat, conversationID);
          if (chat.deleted) {
            localDexie.updateChat(chat);
            return;
          }
        }
        updateChatNotice(chat, resolve);
      });
    } else {
      if (options.event) {
        handleServerUpdate(options, options, conversationID);
      } else {
        if (
          Object.prototype.hasOwnProperty.call(Global.chatKeys, conversationID)
        ) {
          let newChat = Global.chatKeys[conversationID];
          Object.assign(newChat, options);
        } else if (options.deleted !== true) {
          Global.chatKeys[conversationID] = options;
          Global.chatList.unshift(options);
        }
      }
      updateChatNotice(options, resolve);
    }
  });
}

// 处理接收到新消息时更新会话
function handleNewMsgUpdate(options, chat, conversationID) {
  // 如果更新会话时,消息时间大于所有会话标记时间
  if (options.showMsgTime > Global.updateTime) {
    Global.updateTime = options.showMsgTime;
  }
  if (tool.isSo(options.showMsgType)) {
    if (options.addUnread && options.msgEnd > chat.msgEnd) {
      options.unread = (chat.unread || 0) + options.addUnread;
    }
    Object.assign(chat, options);
    chat.showTime = parseInt(chat.showMsgTime / 1000);
    if (chat.deleted) {
      chat.deleted = false;
      Global.chatKeys[conversationID] = chat;
      Global.chatList.unshift(chat);
    }
  } else {
    // 如果是撤回消息
    if (options.showMsgType === declare.MSG_TYPE.Revoke) {
      if (options.showMsgId === chat.showMsgId) {
        // 撤回的是最后一条消息
        chat.msgEnd = options.msgEnd;
        chat.showMsgType = declare.MSG_TYPE.Revoked;
        chat.showMsg = "";
      } else if (chat.msgEnd < options.msgEnd) {
        // 撤回的不是最后一条消息
        chat.msgEnd = options.msgEnd;
      }
    }
  }
}

// 处理服务器下发的更新会话
function handleServerUpdate(options, chat, conversationID) {
  switch (options.event) {
    case declare.CHAT_UPDATE_EVENT.MsgLastRead:
      chat.msgLastRead = options.msgLastRead;
      break;
    case declare.CHAT_UPDATE_EVENT.Unread:
      chat.unread = options.unread;
      break;
    case declare.CHAT_UPDATE_EVENT.IBlockU:
      // TODO 暂未实现拉黑
      chat.iBlockU = options.iBlockU;
      break;
    case declare.CHAT_UPDATE_EVENT.Deleted:
      if (options.deleted) {
        chat.deleted = options.deleted;
        if (
          Object.prototype.hasOwnProperty.call(Global.chatKeys, conversationID)
        ) {
          delete Global.chatKeys[conversationID];
          Global.chatList = Global.chatList.filter(
            (chatItem) => chatItem.conversationID != conversationID
          );
        }
      }
      break;
  }
  // 如果更新会话时,更新会话时间大于所有会话标记时间
  if (options.updateTime > Global.updateTime) {
    Global.updateTime = options.updateTime;
  }
}

// 查询会话
function getChat(conversationID) {
  return new Promise((resolve, reject) => {
    try {
      if (
        Object.prototype.hasOwnProperty.call(Global.chatKeys, conversationID)
      ) {
        let newChat = Global.chatKeys[conversationID];
        resolve(newChat);
      } else {
        localDexie.getChat(conversationID).then((chat) => {
          if (chat) {
            let newChat = chat;
            resolve(newChat);
          } else {
            let callSign = tool.createSign();
            tool.createCallEvent(Global, {
              type: "updateChat",
              callSign: callSign,
              callSuc: (res) => {
                if (res.data) {
                  let newChat = res.data;
                  newChat.showTime = parseInt(newChat.showMsgTime / 1000);
                  newChat.conversationID = tool.splicingC2CId(newChat.uid);
                  localDexie.updateChat(newChat);
                  if (newChat.deleted !== true) {
                    Global.chatKeys[conversationID] = newChat;
                    Global.chatList.unshift(newChat);
                  }
                  resolve(newChat);
                }
              },
              callErr: (err) => {
                let errResult = tool.serverErr(err, "updateChat");
                reject(errResult);
              },
            });
            let uid = tool.reformatC2CId(conversationID);
            let msg = proFormat.chatPro(callSign, uid);
            sendWsMsg(msg, declare.PID.GetChat);
          }
        });
      }
    } catch (err) {
      let errResult = tool.serverErr(err, "updateChat");
      reject(err);
    }
  });
}

// 更新会话通知
function updateChatNotice(newChat, resolve) {
  if (msim[declare.EVENT.CONVERSATION_LIST_UPDATED]) {
    let result = tool.resultNotice(declare.EVENT.CONVERSATION_LIST_UPDATED, [
      newChat,
    ]);
    msim[declare.EVENT.CONVERSATION_LIST_UPDATED](result);
  }
  if (Global.curTab) {
    localDexie
      .updateChat(newChat)
      .then(() => {
        localNotice.onMessageNotice(declare.LOCAL_MESSAGE_TYPE.UpdateChat, {
          type: declare.HANDLE_TYPE.ChatItemUpdate,
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
