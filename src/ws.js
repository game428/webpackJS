import {
  Result,
  CosKey,
  ChatList,
  ChatRBatch,
  ChatSR,
  ChatR,
  ChatItem,
  ChatItemUpdate,
  Sparks,
  ProfileOnline,
  UsrOffline,
  ProfileList,
  Profile,
} from "./proto";
import pako from "pako";
import proFormat from "./proFormat";
import { PID, ERROR_CODE, HANDLE_TYPE, OPERATION_TYPE } from "./sdkTypes";
let wsConfig = {
  ws: null,
  Global: null,
  wsOptions: null, // ws信息配置
  heartRate: 30000, // 心跳检查时间
  maxReconnectTime: 15000, // 最大重连间隔时间
  heartBeatTime: null, // 上次发送消息时间
  closeReconnect: false, // 关闭重连
  reconnectTimer: null, // 重连定时器
  reconnectNum: 0, // 重连间隔时间
  reconnectSpace: false, // 重连冷却状态
  chatListEvent: null, // 获取会话sign
  chatFormatList: [], // 会话列表
};

let loginCode = [
  14, //业务服务器未启动
  505, //server busy, try later
  506, //server reach max capacity, try later
];

// 连接ws
function connectWs(Global, wsOptions) {
  reset();
  wsConfig.Global = Global;
  wsConfig.wsOptions = wsOptions;
  wsConfig.closeReconnect = false;
  createWs(wsOptions);
  window.addEventListener("online", () => {
    online(wsOptions);
  });
  window.addEventListener("offline", () => {
    wsConfig.ws.close();
  });
}

// 上线重连
function online(wsOptions) {
  if (wsConfig.closeReconnect || wsConfig.ws.readyState === 1) return;
  wsConfig.reconnectSpace = false;
  wsConfig.reconnectNum = 0;
  if (wsConfig.ws) {
    wsConfig.ws.close();
  } else {
    reconnect(wsOptions);
  }
}

// 发送消息
function sendWsMsg(msg, pid) {
  wsConfig.heartBeatTime = Date.now();
  let sendMsg = proFormat.compress(msg, pid);
  wsConfig.ws?.send(sendMsg);
}

// 关闭连接
function closeWs() {
  reset();
  if (wsConfig.ws) {
    wsConfig.ws.close();
  }
}

function reset() {
  if (wsConfig.reconnectTimer) clearTimeout(wsConfig.reconnectTimer);
  wsConfig.ws = null;
  wsConfig.Global = null;
  wsConfig.wsOptions = null;
  wsConfig.heartBeatTime = null;
  wsConfig.reconnectSpace = false;
  wsConfig.closeReconnect = true;
  wsConfig.reconnectTimer = null;
  wsConfig.reconnectNum = 0;
  wsConfig.chatListEvent = null;
  wsConfig.chatFormatList = [];
}

function resetReconnectNum() {
  wsConfig.reconnectNum = 0;
}

// 初始化ws
function createWs(wsOptions) {
  wsConfig.Global.onConn();
  let ws = new WebSocket(wsOptions.wsUrl);
  ws.binaryType = "arraybuffer";
  ws.onopen = (evt) => {
    wsConfig.heartBeatTime = Date.now();
    wsOptions.connSuc(wsOptions);
  };
  ws.onmessage = onMessage;
  ws.onclose = (err) => {
    console.log("Connection closed.", err, { ...wsConfig }, wsOptions);
    if (wsOptions.imToken === wsConfig?.wsOptions?.imToken) {
      reconnect(wsOptions);
      wsOptions.connErr(wsOptions, err);
    }
  };
  ws.onerror = (err) => {
    console.log("Connection Error", err);
    if (wsOptions.imToken === wsConfig?.wsOptions?.imToken) {
      reconnect(wsOptions);
    }
  };
  wsConfig.ws = ws;
}

// 发送心跳消息
function sendPing() {
  if (wsConfig.ws?.readyState !== 1) return;
  let date = Date.now();
  if (wsConfig.heartBeatTime + wsConfig.heartRate <= date) {
    var msg = proFormat.compress(proFormat.pingPro(), PID.Ping);
    wsConfig.ws.send(msg);
    wsConfig.heartBeatTime = date;
  }
}

// 重连
function reconnect(wsOptions) {
  if (
    wsConfig.reconnectSpace ||
    wsConfig.closeReconnect ||
    wsOptions.imToken !== wsConfig?.wsOptions?.imToken
  )
    return;
  wsConfig.reconnectSpace = true;
  wsConfig.reconnectTimer = setTimeout(function() {
    if (wsConfig.reconnectNum === 0) {
      wsConfig.reconnectNum = 250;
    } else if (wsConfig.reconnectNum <= wsConfig.maxReconnectTime / 2) {
      wsConfig.reconnectNum *= 2;
    } else {
      wsConfig.reconnectNum = wsConfig.maxReconnectTime;
    }
    createWs(wsOptions);
    wsConfig.reconnectSpace = false;
  }, wsConfig.reconnectNum);
}

