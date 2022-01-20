import tool from "./tool";
import {
  PID,
  SEND_STATE,
  GROUP_TYPE,
  HANDLE_TYPE,
  GROUP_ACTION,
  OPERATION_TYPE,
  LOCAL_OPERATION_STATUS,
} from "./sdkTypes";
import proFormat from "./google/proFormat";
import { sendWsMsg } from "./ws";
import localNotice from "./localNotice";

// 加入聊天室
function joinChatRoom(Global, options) {
  return new Promise((resolve, reject) => {
    if (Global.chatRoomInfo?.id === options.roomId) {
      let result = tool.resultSuc(
        OPERATION_TYPE.JoinChatRoom,
        Global.chatRoomInfo
      );
      return resolve(result);
    }
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.JoinChatRoom,
      callSign: callSign,
      callSuc: (res) => {
        if (Global.curTab) {
          res.data.members = res.data.membersList;
          delete res.data.membersList;
          res.data.conversationID = tool.splicingGroupId(res.data.id);
          Global.handleMessage({
            type: HANDLE_TYPE.GroupJoin,
            data: res.data,
          });
        } else {
          Global.chatRoomInfo = res.data;
        }
        let result = tool.resultSuc(OPERATION_TYPE.JoinChatRoom, res.data);
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.JoinChatRoom);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.joinRoomPro(callSign, {
        id: options.roomId,
        gtype: GROUP_TYPE.ChatRoom,
      });
      sendWsMsg(msg, PID.JoinGroup);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.JoinChatRoom, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}
function reconnectionChatRoom(Global) {
  let callSign = tool.createSign();
  Global.callEvents.has(callSign) && (callSign += 1);
  tool.createCallEvent(Global, {
    type: OPERATION_TYPE.JoinChatRoom,
    callSign: callSign,
    callSuc: (res) => {
      res.data.members = res.data.membersList;
      delete res.data.membersList;
      Global.handleMessage({
        type: HANDLE_TYPE.GroupJoin,
        data: res.data,
      });
    },
    callErr: (err) => {
      let errResult = tool.serverErr(err, OPERATION_TYPE.JoinChatRoom);
    },
  });
  let msg = proFormat.joinRoomPro(callSign, {
    id: Global.chatRoomInfo.id,
    gtype: GROUP_TYPE.ChatRoom,
    lastMsgId: Global.lastMsgId,
  });
  sendWsMsg(msg, PID.JoinGroup);
}

function getRoomMsgs(Global, options) {
  return new Promise((resolve, reject) => {
    if (Global.curTab) {
      let result = tool.resultSuc(
        OPERATION_TYPE.GetRoomMsgs,
        Global.chatRoomMsgs
      );
      resolve(result);
    } else {
      let callSign = tool.createSign();
      Global.callEvents.has(callSign) && (callSign += 1);
      tool.createCallEvent(Global, {
        type: OPERATION_TYPE.GetRoomMsgs,
        callSign: callSign,
        callSuc: (res) => {
          Global.chatRoomMsgs = res.data;
          let result = tool.resultSuc(OPERATION_TYPE.GetRoomMsgs, res.data);
          resolve(result);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, OPERATION_TYPE.GetRoomMsgs);
          reject(errResult);
        },
      });
      localNotice.onWebSocketNotice(OPERATION_TYPE.GetRoomMsgs, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

// 离开聊天室
function leaveChatRoom(Global, options) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.LeaveChatRoom,
      callSign: callSign,
      callSuc: (res) => {
        if (Global.curTab) {
          Global.handleMessage({
            type: HANDLE_TYPE.GroupLeave,
            data: {
              id: options.roomId,
              gtype: Global.chatRoomInfo.gtype,
              msg: "Success",
            },
          });
        }
        let result = tool.resultSuc(OPERATION_TYPE.LeaveChatRoom, res.data);
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.LeaveChatRoom);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.leaveRoomPro(callSign, {
        id: options.roomId,
        gtype: GROUP_TYPE.ChatRoom,
      });
      sendWsMsg(msg, PID.LeaveGroup);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.LeaveChatRoom, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 修改群公告
 * @param {string} options.tod 公告内容
 * @param {number} options.roomId 房间id
 * @returns {Promise}
 */
function editChatRoomTOD(Global, options) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.ChatRoomTod,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.ChatRoomTod, res.data);
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.ChatRoomTod);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.groupActionPro({
        sign: callSign,
        gtype: GROUP_TYPE.ChatRoom,
        id: options.roomId,
        tod: options.tod,
        action: GROUP_ACTION.EditTod,
      });
      sendWsMsg(msg, PID.GroupAction);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.ChatRoomTod, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 禁言/恢复指定成员
 * @param {number} options.roomId 房间id
 * @param {number[]} options.uids 成员id
 * @param {number} options.duration 禁言时间 0:10分钟, 1:30分钟，2:1小时，3:24小时，4:1周
 * @param {string} options.reason 操作原因(可选)
 * @returns {Promise}
 */
function muteMembers(Global, options) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.MuteMembers,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.MuteMembers, res.data);
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.MuteMembers);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.groupActionPro({
        sign: callSign,
        gtype: GROUP_TYPE.ChatRoom,
        id: options.roomId,
        uids: options.uids,
        duration: options.duration,
        reason: options.reason,
        action: GROUP_ACTION.MuteMembers,
      });
      sendWsMsg(msg, PID.GroupAction);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.MuteMembers, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 聊天室禁言/恢复
 * @param {number} options.roomId 房间id
 * @param {boolean} options.isMute 是否禁言
 * @param {string} options.reason 操作原因(可选)
 * @returns {Promise}
 */
function muteChatRoom(Global, options) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.MuteChatRoom,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.MuteChatRoom, res.data);
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.MuteChatRoom);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.groupActionPro({
        sign: callSign,
        gtype: GROUP_TYPE.ChatRoom,
        id: options.roomId,
        reason: options.reason,
        action: options.isMute
          ? GROUP_ACTION.MuteChatRoom
          : GROUP_ACTION.ResumeChatRoom,
      });
      sendWsMsg(msg, PID.GroupAction);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.MuteChatRoom, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 删除消息
 * @param {number} options.roomId 房间id
 * @param {number[]} options.msgIds 待删除的消息id  一次性最多100条
 * @returns {Promise}
 */
