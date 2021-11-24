import Dexie from "dexie";
import { WS_STATE, SYNC_CHAT, IM_LOGIN_STATE } from "./sdkTypes";

const DBName = "imWsDB";
var db = null;
let version = 1;
let sdkKey = "msimSdkInfo";
let storageSdkInfo = "im_msimSdkInfo";
let storageChatHistory = "im_chatHistory";
let storageChatList = "im_chatList";
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

let localDexie = {
  isInit: false,
};

function toRawType(value) {
  var _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1);
}
function defaultStorage(key, storage) {
  switch (key) {
    case storageSdkInfo:
      if (toRawType(storage) !== "Object") {
        storage = null;
      }
      break;
    case storageChatHistory:
    case storageChatList:
      if (toRawType(storage) !== "Array") {
        storage = [];
      }
      break;
  }
  return storage;
}
function parseJson(key) {
  try {
    let storage = window.localStorage.getItem(key);
    storage = JSON.parse(storage);
    return defaultStorage(key, storage);
  } catch {
    return defaultStorage(key, null);
  }
}

function setStorage(key, obj) {
  window.localStorage.setItem(key, JSON.stringify(obj));
}

localDexie.initDB = function(callback) {
  let indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  if (indexedDB) {
    db = new Dexie(DBName);
    db.version(version).stores(schemas);
    //打开数据库时，会判断当前version值是否大于已经存在的version值，若大于则会upgrade即升到最高版本
    db.open()
      .then((result) => {
        //打开成功后
        version = db.verno;
        callback();
      })
      .catch((err) => {
        db = null;
        callback();
        console.warn(err);
      });
  } else {
    callback();
  }
};

// 删除数据库
localDexie.deleteDB = function() {
  if (db && db.isOpen()) {
    Dexie.delete(DBName);
  } else {
    window.localStorage.removeItem(storageSdkInfo);
    window.localStorage.removeItem(storageChatHistory);
    window.localStorage.removeItem(storageChatList);
  }
};

// 清空所有数据
localDexie.clear = function() {
  if (db && db.isOpen()) {
    db.transaction("rw", db.tables, () => {
      db.tables.forEach((table) => {
        table.clear();
      });
    });
  } else {
    window.localStorage.removeItem(storageSdkInfo);
    window.localStorage.removeItem(storageChatHistory);
    window.localStorage.removeItem(storageChatList);
  }
};

/** sdk信息表操作 */
// 更新信息表
localDexie.updateInfo = function(info) {
  if (db && db.isOpen()) {
    db.sdkInfo.update(sdkKey, info);
  } else {
    let sdkInfo = parseJson(storageSdkInfo);
    setStorage(storageSdkInfo, Object.assign({}, sdkInfo, info));
  }
};
localDexie.getInfo = function() {
  return db && db.isOpen()
    ? db.sdkInfo.get(sdkKey)
    : Promise.resolve(parseJson(storageSdkInfo));
};
localDexie.initInfo = function() {
  let infoBase = {
    sdkKeys: sdkKey,
    loginState: IM_LOGIN_STATE.NOT_LOGIN,
    chatsSync: SYNC_CHAT.NOT_SYNC_CHAT,
    connState: WS_STATE.NET_STATE_DISCONNECTED,
  };
  if (db && db.isOpen()) {
    db.sdkInfo.put(infoBase);
  } else {
    setStorage(storageSdkInfo, infoBase);
  }
};

/**会话表操作 */
// 写入会话列表
localDexie.addChatList = (chats) => {
  if (db && db.isOpen()) {
    db.chatList.bulkPut(chats);
  } else {
    let chatList = parseJson(storageChatList);
    chatList = chatList.concat(chats);
    setStorage(storageChatList, chatList);
  }
};

// 更新会话
localDexie.updateChat = function(data) {
  if (db && db.isOpen()) {
    return db.chatList.put(data);
  } else {
    let chatList = parseJson(storageChatList);
    let newChat = data;
    chatList = chatList.map((chat) => {
      if (chat.conversationID === data.conversationID) {
        newChat = Object.assign(chat, data);
      }
      return chat;
    });
    setStorage(storageChatList, chatList);
    return Promise.resolve(newChat);
  }
};

//获取会话列表
localDexie.getChatList = function() {
  if (db && db.isOpen()) {
    return db.chatList
      .toCollection()
      .and((item) => item.deleted === false)
      .toArray();
  } else {
    let chatList = parseJson(storageChatList);
    chatList = chatList.filter((chat) => chat.deleted === false);
    return Promise.resolve(chatList);
  }
};

//获取会话
localDexie.getChat = function(conversationID) {
  if (db && db.isOpen()) {
    return db.chatList.get({
      conversationID: conversationID,
    });
  } else {
    let chatList = parseJson(storageChatList);
    let findChat = chatList.find(
      (chat) => chat.conversationID === conversationID
    );
    return Promise.resolve(findChat);
  }
};

/** 以查看会话表 */
// 写入查看会话
localDexie.addChatKey = function(conversationID) {
  if (db && db.isOpen()) {
    db.chatHistory.put({
      conversationID: conversationID,
    });
  } else {
    let chatHistory = parseJson(storageChatHistory);
    let findChat = chatHistory.find(
      (item) => item.conversationID === conversationID
    );
    if (!findChat) {
      chatHistory.push({
        conversationID: conversationID,
      });
      setStorage(storageChatHistory, chatHistory);
    }
  }
};
// 是否获取过
localDexie.getChatKeys = function() {
  if (db && db.isOpen()) {
    return db.chatHistory.toArray();
  } else {
    return Promise.resolve(parseJson(storageChatHistory));
  }
};

/**消息表操作 */
// 写入消息列表
localDexie.addMsgList = function(msgs) {
  db?.msgList.bulkPut(msgs);
};

//获取消息列表
localDexie.getMsgList = function(defaultOption) {
  if (db === null || db.isOpen() === false) {
    return Promise.resolve([]);
  }
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
  db?.msgList.put(msg);
};

// 更新消息
localDexie.updateMsg = function(msg) {
  db?.msgList
    .where({
      conversationID: msg.conversationID,
      msgId: msg.msgId,
    })
    .modify(msg);
};

// 删除
localDexie.deleteMsgs = function(conversationID, msgids) {
  if (msgids) {
    db?.msgList
      .toCollection()
      .and(
        (msg) =>
          msg.conversationID === conversationID &&
          msgids.includes(msg.msgId.toString())
      )
      .delete();
  } else {
    db?.msgList
      .where({
        conversationID: conversationID,
      })
      .delete();
  }
};

export default localDexie;
