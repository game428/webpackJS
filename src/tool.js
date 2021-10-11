import {
  WS_STATE,
  MSG_TYPE,
  ERROR_CODE,
  SEND_STATE,
  OPERATION_TYPE,
  IM_LOGIN_STATE,
} from "./sdkTypes.js";

// 按时间排序
function sort(array, key) {
  let newArr = array.sort((pre, next) => {
    return next[key] - pre[key];
  });
  return newArr;
}

// 获取分页
function getPageSize(val, key, arr, pageSize) {
  if (!val) return arr;
  if (!arr?.length) return [];
  let index = arr.findIndex((item) => item[key] === val);
  if (index !== -1 && index !== arr.length - 1) {
    return arr.slice(index + 1, index + 1 + pageSize);
  } else {
    return [];
  }
}

// 生成uuid
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}

// 是否为字符串切存在
function isNotString(str, empty) {
  if (!empty) {
    return typeof str !== "string" || str === "";
  } else {
    return typeof str !== "string";
  }
}

// 是否为数字类型
function isNotNumer(num, empty) {
  if (!empty) {
    return typeof num !== "number";
  } else {
    return typeof num !== "number" || num === 0;
  }
}

// 是否字节超长
function isNotSize(str, maxSize) {
  let size = new Blob([str], {
    type: "application/json",
  }).size;
  return size > (maxSize || 3 * 1024);
}

// 是否为空
function isNotEmpty(str) {
  return str === null || str === undefined;
}

// 是否为网络地址
function isNotHttp(str) {
  return (
    typeof str !== "string" ||
    (str.indexOf("http://") !== 0 && str.indexOf("https://") !== 0)
  );
}

// 是否为ws连接
function isNotWs(str) {
  return (
    typeof str !== "string" ||
    (str.indexOf("ws://") !== 0 && str.indexOf("wss://") !== 0)
  );
}

// 类型是否为对象，切某个key存在
function isNotObject(obj, key, type) {
  if (typeof obj !== "object") {
    return true;
  }
  if (key) {
    switch (type) {
      case "string":
        return isNotString(obj[key]);
      case "number":
        return isNotNumer(obj[key]);
      case "http":
        return isNotHttp(obj[key]);
      case "ws":
        return isNotWs(obj[key]);
      default:
        return isNotEmpty(obj[key]);
    }
  }
}

// 参数为空提示文本
function emptyTip(key) {
  return `${key}参数类型错误或不存在`;
}

// 生成onlyId
function createOnlyId(conversationID, sign) {
  return `${conversationID}_${sign}`;
}

// 生成sign
function createSign(date) {
  return Math.round((date || new Date().getTime() + Math.random()) * 1000);
}

// 失败回调参数
function resultErr(msg, name, code) {
  return {
    name: name,
    code: code || ERROR_CODE.ERROR,
    msg: msg,
  };
}

// 失败回调参数
function serverErr(data, name) {
  return {
    name: name,
    code: data.code || ERROR_CODE.ERROR,
    msg: data.msg,
  };
}

// 参数错误
function parameterErr(options) {
  return {
    code: ERROR_CODE.PARAMETER,
    name: options.name,
    msg: options.msg || emptyTip(options.key),
  };
}

// 成功回调参数
function resultSuc(name, data) {
  return {
    code: ERROR_CODE.SUCCESS,
    name: name,
    data: JSON.parse(JSON.stringify(data)),
  };
}

// 通知回调参数
function resultNotice(name, data, code) {
  return {
    name: name,
    code: code || ERROR_CODE.SUCCESS,
    data: JSON.parse(JSON.stringify(data)),
  };
}

// 创建消息基础属性
function msgBase(toUid, fromUid) {
  let time = new Date().getTime();
  let sign = createSign(time);
  let conversationID = splicingC2CId(toUid);
  let onlyId = createOnlyId(conversationID, sign);
  return {
    onlyId: onlyId,
    conversationID: conversationID,
    toUid: toUid,
    fromUid: fromUid,
    msgId: 0,
    showMsgTime: time,
    sendStatus: SEND_STATE.BFIM_MSG_STATUS_SENDING,
  };
}

// 拼接单聊conversationID
function splicingC2CId(uid) {
  return "C2C_" + uid;
}

// 反格式化单聊conversationID
function reformatC2CId(conversationID) {
  return conversationID.slice(4);
}

