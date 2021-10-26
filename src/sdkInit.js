/**
 * @class SDK
 */
import {
  EVENT,
  WS_STATE,
  MSG_TYPE,
  SYNC_CHAT,
  ERROR_CODE,
  SEND_STATE,
  HANDLE_TYPE,
  IM_LOGIN_STATE,
} from "./sdkTypes";
import { closeWs, sendPing } from "./ws";
import localNotice from "./localNotice";
import tool from "./tool";
import localDexie from "./dexieDB";
import handleMessage from "./sdkHandleMsg";
import { reconnection, login, logout } from "./sdkLogin";
import {
  getConversationList,
  getAllUnreadCount,
  getConversationProvider,
  updateConversationProvider,
  deleteConversation,
} from "./sdkChats";
import {
  getMessageList,
  setMessageRead,
  sendMessage,
  resendMessage,
  revokeMessage,
  createTextMessage,
  createImageMessage,
  createBusinessMessage,
} from "./sdkMessages";
import { on, off, getCosKey } from "./sdkUnits";

const TYPES = {
  WS_STATE: WS_STATE,
  SYNC_CHAT: SYNC_CHAT,
  SEND_STATE: SEND_STATE,
  ERROR_CODE: ERROR_CODE,
  MSG_TYPE: MSG_TYPE,
  IM_LOGIN_STATE: IM_LOGIN_STATE,
};

// 导出对象
/**
 * MSIM 是 IM Web SDK 的命名空间，提供了创建 SDK 实例的静态方法 create() ，以及事件常量 EVENT，类型常量 TYPES
 * @namespace MSIM
 * @borrows create as create
 */
const IM = {
  TYPES: TYPES,
  EVENT: EVENT,
  create,
};

/**
 *
 * @typedef  Promise
 * @property {function} then - 正常回调，参数为： IMResponse
 * @property {function} catch - 异常回调，参数为： IMError
 */

// SDK实例对象
function initSDK() {
  let msimSdk = {
    login: (options) => login(Global, options),
    logout: () => logout(Global),
    sendMessage: (options) => sendMessage(Global, options),
    resendMessage: (options) => resendMessage(Global, options),
    revokeMessage: (options) => revokeMessage(Global, options),
    getMessageList: (options) => getMessageList(Global, options),
    setMessageRead: (options) => setMessageRead(Global, options),
    getConversationList: (options) => getConversationList(Global, options),
    getConversationProvider: (options) =>
      getConversationProvider(Global, options),
    updateConversationProvider: (options) =>
      updateConversationProvider(Global, options),
    deleteConversation: (options) => deleteConversation(Global, options),
    createTextMessage: (options) => createTextMessage(Global, options),
    createImageMessage: (options) => createImageMessage(Global, options),
    createBusinessMessage: (options) => createBusinessMessage(Global, options),
    getCosKey: () => getCosKey(Global),
    getAllUnreadCount: () => getAllUnreadCount(Global),
    on: (eventName, callback) => on(msimSdk, eventName, callback),
    off: (eventName) => off(msimSdk, eventName),
  };
  return msimSdk;
}

var msim = null;

let Global = null;

// 初始化Global
function initGlobal() {
  Global = {
    timeOut: 20000,
    tabId: Global?.tabId,
    curTab: false, // 是否是当前连接的tab
    uid: null,
    chatPageSize: 20,
    maxChatPageSize: 100,
    msgPageSize: 20,
    maxMsgPageSize: 100,
    heartBeatTimer: null, // 全局定时器
    loginState: IM_LOGIN_STATE.NOT_LOGIN, // im登录状态
    chatsSync: SYNC_CHAT.NOT_SYNC_CHAT, // 是否同步会话完成
    connState: WS_STATE.NET_STATE_DISCONNECTED, // 网络连接状态
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
        type: HANDLE_TYPE.WsStateChange,
        state: WS_STATE.NET_STATE_CONNECTING,
      });
    },
    reconnection: () => {
      reconnection(Global);
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
    closeWs();
    localDexie.clear();
    localNotice.clear();
  }
  Global.loginState = IM_LOGIN_STATE.NOT_LOGIN;
  Global.chatsSync = SYNC_CHAT.NOT_SYNC_CHAT;
  Global.connState = WS_STATE.NET_STATE_DISCONNECTED;
  Global.callEvents = IM_LOGIN_STATE.NOT_LOGIN;
  Global.callEvents = {};
  Global.chatCallEvents = {};
  Global.chatList = [];
  Global.chatKeys = {};
  Global.msgHandleList = [];
  Global.handleMsgState = false;
  Global.updateTime = null;
}

/**
 * im初始化
 * @memberof MSIM
 * @param {String} wsUrl websocket地址
 * @param {String} imToken im服务器token
 * @returns {Object}
 */
function create() {
  if (msim !== null) {
    return msim;
  }
  initGlobal();
  let tabId = tool.uuid();
  let windowHeartBeat = window.localStorage.getItem("im_windowHeartBeat");
  let imWsTabs = JSON.parse(window.localStorage.getItem("im_wsTabs") || "[]");
  imWsTabs.push(tabId);
  window.localStorage.setItem("im_wsTabs", JSON.stringify(imWsTabs));
  Global.tabId = tabId;
  let time = new Date().getTime();
  if (!windowHeartBeat) {
    window.localStorage.setItem("im_wsCurId", tabId);
    // 启动全局定时器
    globalTimer();
  } else if (windowHeartBeat < time - 3000) {
    localNotice.clear();
    closeWs();
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
  localDexie.initDB();
  msim = initSDK();
  return msim;
}

/***
 * 浏览器Tab关闭
 */
function onunload() {
  let imWsTabs = JSON.parse(window.localStorage.getItem("im_wsTabs") || "[]");
  imWsTabs = imWsTabs.filter((tab) => tab != Global.tabId);
  window.localStorage.setItem("im_wsTabs", JSON.stringify(imWsTabs));
  localNotice.clear(imWsTabs.length === 0);
  closeWs();
  if (imWsTabs.length === 0) {
    window.localStorage.setItem("aaa", 111);
    localDexie.deleteDB();
  } else if (Global.curTab) {
    Global.clearTimer();
    if (Global.loginState === IM_LOGIN_STATE.LOGGED) {
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
      sendPing();
    }
    for (let key in Global.callEvents) {
      if (Global.callEvents[key].timeOut <= time) {
        let callEvent = Global.callEvents[key];
        delete Global.callEvents[key];
        callEvent.callErr({
          code: ERROR_CODE.TIMEOUT,
          msg: callEvent.type + ": connection timed out",
        });
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
        if (Global.chatKeys.hasOwnProperty(chat.conversationID)) {
          let oldChat = Global.chatKeys[chat.conversationID];
          Object.assign(oldChat, chat);
        } else {
          Global.chatKeys[chat.conversationID] = chat;
          Global.chatList.push(chat);
        }
      });
      Global.chatsSync = SYNC_CHAT.SYNC_CHAT_SUCCESS;
      for (let key in Global.chatCallEvents) {
        Global.chatCallEvents[key].callSuc();
      }
      resolve();
    });
  });
}

export default IM;
