let localDb = {
  dbName: 'imWsDB',
  db: null,
};
localDb.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
localDb.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
localDb.IDBCursor = window.IDBCursor || window.webkitIDBCursor;
localDb.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
localDb.indexedDB.onerror = function (e) {
  console.log("Database error: " + e.target.errorCode);
};

/** 打开或创建数据库
 * @param {function} callback 打开成功回调
 * @param {*} reject 打开失败回调
 */
localDb.openDB = function (callback, reject) {
  console.log("init IndexDB");
  try {
    var openRequest = localDb.indexedDB.open(localDb.dbName);
    openRequest.onerror = function (e) {
      reject(e);
    };
    openRequest.onsuccess = (evt) => {
      onsuccess(evt, callback);
    };
    openRequest.onupgradeneeded = (evt) => {
      onupgradeneeded(evt, callback);
    };
  } catch (e) {
    reject(e);
  }
}

/** 打开或创建数据库成功
 */
function onsuccess(evt, callback) {
  localDb.db = evt.target.result;
  callback("数据库打开成功");
  localDb.db.onversionchange = function () {
    console.log("DB close");
    localDb.db.close();
  };
}

/** 更新或创建数据库成功
 * 
 * @param {Object} evt 
 */
function onupgradeneeded(evt) {
  localDb.db = evt.target.result;
  createChatList();
  createMsgList();
}

// 创建会话列表
function createChatList() {
  if (localDb.db.objectStoreNames.contains('chatList')) return;
  var objectStore = localDb.db.createObjectStore('chatList', {
    keyPath: ['uid'],
    autoIncrement: false
  });
  // 用户id
  objectStore.createIndex('uid', 'uid', {
    unique: false
  });
  // 最后一条消息id
  objectStore.createIndex('msgEnd', 'msgEnd', {
    unique: false
  });
  // 最后一条标记为已读的消息id
  objectStore.createIndex('msgLastRead', 'msgLastRead', {
    unique: false
  });
  // 最后一条消息类型 仅websocket端 返回
  objectStore.createIndex('showMsgType', 'showMsgType', {
    unique: false
  });
  // 最后一条消息内容 仅websocket端 返回
  objectStore.createIndex('showMsg', 'showMsg', {
    unique: false
  });
  // 最后一条消息服务器时间
  objectStore.createIndex('showMsgTime', 'showMsgTime', {
    unique: false
  });
  // 最后一条消息客户端显示时间
  objectStore.createIndex('showTime', 'showTime', {
    unique: false
  });
  // 未读消息数
  objectStore.createIndex('unread', 'unread', {
    unique: false
  });
  // 是否是matched
  objectStore.createIndex('matched', 'matched', {
    unique: false
  });
  // 是否以newmessage显示
  objectStore.createIndex('newMsg', 'newMsg', {
    unique: false
  });
  // 是否显示my move
  objectStore.createIndex('myMove', 'myMove', {
    unique: false
  });
  // 是否要显示破冰文案
  objectStore.createIndex('iceBreak', 'iceBreak', {
    unique: false
  });
  // 是否要显示 xx can reply you for free/ you can reply xx for free
  objectStore.createIndex('tipFree', 'tipFree', {
    unique: false
  });
  // 是否要显示顶部tool bar 相册
  objectStore.createIndex('topAlbum', 'topAlbum', {
    unique: false
  });
  // 我是否把你block了。
  objectStore.createIndex('iBlockU', 'iBlockU', {
    unique: false
  });
  // 双方互发过消息 （业务方的 realchat）
  objectStore.createIndex('connected', 'connected', {
    unique: false
  });
  // 该会话已删除
  objectStore.createIndex('deleted', 'deleted', {
    unique: false
  });
}

