import declare from './declare.js'

const tool = {
  uniq,
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
  isSo,
  msgBase,
  splicingC2CId,
  reformatC2CId,
  formatMsg,
  emptyTip,
  readProxy,
  createCallEvent,
  preJudge,
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
function getPageSize(val, key, arr, pageSize) {
  if (!val) return arr;
  if (!arr || arr.length === 0) return [];
  let index = arr.findIndex(item => item[key] === val);
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
    return typeof str !== 'string' || str === '';
  } else {
    return typeof str !== 'string';
  }
}

// 是否为数字类型
function isNotNumer(num, empty) {
  if (!empty) {
    return typeof num !== 'number';
  } else {
    return typeof num !== 'number' || num === 0;
  }
}

// 是否字节超长
function isNotSize(str, maxSize) {
  let size = new Blob([str], {
    type: 'application/json'
  }).size;
  return size > (maxSize || 3 * 1024);
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
function isNotObject(obj, key, type) {
  if (typeof obj !== 'object') {
    return true;
  }
  if (key) {
    switch (type) {
      case 'string':
        return isNotString(obj[key]);
      case 'number':
        return isNotNumer(obj[key]);
      case 'http':
        return isNotHttp(obj[key]);
      case 'ws':
        return isNotWs(obj[key]);
      default:
        return isNotEmpty(obj[key])
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
    name: name,
    code: code || declare.ERROR_CODE.ERROR,
    msg: msg,
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
function parameterErr(options) {
  return {
    code: declare.ERROR_CODE.PARAMETER,
    name: options.name,
    msg: options.msg || emptyTip(options.key),
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
function resultNotice(name, data, code) {
  return {
    "name": name,
    "code": code || declare.ERROR_CODE.SUCCESS,
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
  let conversationID = splicingC2CId(toUid);
  let onlyId = createOnlyId(conversationID, sign);
  return {
    onlyId: onlyId,
    conversationID: conversationID,
    toUid: toUid,
    fromUid: fromUid,
    msgId: 0,
    showMsgTime: time,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SENDING,
  }
}

// 拼接单聊conversationID
function splicingC2CId(uid) {
  return 'C2C_' + uid;
}

// 反格式化单聊conversationID
function reformatC2CId(conversationID) {
  return conversationID.slice(4);
}

// 把消息转为本地格式
function formatMsg(msg, conversationID) {
  let newMsg = msg;
  let msgTime = newMsg.msgTime;
  if (!newMsg.sign) {
    newMsg.sign = msgTime
  }
  let onlyId = createOnlyId(conversationID, newMsg.sign);
  newMsg.showMsgTime = parseInt(msgTime / 1000);
  newMsg.conversationID = conversationID;
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
      break;
    case declare.MSG_TYPE.Video:
      newMsg.url = newMsg.body;
      newMsg.progress = 100;
      break;
    case declare.MSG_TYPE.Custom:
      newMsg.content = newMsg.body;
      break;
    default:
      newMsg.content = newMsg.body;
      break;
  }
  return newMsg;
}

// 创建只读代理对象
function readProxy(obj, options) {
  let handler = {
    get: (obj, prop) => {
      return obj[prop];
    },
    set: (obj, prop, value) => {
      console.error(`不允许修改${prop}属性`)
    },
    deleteProperty: (obj, prop) => {
      console.error(`不允许删除${prop}属性`)
      return false;
    }
  };
  if (typeof options === 'object') {
    Object.assign(handler, options);
  }
  return new Proxy(obj, handler)
}

// 注册回调事件
function createCallEvent(Global, options) {
  Global.callEvents[options.callSign] = {
    "tabId": Global.tabId,
    "type": options.type,
    "callSuc": (res) => {
      delete Global.callEvents[options.callSign];
      options.callSuc && options.callSuc(res);
    },
    "callErr": (err) => {
      delete Global.callEvents[options.callSign];
      options.callErr && options.callErr(err)
    },
  }
}

// 公共判断
function preJudge(Global, reject) {
  if (Global.curTab && Global.connState !== declare.WS_STATE.Connect) {
    let errResult = tool.resultErr('未连接', 'wsConnect', declare.ERROR_CODE.DISCONNECT)
    reject ? reject(errResult) : console.error(errResult);
    return false;
  } else if (Global.loginState === declare.IM_LOGIN_STATE.NotLogin) {
    let errResult = tool.resultErr('IMSDK未登录', declare.OPERATION_TYPE.Login, declare.ERROR_CODE.NOLOGIN)
    reject ? reject(errResult) : console.error(errResult);
    return false;
  }
  return true;
}

export default tool;