/***
 * protobuf 类型ID
 * @enum
 */
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
  UpdatePushToken: 21,
  GetCosKey: 22,
  CosKey: 23,
  GetAgoraToken: 24,
  AgoraToken: 25,
  JoinGroup: 26,
  LeaveGroup: 27,
  GroupMember: 28,
  GroupInfo: 29,
  GroupEvent: 30,
  GroupChatS: 31,
  GroupChatSR: 32,
  GroupChatR: 33,
  GroupChatRBatch: 34,
  GetGroupProfiles: 35,
  GroupAction: 36,
  GroupRevoke: 37,
  GroupTipEvent: 38,
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
 * @enum
 * @property {WS_STATE} WS_STATE - websocket连接状态
 * @property {SYNC_CHAT} SYNC_CHAT - 同步会话状态{@link SYNC_CHAT}
 * @property {SYNC_CHAT} SEND_STATE - 消息发送状态{@link SEND_STATE}
 * @property {ERROR_CODE} ERROR_CODE - 错误Code码{@link ERROR_CODE}
 * @property {MSG_TYPE} MSG_TYPE - 消息类型{@link MSG_TYPE}
 * @property {IM_LOGIN_STATE} IM_LOGIN_STATE - im登录状态{@link IM_LOGIN_STATE}
 */

/***
 * 多tab通知通讯类型
 * @enum
 */
const LOCAL_MESSAGE_TYPE = {
  SyncChatsChange: "syncChatsChange",
  ErrorType: "errorType",
  WsStateChange: "wsStateChange",
  Online: "online",
  Offline: "offline",
  UpdateChat: "updateChat",
  SyncMsgs: "syncMsgs",
  DeleteMsg: "deleteMsg",
  ReceivedMsg: "receivedMessage",
  NotificationMsg: "notificationMsg",
  JoinChatRoom: "joinChatRoom",
  LeaveChatRoom: "leaveChatRoom",
  GroupReceivedMsg: "groupReceivedMessage",
  GroupOfflineMsg: "groupOfflineMsg",
  GroupDeleteMsg: "groupDeleteMsg",
};

/***
 * 多tab操作通讯类型
 * @enum
 */
const LOCAL_OPERATION_TYPE = {
  Message: "im_onMessage_",
  WS: "im_onWebsocket_",
};

/***
 * 业务操作类型
 * @param Login - 登录im
 * @param Logout - 退出im
 * @param GetChats - 获取会话列表
 * @param GetChat - 获取指定会话
 * @param UpdateLocalChat - 更新本地会话信息
 * @param DelChat - 删除会话
 * @param GetMsgs - 获取历史消息
 * @param Read - 设置消息已读
 * @param Send - 发送消息
 * @param Revoke - 撤回消息
 * @param GetCosKey - 获取cosKey
 * @param GetAllUnread - 获取会话未读消息总数
 * @param JoinChatRoom - 加入聊天室
 * @param LeaveChatRoom - 离开聊天室
 * @param DeleteChatRoomMsgs - 删除聊天室消息
 * @param ChatRoomTod - 修改公告
 * @param MuteMembers - 管理群成员
 * @param MuteChatRoom - 管理聊天室
 * @param EditManager - 管理员设置
 */
const OPERATION_TYPE = {
  Login: "login",
  Logout: "logout",
  GetChats: "getConversationList",
  GetChat: "getConversationProvider",
  UpdateLocalChat: "updateConversationProvider",
  DelChat: "deleteConversation",
  GetMsgs: "getMessageList",
  Read: "setMessageRead",
  Send: "sendMessage",
  Revoke: "revokeMessage",
  GetCosKey: "getCosKey",
  GetAllUnread: "getAllUnreadCount",
  JoinChatRoom: "joinChatRoom",
  LeaveChatRoom: "leaveChatRoom",
  DeleteChatRoomMsgs: "deleteChatRoomMsgs",
  GetRoomMsgs: "getRoomMsgs",
  ChatRoomTod: "chatRoomTod",
  MuteMembers: "muteMembers",
  MuteChatRoom: "muteChatRoom",
  EditManager: "editManager",
};

/**
 * websocket连接状态
 * @enum
 * @property {string} NET_STATE_DISCONNECTED - websocket未连接状态,连接失败也会进入未连接状态
 * @property {string} NET_STATE_CONNECTING - websocket连接中
 * @property {string} NET_STATE_CONNECTED - websocket连接成功
 */
