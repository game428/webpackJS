import tool from "./tool";
import declare from "./declare";
import proFormat from "./proFormat";
import { connectWs, closeWs, sendWsMsg } from "./ws";
import localNotice from "./localNotice";
import localDexie from "./dexieDB";
import { syncChats } from "./sdkChats";

/**
 * 登录
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.wsUrl ws服务器地址
 * @param {string} options.imToken 用户在ws服务器的token
 * @return {Promise}
 */
function login(Global, options) {
  return new Promise((resolve, reject) => {
    localDexie
      .getInfo()
      .then((info) => {
        if (!info) {
          localDexie.initInfo();
        }
        // if (info?.loginState === declare.IM_LOGIN_STATE.NotLogin) {
        if (info?.loginState !== declare.IM_LOGIN_STATE.Logged) {
          if (tool.isNotObject(options, "imToken", "string")) {
            let errResult = tool.parameterErr({
              name: declare.OPERATION_TYPE.Login,
              key: "imToken",
            });
            return reject(errResult);
          } else if (tool.isNotWs(options.wsUrl)) {
            let errResult = tool.parameterErr({
              name: declare.OPERATION_TYPE.Login,
              key: "wsUrl",
            });
            return reject(errResult);
          }
          window.localStorage.setItem("im_wsCurId", Global.tabId);
          // 启动全局定时器
          Global.globalTimer();
          Global.loginState = declare.IM_LOGIN_STATE.Logging;
          localDexie.updateInfo({
            loginState: declare.IM_LOGIN_STATE.Logging,
            wsUrl: options.wsUrl,
            imToken: options.imToken,
          });
          Global.wsUrl = options.wsUrl;
          Global.imToken = options.imToken;
          connectWs(
            Global,
            (isReconect) => {
              connSuc(Global, resolve, reject, isReconect);
            },
            (err) => {
              connClose(Global, reject, err);
            }
          );
        } else if (info.loginState === declare.IM_LOGIN_STATE.Logged) {
          if (info.chatsSync === declare.SYNC_CHAT.SyncChatSuccess) {
            Global.initChats();
          } else {
            Global.chatsSync = info.chatsSync;
          }
          Global.connState = info.connState;
          Global.loginState = info.loginState;
          Global.uid = info.uid;
          let result = tool.resultSuc(declare.OPERATION_TYPE.Login, {
            msg: "已登录",
            uid: info.uid,
          });
          resolve(result);
        } else {
          let result = tool.resultErr(
            "登陆中",
            declare.OPERATION_TYPE.Login,
            declare.ERROR_CODE.LOGGING
          );
          reject(result);
        }
      })
      .catch((err) => {
        Global.loginState = declare.IM_LOGIN_STATE.NotLogin;
        localDexie.updateInfo({ loginState: declare.IM_LOGIN_STATE.NotLogin });
        reject(err);
      });
  });
}

// webSocket连接成功回调
function connSuc(Global, resolve, reject, isReconect) {
  Global.handleMessage({
    type: declare.HANDLE_TYPE.WsStateChange,
    state: declare.WS_STATE.Connect,
  });
  loginIm(Global)
    .then((res) => {
      if (isReconect !== true) {
        let result = tool.resultSuc(declare.OPERATION_TYPE.Login, {
          msg: res.data.msg,
          updateTime: res.data.nowTime,
          uid: res.data.uid,
        });
        resolve(result);
        setTimeout(() => {
          Global.handleMessage({
            type: declare.HANDLE_TYPE.ImLogin,
            data: res.data,
          });
        }, 0);
      }
      syncChats(Global);
    })
    .catch((err) => {
      reject(err);
    });
}

// webSocket连接失败回调
function connClose(Global, reject, err) {
  console.log("断开连接了", err);
  if (Global.connState !== declare.WS_STATE.Disconnect) {
    Global.handleMessage({
      type: declare.HANDLE_TYPE.WsStateChange,
      state: declare.WS_STATE.Disconnect,
    });
  }
  let errResult = tool.resultErr(
    "建立websocket连接失败",
    declare.OPERATION_TYPE.Login,
    declare.ERROR_CODE.CONNECTERR
  );
  return reject(errResult);
}

// 登录服务器
function loginIm(Global) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    tool.createCallEvent(Global, {
      type: declare.OPERATION_TYPE.Login,
      callSign: callSign,
      callSuc: (res) => {
        resolve(res);
      },
      callErr: (err) => {
        // 可能出现code 9 11
        closeWs();
        let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Login);
        reject(errResult);
      },
    });
    let msg = proFormat.loginPro(callSign, Global.imToken);
    sendWsMsg(msg, declare.PID.ImLogin);
  });
}

/**
 * 退出登录
 * @memberof SDK
 * @return {Promise}
 */
function logout(Global) {
  return new Promise((resolve, reject) => {
    try {
      let callSign = tool.createSign();
      let data = {
        code: declare.ERROR_CODE.SUCCESS,
        msg: "Success",
      };
      if (Global.curTab) {
        if (Global.loginState === declare.IM_LOGIN_STATE.Logged) {
          let msg = proFormat.logoutPro(callSign);
          sendWsMsg(msg, declare.PID.ImLogout);
        }
        Global.handleMessage({
          type: declare.HANDLE_TYPE.ImLogout,
          data: data,
        });
        let result = tool.resultSuc(declare.OPERATION_TYPE.Logout, data);
        resolve(result);
      } else {
        tool.createCallEvent(Global, {
          type: declare.OPERATION_TYPE.Logout,
          callSign: callSign,
          callSuc: (res) => {
            let result = tool.resultSuc(declare.OPERATION_TYPE.Logout, data);
            resolve(result);
          },
          callErr: (err) => {
            let errResult = tool.serverErr(err, declare.OPERATION_TYPE.Logout);
            reject(errResult);
          },
        });
        localNotice.onWebSocketNotice(declare.OPERATION_TYPE.Logout, {
          callSign: callSign,
          tabId: Global.tabId,
          state: declare.LOCAL_OPERATION_STATUS.Pending,
        });
      }
    } catch (err) {
      let errResult = tool.resultErr(err, declare.OPERATION_TYPE.Logout);
      reject(errResult);
    }
  });
}

export { login, logout };