// 把消息转为本地格式
function formatMsg(msg, conversationID) {
  let newMsg = {
    conversationID: conversationID,
    fromUid: msg.fromUid,
    toUid: msg.toUid,
    type: msg.type,
    msgId: msg.msgId,
    newMsg: msg.newMsg,
    sendStatus: SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  };
  newMsg.onlyId =
    msg.onlyId || createOnlyId(conversationID, msg.sign || msg.msgTime);
  newMsg.showMsgTime = parseInt(msg.msgTime / 1000) || msg.showMsgTime;
  switch (newMsg.type) {
    case MSG_TYPE.Recall:
      newMsg.text = msg.body;
      break;
    case MSG_TYPE.Revoked:
      newMsg.text = msg.body;
      break;
    case MSG_TYPE.Text:
      newMsg.text = msg.body;
      break;
    case MSG_TYPE.Img:
      newMsg.accId = msg.accId;
      newMsg.url = msg.body;
      newMsg.height = msg.height;
      newMsg.width = msg.width;
      break;
    case MSG_TYPE.Audio:
      newMsg.accId = msg.accId;
      newMsg.url = msg.body;
      newMsg.duration = msg.duration;
      break;
    case MSG_TYPE.Video:
      newMsg.accId = msg.accId;
      newMsg.url = msg.body;
      newMsg.thumb = msg.thumb;
      newMsg.height = msg.height;
      newMsg.width = msg.width;
      newMsg.duration = msg.duration;
      break;
    case MSG_TYPE.Location:
      newMsg.title = msg.title;
      newMsg.lat = msg.lat;
      newMsg.lng = msg.lng;
      newMsg.zoom = msg.zoom;
      break;
    case MSG_TYPE.Notification:
      newMsg.content = msg.body;
      break;
    default:
      newMsg.accId = msg.accId;
      newMsg.content = msg.body;
      newMsg.thumb = msg.thumb;
      newMsg.height = msg.height;
      newMsg.width = msg.width;
      newMsg.duration = msg.duration;
      break;
  }
  return newMsg;
}

// 把会话转为本地格式
function formatChat(chat, uid) {
  let localChat = { ...chat };
  delete localChat.sign;
  localChat.showTime = parseInt(chat.showMsgTime / 1000);
  localChat.conversationID = splicingC2CId(chat.uid);
  if (chat.msgEnd) localChat.showMsgFromUid = chat.myMove ? chat.uid : uid;
  return localChat;
}

// 创建只读代理对象
function readProxy(obj, options) {
  let handler = {
    get: (obj, prop) => {
      return obj[prop];
    },
    set: (obj, prop, value) => {
      console.error(`不允许修改${prop}属性`);
    },
    deleteProperty: (obj, prop) => {
      console.error(`不允许删除${prop}属性`);
      return false;
    },
  };
  if (typeof options === "object") {
    Object.assign(handler, options);
  }
  return new Proxy(obj, handler);
}

// 注册回调事件
function createCallEvent(Global, options) {
  Global.callEvents[options.callSign] = {
    tabId: Global.tabId,
    type: options.type,
    timeOut: new Date().getTime() + Global.timeOut,
    callSuc: (res) => {
      delete Global.callEvents[options.callSign];
      options.callSuc && options.callSuc(res);
    },
    callErr: (err) => {
      delete Global.callEvents[options.callSign];
      options.callErr && options.callErr(err);
    },
  };
}

// 公共判断
function preJudge(Global, reject) {
  if (Global.curTab && Global.connState !== WS_STATE.NET_STATE_CONNECTED) {
    let errResult = resultErr("未连接", "wsConnect", ERROR_CODE.DISCONNECT);
    reject ? reject(errResult) : console.error(errResult);
    return false;
  } else if (Global.loginState === IM_LOGIN_STATE.NOT_LOGIN) {
    let errResult = resultErr(
      "IMSDK未登录",
      OPERATION_TYPE.Login,
      ERROR_CODE.NOLOGIN
    );
    reject ? reject(errResult) : console.error(errResult);
    return false;
  }
  return true;
}

export default {
  getPageSize,
  sort,
  uuid,
  isNotString,
  isNotNumer,
  isNotObject,
  isNotEmpty,
  isNotSize,
  isNotHttp,
  isNotWs,
  createOnlyId,
  createSign,
  resultErr,
  serverErr,
  parameterErr,
  resultSuc,
  resultNotice,
  msgBase,
  splicingC2CId,
  reformatC2CId,
  formatMsg,
  formatChat,
  emptyTip,
  readProxy,
  createCallEvent,
  preJudge,
};
