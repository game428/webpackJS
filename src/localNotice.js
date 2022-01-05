import {
  OPERATION_TYPE,
  LOCAL_OPERATION_TYPE,
  LOCAL_OPERATION_STATUS,
} from "./sdkTypes";
let storageKeys = [];

let localNotice = {
  clear,
  watchStorage,
  onMessageNotice,
  onWebSocketNotice,
};

// 设置本地缓存
function setLocal(key, val) {
  storageKeys.push(key);
  window.localStorage.setItem(key, JSON.stringify(val));
}

// 删除本地缓存
function removeLocal(key) {
  window.localStorage.removeItem(key);
  storageKeys = storageKeys.filter((k) => k !== key);
}

function clear(isAll) {
  while (storageKeys.length > 0) {
    let key = storageKeys.pop();
    window.localStorage.removeItem(key);
  }
  if (isAll) {
    window.localStorage.removeItem("im_windowHeartBeat");
    window.localStorage.removeItem("im_wsCurId");
    window.localStorage.removeItem("im_wsTabs");
    window.localStorage.removeItem("im_wsConnTab");
  }
}

/**监控localStorage
 *
 */
function watchStorage(storage, msim, Global) {
  // 移除localStorage不处理
  if (!storage.key || !storage.newValue) return;

  // 当前tab发生变动
  if (storage.key === "im_wsCurId") {
    if (storage.newValue === Global.tabId) {
      Global.globalTimer();
    } else if (Global.curTab) {
      Global.clearTimer();
    }
    return;
  }

  // 获取当前sdk状态, 如果是当前tab连接则返回状态
  if (storage.key === "im_getSdkState" && Global.curTab) {
    window.localStorage.setItem(
      "im_setSdkState",
      JSON.stringify({
        tabId: storage.newValue,
        sdkState: Global.sdkState,
      })
    );
  }

  // 收到当前sdk状态，如果是当前tab获取则更新
  if (storage.key === "im_setSdkState") {
    let localObj = isJSON(storage.newValue);
    if (localObj.tabId === Global.tabId) {
      window.localStorage.removeItem("im_setSdkState");
      Global.stateCallEvents.forEach((callEvent, key) => {
        callEvent.callSuc(localObj.sdkState);
      });
    }
  }

  // 更新tabs
  if (
    storage.key.indexOf("im_update_tabs_") === 0 &&
    Global.curTab &&
    Global.updateTabs
  ) {
    Global.updateTabs.push(storage.newValue);
    window.localStorage.setItem("im_wsTabs", JSON.stringify(Global.updateTabs));
  }

  // 指定当前tab连接ws
  if (storage.key === "im_wsConnTab" && storage.newValue === Global.tabId) {
    Global.reconnection();
    window.localStorage.removeItem("im_wsConnTab");
    return;
  }

  // 处理onMessage通知
  if (storage.key.indexOf(LOCAL_OPERATION_TYPE.Message) === 0) {
    let localObj = JSON.parse(storage.newValue);
    Global.handleMessage(localObj);
    return;
  }

  // 接收到ws操作通知
  if (storage.key.indexOf(LOCAL_OPERATION_TYPE.WS) === 0) {
    handleWSNotice(storage, msim, Global);
    return;
  }
}

// 操作完成回调
function noticeCall(key, Global, localObj) {
  removeLocal(key);
  let callEvent = Global.callEvents.get(localObj.callSign);
  if (localObj.state === LOCAL_OPERATION_STATUS.Fulfilled) {
    callEvent && callEvent.callSuc(localObj);
  } else if (localObj.state === LOCAL_OPERATION_STATUS.Rejected) {
    callEvent && callEvent.callErr(localObj.err);
  }
}

// 操作失败
function noticeCatch(err, key, localObj) {
  localObj.state = LOCAL_OPERATION_STATUS.Rejected;
  localObj.err = err;
  setLocal(key, localObj);
}

// 操作成功
function noticeSuc(data, key, localObj) {
  localObj.state = LOCAL_OPERATION_STATUS.Fulfilled;
  localObj.data = data;
  setLocal(key, localObj);
}

function isJSON(str) {
  if (typeof str == "string") {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == "object" && obj) {
        return obj;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
}

// 根据操作类型返回对应的方法
function createPromise(type, msim, localObj) {
  let promise = null;
  switch (type) {
    case OPERATION_TYPE.Logout:
      promise = msim.logout();
      break;
    case OPERATION_TYPE.GetChat:
      promise = msim.getConversationProvider(localObj.options);
      break;
    case OPERATION_TYPE.DelChat:
      promise = msim.deleteConversation(localObj.options);
      break;
    case OPERATION_TYPE.GetAllUnread:
      promise = msim.getAllUnreadCount();
      break;
    case OPERATION_TYPE.GetMsgs:
      localObj.options.tabId = localObj.tabId;
      promise = msim.getMessageList(localObj.options);
      break;
    case OPERATION_TYPE.Read:
      promise = msim.setMessageRead(localObj.options);
      break;
    case OPERATION_TYPE.Send:
      promise = msim.sendMessage(localObj.options);
      break;
    case OPERATION_TYPE.Resend:
      promise = msim.resendMessage(localObj.options);
      break;
    case OPERATION_TYPE.Revoke:
      promise = msim.revokeMessage(localObj.options);
      break;
    case OPERATION_TYPE.GetCosKey:
      promise = msim.getCosKey();
      break;
    default:
      promise = false;
      break;
  }
  return promise;
}

// 处理ws请求
function handleWSNotice(storage, msim, Global) {
  let localObj = isJSON(storage.newValue);
  if (localObj === false) {
    return;
  }
  if (Global.curTab && localObj.state === LOCAL_OPERATION_STATUS.Pending) {
    let type = storage.key.split("_")[2];
    let promise = createPromise(type, msim, localObj);
    if (!promise) return;
    promise
      .then((res) => {
        if (type === OPERATION_TYPE.GetMsgs) {
          localObj.state = LOCAL_OPERATION_STATUS.Fulfilled;
          localObj.hasMore = res.data.hasMore;
          localObj.messages = res.data.messages;
          setLocal(storage.key, localObj);
        } else {
          noticeSuc(res.data, storage.key, localObj);
        }
      })
      .catch((err) => {
        noticeCatch(err, storage.key, localObj);
      });
  } else if (localObj.tabId === Global.tabId) {
    noticeCall(storage.key, Global, localObj);
  }
}

// 主动操作的通知，通知当前tab发送websocket请求
function onWebSocketNotice(type, data) {
  let key = `${LOCAL_OPERATION_TYPE.WS + type}_${data.tabId}_${data.callSign};`;
  setLocal(key, data);
}

// 内部处理的通知
function onMessageNotice(type, data) {
  let key = LOCAL_OPERATION_TYPE.Message + type;
  setLocal(key, data);
  removeLocal(key);
}

export default localNotice;
