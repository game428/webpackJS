import tool from "./tool";
import declare from "./declare";
import proFormat from "./proFormat";
import { sendWsMsg } from "./ws";
import localNotice from "./localNotice";
import localDexie from "./dexieDB";

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
    try {
      if (!tool.preJudge(Global, reject)) {
        return;
      } else if (tool.isNotObject(options, "conversationID", "string")) {
        let errResult = tool.parameterErr({
          name: declare.OPERATION_TYPE.GetMsgs,
          key: "conversationID",
        });
        return reject(errResult);
      } else if (options.pageSize && options.pageSize > Global.maxMsgPageSize) {
        let errResult = tool.parameterErr({
          name: declare.OPERATION_TYPE.GetMsgs,
          msg: `最大条数不能超过${Global.maxMsgPageSize}条`,
        });
        return reject(errResult);
      }
      if (options.msgEnd === 1) {
        let result = tool.resultSuc(declare.OPERATION_TYPE.GetMsgs, {
          conversationID: options.conversationID,
          messages: [],
          hasMore: false,
        });
        return resolve(result);
      }
      let defaultOption = {
        tabId: Global.tabId,
        pageSize: Global.msgPageSize,
      };
      Object.assign(defaultOption, options);
      if (defaultOption.tabId !== Global.tabId) {
        getWsMsgs(Global, defaultOption, resolve, reject);
      } else {
        localDexie.addChatKey(defaultOption.conversationID);
        localDexie.getMsgList(defaultOption).then((data) => {
          if (
            data.length < 1 ||
            (data[0].msgId > 1 && data.length < defaultOption.pageSize)
          ) {
            // 如果本地没有msgId等于1的消息,且本地消息不足一页则去服务器获取
            getWsMsgs(Global, defaultOption, resolve, reject, data);
          } else {
            resultMsgs(defaultOption, resolve, data);
          }
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

// 从服务器获取消息列表
function getWsMsgs(Global, defaultOption, resolve, reject, msgs) {
  let callSign = tool.createSign();
  tool.createCallEvent(Global, {
    type: declare.OPERATION_TYPE.GetMsgs,
    callSign: callSign,
    callSuc: (res) => {
      if (res?.messages?.length) {
        getMsgsSuc(Global, defaultOption, res, resolve, msgs);
      } else {
        let result = tool.resultSuc(declare.OPERATION_TYPE.GetMsgs, {
          conversationID: defaultOption.conversationID,
          messages: [],
          hasMore: false,
        });
        resolve(result);
      }
    },
    callErr: (err) => {
      let errResult = tool.serverErr(err, declare.OPERATION_TYPE.GetMsgs);
      reject(errResult);
    },
  });
  if (Global.curTab) {
    let uid = tool.reformatC2CId(defaultOption.conversationID);
    let msg = proFormat.getMsgPro({
      sign: callSign,
      toUid: uid,
      msgEnd: defaultOption.msgEnd,
    });
    sendWsMsg(msg, declare.PID.GetHistory);
  } else {
    localNotice.onWebSocketNotice(declare.OPERATION_TYPE.GetMsgs, {
      tabId: Global.tabId,
      callSign: callSign,
      options: defaultOption,
      state: declare.LOCAL_OPERATION_STATUS.Pending,
    });
  }
}

// 获取消息列表成功回调
function getMsgsSuc(Global, defaultOption, res, resolve, msgs) {
  if (Global.curTab) {
    let newMsgs = [];
    res.messages.forEach((msg) => {
      if (tool.isSo(msg.type)) {
        let newMsg = tool.formatMsg(msg, defaultOption.conversationID);
        newMsgs.push(newMsg);
      }
    });
    if (newMsgs.length > 0) {
      localDexie.addMsgList(newMsgs);
    }
    if (msgs?.length) {
      newMsgs.push(...msgs);
    }
    resultMsgs(defaultOption, resolve, newMsgs.reverse());
  } else {
    resultMsgs(defaultOption, resolve, res.messages);
  }
}

// 返回获取到的消息列表
function resultMsgs(defaultOption, resolve, msgs) {
  let resultData = msgs.slice(0 - defaultOption.pageSize);
  let hasMore = false;
  if (resultData.length > 0) {
    hasMore = resultData[0].msgId !== 1;
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.GetMsgs, {
    conversationID: defaultOption.conversationID,
    messages: resultData,
    hasMore: hasMore,
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
    try {
      if (!tool.preJudge(Global, reject)) {
        return;
      } else if (tool.isNotObject(options, "conversationID", "string")) {
        let errResult = tool.parameterErr({
          name: declare.OPERATION_TYPE.Read,
          key: "conversationID",
        });
        return reject(errResult);
      }
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        type: declare.OPERATION_TYPE.Read,
        callSign: callSign,
        callSuc: (res) => {
          let result = tool.resultSuc(declare.OPERATION_TYPE.Read, {
            conversationID: res.conversationID,
            msgId: options.msgId,
            msgTime: res.updateTime,
          });
          resolve(result);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Read);
          reject(errResult);
        },
      });
      if (Global.curTab) {
        let uid = tool.reformatC2CId(options.conversationID);
        let msg = proFormat.readMsgPro(callSign, uid);
        sendWsMsg(msg, declare.PID.MsgRead);
      } else {
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.Read, {
          callSign: callSign,
          tabId: Global.tabId,
          options: options,
          state: declare.LOCAL_OPERATION_STATUS.Pending,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

// 消息参数判断
function isMsgError(Global, msgObj, reject, proOptions) {
  let errResult = null;
  if (!tool.preJudge(Global, reject)) {
    return true;
  } else if (tool.isNotObject(msgObj, "type", "number")) {
    errResult = tool.parameterErr({
      name: declare.OPERATION_TYPE.Send,
      key: "type",
    });
  } else {
    switch (msgObj.type) {
      case declare.MSG_TYPE.Text:
        if (tool.isNotString(msgObj.text)) {
          errResult = tool.parameterErr({
            name: declare.OPERATION_TYPE.Send,
            key: "text",
          });
        } else if (tool.isNotSize(msgObj.text)) {
          errResult = tool.parameterErr({
            name: declare.OPERATION_TYPE.Send,
            msg: "text长度超过3K",
          });
        }
        proOptions.body = msgObj.text;
        break;
      case declare.MSG_TYPE.Img:
        if (tool.isNotHttp(msgObj.url)) {
          errResult = tool.parameterErr({
            name: declare.OPERATION_TYPE.Send,
            key: "url",
          });
        } else if (tool.isNotEmpty(msgObj.height)) {
          errResult = tool.parameterErr({
            name: declare.OPERATION_TYPE.Send,
            key: "height",
          });
        } else if (tool.isNotEmpty(msgObj.width)) {
          errResult = tool.parameterErr({
            name: declare.OPERATION_TYPE.Send,
            key: "width",
          });
        }
        proOptions.body = msgObj.url;
        break;
      case declare.MSG_TYPE.Custom:
        if (tool.isNotString(msgObj.content)) {
          errResult = tool.parameterErr({
            name: declare.OPERATION_TYPE.Send,
            key: "content",
          });
        } else if (tool.isNotSize(msgObj.content)) {
          errResult = tool.parameterErr({
            name: declare.OPERATION_TYPE.Send,
            msg: "content长度超过3K",
          });
        }
        proOptions.body = msgObj.data;
        break;
    }
  }
  if (errResult) {
    reject(errResult);
    return true;
  } else {
    return false;
  }
}

/**
 * 发送消息
 * @memberof SDK
 * @param {Msg} msgObj - 消息对象
 * @returns {Promise}
 */
function sendMessage(Global, msgObj) {
  return new Promise((resolve, reject) => {
    try {
      let proOptions = {};
      if (isMsgError(Global, msgObj, reject, proOptions)) return;
      let callSign = tool.createSign(msgObj.showMsgTime);
      tool.createCallEvent(Global, {
        type: declare.OPERATION_TYPE.Send,
        callSign: callSign,
        callSuc: (res) => {
          sendMsgSuc(Global, msgObj, res, resolve);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Send);
          reject(errResult);
        },
      });
      if (Global.curTab) {
        proOptions.sign = callSign;
        Object.assign(proOptions, msgObj);
        let msg = proFormat.sendMsgPro(proOptions);
        sendWsMsg(msg, declare.PID.ChatS);
      } else {
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.Send, {
          callSign: callSign,
          tabId: Global.tabId,
          options: msgObj,
          state: declare.LOCAL_OPERATION_STATUS.Pending,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

// 发送消息成功回调
function sendMsgSuc(Global, msgObj, res, resolve) {
  if (Global.curTab) {
    let newMsg = JSON.parse(JSON.stringify(msgObj));
    newMsg.msgId = res.data.msgId;
    newMsg.msgTime = res.data.msgTime;
    newMsg.sendStatus = declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
    Global.handleMessage({
      type: declare.HANDLE_TYPE.ChatR,
      shift: true,
      data: newMsg,
    });
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.Send, {
    conversationID: msgObj.conversationID,
    msgId: res.data.msgId,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
  });
  resolve(result);
}

/**
 * 重发消息
 * @memberof SDK
 * @param {Msg} msgObj - 消息对象
 * @returns {Promise}
 */
function resendMessage(Global, msgObj) {
  return new Promise((resolve, reject) => {
    try {
      let proOptions = {};
      if (isMsgError(Global, msgObj, reject, proOptions)) return;
      let callSign = tool.createSign(msgObj.showMsgTime);
      tool.createCallEvent(Global, {
        type: declare.OPERATION_TYPE.Resend,
        callSign: callSign,
        callSuc: (res) => {
          resendMsgSuc(Global, msgObj, res, resolve);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Resend);
          reject(errResult);
        },
      });
      if (Global.curTab) {
        proOptions.sign = callSign;
        Object.assign(proOptions, msgObj);
        let msg = proFormat.sendMsgPro(proOptions);
        sendWsMsg(msg, declare.PID.ChatS);
      } else {
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.Resend, {
          callSign: callSign,
          tabId: Global.tabId,
          options: msgObj,
          state: declare.LOCAL_OPERATION_STATUS.Pending,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

// 重发消息成功回调
function resendMsgSuc(Global, msgObj, res, resolve) {
  if (Global.curTab) {
    let newMsg = JSON.parse(JSON.stringify(msgObj));
    newMsg.msgId = res.data.msgId;
    newMsg.msgTime = res.data.msgTime;
    newMsg.sendStatus = declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC;
    Global.handleMessage({
      type: declare.HANDLE_TYPE.ChatR,
      shift: true,
      data: newMsg,
    });
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.Resend, {
    conversationID: msgObj.conversationID,
    msgId: res.data.msgId,
    sendStatus: declare.SEND_STATE.BFIM_MSG_STATUS_SEND_SUCC,
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
    try {
      if (!tool.preJudge(Global, reject)) {
        return;
      } else if (tool.isNotObject(options, "conversationID", "string")) {
        let errResult = tool.parameterErr({
          name: declare.OPERATION_TYPE.Revoke,
          key: "conversationID",
        });
        return reject(errResult);
      } else if (tool.isNotNumer(options.msgId, true)) {
        let errResult = tool.parameterErr({
          name: declare.OPERATION_TYPE.Revoke,
          key: "msgId",
        });
        return reject(errResult);
      }
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        type: declare.OPERATION_TYPE.Revoke,
        callSign: callSign,
        callSuc: (res) => {
          revokeMsgSuc(Global, options, res, resolve);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Revoke);
          reject(errResult);
        },
      });
      if (Global.curTab) {
        let uid = tool.reformatC2CId(options.conversationID);
        let msg = proFormat.revokeMsgPro(callSign, uid, options.msgId);
        sendWsMsg(msg, declare.PID.Revoke);
      } else {
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.Revoke, {
          callSign: callSign,
          tabId: Global.tabId,
          options: options,
          state: declare.LOCAL_OPERATION_STATUS.Pending,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

// 测回消息成功回调
function revokeMsgSuc(Global, options, res, resolve) {
  if (Global.curTab) {
    Global.handleMessage({
      type: declare.HANDLE_TYPE.ChatR,
      shift: true,
      data: res.data,
    });
  }
  let result = tool.resultSuc(declare.OPERATION_TYPE.Revoke, {
    conversationID: options.conversationID,
    msgId: options.msgId,
    type: declare.MSG_TYPE.Revoked,
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
 * @returns {Message}
 */
function createTextMessage(Global, options) {
  if (!options?.to || !options?.payload?.text) return null;
  let newMsg = tool.msgBase(options.to, Global.uid);
  Object.assign(newMsg, {
    type: declare.MSG_TYPE.Text,
    text: options.payload.text,
  });
  return newMsg;
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
 * @returns {Message}
 */
function createImageMessage(Global, options) {
  if (!options?.to || !options?.payload?.url) return null;
  let newMsg = tool.msgBase(options.to, Global.uid);
  Object.assign(newMsg, {
    type: declare.MSG_TYPE.Img,
    url: options.payload.url,
    width: options.payload.width, //图片的宽度
    height: options.payload.height, //图片的高度
  });
  return newMsg;
}

// TODO
/***
 * 创建自定义消息
 */
function createCustomMessage(Global, options) {
  if (!options?.to || !options?.payload?.content) return null;
  let newMsg = tool.msgBase(options.to, Global.uid);
  Object.assign(newMsg, {
    type: declare.MSG_TYPE.Custom,
    content: options.payload.content,
  });
  return newMsg;
}

/**
 * 消息对象
 * @typedef {Object} Message 消息对象
 * @property {number} [Message.sign]
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
 * @property {string} [Message.content] - 未定义type，传输的body
 * @property {string} [Message.body] - 消息内容
 * @property {number} [Message.sput] - sender_profile_update_time 发送人的profile更新时间（精确到秒的时间戳）
 * @property {boolean} [Message.newMsg] - 是否显示 new message
 */

export {
  getMessageList,
  setMessageRead,
  sendMessage,
  resendMessage,
  revokeMessage,
  createTextMessage,
  createImageMessage,
  createCustomMessage,
};
