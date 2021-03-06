import tool from "./tool";
import {
  PID,
  MSG_TYPE,
  ERROR_CODE,
  SEND_STATE,
  HANDLE_TYPE,
  OPERATION_TYPE,
  LOCAL_OPERATION_STATUS,
} from "./sdkTypes";
import proFormat from "./proFormat";
import { sendWsMsg } from "./ws";
import localNotice from "./localNotice";
import localData from "./localData";

/**
 * 消息对象
 * @typedef {Object} Message 消息对象
 * @property {string} Message.onlyId - 消息唯一id
 * @property {string} Message.conversationID - 所属会话id
 * @property {number} Message.fromUid - 发送方用户ID
 * @property {number} Message.toUid - 接收方用户ID
 * @property {number} Message.msgId - 消息id
 * @property {number} Message.msgTime - 消息时间（以服务器为准 精确到百万分之一秒的时间戳）
 * @property {number} Message.showMsgTime - 消息时间（以服务器为准 精确到毫秒的时间戳）
 * @property {number} Message.sendStatus - 消息发送状态
 * @property {string} [Message.text] - 文本消息，消息内容
 * @property {string} [Message.url] -  图片消息，图片路径
 * @property {number} [Message.type] - 消息类型
 * @property {string} [Message.title] - 推送的消息标题
 * @property {number} [Message.thumb] - 封面图
 * @property {number} [Message.width] - 封面图的宽度
 * @property {number} [Message.height] - 封面图的高度
 * @property {number} [Message.duration] - 时长
 * @property {number} [Message.lat] - 维度
 * @property {number} [Message.lng] - 经度
 * @property {number} [Message.zoom] - 地图缩放层级
 * @property {boolean} [Message.toRead] - 接收方是否已查看
 * @property {boolean} [Message.fromRead] - 发送方是否已查看
 * @property {string} [Message.content] - 未定义type，传输的body
 * @property {number} [Message.sput] - sender_profile_update_time 发送人的profile更新时间（精确到秒的时间戳）
 * @property {boolean} [Message.newMsg] - 是否显示 new message
 */

/**
 * 获取消息列表
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID - 会话用户id
 * @param {number} [options.msgEnd] - 消息id，从哪一条开始往后取
 * @param {number} [options.pageSize=20] - 分页条数，默认20
 * @returns {Promise}
 */
function getMessageList(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.GetMsgs)) {
      return;
    } else if (tool.isNotObject(options, "conversationID", "string")) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.GetMsgs,
        key: "conversationID",
      });
      return reject(errResult);
    } else if (
      options.pageSize &&
      (options.pageSize > Global.maxMsgPageSize ||
        tool.isNotNumer(options?.pageSize))
    ) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.GetMsgs,
        msg: `The maximum number of entries cannot exceed ${Global.maxMsgPageSize}`,
      });
      return reject(errResult);
    }
    if (options.msgEnd === 1) {
      let result = tool.resultSuc(OPERATION_TYPE.GetMsgs, {
        conversationID: options.conversationID,
        messages: [],
        hasMore: false,
      });
      return resolve(result);
    }
    let defaultOption = {
      tabId: Global.tabId,
      pageSize: Global.msgPageSize,
      ...options,
    };
    Global.getChatHistorys.add(defaultOption.conversationID);
    let data = localData.getMsgList(
      Global,
      defaultOption.conversationID,
      defaultOption.msgEnd
    );
    if (data.length >= defaultOption.pageSize || data[0]?.msgId === 1) {
      // 如果本地有msgId等于1的消息,或大于一页则直接返回
      resultMsgs(defaultOption, resolve, data);
    } else {
      getWsMsgs(Global, defaultOption, resolve, reject, data);
    }
  });
}

