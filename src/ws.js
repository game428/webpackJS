import {
  ProfileOnline,
  UsrOffline,
  Result,
  CosKey,
  ChatList,
  ChatRBatch,
  ChatSR,
  ChatR,
  ChatItem,
  ChatItemUpdate,
} from "./proto";
import proFormat from "./proFormat.js";
import declare from "./declare.js";
import pako from "pako";
let wsConfig = {
  ws: null,
  Global: null,
  heartRate: 30000, // 心跳检查时间
  heartBeatTime: null, // 上次发送消息时间
  reconnectNum: 0, // 重连间隔时间
  closeState: false, // 关闭重连
  reconnectTimer: null, // 重连定时器
  wsStatus: false, // 当前连接状态
  chatListEvent: null, // 获取会话sign
  chatFormatList: [], // 会话列表
};

// 连接ws
function connectWs(Global, connSuc, connErr) {
  reset();
  wsConfig.closeState = true;
  wsConfig.Global = Global;
  let wsUrl = wsConfig.Global.wsUrl;
  createWs(wsUrl, connSuc, connErr);
  window.removeEventListener("online", online(wsUrl, connSuc, connErr));
  window.addEventListener("online", online(wsUrl, connSuc, connErr));
  window.addEventListener("offline", () => {
    wsConfig.ws.close();
  });
}

// 上线重连
function online(wsUrl, connSuc, connErr) {
  if (wsConfig.closeState || wsConfig.ws.readyState === 1) return;
  wsConfig.ws.close();
  reconnect(wsUrl, connSuc, connErr);
}

// 发送消息
function sendWsMsg(msg, pid) {
  if (wsConfig.ws) {
    wsConfig.heartBeatTime = new Date().getTime();
    let sendMsg = proFormat.compress(msg, pid);
    wsConfig.ws.send(sendMsg);
  }
}

// 关闭连接
function closeWs() {
  if (wsConfig.ws) {
    wsConfig.closeState = true;
    wsConfig.ws.close();
  }
  reset();
}

function reset() {
  if (wsConfig.reconnectTimer) clearTimeout(wsConfig.reconnectTimer);
  wsConfig.reconnectTimer = null;
  wsConfig.ws = null;
  wsConfig.Global = null;
  wsConfig.heartBeatTime = null;
  wsConfig.chatListEvent = null;
  wsConfig.wsStatus = false;
  wsConfig.chatFormatList = [];
  wsConfig.reconnectNum = 0;
}

// 初始化ws
function createWs(wsUrl, connSuc, connErr, isReconect) {
  wsConfig.Global.onConn();
  let ws = new WebSocket(wsUrl);
  ws.binaryType = "arraybuffer";
  ws.onopen = (evt) => {
    wsConfig.reconnectNum = 0;
    wsConfig.closeState = false;
    wsConfig.heartBeatTime = new Date().getTime();
    if (typeof connSuc === "function") connSuc(isReconect);
  };
  ws.onmessage = onMessage;
  ws.onclose = (err) => {
    console.log("Connection closed.", err);
    reconnect(wsUrl, connSuc, connErr);
    if (typeof connErr === "function") connErr(err);
  };
  ws.onerror = (err) => {
    console.log("连接错误");
    reconnect(wsUrl, connSuc, connErr);
  };
  wsConfig.ws = ws;
}

// 发送心跳消息
function sendPing() {
  if (wsConfig?.ws?.readyState !== 1) return;
  let date = new Date().getTime();
  if (wsConfig.heartBeatTime + wsConfig.heartRate <= date) {
    var msg = proFormat.compress(proFormat.pingPro(), declare.PID.Ping);
    wsConfig.ws.send(msg);
    wsConfig.heartBeatTime = date;
  }
}

// 重连
function reconnect(wsUrl, connSuc, connErr) {
  if (wsConfig.wsStatus || wsConfig.closeState) return;
  wsConfig.wsStatus = true;
  wsConfig.reconnectTimer = setTimeout(function() {
    if (wsConfig.reconnectNum === 0) {
      wsConfig.reconnectNum = 250;
    } else {
      wsConfig.reconnectNum *= 2;
    }
    createWs(wsUrl, connSuc, connErr, true);
    wsConfig.wsStatus = false;
  }, wsConfig.reconnectNum);
}

