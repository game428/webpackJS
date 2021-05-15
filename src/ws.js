import protobuf from './imProtobuf_pb.js';
import proFormat from './proFormat.js';
import declare from './declare.js';
import pako from './pako.min.js';
let localWs = {
  ws: null,
  Global: null,
  heartRate: 3000,
  heartBeatTime: null, // 心跳检查时间
  heartBeatTimer: null, // 心跳定时器
  reconnectNum: 0, // 重连次数
  onMessage: null, // 处理被动接收消息
}

// 连接ws
localWs.connect = function (Global, connSuc, connErr, onMessage) {
  reset();
  localWs.reconnectNum = 0;
  localWs.Global = Global;
  localWs.onMessage = onMessage;
  let wsUrl = localWs.Global.wsUrl;
  createWs(wsUrl, connSuc, connErr);
}

// 发送消息
localWs.sendMessage = function (msg) {
  localWs.heartBeatTime = new Date().getTime();
  localWs.ws.send(msg);
}

// 关闭连接
localWs.close = function () {
  if (localWs.ws) {
    localWs.reconnectNum = 5;
    localWs.ws.close();
  }
  reset();
}

function reset() {
  if (localWs.heartBeatTimer) clearInterval(localWs.heartBeatTimer);
  localWs.ws = null;
  localWs.Global = null;
  localWs.heartBeatTime = null;
  localWs.heartBeatTimer = null;
  localWs.chatListId = null;
  localWs.chatFormatList = null;
}

// 初始化ws
function createWs(wsUrl, connSuc, connErr) {
  localWs.ws = new WebSocket(wsUrl);
  localWs.ws.binaryType = 'arraybuffer';
  localWs.ws.onopen = (evt) => {
    localWs.heartBeatTime = new Date().getTime();
    if (typeof connSuc === 'function') connSuc();
    localWs.heartBeatTimer = setInterval(() => {
      let date = new Date().getTime();
      if (localWs.heartBeatTime + localWs.heartRate <= date) {
        var msg = proFormat.compress(proFormat.pingPro(), declare.PID.Ping);
        localWs.ws.send(msg);
      }
      localWs.heartBeatTime = date
    }, localWs.heartRate)
  };
  localWs.ws.onmessage = onmessage;
  localWs.ws.onclose = (evt) => {
    console.log("Connection closed.", evt);
    clearInterval(localWs.heartBeatTimer);
    reconnect(wsUrl, connSuc, connErr);
    if (typeof connErr === 'function') connErr();
  };
  localWs.ws.onerror = (err) => {
    console.log('连接错误');
    reconnect(wsUrl, connSuc, connErr);
  };
}

// 重连
function reconnect(wsUrl, connSuc, connErr) {
  if (localWs.reconnectNum >= 5) return; //最多重连5次，设置延迟避免请求过多
  setTimeout(function () {
    localWs.reconnectNum += 1;
    createWs(wsUrl, connSuc, connErr);
  }, 2000 * localWs.reconnectNum);
}

// 收到消息
function onmessage(evt) {
  var pid = new Uint8Array(evt.data.slice(0, 1))[0];
  var result = evt.data.slice(2);
  if (new Uint8Array(evt.data.slice(1, 2))[0] === 1) {
    result = pako.inflate(result, {
      to: 'Uint8Array'
    });
  }
  result = new Uint8Array(result);
  var resultPro;
  console.log('接收到消息', pid);
  switch (pid) {
    case declare.PID.Result:
      handleResult(result);
      break;
    case declare.PID.ChatList:
      handleChatList(result)
      break;
    case declare.PID.ChatRBatch:
      handleMsgList(result)
      break;
    case declare.PID.ChatR:
      handleRevoke(result)
      break;
    case declare.PID.ChatSR:
      handleSend(result)
      break;
    case declare.PID.ChatItemUpdate:
      handleUpdateChat(result)
      break;
    case declare.PID.ChatItem:
      handleGetChat(result)
      break;
    case declare.PID.ProfileOnline:
      resultPro = protobuf.ProfileOnline.deserializeBinary(result);
      break;
    case declare.PID.UsrOffline:
      resultPro = protobuf.UsrOffline.deserializeBinary(result);
      break;
  }
};