// 从服务器获取消息列表
function getWsMsgs(Global, defaultOption, resolve, reject, msgs) {
  let callSign = tool.createSign();
  Global.callEvents.has(callSign) && (callSign += 1);
  tool.createCallEvent(Global, {
    type: OPERATION_TYPE.GetMsgs,
    callSign: callSign,
    callSuc: (res) => {
      getMsgsSuc(Global, defaultOption, res, resolve, msgs);
    },
    callErr: (err) => {
      let errResult = tool.serverErr(err, OPERATION_TYPE.GetMsgs);
      reject(errResult);
    },
  });
  if (Global.curTab) {
    let uid = tool.reformatC2CId(defaultOption.conversationID);
    let msgEnd = defaultOption.msgEnd;
    if (msgs?.length) {
      msgEnd = msgs[0].msgId;
    }
    let msg = proFormat.getMsgPro({
      sign: callSign,
      toUid: uid,
      msgEnd: msgEnd,
    });
    sendWsMsg(msg, PID.GetHistory);
  } else {
    localNotice.onWebSocketNotice(OPERATION_TYPE.GetMsgs, {
      tabId: Global.tabId,
      callSign: callSign,
      options: defaultOption,
      state: LOCAL_OPERATION_STATUS.Pending,
    });
  }
}

// 获取消息列表成功回调
function getMsgsSuc(Global, defaultOption, res, resolve, msgs) {
  if (Global.curTab) {
    let newMsgs = [];
    res.messages.forEach((msg) => {
      if (msg.type < 64) {
        let newMsg = tool.formatMsg(msg, defaultOption.conversationID);
        newMsgs.unshift(newMsg);
      }
    });
    if (newMsgs.length > 0) {
      localData.addMsgList(Global, defaultOption.conversationID, newMsgs);
    }
    if (msgs?.length) {
      newMsgs.push(...msgs);
    }
    resultMsgs(defaultOption, resolve, newMsgs);
  } else {
    if (res.messages.length > 0) {
      localData.addMsgList(Global, defaultOption.conversationID, res.messages);
    }
    resultMsgs(defaultOption, resolve, res.messages);
  }
}

/**
 * 返回获取到的消息列表
 * 从服务器获取历史数据时，会一直获取到20条可显示消息为止
 */
function resultMsgs(defaultOption, resolve, msgs) {
  let resultData = msgs.slice(0 - defaultOption.pageSize);
  let result = tool.resultSuc(OPERATION_TYPE.GetMsgs, {
    conversationID: defaultOption.conversationID,
    messages: resultData,
    hasMore: msgs.length >= defaultOption.pageSize,
  });
  resolve(result);
}

/**
 * 设置已读
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID - 会话用户id
 * @returns {Promise}
 */
function setMessageRead(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.Read)) {
      return;
    } else if (tool.isNotObject(options, "conversationID", "string")) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.Read,
        key: "conversationID",
      });
      return reject(errResult);
    }
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.Read,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.Read, {
          conversationID: res.conversationID,
          msgId: options.msgId,
          msgTime: res.updateTime,
        });
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.Read);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let uid = tool.reformatC2CId(options.conversationID);
      let msg = proFormat.readMsgPro(callSign, uid);
      sendWsMsg(msg, PID.MsgRead);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.Read, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 发送消息
 * @memberof SDK
 * @param {Msg} msgObj - 消息对象
 * @returns {Promise}
 */