// 创建消息列表
function createMsgList() {
  if (localDb.db.objectStoreNames.contains('msgList')) return;
  var objectStore = localDb.db.createObjectStore('msgList', {
    keyPath: 'onlyId',
    autoIncrement: false
  })
  // 拼接唯一id
  objectStore.createIndex('onlyId', 'onlyId', {
    unique: false
  });
  // 所属会话id
  objectStore.createIndex('chatId', 'chatId', {
    unique: false
  });
  // 搜索Id
  objectStore.createIndex('searchId', ['fromUid', 'toUid', 'msgId'], {
    unique: false
  });
  // 消息时间（以服务器为准 精确到百万分之一秒的时间戳）
  objectStore.createIndex('msgTime', 'msgTime', {
    unique: false
  });
  // 消息时间（以服务器为准 精确到毫秒的时间戳）
  objectStore.createIndex('showMsgTime', 'showMsgTime', {
    unique: false
  });
  // 消息发送状态
  objectStore.createIndex('sendStatus', 'sendStatus', {
    unique: false
  });
  // 文本消息，消息内容
  objectStore.createIndex('text', 'text', {
    unique: false
  });
  // 图片消息，图片路径
  objectStore.createIndex('url', 'url', {
    unique: false
  });
  // 图片消息，图片本地路径
  objectStore.createIndex('path', 'path', {
    unique: false
  });
  // 图片消息，图片file对象
  objectStore.createIndex('file', 'file', {
    unique: false
  });
  // sender_profile_update_time 发送人的profile更新时间（精确到秒的时间戳）
  objectStore.createIndex('sput', 'sput', {
    unique: false
  });
  // 是否显示 new message
  objectStore.createIndex('newMsg', 'newMsg', {
    unique: false
  });
  // 消息类型
  objectStore.createIndex('type', 'type', {
    unique: false
  });
  // 消息标题
  objectStore.createIndex('title', 'title', {
    unique: false
  });
  // 封面图
  objectStore.createIndex('thumb', 'thumb', {
    unique: false
  });
  // 封面图的宽度
  objectStore.createIndex('width', 'width', {
    unique: false
  });
  // 封面图的高度
  objectStore.createIndex('height', 'height', {
    unique: false
  });
  // 时长
  objectStore.createIndex('duration', 'duration', {
    unique: false
  });
  // 时长
  objectStore.createIndex('lat', 'lat', {
    unique: false
  });
  // 经度
  objectStore.createIndex('lng', 'lng', {
    unique: false
  });
  // 地图缩放层级
  objectStore.createIndex('zoom', 'zoom', {
    unique: false
  });
}

// 删除数据库
localDb.deleteDB = function () {
  localDb.indexedDB.deleteDatabase(localDb.dbName);
}

// 清空所有数据
localDb.clear = function () {
  let trans = localDb.db.transaction(localDb.db.objectStoreNames, "readwrite");
  let chatObj = trans.objectStore('chatList');
  let msgObj = trans.objectStore('msgList');
  chatObj.clear();
  msgObj.clear();
  trans.oncomplete = () => {
    console.log('清除数据库成功')
  };
}

// 写入会话列表
localDb.addChatList = function (data) {
  localDb.add(data, 'chatList')
}

// 更新会话
localDb.updateChat = function (data) {
  localDb.add([data], 'chatList')
}

// 写入消息列表
localDb.addMsgList = function (data) {
  localDb.add(data, 'msgList')
}

// 写入消息
localDb.addMsg = function (data) {
  localDb.add([data], 'msgList')
}

// 更新消息
localDb.updateMsg = function (data) {
  let keyRangeValue = IDBKeyRange.only([data.fromUid, data.toUid, data.msgId]);
  let transaction = localDb.db.transaction('msgList', "readwrite");
  let objectStore = transaction.objectStore('msgList');
  let index = objectStore.index("searchId");
  index.openCursor(keyRangeValue).onsuccess = function (event) {
    let cursor = event.target.result;
    if (cursor) {
      let newData = Object.assign(cursor.value, data)
      objectStore.put(newData)
    }
  };
}

/** 添加数据
 * 
 * @param {*} db 
 */
localDb.add = function (data, storeName) {
  try {
    if (localDb != null && localDb.db != null) {
      var transaction = localDb.db.transaction(storeName, "readwrite");
      var store = transaction.objectStore(storeName);
      data.forEach(obj => {
        // put 方法 如果数据库没有会自动自增，有则会更新
        store.put(obj);
      });
    }
  } catch (e) {
    console.log(e)
  }
}

//获取会话列表
localDb.getChatList = function (callback) {
  try {
    if (localDb != null && localDb.db != null) {
      var store = localDb.db.transaction(["chatList"], "readwrite").objectStore("chatList");
      var request = store.getAll();
      request.onsuccess = function (res) {
        var result = res.target.result;
        if (typeof result != 'undefined') {
          callback(result);
        } else {
          callback(null);
        }
      };
    }
  } catch (e) {
    console.log(e);
  }
};

//获取会话
localDb.getChat = function (uid, callback) {
  try {
    if (localDb != null && localDb.db != null) {
      var store = localDb.db.transaction(["chatList"], "readwrite").objectStore("chatList");
      let index = store.index("uid");
      var request = index.get(uid);
      request.onsuccess = function (res) {
        var result = res.target.result;
        if (typeof result != 'undefined') {
          callback(result);
        } else {
          callback(null);
        }
      };
    }
  } catch (e) {
    console.log(e);
  }
};

//获取消息列表
localDb.getMsgList = function (chatId, callback) {
  try {
    if (localDb != null && localDb.db != null) {
      var store = localDb.db.transaction(["msgList"], "readwrite").objectStore("msgList");
      let index = store.index("chatId");
      var request = index.getAll(chatId);
      request.onsuccess = function (res) {
        var result = res.target.result;
        console.log('搜查', result)
        if (typeof result != 'undefined') {
          callback(result);
        } else {
          callback(null);
        }

      };

    }
  } catch (e) {
    console.log(e);
  }
};

export default localDb;