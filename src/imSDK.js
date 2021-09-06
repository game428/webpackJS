import declare from "./declare.js";
import localWs from "./ws.js";
import localNotice from "./localNotice.js";
import tool from "./tool.js";
import localDexie from "./dexieDB.js";
import handleMessage from "./sdkHandleMsg";
import { login, logout } from "./sdkLogin";
import { getConversationList, deleteConversation } from "./sdkChats";
import {
  getMessageList,
  setMessageRead,
  sendMessage,
  resendMessage,
  revokeMessage,
  createTextMessage,
  createImageMessage,
  createCustomMessage,
} from "./sdkMessages";
import { getCosKey } from "./sdkUnits";

/**
 *
 */
const TYPES = tool.readProxy({
  WS_STATE: tool.readProxy(declare.WS_STATE),
  SYNC_CHAT: tool.readProxy(declare.SYNC_CHAT),
  SEND_STATE: tool.readProxy(declare.SEND_STATE),
  ERROR_CODE: tool.readProxy(declare.ERROR_CODE),
  MSG_TYPE: tool.readProxy(declare.MSG_TYPE),
  IM_LOGIN_STATE: tool.readProxy(declare.IM_LOGIN_STATE),
});
// 导出对象
const IM = tool.readProxy({
  timeOut: 20000,
  TYPES: TYPES,
  EVENT: tool.readProxy(declare.EVENT),
  create,
});

// SDK实例对象
var msim = tool.readProxy(
  {
    login: (options) => login(Global, options),
    logout: () => logout(Global),
    sendMessage: (options) => sendMessage(Global, options),
    resendMessage: (options) => resendMessage(Global, options),
    revokeMessage: (options) => revokeMessage(Global, options),
    getMessageList: (options) => getMessageList(Global, options),
    setMessageRead: (options) => setMessageRead(Global, options),
    getConversationList: (options) => getConversationList(Global, options),
    // "getConversationProfile": getConversationProfile,
    deleteConversation: (options) => deleteConversation(Global, options),
    createTextMessage: (options) => createTextMessage(Global, options),
    createImageMessage: (options) => createImageMessage(Global, options),
    createCustomMessage: (options) => createCustomMessage(Global, options),
    getCosKey: () => getCosKey(Global),
    on: on,
    off: off,
  },
  {
    set: (obj, prop, value) => {
      if (Object.values(IM.EVENT).indexOf(prop) !== -1) {
        obj[prop] = value;
        return true;
      } else {
        console.error(`不允许修改${prop}属性`);
      }
    },
  }
);

let Global = null;

function initGlobal() {
  Global = {
    tabId: Global && Global.tabId,
    curTab: false, // 是否是当前连接的tab
    uid: null,
    wsUrl: null,
    imToken: null,
    chatPageSize: 20,
    maxChatPageSize: 100,
    msgPageSize: 20,
    maxMsgPageSize: 100,
    heartBeatTimer: null, // 全局定时器
    loginState: declare.IM_LOGIN_STATE.NotLogin, // im登录状态
    chatsSync: declare.SYNC_CHAT.NotSyncChat, // 是否同步会话完成
    connState: declare.WS_STATE.Disconnect, // 网络连接状态
    callEvents: {}, // 异步回调
    chatCallEvents: {}, // 会话列表异步回调
    chatList: [],
    chatKeys: {},
    msgHandleList: [], // 消息处理队列
    handleMsgState: false, // 队列处理状态
    updateTime: null, // 会话更新标记
    clearTimer: () => {
      Global.curTab = false;
      if (Global?.heartBeatTimer) clearInterval(Global.heartBeatTimer);
    },
    onConn: () => {
      Global.handleMessage({
        type: declare.HANDLE_TYPE.WsStateChange,
        state: declare.WS_STATE.Connecting,
      });
    },
    handleMessage: (options) => {
      handleMessage(Global, msim, options);
    },
    globalTimer: globalTimer,
    clearData: clearData,
    initChats: initChats,
  };
}

// 退出时清理所有
function clearData() {
  if (Global.curTab) {
    localWs.close();
    localDexie.clear();
    localNotice.clear();
  }
  initGlobal();
}

/** im初始化
 * @param {String} wsUrl websocket地址
 * @param {String} imToken im服务器token
 */
// TODO 初始化为同步操作
function create() {
  if (Global !== null) {
    return msim;
  }
  initGlobal();
  let tabId = tool.uuid();
  let windowHeartBeat = window.localStorage.getItem("im_windowHeartBeat");
  let time = new Date().getTime();
  let imWsTabs = JSON.parse(window.localStorage.getItem("im_wsTabs") || "[]");
  imWsTabs.push(tabId);
  window.localStorage.setItem("im_wsTabs", JSON.stringify(imWsTabs));
  Global.tabId = tabId;
  if (!windowHeartBeat) {
    window.localStorage.setItem("im_wsCurId", tabId);
    // 启动全局定时器
    globalTimer();
  } else if (windowHeartBeat < time - 3000) {
    localNotice.clear();
    localWs.close();
    localDexie.deleteDB();
    window.localStorage.setItem("im_wsCurId", tabId);
    // 启动全局定时器
    globalTimer();
  }
  window.onunload = () => {
    onunload();
  };
  window.addEventListener("storage", (storage) => {
    localNotice.watchStorage(storage, msim, Global);
  });
  localDexie.initDB(Global);
  return msim;
}

/** 浏览器Tab关闭
 *
 */
function onunload() {
  let imWsTabs = JSON.parse(window.localStorage.getItem("im_wsTabs") || "[]");
  imWsTabs = imWsTabs.filter((tab) => tab != Global.tabId);
  window.localStorage.setItem("im_wsTabs", JSON.stringify(imWsTabs));
  localNotice.clear(imWsTabs.length === 0);
  localWs.close();
  if (imWsTabs.length === 0) {
    localDexie.deleteDB();
  } else if (Global.curTab) {
    Global.clearTimer();
    if (Global.loginState === declare.IM_LOGIN_STATE.Logged) {
      window.localStorage.setItem("im_wsConnTab", imWsTabs[0]);
    } else {
      window.localStorage.setItem("im_wsCurId", imWsTabs[0]);
    }
  }
}

// 启动定时器
function globalTimer() {
  Global.curTab = true;
  let count = 0;
  if (Global.heartBeatTimer) clearInterval(Global.heartBeatTimer);
  Global.heartBeatTimer = setInterval(() => {
    let time = new Date().getTime();
    window.localStorage.setItem("im_windowHeartBeat", time);
    count += 1;
    if (count % 20 === 0) {
      localWs.heartBeatCall();
    }
    if (!Global.callEvents || !Object.keys(Global.callEvents).length) return;
    let signTime = tool.createSign(time - IM.timeOut);
    for (let key in Global.callEvents) {
      if (key <= signTime) {
        let callEvent = Global.callEvents[key];
        delete Global.callEvents[key];
        callEvent.callErr(
          new Error(
            JSON.stringify({
              code: declare.ERROR_CODE.TIMEOUT,
              msg: callEvent.type + ": connection timed out",
            })
          )
        );
      }
    }
  }, 50);
}

// 初始化会话列表
function initChats() {
  return new Promise((resolve, reject) => {
    localDexie.getChatList().then((chats) => {
      chats.forEach((chat) => {
        // 如果内存已有该chat，则通过对象合并更新
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
      Global.chatsSync = declare.SYNC_CHAT.SyncChatSuccess;
      for (let key in Global.chatCallEvents) {
        Global.chatCallEvents[key].callSuc();
      }
      resolve();
    });
  });
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

export default IM;
