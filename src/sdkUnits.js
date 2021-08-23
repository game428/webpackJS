import tool from './tool';
import declare from './declare'
import proFormat from './proFormat';
import localWs from './ws';
import localNotice from './localNotice';

export function getCosKey(Global) {
  return new Promise((resolve, reject) => {
    try {
      let callSign = tool.createSign();
      tool.createCallEvent(Global, {
        "type": declare.OPERATION_TYPE.GetCosKey,
        "callSign": callSign,
        "callSuc": (res) => {
          let result = tool.resultSuc(declare.OPERATION_TYPE.GetCosKey, res.data);
          return resolve(result);
        },
        "callErr": (err) => {
          let errResult = tool.serverErr(err, declare.OPERATION_TYPE.GetCosKey)
          reject(errResult)
        }
      });
      if (Global.curTab) {
        let msg = proFormat.cosPro(callSign);
        localWs.sendMessage(msg, declare.PID.GetCosKey);
      } else {
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.GetCosKey, {
          "callSign": callSign,
          "tabId": Global.tabId,
          "state": declare.LOCAL_OPERATION_STATUS.Pending,
        })
      }
    } catch (err) {
      reject(err);
    }
  });
}