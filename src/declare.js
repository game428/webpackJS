// protobuf 类型ID
const PID = {
  "Ping": 0,
  "ImLogin": 1,
  "ImLogout": 2,
  "Result": 3,
  "ChatS": 4,
  "ChatSR": 5,
  "ChatR": 6,
  "ChatRBatch": 7,
  "GetHistory": 8,
  "Revoke": 9,
  "MsgRead": 10,
  "DelChat": 11,
  "GetChatList": 12,
  "ChatItem": 13,
  "ChatItemUpdate": 14,
  "ChatList": 15,
  "GetProfile": 16,
  "GetProfiles": 17,
  "Profile": 18,
  "ProfileList": 19,
  "GetChat": 20,
  "GetCosKey": 21,
  "CosKey": 22,
  "ProfileOnline": 50, //50  for demo: 通知客户端用户上线事件
  "UsrOffline": 52, //52 for demo：通知客户端用户下线事件
  "Signup": 53, //53 for demo：注册新用户
  "FetchSpark": 54, //54 for demo: 获取spark
  "Spark": 55, //55 for demo: spark
  "Sparks": 56, //56 for demo: sparks
  "GetImToken": 57,
};

// 多tab通知通讯类型
const LOCAL_MESSAGE_TYPE = {
  "Online": "online",
  "Offline": "offline",
  "UpdateChat": "updateChat",
  "ReceivedMsg": "receivedMessage",
  "ErrorType": "errorType",
  "SyncChatsChange": "syncChatsChange",
  "SyncMsgs": "syncMsgs",
  "WsStateChange": "wsStateChange",
}

// 多tab操作通讯类型
const LOCAL_OPERATION_TYPE = {
  "Message": "im_onMessage_",
  "WS": "im_onWebsocket_",
}


// 业务操作类型
const OPERATION_TYPE = {
  "Login": "login",
  "Logout": "logout",
  "GetChats": "getConversationList",
  "DelChat": "deleteConversation",
  "GetMsgs": "getMessageList",
  "Read": "setMessageRead",
  "Send": "sendMessage",
  "Resend": "resendMessage",
  "Revoke": "revokeMessage",
  "GetCosKey": "getCosKey",
  "TextMsg": "createTextMessage",
  "ImgMsg": "createImageMessage",
  "CustomMsg": "createCustomMessage",
}

// websocket连接状态
const WS_STATE = {
  "Disconnect": "disconnect",
  "Connecting": "connecting",
  "Connect": "connect",
};

// im登录状态
const IM_LOGIN_STATE = {
  "NotLogin": "notLogin",
  "Logging": "logging",
  "Logged": "logged",
};

// 会话同步状态
const SYNC_CHAT = {
  "NotSyncChat": "NotSyncChat",
  "SyncChatStart": "syncChatStart",
  "SyncChatSuccess": "syncChatSuccess",
  "SyncChatFailed": "syncChatFailed",
}

// 发送状态
const SEND_STATE = {
  "BFIM_MSG_STATUS_SENDING": 0,
  "BFIM_MSG_STATUS_SEND_SUCC": 1,
  "BFIM_MSG_STATUS_SEND_FAIL": 2,
};

// 已读状态
const READ_STATE = {
  "BFIM_MSG_STATUS_UNREAD": 1,
  "BFIM_MSG_STATUS_READ": 1,
};

// 多TAB通讯状态
const LOCAL_OPERATION_STATUS = {
  "Pending": 0,
  "Fulfilled": 1,
  "Rejected": 2,
};

// 返回业务的code码
const ERROR_CODE = {
  "SUCCESS": 0, // 成功
  "ERROR": 1, // 失败
  "TOKEN_NOT_FOUND": 4, // token不存在
  "NO_REGISTER": 9, // 用户未注册
  "SIGNED": 11, // 用户已经登录
  "KICKED_OUT": 2008, // 被踢
  "TOKEN_OUT": 2009, // token失效
  "TIMEOUT": 3000, // 操作超时
  "DISCONNECT": 3001, // 未连接
  "CONNECTERR": 3002, // 长连接建立失败
  "CONNECTING": 3003, // 连接中
  "EXITING": 3333, // 正在退出
  "LOGGING": 3334, // 正在登录
  "DBERR": 6005, // 初始化DB失败
  "NOLOGIN": 6014, // IM SDK未登录
  "PARAMETER": 9001, // 参数错误
};

// 消息类型
const MSG_TYPE = {
  "Text": 0, // 文本
  "Img": 1, // 图片
  "Audio": 2, // 音频
  "Video": 3, // 视频
  "GS": 4, // 地理位置
  "Card": 5, // 用户名片
  "Revoked": 31, // 已撤回的消息
  "Revoke": 64, // 撤回操作
  "Custom": 100, // 自定义消息
}

// 服务器下发的更新会话的类型
const CHAT_UPDATE_EVENT = {
  "MsgLastRead": 0,
  "Unread": 1,
  "IBlockU": 2,
  "Deleted": 3,
}

// 业务通知回调类型
const EVENT = {
  "CONNECT_CHANGE": "onConnectChange", // 连接状态通知
  "LOGIN": "onLogin", // 登录成功
  "LOGOUT": "onLogout", // 退出成功
  "SYNC_CHATS_CHANGE": "onSyncChatsChange", // 同步会话状态通知
  "MESSAGE_RECEIVED": "onMessageReceived", // 接收消息监听
  "MESSAGE_REVOKED": "onMessageRevoked", // 撤回消息
  "CONVERSATION_LIST_UPDATED": "onConversationListUpdated", // 会话列表更新
  "KICKED_OUT": "onKickedOut", // 被踢下线
  "TOKEN_NOT_FOUND": "onTokenNotFound" // token未找到或过期
};

// 处理消息的枚举类型
const HANDLE_TYPE = {
  "WsStateChange": "WsStateChange", // ws状态变化
  "SyncChatsChange": "SyncChatsChange", // 同步会话状态变化
  "SyncMsgs": "SyncMsgs", // 同步消息处理
  "ImLogin": "ImLogin", // 登录
  "ImLogout": "ImLogout", // 退出
  "ChatItemUpdate": "ChatItemUpdate", // 更新会话
  "ResultError": "ResultError", // 接收到特殊错误code
  "ChatR": "ChatR", // 新消息处理
}

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