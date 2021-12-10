import {
  Result,
  CosKey,
  ChatList,
  ChatRBatch,
  ChatSR,
  ChatR,
  ChatItem,
  ChatItemUpdate,
} from "./proto";
import { PID, HANDLE_TYPE, OPERATION_TYPE, ERROR_CODE } from "./sdkTypes";
import proFormat from "./proFormat";
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

let loginCode = [
  ERROR_CODE.SUCCESS,
  ERROR_CODE.TOKEN_NOT_FOUND,
  ERROR_CODE.KICKED_OUT,
];

// 连接ws
function connectWs(Global, wsOptions) {
  reset();
  wsConfig.closeState = true;
  wsConfig.Global = Global;
  createWs(wsOptions);
  window.removeEventListener("online", online(wsOptions));
  window.addEventListener("online", online(wsOptions));
  window.addEventListener("offline", () => {
    wsConfig.ws.close();
  });
}

// 上线重连
function online(wsOptions) {
  if (wsConfig.closeState || wsConfig.ws.readyState === 1) return;
  wsConfig.wsStatus = false;
  if (wsConfig.ws) {
    wsConfig.ws.close();
  } else {
    reconnect(wsOptions);
  }
}

// 发送消息
function sendWsMsg(msg, pid) {
  wsConfig.heartBeatTime = new Date().getTime();
  let sendMsg = proFormat.compress(msg, pid);
  wsConfig.ws?.send(sendMsg);
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
function createWs(wsOptions) {
  wsConfig.Global.onConn();
  let ws = new WebSocket(wsOptions.wsUrl);
  ws.binaryType = "arraybuffer";
  ws.onopen = (evt) => {
    wsConfig.reconnectNum = 0;
    wsConfig.closeState = false;
    wsConfig.heartBeatTime = new Date().getTime();
    wsOptions.connSuc(wsOptions);
  };
  ws.onmessage = onMessage;
  ws.onclose = (err) => {
    console.log("Connection closed.", err);
    reconnect(wsOptions);
    wsOptions.connErr(wsOptions, err);
  };
  ws.onerror = (err) => {
    console.log("Connection Error", err);
    reconnect(wsOptions);
  };
  wsConfig.ws = ws;
}

// 发送心跳消息
function sendPing() {
  if (wsConfig.ws?.readyState !== 1) return;
  let date = new Date().getTime();
  if (wsConfig.heartBeatTime + wsConfig.heartRate <= date) {
    console.log("发送ping");
    var msg = proFormat.compress(proFormat.pingPro(), PID.Ping);
    wsConfig.ws.send(msg);
    wsConfig.heartBeatTime = date;
  }
}

// 重连
function reconnect(wsOptions) {
  if (wsConfig.wsStatus || wsConfig.closeState) return;
  wsConfig.wsStatus = true;
  wsConfig.reconnectTimer = setTimeout(function() {
    if (wsConfig.reconnectNum === 0) {
      wsConfig.reconnectNum = 250;
    } else {
      wsConfig.reconnectNum *= 2;
    }
    createWs(wsOptions);
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
    case PID.Result:
      handleResult(result);
      break;
    case PID.ChatList:
      handleChatList(result);
      break;
    case PID.ChatRBatch:
      handleMsgList(result);
      break;
    case PID.ChatR:
      handleMsg(result);
      break;
    case PID.ChatSR:
      handleSend(result);
      break;
    case PID.ChatItemUpdate:
      handleUpdateChat(result);
      break;
    case PID.ChatItem:
      handleGetChat(result);
      break;
    case PID.CosKey:
      handleGetCosKey(result);
      break;
    default:
      break;
  }
}

// 反编译protobuf
function decodePro(Pro, result) {
  return Pro.toObject(Pro.decode(result), {
    defaults: true,
  });
}

// 处理回调队列
function handleCallEvent(resultPro) {
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents[resultPro.sign];
  }
  return callEvent;
}

// 处理Result类型
function handleResult(result) {
  let resultPro = decodePro(Result, result);
  const code = resultPro.code;
  let callEvent = handleCallEvent(resultPro);
  if (callEvent?.type === OPERATION_TYPE.Login && !loginCode.includes(code)) {
    wsConfig.ws?.close();
    return;
  }
  switch (code) {
    case ERROR_CODE.SUCCESS: // 请求成功
      if (!callEvent) return;
      if (callEvent.type === OPERATION_TYPE.GetChats) {
        wsConfig.chatListEvent = callEvent;
        wsConfig.chatFormatList = [];
      } else {
        callEvent?.callSuc({
          data: resultPro,
        });
      }
      break;
    case ERROR_CODE.ERROR: // 请求失败（不区分原因）
      callEvent?.callErr(resultPro);
      break;
    case ERROR_CODE.TOKEN_NOT_FOUND: // im token 未找到（不存在或失效）
    case ERROR_CODE.KICKED_OUT: // 被踢下线
      wsConfig.closeState = true;
      wsConfig.ws.close();
      wsConfig.Global.handleMessage({
        type: HANDLE_TYPE.ResultError,
        data: resultPro,
      });
      callEvent?.callErr(resultPro);
      break;
    case 12: // 用户的会话列表为空
      callEvent?.callSuc({
        chats: [],
        hasMore: false,
      });
      break;
    default:
      callEvent?.callErr(resultPro);
      break;
  }
}

// 处理获取cosKey
function handleGetCosKey(result) {
  let resultPro = decodePro(CosKey, result);
  handleCallEvent(resultPro)?.callSuc({ data: resultPro });
}

// 处理会话列表
function handleChatList(result) {
  let resultPro = decodePro(ChatList, result);
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
  let resultPro = decodePro(ChatRBatch, result);
  handleCallEvent(resultPro)?.callSuc({ messages: resultPro.msgs });
}

// 处理发送消息成功
function handleSend(result) {
  let resultPro = decodePro(ChatSR, result);
  handleCallEvent(resultPro)?.callSuc({ data: resultPro });
}

// 处理接收到消息
function handleMsg(result) {
  let resultPro = decodePro(ChatR, result);
  let callEvent = handleCallEvent(resultPro);
  if (callEvent) {
    callEvent?.callSuc({ data: resultPro });
  } else {
    wsConfig.Global.handleMessage({
      type: HANDLE_TYPE.ChatR,
      data: resultPro,
    });
  }
}

// 处理获取指定会话信息
function handleGetChat(result) {
  let resultPro = decodePro(ChatItem, result);
  handleCallEvent(resultPro)?.callSuc({ data: resultPro });
}

// 处理会话列表更新
function handleUpdateChat(result) {
  let resultPro = decodePro(ChatItemUpdate, result);
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.ChatItemUpdate,
    data: resultPro,
  });
  handleCallEvent(resultPro)?.callSuc({ data: resultPro });
}

export { connectWs, closeWs, sendPing, sendWsMsg };
