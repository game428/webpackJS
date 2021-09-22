// protobuf 类型ID
const PID = {
  Ping: 0,
  ImLogin: 1,
  ImLogout: 2,
  Result: 3,
  ChatS: 4,
  ChatSR: 5,
  ChatR: 6,
  ChatRBatch: 7,
  GetHistory: 8,
  Revoke: 9,
  MsgRead: 10,
  DelChat: 11,
  GetChatList: 12,
  ChatItem: 13,
  ChatItemUpdate: 14,
  ChatList: 15,
  GetProfile: 16,
  GetProfiles: 17,
  Profile: 18,
  ProfileList: 19,
  GetChat: 20,
  GetCosKey: 21,
  CosKey: 22,
  ProfileOnline: 50, //50  for demo: 通知客户端用户上线事件
  UsrOffline: 52, //52 for demo：通知客户端用户下线事件
  Signup: 53, //53 for demo：注册新用户
  FetchSpark: 54, //54 for demo: 获取spark
  Spark: 55, //55 for demo: spark
  Sparks: 56, //56 for demo: sparks
  GetImToken: 57,
};

/**
 * @module TYPES
 */
/**
 * @memberof TYPES#
 * @typedef TYPES
 * @property {WS_STATE} WS_STATE - websocket连接状态
 * @property {SYNC_CHAT} SYNC_CHAT - 同步会话状态{@link SYNC_CHAT}
 * @property {SYNC_CHAT} SEND_STATE - 消息发送状态{@link SEND_STATE}
 * @property {ERROR_CODE} ERROR_CODE - 错误Code码{@link ERROR_CODE}
 * @property {MSG_TYPE} MSG_TYPE - 消息类型{@link MSG_TYPE}
 * @property {IM_LOGIN_STATE} IM_LOGIN_STATE - im登录状态{@link IM_LOGIN_STATE}
 */

// 多tab通知通讯类型
const LOCAL_MESSAGE_TYPE = {
  Online: "online",
  Offline: "offline",
  UpdateChat: "updateChat",
  ReceivedMsg: "receivedMessage",
  ErrorType: "errorType",
  SyncChatsChange: "syncChatsChange",
  SyncMsgs: "syncMsgs",
  WsStateChange: "wsStateChange",
};

// 多tab操作通讯类型
const LOCAL_OPERATION_TYPE = {
  Message: "im_onMessage_",
  WS: "im_onWebsocket_",
};

// 业务操作类型
const OPERATION_TYPE = {
  Login: "login",
  Logout: "logout",
  GetChats: "getConversationList",
  DelChat: "deleteConversation",
  GetMsgs: "getMessageList",
  Read: "setMessageRead",
  Send: "sendMessage",
  Resend: "resendMessage",
  Revoke: "revokeMessage",
  GetCosKey: "getCosKey",
  TextMsg: "createTextMessage",
  ImgMsg: "createImageMessage",
  CustomMsg: "createCustomMessage",
};

/**
 * websocket连接状态
 * @typedef {Object} WS_STATE
 * @property {string} Disconnect - websocket未连接状态,连接失败也会进入未连接状态
 * @property {string} Connecting - websocket连接中
 * @property {string} Connect - websocket连接成功
 */
const WS_STATE = {
  Disconnect: "disconnect",
  Connecting: "connecting",
  Connect: "connect",
};

/**
 * im登录状态
 * @typedef {Object} IM_LOGIN_STATE
 * @property {string} NotLogin - im未登录状态,连接失败也会进入未登录状态
 * @property {string} Logging - im登陆中
 * @property {string} Logged - im登录成功
 */
const IM_LOGIN_STATE = {
  NotLogin: "notLogin",
  Logging: "logging",
  Logged: "logged",
};

/**
 * 会话同步状态
 * @typedef {Object} SYNC_CHAT
 * @property {string} NotSyncChat - 未开始同步会话
 * @property {string} SyncChatStart - im登陆成功后，开始同步会话
 * @property {string} SyncChatSuccess - 会话同步成功
 * @property {string} SyncChatFailed - 会话同步失败
 */
const SYNC_CHAT = {
  NotSyncChat: "NotSyncChat",
  SyncChatStart: "syncChatStart",
  SyncChatSuccess: "syncChatSuccess",
  SyncChatFailed: "syncChatFailed",
};

/**
 * 消息发送状态
 * @typedef {Object} SYNC_CHAT
 * @property {number} BFIM_MSG_STATUS_SENDING - 消息发送中
 * @property {number} BFIM_MSG_STATUS_SEND_SUCC - 消息发送成功
 * @property {number} BFIM_MSG_STATUS_SEND_FAIL - 消息发送失败
 */
const SEND_STATE = {
  BFIM_MSG_STATUS_SENDING: 0,
  BFIM_MSG_STATUS_SEND_SUCC: 1,
  BFIM_MSG_STATUS_SEND_FAIL: 2,
};

/***
 * 已读状态
 * @typedef {Object} SYNC_CHAT
 * @property {number} BFIM_MSG_STATUS_UNREAD - 消息未读
 * @property {number} BFIM_MSG_STATUS_READ - 消息已读
 */
