import Dexie from "dexie";
import { WS_STATE, SYNC_CHAT, IM_LOGIN_STATE } from "./sdkTypes";

const DBName = "imWsDB";
var db = null;
let version = 1;
let sdkKey = "msimSdkInfo";
let chatKeys = [
  "&conversationID",
  "uid", // 用户Id
  "msgEnd", // 收到的最后一条消息id
  "msgLastRead", // 最后一条标记为已读的消息id
  "showMsgId", // 显示的最后一条消息Id
  "showMsgType", // 显示的最后一条消息类型 仅websocket端 返回
  "showMsg", // 显示的最后一条消息内容 仅websocket端 返回
  "showMsgTime", // 显示的最后一条消息服务器时间
  "showTime", // 显示的最后一条消息客户端显示时间
  "showMsgFromUid", // 显示的最后一条消息的发送方id
  "unread", // 未读消息数
  "matched", // 是否是matched
  "newMsg", // 是否以newmessage显示
  "myMove", // 是否显示my move
  "iceBreak", // 是否要显示破冰文案
  "tipFree", // 是否要显示 xx can reply you for free/ you can reply xx for free
  "topAlbum", // 是否要显示顶部tool bar 相册
  "iBlockU", // 我是否把你block了
  "iChatU", // 我给你发过消息了
  "uChatI", // 你给我发过消息了
  "deleted", // 该会话已删除
];
let msgKeys = [
  "&onlyId", // 拼接唯一id
  "conversationID", // 所属会话id
  "fromUid", // 发送方用户ID
  "toUid", // 接收方用户ID
  "msgId", // 消息id
  "msgTime", // 消息时间（以服务器为准 精确到百万分之一秒的时间戳）
  "showMsgTime", // 消息时间（以服务器为准 精确到毫秒的时间戳）
  "sendStatus", // 消息发送状态
  "text", // 文本消息，消息内容
  "url", // 图片消息，图片路径
  "type", // 消息类型
  "thumb", // 封面图
  "width", // 封面图的宽度
  "height", // 封面图的高度
  "duration", // 时长
  "title", // 消息标题
  "lat", // 纬度
  "lng", // 经度
  "zoom", // 地图缩放层级
  "content", // 未定义type，传输的body
  "sput", // sender_profile_update_time 发送人的profile更新时间（精确到秒的时间戳）
  "newMsg", //是否显示 new message
];
let chatIdKeys = [
  "&conversationID", // 唯一id
];
let sdkInfoKeys = [
  "&sdkKeys", // 唯一id
  "chatsSync",
  "loginState",
  "connState",
  "wsUrl",
  "imToken",
  "subAppId",
  "uid",
];

let schemas = {
  chatList: chatKeys.join(), // 会话表
  msgList: msgKeys.join(), // 消息表
  chatHistory: chatIdKeys.join(), // 以获取过消息的会话表
  sdkInfo: sdkInfoKeys.join(), // sdk信息表
};

let localDexie = {};

localDexie.initDB = function() {
  try {
    let indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    if (!indexedDB) return console.error("浏览器不支持indexDB");
    db = new Dexie(DBName);
    db.version(version).stores(schemas);
    //打开数据库时，会判断当前version值是否大于已经存在的version值，若大于则会upgrade即升到最高版本
    db.open()
      .then((result) => {
        //打开成功后
        version = db.verno;
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (err) {
    console.error(err);
  }
};

// 删除数据库
localDexie.deleteDB = function() {
  Dexie.delete(DBName);
};

// 清空所有数据
localDexie.clear = function() {
  if (!db?.tables?.length) return;
  db.transaction("rw", db.tables, () => {
    db.tables.forEach((table) => {
      table.clear();
    });
  });
};

/** sdk信息表操作 */
// 更新信息表
localDexie.updateInfo = function(info) {
  return db.sdkInfo.update(sdkKey, info);
};
localDexie.getInfo = function() {
  return db.sdkInfo.get(sdkKey);
};
localDexie.initInfo = function() {
  db.sdkInfo.put({
    sdkKeys: sdkKey,
    loginState: IM_LOGIN_STATE.NOT_LOGIN,
    chatsSync: SYNC_CHAT.NOT_SYNC_CHAT,
    connState: WS_STATE.NET_STATE_DISCONNECTED,
  });
};

/**会话表操作 */
// 写入会话列表
localDexie.addChatList = (chats) => {
  db.chatList.bulkPut(chats);
};

// 更新会话
localDexie.updateChat = function(data) {
  return db.chatList.put(data);
};

//获取会话列表
localDexie.getChatList = function() {
  return db.chatList
    .toCollection()
    .and((item) => item.deleted === false)
    .toArray();
};

//获取会话
localDexie.getChat = function(conversationID) {
  return db.chatList.get({
    conversationID: conversationID,
  });
};

/** 以查看会话表 */
// 写入查看会话
localDexie.addChatKey = function(conversationID) {
  db.chatHistory.put({
    conversationID: conversationID,
  });
};
// 是否获取过
localDexie.getChatKeys = function() {
  return db.chatHistory.toArray();
};

/**消息表操作 */
// 写入消息列表
localDexie.addMsgList = function(msgs) {
  db.msgList.bulkPut(msgs);
};

//获取消息列表
localDexie.getMsgList = function(defaultOption) {
  if (!defaultOption.msgEnd) {
    return db.msgList
      .where({
        conversationID: defaultOption.conversationID,
      })
      .sortBy("msgId");
  } else {
    return db.msgList
      .toCollection()
      .and(
        (msg) =>
          msg.conversationID === defaultOption.conversationID &&
          msg.msgId < defaultOption.msgEnd
      )
      .sortBy("msgId");
  }
};

// 写入消息
localDexie.addMsg = function(msg) {
  return db.msgList.put(msg);
};

// 获取指定消息
localDexie.getMsg = function(msg) {
  return db.msgList.get({
    conversationID: msg.conversationID,
    msgId: msg.msgId,
  });
};

// 更新消息
localDexie.updateMsg = function(msg) {
  if (msg.onlyId) {
    return db.msgList.put(msg);
  } else {
    return db.msgList
      .where({
        fromUid: msg.fromUid,
        toUid: msg.toUid,
        msgId: msg.msgId,
      })
      .modify(msg);
  }
};

// 删除
localDexie.deleteMsgs = (conversationID, msgids) => {
  if (msgids) {
    return db.msgList
      .toCollection()
      .and(
        (msg) =>
          msg.conversationID === conversationID &&
          msgids.includes(msg.msgId.toString())
      )
      .delete();
  } else {
    return db.msgList
      .where({
        conversationID: conversationID,
      })
      .delete();
  }
};

export default localDexie;