// 处理回调队列
function handleCallEvent(resultPro) {
  if (!wsConfig.Global) return null;
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents.get(resultPro.sign);
  }
  return callEvent;
}

// 反编译protobuf
function decodePro(Pro, result) {
  return Pro.toObject(Pro.decode(result), {
    defaults: true,
  });
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
    // TODO Demo 相关 打包屏蔽
    case PID.Profile:
      handleDemoProfile(result);
      break;
    case PID.ProfileList:
      handleDemoProfiles(result);
      break;
    case PID.Sparks:
      handleDemoSparks(result);
      break;
    case PID.ProfileOnline:
      handleOnline(result);
      break;
    case PID.UsrOffline:
      handleOffline(result);
      break;
    default:
      break;
  }
}

// TODO Demo 相关 打包屏蔽
/**
 * SDK
 */
// 批量处理获取用户信息
function handleDemoProfile(result) {
  let resultPro = decodePro(Profile, result);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}
// 处理获取用户信息
function handleDemoProfiles(result) {
  let resultPro = decodePro(ProfileList, result);
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.DemoUpdateProfile,
    data: resultPro,
  });
}
// 处理获取spark
function handleDemoSparks(result) {
  let resultPro = decodePro(Sparks, result);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}
// 处理上线通知
function handleOnline(result) {
  let resultPro = decodePro(ProfileOnline, result);
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.DemoUsrOnline,
    data: resultPro,
  });
}
// 处理下线线通知
function handleOffline(result) {
  let resultPro = decodePro(UsrOffline, result);
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.DemoUsrOffline,
    data: resultPro,
  });
}

/**
 * SDK 发布相关
 */

// 处理Result类型
function handleResult(result) {
  let resultPro = decodePro(Result, result);
  const code = resultPro.code;
  let callEvent = handleCallEvent(resultPro);
  if (callEvent?.type === OPERATION_TYPE.Login && loginCode.includes(code)) {
    wsConfig.ws?.close();
    return;
  }
  switch (code) {
    case ERROR_CODE.SUCCESS: // 请求成功
      if (callEvent?.type === OPERATION_TYPE.GetChats) {
        wsConfig.chatListEvent = callEvent;
        wsConfig.chatFormatList = [];
      } else {
        callEvent?.callSuc &&
          callEvent.callSuc({
            data: resultPro,
          });
      }
      break;
    case ERROR_CODE.ERROR: // 请求失败（不区分原因）
      callEvent?.callErr && callEvent.callErr(resultPro);
      break;
    case ERROR_CODE.TOKEN_NOT_FOUND: // im token 未找到（不存在或失效）
    case ERROR_CODE.KICKED_OUT: // 被踢下线
    case ERROR_CODE.SUBAPP_NOT_EXIST: // TODO 子app不存在时不要一直登录
      wsConfig.closeReconnect = true;
      wsConfig.ws && wsConfig.ws.close();
      if (wsConfig.Global) {
        wsConfig.Global.handleMessage({
          type: HANDLE_TYPE.ResultError,
          data: resultPro,
        });
        callEvent?.callErr && callEvent.callErr(resultPro);
      }
      break;
    case 12: // 用户的会话列表为空
      callEvent?.callSuc &&
        callEvent.callSuc({
          chats: [],
          hasMore: false,
        });
      break;
    default:
      callEvent?.callErr && callEvent.callErr(resultPro);
      break;
  }
}

// 处理获取cosKey
function handleGetCosKey(result) {
  let resultPro = decodePro(CosKey, result);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 处理会话列表
function handleChatList(result) {
  let resultPro = decodePro(ChatList, result);
  wsConfig.chatFormatList.push(...resultPro.chatItems);
  if (resultPro.updateTime && wsConfig.chatListEvent?.callSuc) {
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
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ messages: resultPro.msgs });
}

// 处理发送消息成功
function handleSend(result) {
  let resultPro = decodePro(ChatSR, result);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 处理接收到消息
function handleMsg(result) {
  let resultPro = decodePro(ChatR, result);
  let callEvent = handleCallEvent(resultPro);
  if (callEvent?.callSuc) {
    callEvent.callSuc({ data: resultPro });
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
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 处理会话列表更新
function handleUpdateChat(result) {
  let resultPro = decodePro(ChatItemUpdate, result);
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.ChatItemUpdate,
    data: resultPro,
  });
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

export { connectWs, closeWs, sendPing, sendWsMsg, resetReconnectNum };