const WS_STATE = {
  NET_STATE_DISCONNECTED: "disconnect",
  NET_STATE_CONNECTING: "connecting",
  NET_STATE_CONNECTED: "connected",
};

/**
 * im登录状态
 * @enum
 * @property {string} NOT_LOGIN - im未登录状态,连接失败也会进入未登录状态
 * @property {string} LOGGING - im登陆中
 * @property {string} LOGGED - im登录成功
 */
const IM_LOGIN_STATE = {
  NOT_LOGIN: "notLogin",
  LOGGING: "logging",
  LOGGED: "logged",
};

/**
 * 会话同步状态
 * @enum
 * @property {string} NOT_SYNC_CHAT - 未开始同步会话
 * @property {string} SYNC_CHAT_START - im登陆成功后，开始同步会话
 * @property {string} SYNC_CHAT_SUCCESS - 会话同步成功
 * @property {string} SYNC_CHAT_FAILED - 会话同步失败
 */
const SYNC_CHAT = {
  NOT_SYNC_CHAT: "NotSyncChat",
  SYNC_CHAT_START: "syncChatStart",
  SYNC_CHAT_SUCCESS: "syncChatSuccess",
  SYNC_CHAT_FAILED: "syncChatFailed",
};

/**
 * 消息发送状态
 * @enum
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
 * @enum
 * @property {number} BFIM_MSG_STATUS_UNREAD - 消息未读
 * @property {number} BFIM_MSG_STATUS_READ - 消息已读
 */
const READ_STATE = {
  BFIM_MSG_STATUS_UNREAD: 0,
  BFIM_MSG_STATUS_READ: 1,
};

/***
 * 多TAB通讯状态
 * @enum
 */
const LOCAL_OPERATION_STATUS = {
  Pending: 0,
  Fulfilled: 1,
  Rejected: 2,
};

/***
 * 错误类型code码
 * @enum
 * @property {number} SUCCESS - 成功
 * @property {number} ERROR - 失败
 * @property {number} TOKEN_NOT_FOUND - token不存在
 * @property {number} NO_REGISTER - 用户未注册
 * @property {number} SIGNED - 用户已经登录
 * @property {number} KICKED_OUT - 被踢
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

/**
 * 消息类型
 * @enum
 * @property {number} Text - 文本
 * @property {number} Img - 图片
 * @property {number} Audio - 音频
 * @property {number} Video - 视频
 * @property {number} Location - 地理位置
 * @property {number} Card - 用户名片
 * @property {number} Revoked - 已撤回的消息
 * @property {number} Matched - 匹配
 * @property {number} Recall - 撤回指令
 * @property {number} Unmatch - 取消匹配指令
 * @property {number} Tod - 取消匹配指令
 * @property {number} Notification - 通知
 */
const MSG_TYPE = {
  Text: 0,
  Img: 1,
  Audio: 2,
  Video: 3,
  Location: 4,
  Card: 5,
  Revoked: 31,
  Recall: 64,
  SysDelete: 66,
  Deleted: 67,
  Tod: 68,
  Notification: 100,
};

/***
 * 服务器下发的更新会话的类型
 * @enum
 */
const CHAT_UPDATE_EVENT = {
  MsgLastRead: 0,
  Unread: 1,
  IBlockU: 2,
  Deleted: 3,
};

/**
 * @module EVENT
 */
/**
 * 监听事件名称
 * @enum
 * @property {string} CONNECT_CHANGE - 连接状态通知
 * @property {string} LOGIN - 登录成功
 * @property {string} LOGOUT - 退出成功
 * @property {string} SYNC_CHATS_CHANGE - 同步会话状态通知
 * 单聊消息通知
 * @property {string} MESSAGE_RECEIVED - 接收消息监听
 * @property {string} MESSAGE_REVOKED - 撤回消息
 * @property {string} MESSAGE_DELETE - 删除消息
 * @property {string} MESSAGE_NOTIFICATION - 通知消息
 * @property {string} CONVERSATION_LIST_UPDATED - 会话列表更新
 * 聊天室相关
 * @property {string} JOIN_CHAT_ROOM - 加入聊天室成功
 * @property {string} LEAVE_CHAT_ROOM - 退出聊天室成功
 * @property {string} MESSAGE_GROUP_RECEIVED - 收到群消息
 * @property {string} MESSAGE_GROUP_REVOKED - 收到群撤回消息
 * @property {string} MESSAGE_GROUP_DELETE - 收到群删除消息
 * @property {string} GROUP_DESTROY - 群销毁
 * @property {string} UPDATE_GROUP_INFO - 群信息更新
 * @property {string} UPDATE_GROUP_TOD - 群公告更新
 *
 * @property {string} KICKED_OUT - 被踢下线
 * @property {string} TOKEN_NOT_FOUND - token未找到或过期
 */
