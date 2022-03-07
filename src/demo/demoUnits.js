import tool from "../tool";
import { PID, OPERATION_TYPE, LOCAL_OPERATION_STATUS } from "../sdkTypes";
import { profilePro, profilesPro, sparkPro } from "./demoPro";
import { sendWsMsg } from "../ws";
import localNotice from "../localNotice";

/**
 * 获取用户信息列表
 * @param {profile[]} profiles - 需要获取的profile列表
 * @param {number} profile.uid - 用户id
 * @param {number} profile.updateTime - profile更新时间
 */
function getProfileList(Global, profiles) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.GetProfileList,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.GetProfileList, res.data);
        return resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.GetProfileList);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = profilesPro(callSign, profiles);
      sendWsMsg(msg, PID.GetProfiles);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.GetProfileList, {
        callSign: callSign,
        tabId: Global.tabId,
        options: profiles,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 获取用户信息
 * @param {number} profile.uid - 用户id
 * @param {number} profile.updateTime - profile更新时间
 */
function getProfile(Global, profile) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.GetProfile,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.GetProfile, res.data);
        return resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.GetProfile);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = profilePro(callSign, profile);
      sendWsMsg(msg, PID.GetProfile);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.GetProfile, {
        callSign: callSign,
        tabId: Global.tabId,
        options: profile,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

/**
 * 获取FetchSpark
 */
function getSpark(Global) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.GetSpark,
      callSign: callSign,
      callSuc: (res) => {
        let result = tool.resultSuc(OPERATION_TYPE.GetSpark, res.data);
        return resolve(result);
      },
      callErr: (err) => {
        let errResult = tool.serverErr(err, OPERATION_TYPE.GetSpark);
        reject(errResult);
      },
    });
    if (Global.curTab) {
      let msg = sparkPro(callSign);
      sendWsMsg(msg, PID.FetchSpark);
    } else {
      localNotice.onWebSocketNotice(OPERATION_TYPE.GetSpark, {
        callSign: callSign,
        tabId: Global.tabId,
        state: LOCAL_OPERATION_STATUS.Pending,
      });
    }
  });
}

export { getProfile, getProfileList, getSpark };
