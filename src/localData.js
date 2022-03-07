/**
 * 消息工具类
 */

// 添加消息列表
function addMsgList(Global, conversationID, msgs) {
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    msgList = [...msgs, ...msgList];
  } else {
    msgList = [...msgs];
  }
  Global.msgList.set(conversationID, msgList);
}

// 获取消息列表
function getMsgList(Global, conversationID, msgEnd) {
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    if (msgEnd) {
      msgList = msgList.filter((msg) => msg.msgId < msgEnd);
    }
    return msgList.sort((a, b) => a.msgId - b.msgId);
  } else {
    return [];
  }
}

// 更新指定消息
function updateMsgs(Global, conversationID, msgs) {
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    msgs.forEach((msg) => {
      let oldMsg = msgList.find((msgItem) => msgItem.msgId === msg.msgId);
      if (oldMsg) {
        Object.assign(oldMsg, msg);
      }
    });
  }
}

// 闪照消息状态更新
function updateFlashMsg(Global, msg) {
  let msgList = Global.msgList.get(msg.conversationID);
  if (msgList && msgList.length > 0) {
    let oldMsg = msgList.find((msgItem) => msgItem.msgId === msg.msgId);
    if (!oldMsg) return;
    let updateData = {};
    if (oldMsg.fromUid === msg.fromUid) {
      updateData.fromRead = true;
    } else if (oldMsg.toUid === msg.fromUid) {
      updateData.toRead = true;
    }
    Object.assign(oldMsg, updateData);
  }
}

// 删除指定消息
function deleteMsgs(Global, conversationID, msgIds) {
  if (!msgIds) {
    return Global.msgList.delete(conversationID);
  }
  let msgList = Global.msgList.get(conversationID);
  if (msgList && msgList.length > 0) {
    msgList = msgList.filter((msgItem) => !msgIds.includes(msgItem.msgId));
    Global.msgList.set(conversationID, msgList);
  }
}

export default {
  // 消息工具类
  addMsgList,
  getMsgList,
  updateMsgs,
  updateFlashMsg,
  deleteMsgs,
};
