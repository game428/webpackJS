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
  return `${key} parameter type is wrong or does not exist`;
}

// 生成onlyId
function createOnlyId(conversationID, fromUid, sign) {
  return `${conversationID}_${fromUid}_${sign}`;
}

// 生成sign
function createSign(date) {
  return Math.round((date || Date.now() + Math.random()) * 1000);
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
  let time = Date.now();
  let msg = {
    fromUid: fromUid,
    msgId: 0,
    toUid: toUid,
    showMsgTime: time,
    sendStatus: SEND_STATE.BFIM_MSG_STATUS_SENDING,
  };
  msg.conversationID = splicingC2CId(toUid);
  let sign = createSign(time);
  msg.onlyId = createOnlyId(msg.conversationID, fromUid, sign);
  return msg;
}

// 拼接单聊conversationID
function splicingC2CId(uid) {
  return "C2C_" + uid;
}

// 反格式化单聊conversationID
function reformatC2CId(conversationID) {
  return parseInt(conversationID.slice(4));
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
    msgTime: msg.msgTime,
    sendStatus: SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  };
  newMsg.onlyId =
    msg.onlyId ||
    createOnlyId(conversationID, msg.fromUid, msg.sign || msg.msgTime);
  newMsg.showMsgTime = parseInt(msg.msgTime / 1000) || msg.showMsgTime;
  addMsgContent(msg, newMsg);
  return newMsg;
}

function addMsgContent(msg, newMsg) {
  switch (msg.type) {
    case MSG_TYPE.Text:
      newMsg.text = msg.body;
      break;
    case MSG_TYPE.Img:
      newMsg.url = msg.body;
      newMsg.height = msg.height;
      newMsg.width = msg.width;
      break;
    case MSG_TYPE.Audio:
      newMsg.url = msg.body;
      newMsg.duration = msg.duration;
      break;
    case MSG_TYPE.Video:
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
    case MSG_TYPE.Flash:
      newMsg.url = msg.body;
      newMsg.height = msg.height;
      newMsg.width = msg.width;
      if (msg.lat || msg.lng) {
        newMsg.fromRead = msg.lat === msg.fromUid || msg.lng === msg.fromUid;
        newMsg.toRead = msg.lat === msg.toUid || msg.lng === msg.toUid;
      } else {
        newMsg.toRead = false;
        newMsg.fromRead = false;
      }
      break;
    case MSG_TYPE.Revoked:
      newMsg.text = msg.body;
      break;
    case MSG_TYPE.Recall:
    case MSG_TYPE.ClickView:
      newMsg.text = msg.body;
      break;
    default:
      newMsg.content = msg.body;
      newMsg.title = msg.title;
      newMsg.lat = msg.lat;
      newMsg.lng = msg.lng;
      newMsg.zoom = msg.zoom;
      newMsg.thumb = msg.thumb;
      newMsg.height = msg.height;
      newMsg.width = msg.width;
      newMsg.duration = msg.duration;
      break;
  }
}

// 把会话转为本地格式
function formatChat(chat, uid) {
  let localChat = { ...chat, sign: undefined };
  localChat.showTime = parseInt(chat.showMsgTime / 1000);
  localChat.conversationID = splicingC2CId(chat.uid);
  if (chat.msgEnd) localChat.showMsgFromUid = chat.myMove ? chat.uid : uid;
  return localChat;
}

// 注册回调事件
function createCallEvent(Global, options) {
  Global.callEvents.set(options.callSign, {
    tabId: Global.tabId,
    type: options.type,
    timeOut: Date.now() + Global.timeOut,
    callSuc: (res) => {
      Global.callEvents.delete(options.callSign);
      options.callSuc && options.callSuc(res);
    },
    callErr: (err) => {
      Global.callEvents.delete(options.callSign);
      options.callErr && options.callErr(err);
    },
  });
}

