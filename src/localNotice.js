import declare from './declare.js'
import localDexie from './dexieDB.js';
let storageKeys = [];

let localNotice = {
  clear,
  watchStorage,
  onMessageNotice,
  onWebSocketNotice,
}

// 设置本地缓存
function setLocal(key, val) {
  storageKeys.push(key);
  window.localStorage.setItem(key, JSON.stringify(val));
}

// 删除本地缓存
function removeLocal(key) {
  window.localStorage.removeItem(key);
  storageKeys = storageKeys.filter(k => k !== key);
}

function clear(isAll) {
  while (storageKeys.length > 0) {
    let key = storageKeys.pop();
    window.localStorage.removeItem(key);
  }
  if (isAll) {
    window.localStorage.removeItem('im_windowHeartBeat')
    window.localStorage.removeItem('im_wsCurId')
    window.localStorage.removeItem('im_wsTabs')
  }
}

/**监控localStorage
 * 
 */
function watchStorage(storage, msim, Global) {
  // console.log('storage', storage)
  // 移除localStorage不处理
  if (!storage.key || !storage.newValue) return;

  // 当前tab发生变动
  if (storage.key === 'im_wsCurId') {
    if (storage.newValue === Global.tabId) {
      Global.globalTimer();
    } else if (Global.curTab) {
      Global.clearTimer();
    }
    return;
  }
  // 指定当前tab连接ws
  if (storage.key === 'im_wsConnTab' && storage.newValue === Global.tabId) {
    Global.uid = null;
    localDexie.updateInfo({ "loginState": declare.IM_LOGIN_STATE.NotLogin })
    localDexie.getInfo().then(info => {
      msim.login({
        wsUrl: info.wsUrl,
        imToken: info.imToken,
      });
    })
    window.localStorage.removeItem('im_wsConnTab');
    return;
  }

  // 处理onMessage通知
  if (storage.key.indexOf(declare.LOCAL_OPERATION_TYPE.Message) === 0) {
    let localObj = JSON.parse(storage.newValue);
    Global.handleMessage(localObj);
    removeLocal(storage.key);
    return;
  }

  // 接收到ws操作通知
  if (storage.key.indexOf(declare.LOCAL_OPERATION_TYPE.WS) === 0) {
    handleWSNotice(storage, msim, Global);
    return;
  }
}

// 操作完成回调
function noticeCall(key, Global, localObj) {
  removeLocal(key);
  let callEvent = Global.callEvents[localObj.callSign];
  if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
    callEvent && callEvent.callSuc(localObj);
  } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
    callEvent && callEvent.callErr(localObj.err);
  }
}

// 操作失败
function noticeCatch(err, key, localObj) {
  localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
  localObj.err = err;
  setLocal(key, localObj)
}

// 操作成功
function noticeSuc(data, key, localObj) {
  localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
  localObj.data = data;
  setLocal(key, localObj)
}

function isJSON(str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
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
  switch (type) {
    case declare.OPERATION_TYPE.Logout:
      return msim.logout();
    case declare.OPERATION_TYPE.DelChat:
      return msim.deleteConversation(localObj.options);
    case declare.OPERATION_TYPE.GetMsgs:
      localObj.options.tabId = localObj.tabId;
      return msim.getMessageList(localObj.options)
    case declare.OPERATION_TYPE.GetCosKey:
      return msim.getCosKey();
    case declare.OPERATION_TYPE.Read:
      return msim.setMessageRead(localObj.options);
    case declare.OPERATION_TYPE.Send:
      return msim.sendMessage(localObj.options);
    case declare.OPERATION_TYPE.Resend:
      return msim.resendMessage(localObj.options);
    case declare.OPERATION_TYPE.Revoke:
      return msim.revokeMessage(localObj.options);
    default:
      return false;
  }
}

// 处理ws请求
function handleWSNotice(storage, msim, Global) {
  let localObj = isJSON(storage.newValue)
  if (localObj === false) {
    return;
  }
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    let type = storage.key.split("_")[2];
    let promise = createPromise(type, msim, localObj);
    if (!promise) return;
    promise.then(res => {
      if (type === declare.OPERATION_TYPE.GetMsgs) {
        localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
        localObj.hasMore = res.data.hasMore;
        localObj.messages = res.data.messages;
        setLocal(storage.key, localObj)
      } else {
        noticeSuc(res.data, storage.key, localObj)
      }
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (localObj.tabId === Global.tabId) {
    noticeCall(storage.key, Global, localObj)
  }
}


// 主动操作的通知，通知当前tab发送websocket请求
function onWebSocketNotice(type, data) {
  let key = `${declare.LOCAL_OPERATION_TYPE.WS + type}_${data.tabId}_${data.callSign};`
  setLocal(key, data);
}

// 内部处理的通知
function onMessageNotice(type, data) {
  let imWsTabs = JSON.parse(window.localStorage.getItem("im_wsTabs") || "[]");
  if (imWsTabs.length > 1) {
    setLocal(declare.LOCAL_OPERATION_TYPE.Message + type, data)
  }
}

export default localNotice;