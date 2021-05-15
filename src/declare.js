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
  "REPEAT": -999,
  "TIMEOUT": -99,
  "SUCCESS": 0,
  "ERROR": 1,
  "TOKEN_NOT_FOUND": 4,
  "KICKED_OUT": 2008,
};

const MSG_TYPE = {
  'Text': 0, // 文本
  'Img': 1, // 图片
  'Audio': 2, // 音频
  'Video': 3, // 视频
  'GS': 4, // 地理位置
  'Card': 5, // 用户名片
  'Custom': 6, // 自定义表情
  'Revoked': 31, // 已撤回的消息
  'Revoke': 64, // 撤回操作
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