// 收到消息
function onMessage(evt) {
  var pid = new Uint8Array(evt.data.slice(0, 1))[0];
  var result = evt.data.slice(2);
  if (new Uint8Array(evt.data.slice(1, 2))[0] === 1) {
    result = pako.inflate(result, {
      to: "Uint8Array",
    });
  }
  result = new Uint8Array(result);
  console.log("接收到消息", pid);
  switch (pid) {
    case declare.PID.Result:
      handleResult(result);
      break;
    case declare.PID.ChatList:
      handleChatList(result);
      break;
    case declare.PID.ChatRBatch:
      handleMsgList(result);
      break;
    case declare.PID.ChatR:
      handleMsg(result);
      break;
    case declare.PID.ChatSR:
      handleSend(result);
      break;
    case declare.PID.ChatItemUpdate:
      handleUpdateChat(result);
      break;
    case declare.PID.ChatItem:
      handleGetChat(result);
      break;
    case declare.PID.CosKey:
      handleGetCosKey(result);
      break;
    case declare.PID.ProfileOnline:
      // let resultPro = ProfileOnline.toObject(ProfileOnline.decode(result), {
      //   defaults: true,
      // })
      break;
    case declare.PID.UsrOffline:
      // let resultPro = UsrOffline.toObject(UsrOffline.decode(result), {
      //   defaults: true,
      // })
      break;
    default:
      break;
  }
}

// 处理Result类型
function handleResult(result) {
  let resultPro = Result.toObject(Result.decode(result), {
    defaults: true,
  });
  const code = resultPro.code;
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
  }
  switch (code) {
    case 0: // 请求成功
      if (!callEvent) return;
      if (callEvent.type === declare.OPERATION_TYPE.GetChats) {
        wsConfig.chatListEvent = callEvent;
        wsConfig.chatFormatList = [];
      } else {
        callEvent.callSuc({
          data: resultPro,
        });
      }
      break;
    case 1: // 请求失败（不区分原因）
      callEvent && callEvent.callErr(resultPro);
      break;
    case 4: // im token 未找到（不存在或失效）
      wsConfig.closeState = true;
      wsConfig.ws.close();
      wsConfig.Global.handleMessage({
        type: declare.HANDLE_TYPE.ResultError,
        data: resultPro,
      });
      callEvent && callEvent.callErr(resultPro);
      break;
    case 12: // 用户的会话列表为空
      callEvent &&
        callEvent.callSuc({
          chats: [],
          hasMore: false,
        });
      break;
    case 2008: // 被踢下线
      wsConfig.closeState = true;
      wsConfig.ws.close();
      wsConfig.Global.handleMessage({
        type: declare.HANDLE_TYPE.ResultError,
        data: resultPro,
      });
      callEvent && callEvent.callErr(resultPro);
      break;
    default:
      callEvent && callEvent.callErr(resultPro);
      break;
  }
}

// 处理获取cosKey
function handleGetCosKey(result) {
  let resultPro = CosKey.toObject(CosKey.decode(result), {
    defaults: true,
  });
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
    callEvent &&
      callEvent.callSuc({
        data: resultPro,
      });
  }
}

// 处理会话列表
function handleChatList(result) {
  let resultPro = ChatList.toObject(ChatList.decode(result), {
    defaults: true,
  });
  wsConfig.chatFormatList.push(...resultPro.chatItems);
  if (resultPro.updateTime && wsConfig.chatListEvent) {
    wsConfig.chatListEvent.callSuc({
      chats: wsConfig.chatFormatList,
      updateTime: resultPro.updateTime,
    });
    wsConfig.chatListEvent = null;
    wsConfig.chatFormatList = [];
  }
}

// 处理消息列表
function handleMsgList(result) {
  let resultPro = ChatRBatch.toObject(ChatRBatch.decode(result), {
    defaults: true,
  });
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent &&
      callEvent.callSuc({
        messages: resultPro.msgs,
      });
  }
}

// 处理发送消息成功
function handleSend(result) {
  let resultPro = ChatSR.toObject(ChatSR.decode(result), {
    defaults: true,
  });
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent &&
      callEvent.callSuc({
        data: resultPro,
      });
  }
}

// 处理接收到消息
function handleMsg(result) {
  let resultPro = ChatR.toObject(ChatR.decode(result), {
    defaults: true,
  });
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    if (callEvent) {
      callEvent.callSuc({
        data: resultPro,
      });
    } else {
      wsConfig.Global.handleMessage({
        type: declare.HANDLE_TYPE.ChatR,
        data: resultPro,
      });
    }
  }
}

// 处理获取指定会话信息
function handleGetChat(result) {
  let resultPro = ChatItem.toObject(ChatItem.decode(result), {
    defaults: true,
  });
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent &&
      callEvent.callSuc({
        data: resultPro,
      });
  }
}

// 处理会话列表更新
function handleUpdateChat(result) {
  let resultPro = ChatItemUpdate.toObject(ChatItemUpdate.decode(result), {
    defaults: true,
  });
  wsConfig.Global.handleMessage({
    type: declare.HANDLE_TYPE.ChatItemUpdate,
    data: resultPro,
  });
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent &&
      callEvent.callSuc({
        data: resultPro,
      });
  }
}

export { connectWs, closeWs, sendPing, sendWsMsg };
