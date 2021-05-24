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
  "DelChat": 11, //12 该proto 既是请求，也是返回，返回时带update_time, 请求时不带update_time
  "GetChatList": 12,
  "ChatItem": 13,
  "ChatItemUpdate": 14,
  "ChatList": 15,
  "GetProfile": 16,
  "GetProfiles": 17,
  "Profile": 18,
  "ProfileList": 19,
  "GetChat": 20,
  "ProfileOnline": 50, //50  for demo: 通知客户端用户上线事件
  "UsrOffline": 52, //52 for demo：通知客户端用户下线事件
  "Signup": 53, //53 for demo：注册新用户
  "FetchSpark": 54, //54 for demo: 获取spark
  "Spark": 55, //55 for demo: spark
  "Sparks": 56, //56 for demo: sparks
  "GetImToken": 57,
};

const LOCAL_EVENT = {
  'Online': 'online',
  'Offline': 'offline',
  'Logout': 'logout_',
  'GetChatList': 'getConversationList_',
  'DelChat': 'deleteConversation_',
  'GetMsgList': 'getMessageList_',
  'SendMsg': 'sendMessage_',
  'ResendMsg': 'resendMessage_',
  'RevokeMsg': 'revokeMessage_',
  'ReadMsg': 'setMessageRead_',
  'UpdateChat': 'updateChat',
  'ReceivedMsg': 'receivedMessage',
  "SendMsgTab": 'sendMsgTab',
  "RevokeMsgTab": 'revokeMsgTab',
};

const WS_STATE = {
  "Disconnect": "disconnect",
  "Connecting": "connecting",
  "Connect": "connect",
};

const SEND_STATE = {
  "BFIM_MSG_STATUS_SENDING": 0,
  "BFIM_MSG_STATUS_SEND_SUCC": 1,
  "BFIM_MSG_STATUS_SEND_FAIL": 2,
  "BFIM_MSG_STATUS_HAS_DELETED": 3,
};

const READ_STATE = {
  "BFIM_MSG_STATUS_UNREAD": 1,
  "BFIM_MSG_STATUS_READ": 1,
};

const LOCAL_OPERATION_STATUS = {
  "Pending": 0,
  "Fulfilled": 1,
  "Rejected": 2,
};

const ERROR_CODE = {
  "SUCCESS": 0, // 失败
  "ERROR": 1, // 成功
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

const MSG_TYPE = {
  'Text': 0, // 文本
  'Img': 1, // 图片
  'Audio': 2, // 音频
  'Video': 3, // 视频
  'GS': 4, // 地理位置
  'Card': 5, // 用户名片
  'Revoked': 31, // 已撤回的消息
  'Revoke': 64, // 撤回操作
  'Custom': 100, // 自定义消息
}

export default {
  PID,
  LOCAL_EVENT,
  WS_STATE,
  MSG_TYPE,
  SEND_STATE,
  READ_STATE,
  ERROR_CODE,
  LOCAL_OPERATION_STATUS,
};