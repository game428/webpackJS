import Dexie from 'dexie';

const DBName = 'imWsDB';
var db = null;
var version = 1;
let schemas = {};
let chatKeys = [
  "&chatId",
  "uid", // 用户Id
  "msgEnd", // 最后一条消息id
  "msgLastRead", // 最后一条标记为已读的消息id
  "showMsgType", // 最后一条消息类型 仅websocket端 返回
  "showMsg", // 最后一条消息内容 仅websocket端 返回
  "showMsgTime", // 最后一条消息服务器时间
  "showTime", // 最后一条消息客户端显示时间
  "unread", // 未读消息数
  "matched", // 是否是matched
  "newMsg", // 是否以newmessage显示
  "myMove", // 是否显示my move
  "iceBreak", // 是否要显示破冰文案
  "tipFree", // 是否要显示 xx can reply you for free/ you can reply xx for free
  "topAlbum", // 是否要显示顶部tool bar 相册
  "iBlockU", // 我是否把你block了
  "connected", // 双方互发过消息 （业务方的 realchat）
  "deleted", // 该会话已删除
]
let msgKeys = [
  "&onlyId", // 拼接唯一id
  "chatId", // 所属会话id
  "fromUid", // 发送方用户ID
  "toUid", // 接收方用户ID
  "msgId", // 消息id
  "msgTime", // 消息时间（以服务器为准 精确到百万分之一秒的时间戳）
  "showMsgTime", // 消息时间（以服务器为准 精确到毫秒的时间戳）
  "sendStatus", // 消息发送状态
  "text", // 文本消息，消息内容
  "url", // 图片消息，图片路径
  "path", // 图片消息，图片本地路径
  "file", // 图片消息，图片file对象
  "type", // 消息类型
  "title", // 消息标题
  "thumb", // 封面图
  "width", // 封面图的宽度
  "height", // 封面图的高度
  "duration", // 时长
  "lat", // 维度
  "lng", // 经度
  "zoom", // 地图缩放层级
  "data", // 未定义type，传输的body
  "sput", // sender_profile_update_time 发送人的profile更新时间（精确到秒的时间戳）
  "newMsg", //是否显示 new message
]
schemas['chatList'] = chatKeys.join();
schemas['msgList'] = msgKeys.join();

let localDexie = {};

localDexie.initDB = () => {
  try {
    return new Promise(((resolve, reject) => {
      let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      if (!indexedDB) {
        reject()
      }
      db = new Dexie(DBName);
      db.version(version).stores(schemas);
      //打开数据库时，会判断当前version值是否大于已经存在的version值，若大于则会upgrade即升到最高版本
      db.open().then(result => {
        //打开成功后
        version = db.verno;
        resolve(db);
      }).catch(err => {
        reject(err);
      });
    }));
  } catch (err) {
    reject(err);
  }
}

// 删除数据库
localDexie.deleteDB = function () {
  db.delete()
}

// 清空所有数据
localDexie.clear = function () {
  if (db.tables.length) {
    db.transaction('rw', db.tables, () => {
      db.tables.forEach(table => {
        table.clear();
      });
    })
  }
}

// 写入会话列表
localDexie.addChatList = (chats) => {
  db.chatList.bulkPut(chats)
}

// 更新会话
localDexie.updateChat = function (data) {
  db.chatList.put(data);
}

//获取会话列表
localDexie.getChatList = function () {
  return db.chatList.toArray()
}

//获取会话
localDexie.getChat = function (uid, callback) {
  return db.chatList.where({
    "uid": uid,
  }).toArray()
};

// 写入消息列表
localDexie.addMsgList = function (msgs) {
  db.msgList.bulkPut(msgs)
}

//获取消息列表
localDexie.getMsgList = function (chatId, callback) {
  return db.msgList.where({
    "chatId": chatId
  }).toArray()
};

// 写入消息
localDexie.addMsg = function (msg) {
  db.msgList.put(msg);
}

// 更新消息
localDexie.updateMsg = function (msg) {
  db.msgList.put(msg);
}

export default localDexie;