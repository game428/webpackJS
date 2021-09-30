import tool from "./tool";
import { PID, OPERATION_TYPE, LOCAL_OPERATION_STATUS } from "./sdkTypes";
import proFormat from "./proFormat";
import { sendWsMsg } from "./ws";
import localNotice from "./localNotice";

/**
 * 获取cos配置
 * @memberof SDK
 * @return {Promise}
 */
function getCosKey(Global) {
  return new Promise((resolve, reject) => {
    try {
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        type: OPERATION_TYPE.GetCosKey,
        callSign: callSign,
        callSuc: (res) => {
          let result = tool.resultSuc(OPERATION_TYPE.GetCosKey, res.data);
          return resolve(result);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, OPERATION_TYPE.GetCosKey);
          reject(errResult);
        },
      });
      if (Global.curTab) {
        let msg = proFormat.cosPro(callSign);
        sendWsMsg(msg, PID.GetCosKey);
      } else {
        localNotice.onWebSocketNotice(OPERATION_TYPE.GetCosKey, {
          callSign: callSign,
          tabId: Global.tabId,
          state: LOCAL_OPERATION_STATUS.Pending,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * 添加事件监听
 * @memberof SDK
 * @param {string} eventName - 添加监听的事件名称
 * @callback callback - 添加监听的回调事件
 */
function on(eventName, callback) {
  this[eventName] = callback;
}
/**
 * 注销事件监听
 * @memberof SDK
 * @param {string} eventName - 取消监听的事件名称
 */
function off(eventName) {
  this[eventName] = null;
}

export { getCosKey, on, off };