function sendMessage(Global, msgObj) {
  return new Promise((resolve, reject) => {
    let body = tool.formatBody(Global, msgObj, reject);
    if (body === false) return;
    let callSign = tool.createSign(msgObj.showMsgTime);
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.Send,
      callSign: callSign,
      callSuc: (res) => {
        sendMsgSuc(Global, msgObj, res, resolve);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.Send);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.sendMsgPro({ ...msgObj, sign: callSign, body });
      sendWsMsg(msg, PID.ChatS);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.Send, {
        callSign: callSign,
        tabId: Global.tabId,
        options: msgObj,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

// 发送消息成功回调
function sendMsgSuc(Global, msgObj, res, resolve) {
  if (Global.curTab) {
    let newMsg = { ...msgObj };
    newMsg.msgId = res.data.msgId;
    newMsg.msgTime = res.data.msgTime;
    newMsg.sendStatus = SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
    Global.handleMessage({
      type: HANDLE_TYPE.ChatR,
      shift: true,
      data: newMsg,
    });
  }
  let result = tool.resultSuc(OPERATION_TYPE.Send, {
    conversationID: msgObj.conversationID,
    msgId: res.data.msgId,
    sendStatus: SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  });
  resolve(result);
}

/**
 * 撤回消息
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID - 会话用户id
 * @param {number} options.msgId - 消息id
 * @returns {Promise}
 */
function revokeMessage(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.Revoke)) {
      return;
    } else if (tool.isNotObject(options, "conversationID", "string")) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.Revoke,
        key: "conversationID",
      });
      return reject(errResult);
    } else if (tool.isNotNumer(options.msgId, true)) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.Revoke,
        key: "msgId",
      });
      return reject(errResult);
    }
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.Revoke,
      callSign: callSign,
      callSuc: (res) => {
        revokeMsgSuc(Global, options, res, resolve);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.Revoke);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let uid = tool.reformatC2CId(options.conversationID);
      let msg = proFormat.directiveMsgPro({
        sign: callSign,
        toUid: uid,
        type: MSG_TYPE.Recall,
        msgId: options.msgId,
      });
      sendWsMsg(msg, PID.ChatAction);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.Revoke, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

// 测回消息成功回调
function revokeMsgSuc(Global, options, res, resolve) {
  if (Global.curTab) {
    Global.handleMessage({
      type: HANDLE_TYPE.ChatR,
      shift: true,
      data: res.data,
    });
  }
  let result = tool.resultSuc(OPERATION_TYPE.Revoke, {
    conversationID: options.conversationID,
    msgId: options.msgId,
    type: MSG_TYPE.Revoked,
  });
  resolve(result);
}

/**
 * 设置已查看闪照
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.conversationID - 会话用户id
 * @param {number} options.msgId - 消息id
 * @returns {Promise}
 */
function readFlashMessage(Global, options) {
  return new Promise((resolve, reject) => {
    if (!tool.preJudge(Global, reject, OPERATION_TYPE.ReadFlash)) {
      return;
    } else if (tool.isNotObject(options, "conversationID", "string")) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.ReadFlash,
        key: "conversationID",
      });
      return reject(errResult);
    } else if (tool.isNotNumer(options.msgId, true)) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.ReadFlash,
        key: "msgId",
      });
      return reject(errResult);
    }
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.ReadFlash,
      callSign: callSign,
      callSuc: (res) => {
        readFlashMsgSuc(Global, options, res, resolve);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.ReadFlash);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let uid = tool.reformatC2CId(options.conversationID);
      let msg = proFormat.directiveMsgPro({
        sign: callSign,
        toUid: uid,
        type: MSG_TYPE.ClickView,
        msgId: options.msgId,
      });
      sendWsMsg(msg, PID.ChatAction);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.ReadFlash, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}
// 测回消息成功回调
function readFlashMsgSuc(Global, options, res, resolve) {
  if (Global.curTab) {
    Global.handleMessage({
      type: HANDLE_TYPE.ChatR,
      shift: true,
      data: res.data,
    });
  }
  let result = tool.resultSuc(OPERATION_TYPE.ReadFlash, {
    conversationID: options.conversationID,
    msgId: options.msgId,
    type: MSG_TYPE.ClickView,
    fromUid: res.data.fromUid,
  });
  resolve(result);
}

/**
 * 创建文本消息
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {number} options.to - 接收方用户id
 * @param {Object} options.payload - 消息内容的容器
 * @param {string} options.payload.text - 消息文本内容
 * @returns {{code: number, message?:Message, msg: string}}}
 */
