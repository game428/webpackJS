import {
  Result,
  CosKey,
  ChatList,
  ChatRBatch,
  ChatSR,
  ChatR,
  ChatItem,
  ChatItemUpdate,
  GroupInfo,
  GroupChatR,
  GroupChatSR,
  GroupChatRBatch,
  GroupEvent,
} from "./google/proto";
import proFormat from "./google/proFormat";
import { PID, ERROR_CODE, HANDLE_TYPE, OPERATION_TYPE } from "./sdkTypes";
import pako from "pako";
let wsConfig = {
  ws: null,
  Global: null,
  heartRate: 30000, // 心跳检查时间
  maxReconnectTime: 15000, // 最大重连间隔时间
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
  wsConfig.reconnectNum = 0;
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
  if (wsConfig?.ws?.readyState !== 1) return;
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
    } else if (wsConfig.reconnectNum <= wsConfig.maxReconnectTime / 2) {
      wsConfig.reconnectNum *= 2;
    } else {
      wsConfig.reconnectNum = wsConfig.maxReconnectTime;
    }
    createWs(wsOptions);
    wsConfig.wsStatus = false;
  }, wsConfig.reconnectNum);
}

// 处理回调队列
function handleCallEvent(resultPro) {
  var callEvents = wsConfig.Global.callEvents;
  var callEvent = null;
  if (Object.prototype.hasOwnProperty.call(resultPro, "sign")) {
    callEvent = callEvents.get(resultPro.sign);
  }
  return callEvent;
}

// 反序列化protobuf
function decodePro(result, pro) {
  // TODO decode
  // return pro.toObject(pro.decode(result), { defaults: true });
  return pro.deserializeBinary(result).toObject();
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
    case PID.GroupInfo:
      handleJoinGroup(result);
      break;
    case PID.GroupChatSR:
      handleSendGroupMsg(result);
      break;
    case PID.GroupChatR:
      handleGroupMsg(result);
      break;
    case PID.GroupChatRBatch:
      handleGroupOfflineMsg(result);
      break;
    case PID.GroupEvent:
      handleGroupEvent(result);
      break;
    default:
      break;
  }
}

// 处理Result类型
function handleResult(result) {
  let resultPro = decodePro(result, Result);
  const code = resultPro.code;
  let callEvent = handleCallEvent(resultPro);
  if (callEvent?.type === OPERATION_TYPE.Login && !loginCode.includes(code)) {
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
      wsConfig.closeState = true;
      wsConfig.ws.close();
      wsConfig.Global.handleMessage({
        type: HANDLE_TYPE.ResultError,
        data: resultPro,
      });
      callEvent?.callErr && callEvent.callErr(resultPro);
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
  let resultPro = decodePro(result, CosKey);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 处理会话列表
function handleChatList(result) {
  let resultPro = decodePro(result, ChatList);
  // wsConfig.chatFormatList.push(...resultPro.chatItems);
  wsConfig.chatFormatList.push(...resultPro.chatItemsList);
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
  let resultPro = decodePro(result, ChatRBatch);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc &&
    callEvent.callSuc({
      messages: resultPro.msgsList,
    });
  // callEvent.callSuc(resultPro, { messages: resultPro.msgs });
}

// 处理发送消息成功
function handleSend(result) {
  let resultPro = decodePro(result, ChatSR);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 处理接收到消息
function handleMsg(result) {
  let resultPro = decodePro(result, ChatR);
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
  let resultPro = decodePro(result, ChatItem);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 处理会话列表更新
function handleUpdateChat(result) {
  let resultPro = decodePro(result, ChatItemUpdate);
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.ChatItemUpdate,
    data: resultPro,
  });
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 处理加入群
function handleJoinGroup(result) {
  let resultPro = decodePro(result, GroupInfo);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 发送群消息
function handleSendGroupMsg(result) {
  let resultPro = decodePro(result, GroupChatSR);
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

// 收到群消息
function handleGroupMsg(result) {
  let resultPro = decodePro(result, GroupChatR);
  let callEvent = handleCallEvent(resultPro);
  if (callEvent?.callSuc) {
    callEvent.callSuc({ data: resultPro });
  } else {
    wsConfig.Global.handleMessage({
      type: HANDLE_TYPE.GroupChatR,
      data: resultPro,
    });
  }
}

// 收到群离线消息
function handleGroupOfflineMsg(result) {
  let resultPro = decodePro(result, GroupChatRBatch);
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.GroupOfflineMsg,
    data: resultPro.msgsList,
  });
}

// 收到群事件
function handleGroupEvent(result) {
  let resultPro = decodePro(result, GroupEvent);
  resultPro.members = resultPro.membersList;
  delete resultPro.membersList;
  if (resultPro.tip) {
    resultPro.tip = {
      event: resultPro.tip.event,
      uids: resultPro.tip.uidsList,
    };
  }
  wsConfig.Global.handleMessage({
    type: HANDLE_TYPE.GroupEvent,
    etype: resultPro.etype,
    tip: resultPro.tip,
    data: resultPro,
  });
  let callEvent = handleCallEvent(resultPro);
  callEvent?.callSuc && callEvent.callSuc({ data: resultPro });
}

export { connectWs, closeWs, sendPing, sendWsMsg };