function deleteChatRoomMsgs(Global, options) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.DeleteChatRoomMsgs,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(
          OPERATION_TYPE.DeleteChatRoomMsgs,
          res.data
        );
        if (Global.curTab) {
          Global.handleMessage({
            type: HANDLE_TYPE.GroupChatR,
            data: res.data,
          });
        }
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.DeleteChatRoomMsgs);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.groupActionPro({
        sign: callSign,
        gtype: GROUP_TYPE.ChatRoom,
        id: options.roomId,
        msgs: options.msgIds,
        action: GROUP_ACTION.DeleteMsgs,
      });
      sendWsMsg(msg, PID.GroupAction);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.DeleteChatRoomMsgs, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 任命/解除管理员
 * @param {number} options.roomId 房间id
 * @param {number[]} options.uids 成员id
 * @param {number} options.duration 任命时间 0:10分钟, 1:30分钟，2:1小时，3:24小时，4:1周
 * @param {string} options.reason 操作原因(可选)
 * @returns {Promise}
 */
function editChatRoomManagerAccess(Global, options) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.EditManager,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.EditManager, res.data);
        resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.EditManager);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = proFormat.groupActionPro({
        sign: callSign,
        gtype: GROUP_TYPE.ChatRoom,
        id: options.roomId,
        uids: options.uids,
        duration: options.duration,
        reason: options.reason,
        action: GROUP_ACTION.EditManager,
      });
      sendWsMsg(msg, PID.GroupAction);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.EditManager, {
        callSign: callSign,
        tabId: Global.tabId,
        options: options,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

export {
  joinChatRoom,
  reconnectionChatRoom,
  leaveChatRoom,
  getRoomMsgs,
  editChatRoomTOD,
  muteMembers,
  muteChatRoom,
  editChatRoomManagerAccess,
  deleteChatRoomMsgs,
};
