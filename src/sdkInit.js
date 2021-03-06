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
  DEMO_EVENT,
  HANDLE_TYPE,
  IM_LOGIN_STATE,
  LOCAL_STORAGE_KEYS,
} from "./sdkTypes";
import { closeWs, sendPing } from "./ws";
import localNotice from "./localNotice";
import tool from "./tool";
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
  revokeMessage,
  readFlashMessage,
  createTextMessage,
  createImageMessage,
  createFlashMessage,
  createBusinessMessage,
} from "./sdkMessages";
import { on, off, getCosKey } from "./sdkUnits";
// TODO Demo 相关 打包屏蔽
import { getProfile, getProfileList, getSpark } from "./demo/demoUnits";

const TYPES = {
  WS_STATE: WS_STATE,
  SYNC_CHAT: SYNC_CHAT,
  SEND_STATE: SEND_STATE,
  ERROR_CODE: ERROR_CODE,
  MSG_TYPE: MSG_TYPE,
  IM_LOGIN_STATE: IM_LOGIN_STATE,
};
// TODO 打包SDK时屏蔽掉demo 相关api
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
  // TODO Demo 相关 打包屏蔽
  DEMO_EVENT: DEMO_EVENT,
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
    // 消息相关
    createTextMessage: (options) => createTextMessage(Global, options),
    createImageMessage: (options) => createImageMessage(Global, options),
    createFlashMessage: (options) => createFlashMessage(Global, options),
    createBusinessMessage: (options) => createBusinessMessage(Global, options),
    sendMessage: (options) => sendMessage(Global, options),
    revokeMessage: (options) => revokeMessage(Global, options),
    getMessageList: (options) => getMessageList(Global, options),
    readFlashMessage: (options) => readFlashMessage(Global, options),
    setMessageRead: (options) => setMessageRead(Global, options),
    // 会话相关
    getConversationList: (options) => getConversationList(Global, options),
    getConversationProvider: (options) =>
      getConversationProvider(Global, options),
    updateConversationProvider: (options) =>
      updateConversationProvider(Global, options),
    deleteConversation: (options) => deleteConversation(Global, options),
    getAllUnreadCount: () => getAllUnreadCount(Global),
    // 工具方法
    getCosKey: () => getCosKey(Global),
    on: (eventName, callback) => on(msimSdk, eventName, callback),
    off: (eventName) => off(msimSdk, eventName),
    // TODO Demo 相关 打包屏蔽
    getProfile: (options) => getProfile(Global, options),
    getProfileList: (options) => getProfileList(Global, options),
    getSpark: () => getSpark(Global),
  };
  return msimSdk;
}

var msim = null;

let Global = null;

// 初始化Global
function initGlobal() {
  Global = {
    timeOut: 30000,
    tabId: Global?.tabId,
    curTab: false, // 是否是当前连接的tab
    chatPageSize: 20,
    maxChatPageSize: 100,
    msgPageSize: 20,
    maxMsgPageSize: 100,
    heartBeatTimer: null, // 全局定时器
    sdkState: {
      loginState: IM_LOGIN_STATE.NOT_LOGIN,
      chatsSync: SYNC_CHAT.NOT_SYNC_CHAT,
      connState: WS_STATE.NET_STATE_DISCONNECTED,
    }, // sdk内部状态
    callEvents: new Map(), // 异步回调
    chatCallEvents: new Map(), // 会话列表异步回调
    stateCallEvents: new Map(), // sdk状态异步回调
    chatKeys: new Map(), // 本地所有可显示会话
    getChatHistorys: new Set(),
    msgList: new Map(), // 本地所有消息历史
    msgHandleList: [], // 消息处理队列
    handleMsgState: false, // 队列处理状态
    updateTime: null, // 会话更新标记
    updateTabs: null, // 登录后更新的会话列表
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
    reconnection: () => reconnection(Global),
    handleMessage: (options) => handleMessage(Global, msim, options),
    globalTimer: globalTimer,
    clearData: clearData,
  };
}

// 退出时清理所有
function clearData() {
  localNotice.clear();
  closeWs();
  Global.sdkState = {
    loginState: IM_LOGIN_STATE.NOT_LOGIN,
    chatsSync: SYNC_CHAT.NOT_SYNC_CHAT,
    connState: WS_STATE.NET_STATE_DISCONNECTED,
  };
  Global.callEvents = new Map();
  Global.chatCallEvents = new Map();
  Global.stateCallEvents = new Map();
  Global.chatKeys = new Map();
  Global.getChatHistorys = new Set();
  Global.msgList = new Map();
  Global.msgHandleList = [];
  Global.handleMsgState = false;
  Global.updateTime = null;
  Global.updateTabs = null;
}

/**
 * im初始化
 * @memberof MSIM
 * @param {String} wsUrl websocket地址
 * @param {String} imToken im服务器token
 * @returns {Promise}
 */
function create() {
  return new Promise((resolve, reject) => {
    if (msim !== null) {
      resolve(msim);
    }
    initGlobal();
    let tabId = tool.uuid();
    let windowHeartBeat = window.localStorage.getItem(
      LOCAL_STORAGE_KEYS.WindowHeart
    );
    let imWsTabs = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_KEYS.WsTabs) || "[]"
    );
    imWsTabs.push(tabId);
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.WsTabs,
      JSON.stringify(imWsTabs)
    );
    Global.tabId = tabId;
    let time = Date.now();
    if ((windowHeartBeat || 0) < time - 3000) {
      localNotice.clear();
      closeWs();
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.SetCurTab, tabId);
      // 启动全局定时器
      globalTimer();
    }
    window.addEventListener("unload", onunload);
    msim = initSDK();
    window.addEventListener("storage", (storage) => {
      localNotice.watchStorage(storage, msim, Global);
    });
    resolve(msim);
  });
}

/***
 * 浏览器Tab关闭
 */
function onunload() {
  let imWsTabs = JSON.parse(
    window.localStorage.getItem(LOCAL_STORAGE_KEYS.WsTabs) || "[]"
  );
  imWsTabs = imWsTabs.filter((tab) => tab != Global.tabId);
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.WsTabs,
    JSON.stringify(imWsTabs)
  );
  localNotice.clear(imWsTabs.length === 0);
  closeWs();
  if (Global.curTab) {
    Global.clearTimer();
    if (Global.sdkState.loginState === IM_LOGIN_STATE.LOGGED) {
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.ReconnectTab, imWsTabs[0]);
    } else {
      window.localStorage.setItem(LOCAL_STORAGE_KEYS.SetCurTab, imWsTabs[0]);
    }
  }
}

// 启动定时器
function globalTimer() {
  Global.curTab = true;
  let count = 0;
  if (Global.heartBeatTimer) clearInterval(Global.heartBeatTimer);
  Global.heartBeatTimer = setInterval(() => {
    let time = Date.now();
    window.localStorage.setItem(LOCAL_STORAGE_KEYS.WindowHeart, time);
    count += 1;
    if (count % 20 === 0) {
      sendPing();
    }
    Global.callEvents.forEach((callEvent, key) => {
      if (callEvent.timeOut <= time) {
        callEvent.callErr({
          code: ERROR_CODE.TIMEOUT,
          msg: callEvent.type + ": connection timed out",
        });
      }
    });
    Global.stateCallEvents.forEach((callEvent, key) => {
      if (callEvent.timeOut <= time) {
        callEvent.callErr();
      }
    });
  }, 50);
}

export default IM;