// 公共判断
function preJudge(Global, reject, operationType) {
  if (Global.sdkState.loginState === IM_LOGIN_STATE.NOT_LOGIN) {
    let errResult = resultErr(
      "Imsdk is not logged",
      operationType,
      ERROR_CODE.NOLOGIN
    );
    reject(errResult);
    return false;
  } else if (
    Global.curTab &&
    Global.sdkState.connState !== WS_STATE.NET_STATE_CONNECTED
  ) {
    let errResult = resultErr(
      "disconnected",
      operationType,
      ERROR_CODE.DISCONNECT
    );
    reject(errResult);
    return false;
  }
  return true;
}

// 消息参数判断
function formatBody(Global, msgObj, reject) {
  let errResult = null;
  let body = null;
  if (!preJudge(Global, reject, OPERATION_TYPE.Send)) {
    return false;
  } else if (isNotObject(msgObj, "type", "number")) {
    errResult = parameterErr({
      name: OPERATION_TYPE.Send,
      key: "type",
    });
  } else {
    switch (msgObj.type) {
      case MSG_TYPE.Text:
        if (isNotString(msgObj.text)) {
          errResult = parameterErr({
            name: OPERATION_TYPE.Send,
            key: "text",
          });
        }
        body = msgObj.text;
        break;
      case MSG_TYPE.Img:
      case MSG_TYPE.Flash:
        if (isNotHttp(msgObj.url)) {
          errResult = parameterErr({
            name: OPERATION_TYPE.Send,
            key: "url",
          });
        } else if (isNotEmpty(msgObj.height)) {
          errResult = parameterErr({
            name: OPERATION_TYPE.Send,
            key: "height",
          });
        } else if (isNotEmpty(msgObj.width)) {
          errResult = parameterErr({
            name: OPERATION_TYPE.Send,
            key: "width",
          });
        }
        body = msgObj.url;
        break;
      default:
        body = msgObj.content;
        break;
    }
  }
  if (errResult) {
    reject(errResult);
    return false;
  } else {
    return body;
  }
}

/**
 * 消息工具类
 */

// 添加消息列表
function addMsgList(Global, conversationID, msgs) {
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    msgList = [...msgs, ...msgList];
  } else {
    msgList = [...msgs];
  }
  Global.msgList.set(conversationID, msgList);
}

// 获取消息列表
function getMsgList(Global, conversationID, msgEnd) {
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    if (msgEnd) {
      msgList = msgList.filter((msg) => msg.msgId < msgEnd);
    }
    return msgList.sort((a, b) => a.msgId - b.msgId);
  } else {
    return [];
  }
}

// 更新指定消息
function updateMsgs(Global, conversationID, msgs) {
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    msgs.forEach((msg) => {
      let oldMsg = msgList.find((msgItem) => msgItem.msgId === msg.msgId);
      if (oldMsg) {
        Object.assign(oldMsg, msg);
      }
    });
  }
}

// 闪照消息状态更新
function updateFlashMsg(Global, msg) {
  let msgList = Global.msgList.get(msg.conversationID);
  if (msgList && msgList.length > 0) {
    let oldMsg = msgList.find((msgItem) => msgItem.msgId === msg.msgId);
    if (!oldMsg) return;
    let updateData = {};
    if (oldMsg.fromUid === msg.fromUid) {
      updateData.fromRead = true;
    } else if (oldMsg.toUid === msg.fromUid) {
      updateData.toRead = true;
    }
    Object.assign(oldMsg, updateData);
  }
}

// 删除指定消息
function deleteMsgs(Global, conversationID, msgIds) {
  if (!msgIds) {
    return Global.msgList.delete(conversationID);
  }
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    msgList = msgList.filter((msgItem) => !msgIds.includes(msgItem.msgId));
    Global.msgList.set(conversationID, msgList);
  }
}

export default {
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
  formatBody,
  formatMsg,
  formatChat,
  emptyTip,
  createCallEvent,
  preJudge,
  // 消息工具类
  addMsgList,
  getMsgList,
  updateMsgs,
  updateFlashMsg,
  deleteMsgs,
};
