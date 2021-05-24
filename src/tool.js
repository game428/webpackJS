import declare from './declare.js'

const tool = {
  uniq,
  getPageSize,
  sort,
  uuid,
  isNotString,
  isNotObject,
  isNotEmpty,
  isNotHttp,
  isNotWs,
  createOnlyId,
  createSign,
  resultErr,
  serverErr,
  parameterErr,
  resultSuc,
  resultNotice,
  isSo,
  msgBase,
  splicingSingleId,
  formatMsg,
};

// 数组去重
function uniq(array, key) {
  let newArr = [];
  let repeatArr = [];
  let set = new Set();
  array.forEach(item => {
    if (set.has(item[key])) return;
    set.add(item[key]);
    newArr.push(item);
  });
  return {
    newArr,
    repeatArr,
  };
}

// 按时间排序
function sort(array, key) {
  let newArr = array.sort((pre, next) => {
    return next[key] - pre[key];
  })
  return newArr;
}

// 获取分页
function getPageSize(val, key, arr) {
  if (!val) return arr;
  if (!arr || arr.length === 0) return [];
  let index = arr.findIndex(item => item[key] === val);
  return arr.slice(index + 1);
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
function isNotString(str) {
  return typeof str !== 'string' || str === '';
}

// 是否为空
function isNotEmpty(str) {
  return str === null || str === undefined;
}

// 是否为网络地址
function isNotHttp(str) {
  return typeof str !== 'string' || (str.indexOf('http://') !== 0 && str.indexOf('https://') !== 0);
}

// 是否为ws连接
function isNotWs(str) {
  return typeof str !== 'string' || (str.indexOf('ws://') !== 0 && str.indexOf('wss://') !== 0);
}

// 类型是否为对象，切某个key存在
function isNotObject(obj, key) {
  if (key) {
    return typeof obj !== 'object' || obj[key] === null || obj[key] === undefined || obj[key] === '';
  } else {
    return typeof obj !== 'object';
  }
}

// 生成onlyId
function createOnlyId(fromUid, sign) {
  return `${fromUid}_${sign}`;
}

// 生成sign
function createSign(date) {
  let callSign;
  if (date) {
    callSign = (date * 1000);
  } else {
    callSign = (new Date().getTime() * 1000);
  }
  return callSign;
}

// 失败回调参数
function resultErr(msg, name, code) {
  return {
    code: code || declare.ERROR_CODE.ERROR,
    name: name,
    msg: JSON.parse(JSON.stringify(msg)),
  }
}

// 失败回调参数
function serverErr(data, name) {
  return {
    name: name,
    code: data.code || declare.ERROR_CODE.ERROR,
    msg: data.msg,
  }
}

// 参数错误
function parameterErr(msg, name) {
  return {
    code: declare.ERROR_CODE.PARAMETER,
    name: name,
    msg: msg,
  }
}

// 成功回调参数
function resultSuc(name, data) {
  return {
    code: declare.ERROR_CODE.SUCCESS,
    name: name,
    data: JSON.parse(JSON.stringify(data)),
  }
}

// 通知回调参数
function resultNotice(name, data) {
  return {
    "name": name,
    "data": JSON.parse(JSON.stringify(data)),
  }
}

// 是否为可见消息
function isSo(type) {
  return type < 64 || (type > 99 && type < 200);
}

// 创建消息基础属性
function msgBase(toUid, fromUid) {
  let time = new Date().getTime();
  let sign = createSign(time);
  let chatId = splicingSingleId(toUid);
  let onlyId = createOnlyId(fromUid, sign);
  return {
    onlyId: onlyId,
    chatId: chatId,
    toUid: toUid,
    fromUid: fromUid,
    msgId: 0,
    showMsgTime: time,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SENDING,
  }
}

// 拼接单聊chatId
function splicingSingleId(uid) {
  return 'single_' + uid;
}

// 把消息转为本地格式
function formatMsg(msg, uid) {
  let newMsg = msg;
  let msgTime = newMsg.msgTime;
  if (!newMsg.sign) {
    newMsg.sign = msgTime
  }
  if (uid == msg.fromUid) {
    msgTime = newMsg.sign;
  }
  let chatId = splicingSingleId(uid);
  let onlyId = createOnlyId(msg.fromUid, newMsg.sign);
  newMsg.showMsgTime = parseInt(msgTime / 1000);
  newMsg.chatId = chatId;
  newMsg.onlyId = onlyId;
  newMsg.sendStatus = declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
  switch (newMsg.type) {
    case declare.MSG_TYPE.Text:
      newMsg.text = newMsg.body;
      break;
    case declare.MSG_TYPE.Img:
      newMsg.url = newMsg.body;
      newMsg.progress = 100;
      break;
    case declare.MSG_TYPE.Audio:
      newMsg.url = newMsg.body;
      newMsg.progress = 100;
    case declare.MSG_TYPE.Video:
      newMsg.url = newMsg.body;
      newMsg.progress = 100;
      break;
    case declare.MSG_TYPE.Custom:
      newMsg.data = newMsg.body;
      break;
    default:
      newMsg.data = newMsg.body;
      break;
  }
  return newMsg;
}

export default tool;