function createTextMessage(Global, options) {
  if (!options?.to) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Parameter 'to' cann't be empty",
    };
  }
  if (!options.payload?.text) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Parameter 'text' cann't be empty",
    };
  }
  let newMsg = tool.msgBase(options.to, Global.sdkState.uid);
  Object.assign(newMsg, {
    type: MSG_TYPE.Text,
    text: options.payload.text,
  });
  return {
    code: ERROR_CODE.SUCCESS,
    message: newMsg,
  };
}

/**
 * 创建图片消息
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {number} options.to - 接收方用户id
 * @param {Object} options.payload - 消息内容的容器
 * @param {string} options.payload.url - 图片网络地址
 * @param {string} options.payload.width - 图片宽度
 * @param {string} options.payload.height - 图片高度
 * @returns {{code: number, message?:Message, msg: string}}}
 */
function createImageMessage(Global, options) {
  if (!options?.to) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Parameter 'to' cann't be empty",
    };
  }
  if (!options.payload?.url) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Parameter 'url' cann't be empty",
    };
  }
  let newMsg = tool.msgBase(options.to, Global.sdkState.uid);
  Object.assign(newMsg, {
    type: MSG_TYPE.Img,
    url: options.payload.url,
    width: options.payload.width, //图片的宽度
    height: options.payload.height, //图片的高度
  });
  return {
    code: ERROR_CODE.SUCCESS,
    message: newMsg,
  };
}

/**
 * 创建闪照消息
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {number} options.to - 接收方用户id
 * @param {Object} options.payload - 消息内容的容器
 * @param {string} options.payload.url - 图片网络地址
 * @param {string} options.payload.width - 图片宽度
 * @param {string} options.payload.height - 图片高度
 * @returns {{code: number, message?:Message, msg: string}}}
 */
function createFlashMessage(Global, options) {
  if (!options?.to) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Parameter 'to' cann't be empty",
    };
  }
  if (!options.payload?.url) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Parameter 'url' cann't be empty",
    };
  }
  let newMsg = tool.msgBase(options.to, Global.sdkState.uid);
  Object.assign(newMsg, {
    type: MSG_TYPE.Flash,
    url: options.payload.url,
    width: options.payload.width, //图片的宽度
    height: options.payload.height, //图片的高度
    toRead: false,
    fromRead: false,
    oppositeSee: false,
  });
  return {
    code: ERROR_CODE.SUCCESS,
    message: newMsg,
  };
}

/**
 * 创建业务自定义消息
 * @param {Object} options - 接口参数
 * @param {number} options.to - 接收方用户id
 * @param {Object} options.payload - 消息内容的容器
 * @param {string} options.payload.type - 消息类型11-30
 * @param {string} options.payload.content - 消息内容
 * @param {string} options.payload.width - 图片宽度
 * @param {string} options.payload.height - 图片高度
 * @param {string} options.payload.title - 标题
 * @param {number} options.payload.lat - 纬度
 * @param {number} options.payload.lng - 经度
 * @param {number} options.payload.zoom - 地图缩放层级
 * @param {string} options.payload.thumb - 封面图
 * @param {number} options.payload.duration - 时长
 * @returns {{code: number, message?:Message, msg?: string}}}
 */
function createBusinessMessage(Global, options) {
  if (!options?.to) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Parameter 'to' cann't be empty",
    };
  }
  if (options.payload?.type > 30 || options.payload?.type < 11) {
    return {
      code: ERROR_CODE.PARAMETER,
      msg: "Type can only use 11-30",
    };
  }
  let newMsg = tool.msgBase(options.to, Global.sdkState.uid);
  Object.assign(newMsg, options.payload);
  return {
    code: ERROR_CODE.SUCCESS,
    message: newMsg,
  };
}

export {
  getMessageList,
  setMessageRead,
  sendMessage,
  revokeMessage,
  readFlashMessage,
  createTextMessage,
  createImageMessage,
  createFlashMessage,
  createBusinessMessage,
};
