import declare from './declare.js'
let localNotice = {
  clear,
  watchStorage,
  logoutNotice,
  getChatListNotice,
  delChatNotice,
  getMsgNotice,
  sendMsgNotice,
  resendMsgNotice,
  readMsgNotice,
  revokeMsgNotice,
  onlineNotice,
  offlineNotice,
  updateChatNotice,
  receivedMsgNotice,
  errorNotice,
}

function clear() {
  let imWsTab = window.localStorage.getItem('imWsTab')
  window.localStorage.clear();
  window.localStorage.setItem('imWsTab', imWsTab);
}

/**监控localStorage
 * 
 */
function watchStorage(storage, IMSDK, Global, onMessage) {
  if (!storage.key) return;

  // 指定当前tab连接ws
  if (storage.key == 'wsConnTab' && storage.newValue === Global.tabId) {
    let wsUrl = window.localStorage.getItem('wsUrl')
    let imToken = window.localStorage.getItem('imToken')
    let userId = window.localStorage.getItem('userId')
    IMSDK.login({
      wsUrl,
      imToken,
      testId: userId,
    });
    return;
  }

  // 登录通知
  if (storage.key.indexOf(declare.LOCAL_EVENT.Online) === 0 && storage.newValue) {
    let localObj = JSON.parse(storage.newValue);
    onMessage(localObj);
    return;
  }

  // 退出通知
  if (storage.key.indexOf(declare.LOCAL_EVENT.Offline) === 0 && storage.newValue) {
    let localObj = JSON.parse(storage.newValue);
    onMessage(localObj);
    return;
  }

  // 接收到退出操作
  if (storage.key.indexOf(declare.LOCAL_EVENT.Logout) === 0 && storage.newValue) {
    handleLogout(storage, IMSDK, Global);
    return;
  }

  // 会话列表
  if (storage.key.indexOf(declare.LOCAL_EVENT.GetChatList) === 0 && storage.newValue) {
    handleChatList(storage, IMSDK, Global);
    return;
  }

  // 删除会话
  if (storage.key.indexOf(declare.LOCAL_EVENT.DelChat) === 0 && storage.newValue) {
    handleDelChat(storage, IMSDK, Global);
    return;
  }

  // 消息列表
  if (storage.key.indexOf(declare.LOCAL_EVENT.GetMsgList) === 0 && storage.newValue) {
    handleMsgList(storage, IMSDK, Global);
    return;
  }

  // 设置消息已读
  if (storage.key.indexOf(declare.LOCAL_EVENT.ReadMsg) === 0 && storage.newValue) {
    handleReadMsg(storage, IMSDK, Global);
    return;
  }

  // 发送消息
  if (storage.key.indexOf(declare.LOCAL_EVENT.SendMsg) === 0 && storage.newValue) {
    handleSendMsg(storage, IMSDK, Global);
    return;
  }

  // 重发消息
  if (storage.key.indexOf(declare.LOCAL_EVENT.ResendMsg) === 0 && storage.newValue) {
    handleResendMsg(storage, IMSDK, Global);
    return;
  }

  // 撤回消息
  if (storage.key.indexOf(declare.LOCAL_EVENT.RevokeMsg) === 0 && storage.newValue) {
    handleRevokeMsg(storage, IMSDK, Global);
    return;
  }

  // 接收到新消息
  if (storage.key === declare.LOCAL_EVENT.ReceivedMsg && storage.newValue && !Global.curTab) {
    let localObj = JSON.parse(storage.newValue);
    onMessage(localObj);
    return;
  }

  // 接收到会话列表更新
  if (storage.key === declare.LOCAL_EVENT.UpdateChat && storage.newValue && !Global.curTab) {
    let localObj = JSON.parse(storage.newValue);
    onMessage(localObj);
    return;
  }

  // 接收到错误
  if (storage.key === declare.LOCAL_EVENT.ErrorType && storage.newValue && !Global.curTab) {
    let localObj = JSON.parse(storage.newValue);
    onMessage(localObj);
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

// 处理会话列表
function handleChatList(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    localObj.options.tabId = localObj.tabId;
    IMSDK.getConversationList(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.hasMore = res.hasMore;
      localObj.chats = res.chats;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingGetChats(Global.tabId)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 删除会话
function handleDelChat(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    IMSDK.deleteConversation(localObj.options.uid).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.data = res.data;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingDelChat(Global.tabId, localObj.options.uid)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 处理消息列表
function handleMsgList(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    localObj.options.tabId = localObj.tabId;
    IMSDK.getMessageList(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.hasMore = res.hasMore;
      localObj.messages = res.messages;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingGetMsgs(Global.tabId, localObj.options.uid)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 发送消息
function handleSendMsg(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    IMSDK.sendMessage(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.data = res.data;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingSendMsg(Global.tabId, localObj.options.onlyId)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 重发消息
function handleResendMsg(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    IMSDK.sendMessage(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.data = res.data;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingResendMsg(Global.tabId, localObj.options.onlyId)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 设置消息已读
function handleReadMsg(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    IMSDK.setMessageRead(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.data = res.data;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingReadMsg(Global.tabId, localObj.options.onlyId)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 撤回消息
function handleRevokeMsg(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    IMSDK.revokeMessage(localObj.options).then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.data = res.data;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingRevokeMsg(Global.tabId, localObj.options.onlyId)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 退出操作
function handleLogout(storage, IMSDK, Global) {
  let localObj = JSON.parse(storage.newValue);
  if (Global.curTab && localObj.state === declare.LOCAL_OPERATION_STATUS.Pending) {
    IMSDK.logout().then(res => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Fulfilled;
      localObj.data = res.data;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    }).catch(err => {
      localObj.state = declare.LOCAL_OPERATION_STATUS.Rejected;
      localObj.err = err;
      window.localStorage.setItem(storage.key, JSON.stringify(localObj))
    })
  } else if (storage.key === splicingLogout(Global.tabId)) {
    window.localStorage.removeItem(storage.key);
    if (localObj.state === declare.LOCAL_OPERATION_STATUS.Fulfilled) {
      Global.callEvent[localObj.callSign].callSuc(localObj);
    } else if (localObj.state === declare.LOCAL_OPERATION_STATUS.Rejected) {
      Global.callEvent[localObj.callSign].callErr(localObj);
    }
  }
}

// 上线
function onlineNotice(data) {
  window.localStorage.setItem(declare.LOCAL_EVENT.Online, JSON.stringify(data))
}

// 下线
function offlineNotice(data) {
  window.localStorage.setItem(declare.LOCAL_EVENT.Offline, JSON.stringify(data))
}

/** 退出通知
 * 
 */
function logoutNotice(data) {
  window.localStorage.setItem(splicingLogout(data.tabId), JSON.stringify(data))
}

/** 获取会话列表通知
 * 
 */
function getChatListNotice(data) {
  window.localStorage.setItem(splicingGetChats(data.tabId), JSON.stringify(data))
}

/** 删除会话通知
 * 
 */
function delChatNotice(data) {
  window.localStorage.setItem(splicingDelChat(data.tabId, data.options.uid), JSON.stringify(data))
}

/** 获取消息列表通知
 * 
 */
function getMsgNotice(data) {
  window.localStorage.setItem(splicingGetMsgs(data.tabId, data.options.uid), JSON.stringify(data))
}

/** 设置消息已读
 * 
 */
function readMsgNotice(data) {
  window.localStorage.setItem(splicingReadMsg(data.tabId, data.options.onlyId), JSON.stringify(data))
}

/** 发送消息
 * 
 */
function sendMsgNotice(data) {
  window.localStorage.setItem(splicingSendMsg(data.tabId, data.options.onlyId), JSON.stringify(data))
}

/** 重发消息
 * 
 */
function resendMsgNotice(data) {
  window.localStorage.setItem(splicingResendMsg(data.tabId, data.options.onlyId), JSON.stringify(data))
}

/** 撤回消息
 * 
 */
function revokeMsgNotice(data) {
  window.localStorage.setItem(splicingRevokeMsg(data.tabId, data.options.onlyId), JSON.stringify(data))
}

// 更新会话列表
function updateChatNotice(data) {
  window.localStorage.setItem(declare.LOCAL_EVENT.UpdateChat, JSON.stringify(data))
}

// 接收到新消息
function receivedMsgNotice(data) {
  window.localStorage.setItem(declare.LOCAL_EVENT.ReceivedMsg, JSON.stringify(data))
}

// 接收到错误
function errorNotice(data) {
  window.localStorage.setItem(declare.LOCAL_EVENT.ErrorType, JSON.stringify(data))
}

export default localNotice;