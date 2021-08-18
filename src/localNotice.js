import declare from './declare.js'
import localDexie from './dexieDB.js';
let storageKeys = [];

let localNotice = {
  clear,
  watchStorage,
  onMessageNotice,
  logoutNotice,
  getChatListNotice,
  delChatNotice,
  getMsgNotice,
  sendMsgNotice,
  resendMsgNotice,
  readMsgNotice,
  revokeMsgNotice,
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
  if (isAll) {
    window.localStorage.removeItem('im_windowHeartBeat')
    window.localStorage.removeItem('im_wsCurId')
    window.localStorage.removeItem('im_wsTabs')
  }
  while (storageKeys.length > 0) {
    let key = storageKeys.pop();
    window.localStorage.removeItem(key);
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
  if (storage.key.indexOf(declare.LOCAL_EVENT.Message) === 0) {
    let localObj = JSON.parse(storage.newValue);
    Global.handleMessage(localObj);
    removeLocal(storage.key);
    return;
  }

  // 接收到退出操作
  if (storage.key.indexOf(declare.LOCAL_EVENT.Logout) === 0) {
    handleLogout(storage, msim, Global);
    return;
  }

  // 会话列表
  if (storage.key.indexOf(declare.LOCAL_EVENT.GetChatList) === 0) {
    handleChatList(storage, msim, Global);
    return;
  }

  // 删除会话
  if (storage.key.indexOf(declare.LOCAL_EVENT.DelChat) === 0) {
    handleDelChat(storage, msim, Global);
    return;
  }

  // 消息列表
  if (storage.key.indexOf(declare.LOCAL_EVENT.GetMsgList) === 0) {
    handleMsgList(storage, msim, Global);
    return;
  }

  // 设置消息已读
  if (storage.key.indexOf(declare.LOCAL_EVENT.ReadMsg) === 0) {
    handleReadMsg(storage, msim, Global);
    return;
  }

  // 发送消息
  if (storage.key.indexOf(declare.LOCAL_EVENT.SendMsg) === 0) {
    handleSendMsg(storage, msim, Global);
    return;
  }

  // 重发消息
  if (storage.key.indexOf(declare.LOCAL_EVENT.ResendMsg) === 0) {
    handleResendMsg(storage, msim, Global);
    return;
  }

  // 撤回消息
  if (storage.key.indexOf(declare.LOCAL_EVENT.RevokeMsg) === 0) {
    handleRevokeMsg(storage, msim, Global);
    return;
  }
}

// 拼接退出登录key
function splicingLogout(tabId) {
  return declare.LOCAL_EVENT.Logout + tabId;
}

// 拼接获取会话列表key
function splicingGetChats(tabId) {
  return declare.LOCAL_EVENT.GetChatList + tabId;
}

// 拼接删除会话key
function splicingDelChat(tabId, uid) {
  return declare.LOCAL_EVENT.DelChat + tabId + '_' + uid;
}

// 拼接获取消息列表key
function splicingGetMsgs(tabId, uid) {
  return declare.LOCAL_EVENT.GetMsgList + tabId + '_' + uid;
}

// 拼接设置已读key
function splicingReadMsg(tabId, onlyId) {
  return declare.LOCAL_EVENT.ReadMsg + tabId + '_' + onlyId;
}

// 拼接发送消息key
function splicingSendMsg(tabId, onlyId) {
  return declare.LOCAL_EVENT.SendMsg + tabId + '_' + onlyId;
}

// 拼接发送消息key
function splicingResendMsg(tabId, onlyId) {
  return declare.LOCAL_EVENT.ResendMsg + tabId + '_' + onlyId;
}

// 拼接撤回消息key
function splicingRevokeMsg(tabId, onlyId) {
  return declare.LOCAL_EVENT.RevokeMsg + tabId + '_' + onlyId;
}

function noticeCall(key, Global, localObj) {
  removeLocal(key);
  let callEvent = Global.callEvents[localObj.callSign];
  if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
    callEvent && callEvent.callSuc(localObj);
  } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
    callEvent && callEvent.callErr(localObj.err);
  }
}

function noticeCatch(err, key, localObj) {
  localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
  localObj.err = err;
  setLocal(key, localObj)
}