const EVENT = {
  CONNECT_CHANGE: "onConnectChange",
  LOGIN: "onLogin",
  LOGOUT: "onLogout",
  SYNC_CHATS_CHANGE: "onSyncChatsChange",
  MESSAGE_RECEIVED: "onReceivedMessage",
  MESSAGE_REVOKED: "onRevokedMessage",
  MESSAGE_DELETE: "onDeleteMessage",
  MESSAGE_NOTIFICATION: "onNotificationMessage",
  CONVERSATION_LIST_UPDATED: "onConversationListUpdated",
  JOIN_CHAT_ROOM: "onJoinChatRoom",
  LEAVE_CHAT_ROOM: "onLeaveChatRoom",
  MESSAGE_GROUP_RECEIVED: "onGroupReceivedMessage",
  MESSAGE_GROUP_REVOKED: "onGroupRevokedMessage",
  MESSAGE_GROUP_DELETE: "onGroupDeleteMessage",
  GROUP_DESTROY: "onGroupDestroy",
  UPDATE_GROUP_INFO: "onUpdateGroupInfo",
  UPDATE_GROUP_TOD: "onNewChatRoomTipsOfDay",
  KICKED_OUT: "onKickedOut",
  TOKEN_NOT_FOUND: "onTokenNotFound",
};

/***
 * 处理消息的枚举类型
 * @param WsStateChange - ws状态变化
 * @param SyncChatsChange - 同步会话状态变化
 * @param SyncMsgs - 同步消息处理
 * @param ImLogin - 登录
 * @param ImLogout - 退出
 * @param ChatItemUpdate - 更新会话
 * @param ResultError - 接收到特殊错误code
 * @param ChatR - 新消息处理
 * @param GroupJoin - 加入聊天室成功
 * @param GroupLeave - 退出聊天室成功
 * @param GroupChatR - 群新消息处理
 * @param GroupOfflineMsg - 群离线消息处理
 * @param GroupEvent - 群事件
 */
const HANDLE_TYPE = {
  WsStateChange: "WsStateChange",
  SyncChatsChange: "SyncChatsChange",
  SyncMsgs: "SyncMsgs",
  ImLogin: "ImLogin",
  ImLogout: "ImLogout",
  ChatItemUpdate: "ChatItemUpdate",
  ResultError: "ResultError",
  ChatR: "ChatR",
  GroupJoin: "GroupJoin",
  GroupLeave: "GroupLeave",
  GroupChatR: "GroupChatR",
  GroupOfflineMsg: "GroupOfflineMsg",
  GroupEvent: "GroupEvent",
};

/***
 * 群的枚举类型
 * @enum
 */
const GROUP_TYPE = {
  ChatRoom: 0, // 聊天室
};

/***
 * 群操作的枚举类型
 * @enum
 * @property {number} EditTod - 修改公告
 */
const GROUP_ACTION = {
  EditTod: 0,
  MuteMembers: 1,
  MuteChatRoom: 2,
  ResumeChatRoom: 3,
  DeleteMsgs: 4,
  EditManager: 5,
};

/***
 * 群事件的枚举类型
 * @enum
 * @property {number} DeleteRoom - 销毁聊天室
 * @property {number} UpdateRoomInfo - 更新聊天室信息
 * @property {number} UpdateRoomUserInfo - 更新聊天室成员信息
 * @property {number} AuthorityChange - 权限变更
 */
const GROUP_EVENT = {
  DeleteRoom: 0,
  UpdateRoomInfo: 1,
  UpdateRoomUserInfo: 2,
  AuthorityChange: 3,
};

export {
  PID,
  EVENT,
  WS_STATE,
  MSG_TYPE,
  SYNC_CHAT,
  ERROR_CODE,
  SEND_STATE,
  READ_STATE,
  GROUP_TYPE,
  HANDLE_TYPE,
  GROUP_EVENT,
  GROUP_ACTION,
  OPERATION_TYPE,
  IM_LOGIN_STATE,
  CHAT_UPDATE_EVENT,
  LOCAL_MESSAGE_TYPE,
  LOCAL_OPERATION_TYPE,
  LOCAL_OPERATION_STATUS,
};
