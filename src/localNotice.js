import {
  OPERATION_TYPE,
  LOCAL_STORAGE_KEYS,
  LOCAL_OPERATION_STATUS,
} from "./sdkTypes";
let localKey = [
  LOCAL_STORAGE_KEYS.WindowHeart,
  LOCAL_STORAGE_KEYS.SetCurTab,
  LOCAL_STORAGE_KEYS.WsTabs,
  LOCAL_STORAGE_KEYS.ReconnectTab,
];
let localNotice = {
  clear,
  watchStorage,
  onMessageNotice,
  onWebSocketNotice,
};

// 设置本地缓存
function setLocal(key, val) {
  window.localStorage.setItem(key, JSON.stringify(val));
  window.localStorage.removeItem(key);
}

function clear(isAll) {
  for (let key in window.localStorage) {
    if (key.startsWith("imSdk_de4_")) {
      if (!localKey.includes(key) || isAll) {
        window.localStorage.removeItem(key);
      }
    }
  }
}

/**监控localStorage
 *
 */
function watchStorage(storage, msim, Global) {
  // 移除localStorage不处理
  if (!storage.key || !storage.newValue) return;

  // 当前tab发生变动
  if (storage.key === LOCAL_STORAGE_KEYS.SetCurTab) {
    if (storage.newValue === Global.tabId) {
      Global.globalTimer();
    } else if (Global.curTab) {
      Global.clearTimer();
    }
    return;
  }

  // 获取当前sdk状态, 如果是当前tab连接则返回状态
  if (storage.key === LOCAL_STORAGE_KEYS.GetSdkState && Global.curTab) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.SetSdkState,
      JSON.stringify({
        tabId: storage.newValue,
        sdkState: Global.sdkState,
      })
    );
  }

  // 收到当前sdk状态，如果是当前tab获取则更新
  if (storage.key === LOCAL_STORAGE_KEYS.SetSdkState) {
    let localObj = isJSON(storage.newValue);
    if (localObj.tabId === Global.tabId) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.SetSdkState);
      Global.stateCallEvents.forEach((callEvent, key) => {
        callEvent.callSuc(localObj.sdkState);
      });
    }
  }

  // 获取会话列表, 如果是当前tab连接则返回会话列表
  if (storage.key === LOCAL_STORAGE_KEYS.GetChats && Global.curTab) {
    let localObj = isJSON(storage.newValue);
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.SetChats,
      JSON.stringify({
        tabId: localObj.tabId,
        callSign: localObj.callSign,
        chats: Array.from(Global.chatKeys.values()),
      })
    );
  }

  // 收到获取会话列表，如果是当前tab获取则更新
  if (storage.key === LOCAL_STORAGE_KEYS.SetChats) {
    let localObj = isJSON(storage.newValue);
    if (localObj.tabId === Global.tabId) {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.SetChats);
      const callEvent = Global.chatCallEvents.get(localObj.callSign);
      callEvent &&
        callEvent.callSuc({
          chats: localObj.chats,
        });
    }
  }

  // 更新tabs
  if (
    storage.key.startsWith(LOCAL_STORAGE_KEYS.UpdateTabs) &&
    Global.curTab &&
    Global.updateTabs
  ) {
    Global.updateTabs.push(storage.newValue);
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.WsTabs,
      JSON.stringify(Global.updateTabs)
    );
  }

  // 指定当前tab连接ws
  if (
    storage.key === LOCAL_STORAGE_KEYS.ReconnectTab &&
    storage.newValue === Global.tabId
  ) {
    Global.reconnection();
    window.localStorage.removeItem(LOCAL_STORAGE_KEYS.ReconnectTab);
    return;
  }

  // 处理onNotice通知
  if (storage.key.startsWith(LOCAL_STORAGE_KEYS.Notice)) {
    let localObj = JSON.parse(storage.newValue);
    Global.handleMessage(localObj);
    return;
  }

  // 接收到ws操作通知
  if (storage.key.startsWith(LOCAL_STORAGE_KEYS.WS)) {
    handleWSNotice(storage, msim, Global);
    return;
  }
}

// 操作完成回调
function noticeCall(Global, localObj) {
  let callEvent = Global.callEvents.get(localObj.callSign);
  if (localObj.state === LOCAL_OPERATION_STATUS.Fulfilled) {
    callEvent?.callSuc && callEvent.callSuc(localObj);
  } else if (localObj.state === LOCAL_OPERATION_STATUS.Rejected) {
    callEvent?.callErr && callEvent.callErr(localObj.err);
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
    case OPERATION_TYPE.Revoke:
      promise = msim.revokeMessage(localObj.options);
      break;
    case OPERATION_TYPE.ReadFlash:
      promise = msim.readFlashMessage(localObj.options);
      break;
    case OPERATION_TYPE.GetCosKey:
      promise = msim.getCosKey();
      break;
    // TODO Ddemo API 打包屏蔽
    case OPERATION_TYPE.GetProfile:
      promise = msim.getProfile(localObj.options);
      break;
    case OPERATION_TYPE.GetProfileList:
      promise = msim.getProfileList(localObj.options);
      break;
    case OPERATION_TYPE.GetSpark:
      promise = msim.getSpark();
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
    noticeCall(Global, localObj);
  }
}

// 处理wsAPI调用，通知激活的tab发送websocket请求
function onWebSocketNotice(type, data) {
  let key = `${LOCAL_STORAGE_KEYS.WS + type}_${data.tabId}_${data.callSign};`;
  setLocal(key, data);
}

// 处理多Tab通知调用
function onMessageNotice(type, data) {
  let key = LOCAL_STORAGE_KEYS.Notice + type;
  setLocal(key, data);
}

export default localNotice;