function noticeSuc(data, key, localObj) {
  localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
  localObj.data = data;
  setLocal(key, localObj)
}

// 处理会话列表
function handleChatList(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    localObj.options.tabId = localObj.tabId;
    msim.getConversationList(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.hasMore = res.data.hasMore;
      localObj.chats = res.data.chats;
      setLocal(storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingGetChats(Global.tabId)) {
    noticeCall(storage.key, Global, localObj)
  }
}

// 删除会话
function handleDelChat(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    msim.deleteConversation(localObj.options).then(res => {
      noticeSuc(res.data, storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingDelChat(Global.tabId, localObj.options.uid)) {
    noticeCall(storage.key, Global, localObj)
  }
}

// 处理消息列表
function handleMsgList(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    localObj.options.tabId = localObj.tabId;
    msim.getMessageList(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.hasMore = res.data.hasMore;
      localObj.messages = res.data.messages;
      setLocal(storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingGetMsgs(Global.tabId, localObj.options.uid)) {
    noticeCall(storage.key, Global, localObj)
  }
}

// 发送消息
function handleSendMsg(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    msim.sendMessage(localObj.options).then(res => {
      noticeSuc(res.data, storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingSendMsg(Global.tabId, localObj.options.onlyId)) {
    noticeCall(storage.key, Global, localObj)
  }
}

// 重发消息
function handleResendMsg(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    msim.resendMessage(localObj.options).then(res => {
      noticeSuc(res.data, storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingResendMsg(Global.tabId, localObj.options.onlyId)) {
    noticeCall(storage.key, Global, localObj)
  }
}

// 设置消息已读
function handleReadMsg(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    msim.setMessageRead(localObj.options).then(res => {
      noticeSuc(res.data, storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingReadMsg(Global.tabId, localObj.options.onlyId)) {
    noticeCall(storage.key, Global, localObj)
  }
}

// 撤回消息
function handleRevokeMsg(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    msim.revokeMessage(localObj.options).then(res => {
      noticeSuc(res.data, storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingRevokeMsg(Global.tabId, localObj.options.onlyId)) {
    noticeCall(storage.key, Global, localObj)
  }
}

// 退出操作
function handleLogout(storage, msim, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    msim.logout().then(res => {
      noticeSuc(res.data, storage.key, localObj)
    }).catch(err => {
      noticeCatch(err, storage.key, localObj)
    })
  } else if (storage.key === splicingLogout(Global.tabId)) {
    noticeCall(storage.key, Global, localObj)
  }
}

/** 退出通知
 * 
 */
function logoutNotice(data) {
  setLocal(splicingLogout(data.tabId), data)
}

/** 获取会话列表通知
 * 
 */
function getChatListNotice(data) {
  setLocal(splicingGetChats(data.tabId), data)
}

/** 删除会话通知
 * 
 */
function delChatNotice(data) {
  setLocal(splicingDelChat(data.tabId, data.options.uid), data)
}

/** 获取消息列表通知
 * 
 */
function getMsgNotice(data) {
  setLocal(splicingGetMsgs(data.tabId, data.options.uid), data)
}

/** 设置消息已读
 * 
 */
function readMsgNotice(data) {
  setLocal(splicingReadMsg(data.tabId, data.options.onlyId), data)
}

/** 发送消息
 * 
 */
function sendMsgNotice(data) {
  setLocal(splicingSendMsg(data.tabId, data.options.onlyId), data)
}

/** 重发消息
 * 
 */
function resendMsgNotice(data) {
  setLocal(splicingResendMsg(data.tabId, data.options.onlyId), data)
}

/** 撤回消息
 * 
 */
function revokeMsgNotice(data) {
  setLocal(splicingRevokeMsg(data.tabId, data.options.onlyId), data)
}

// 内部处理的通知
function onMessageNotice(type, data) {
  let imWsTabs = JSON.parse(window.localStorage.getItem("im_wsTabs") || "[]");
  if (imWsTabs.length > 1) {
    setLocal(declare.LOCAL_EVENT.Message + type, data)
  }
}

export default localNotice;