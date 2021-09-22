import tool from "./tool";
import declare from "./declare";
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
        type: declare.OPERATION_TYPE.GetCosKey,
        callSign: callSign,
        callSuc: (res) => {
          let result = tool.resultSuc(
            declare.OPERATION_TYPE.GetCosKey,
            res.data
          );
          return resolve(result);
        },
        callErr: (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.GetCosKey);
          reject(errResult);
        },
      });
      if (Global.curTab) {
        let msg = proFormat.cosPro(callSign);
        sendWsMsg(msg, declare.PID.GetCosKey);
      } else {
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.GetCosKey, {
          callSign: callSign,
          tabId: Global.tabId,
          state: declare.LOCAL_OPERATION_STATUS.Pending,
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

export { on, off, getCosKey };