const READ_STATE = {
  BFIM_MSG_STATUS_UNREAD: 0,
  BFIM_MSG_STATUS_READ: 1,
};

// 多TAB通讯状态
const LOCAL_OPERATION_STATUS = {
  Pending: 0,
  Fulfilled: 1,
  Rejected: 2,
};

/***
 * 错误类型code码
 * @typedef {Object} ERROR_CODE
 * @property {number} SUCCESS - 成功
 * @property {number} ERROR - 失败
 * @property {number} TOKEN_NOT_FOUND - token不存在
 * @property {number} NO_REGISTER - 用户未注册
 * @property {number} SIGNED - 用户已经登录
 * @property {number} KICKED_OUT - 被踢
 * @property {number} TOKEN_OUT - token失效
 * @property {number} TIMEOUT - 操作超时
 * @property {number} DISCONNECT - websocket未连接
 * @property {number} CONNECTERR - websocket连接建立失败
 * @property {number} CONNECTING - websocket连接中
 * @property {number} EXITING - 正在退出
 * @property {number} LOGGING - 正在登录
 * @property {number} DBERR - 初始化DB失败
 * @property {number} NOLOGIN - IM SDK未登录
 * @property {number} PARAMETER - 参数错误
 */
const ERROR_CODE = {
  SUCCESS: 0,
  ERROR: 1,
  TOKEN_NOT_FOUND: 4,
  NO_REGISTER: 9,
  SIGNED: 11,
  KICKED_OUT: 2008,
  TOKEN_OUT: 2009,
  TIMEOUT: 3000,
  DISCONNECT: 3001,
  CONNECTERR: 3002,
  CONNECTING: 3003,
  EXITING: 3333,
  LOGGING: 3334,
  DBERR: 6005,
  NOLOGIN: 6014,
  PARAMETER: 9001,
};

/***
 * 消息类型
 * @typedef {Object} MSG_TYPE
 * @property {number} Text - 文本
 * @property {number} Img - 图片
 * @property {number} Audio - 音频
 * @property {number} Video - 视频
 * @property {number} GS - 地理位置
 * @property {number} Card - 用户名片
 * @property {number} Revoked - 已撤回的消息
 * @property {number} Revoke - 撤回操作
 * @property {number} Custom - 自定义消息
 */
const MSG_TYPE = {
  Text: 0,
  Img: 1,
  Audio: 2,
  Video: 3,
  GS: 4,
  Card: 5,
  Revoked: 31,
  Revoke: 64,
  Custom: 100,
};

// 服务器下发的更新会话的类型
const CHAT_UPDATE_EVENT = {
  MsgLastRead: 0,
  Unread: 1,
  IBlockU: 2,
  Deleted: 3,
};

// 业务通知回调类型
/**
 * @module EVENT
 */
/**
 * 监听事件名称
 * @typedef {Object} EVENT
 * @property {string} CONNECT_CHANGE - 连接状态通知
 * @property {string} LOGIN - 登录成功
 * @property {string} LOGOUT - 退出成功
 * @property {string} SYNC_CHATS_CHANGE - 同步会话状态通知
 * @property {string} MESSAGE_RECEIVED - 接收消息监听
 * @property {string} MESSAGE_REVOKED - 撤回消息
 * @property {string} CONVERSATION_LIST_UPDATED - 会话列表更新
 * @property {string} KICKED_OUT - 被踢下线
 * @property {string} TOKEN_NOT_FOUND - token未找到或过期
 */
const EVENT = {
  CONNECT_CHANGE: "onConnectChange", // 连接状态通知
  LOGIN: "onLogin", // 登录成功
  LOGOUT: "onLogout", // 退出成功
  SYNC_CHATS_CHANGE: "onSyncChatsChange", // 同步会话状态通知
  MESSAGE_RECEIVED: "onMessageReceived", // 接收消息监听
  MESSAGE_REVOKED: "onMessageRevoked", // 撤回消息
  CONVERSATION_LIST_UPDATED: "onConversationListUpdated", // 会话列表更新
  KICKED_OUT: "onKickedOut", // 被踢下线
  TOKEN_NOT_FOUND: "onTokenNotFound", // token未找到或过期
};

// 处理消息的枚举类型
const HANDLE_TYPE = {
  WsStateChange: "WsStateChange", // ws状态变化
  SyncChatsChange: "SyncChatsChange", // 同步会话状态变化
  SyncMsgs: "SyncMsgs", // 同步消息处理
  ImLogin: "ImLogin", // 登录
  ImLogout: "ImLogout", // 退出
  ChatItemUpdate: "ChatItemUpdate", // 更新会话
  ResultError: "ResultError", // 接收到特殊错误code
  ChatR: "ChatR", // 新消息处理
};

export default {
  PID,
  LOCAL_MESSAGE_TYPE,
  LOCAL_OPERATION_TYPE,
  WS_STATE,
  IM_LOGIN_STATE,
  MSG_TYPE,
  SYNC_CHAT,
  SEND_STATE,
  READ_STATE,
  ERROR_CODE,
  LOCAL_OPERATION_STATUS,
  OPERATION_TYPE,
  CHAT_UPDATE_EVENT,
  EVENT,
  HANDLE_TYPE,
};