// 处理Result类型
function handleResult(result) {
  let resultPro = protobuf.Result.deserializeBinary(result).toObject();
  const code = resultPro.code;
  var callEvents = localWs.Global.callEvent;
  var callEvent = null;
  console.log('result', resultPro)
  if (resultPro.hasOwnProperty('sign')) {
    callEvent = callEvents[resultPro.sign];
  }
  switch (code) {
    case 0: // 请求成功
      callEvent && callEvent.callSuc({
        data: resultPro,
      });
      break;
    case 1: // 请求失败（不区分原因）
      callEvent && callEvent.callErr(resultPro);
      break;
    case 4: // im token 未找到（不存在或失效）
      localWs.reconnectNum = 5;
      localWs.onMessage({
        type: declare.PID.Result,
        data: resultPro,
      });
      callEvent && callEvent.callErr(resultPro);
      break;
    case 9: // 用户不存在 或服务器满载暂不接受新请求
      localWs.reconnectNum = 5;
      callEvent && callEvent.callErr(resultPro);
      break;
    case 12: // 用户的会话列表为空
      if (callEvent) {
        callEvent.callSuc({
          chats: [],
          hasMore: false,
        });
      }
      break;
    case 2008: // 被踢下线
      localWs.reconnectNum = 5;
      localWs.onMessage({
        type: declare.PID.Result,
        data: resultPro,
      });
      callEvent && callEvent.callErr(resultPro);
      break;
    default:
      callEvent && callEvent.callErr(resultPro);
      break;
  }
}

// 处理会话列表
function handleChatList(result) {
  let resultPro = protobuf.ChatList.deserializeBinary(result).toObject();
  var callEvents = localWs.Global.callEvent;
  var callEvent = null;
  if (resultPro.hasOwnProperty('sign')) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent && callEvent.callSuc({
      chats: resultPro.chatItemsList,
      hasMore: resultPro.hasMore,
    });
  }
}

// 处理消息列表
function handleMsgList(result) {
  let resultPro = protobuf.ChatRBatch.deserializeBinary(result).toObject();
  var callEvents = localWs.Global.callEvent;
  var callEvent = null;
  if (resultPro.hasOwnProperty('sign')) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent && callEvent.callSuc({
      messages: resultPro.msgsList,
      hasMore: resultPro.hasMore,
    });
  }
}

// 处理发送消息成功
function handleSend(result) {
  let resultPro = protobuf.ChatSR.deserializeBinary(result).toObject();
  var callEvents = localWs.Global.callEvent;
  var callEvent = null;
  if (resultPro.hasOwnProperty('sign')) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent && callEvent.callSuc({
      data: resultPro,
    });
  }
}

// 处理撤回消息成功
function handleRevoke(result) {
  let resultPro = protobuf.ChatR.deserializeBinary(result).toObject();
  var callEvents = localWs.Global.callEvent;
  var callEvent = null;
  if (resultPro.hasOwnProperty('sign')) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    if (callEvent) {
      callEvent.callSuc({
        data: resultPro,
      });
    } else {
      localWs.onMessage({
        type: declare.PID.ChatR,
        data: resultPro,
      });
    }
  }
}

// 处理获取指定会话信息
function handleGetChat(result) {
  let resultPro = protobuf.ChatItem.deserializeBinary(result).toObject();
  var callEvents = localWs.Global.callEvent;
  var callEvent = null;
  if (resultPro.hasOwnProperty('sign')) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent && callEvent.callSuc({
      data: resultPro,
    });
  }
}

// 处理会话列表更新
function handleUpdateChat(result) {
  let resultPro = protobuf.ChatItemUpdate.deserializeBinary(result).toObject();
  localWs.onMessage({
    type: declare.PID.ChatItemUpdate,
    data: resultPro,
  });
  var callEvents = localWs.Global.callEvent;
  var callEvent = null;
  if (resultPro.hasOwnProperty('sign')) {
    callEvent = callEvents[resultPro.sign];
    // 如果没有回调事件则不处理
    callEvent && callEvent.callSuc({
      data: resultPro,
    });
  }
}


export default localWs;