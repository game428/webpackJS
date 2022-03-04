import tool from "./tool";
import {
  PID,
  WS_STATE,
  SYNC_CHAT,
  ERROR_CODE,
  HANDLE_TYPE,
  OPERATION_TYPE,
  IM_LOGIN_STATE,
} from "./sdkTypes";
import proFormat from "./proFormat";
import { connectWs, closeWs, sendWsMsg, resetReconnectNum } from "./ws";
import { syncChats } from "./sdkChats";

/**
 * 登录
 * @memberof SDK
 * @param {Object} options - 接口参数
 * @param {string} options.wsUrl ws服务器地址
 * @param {string} options.imToken 用户在ws服务器的token
 * @param {number} options.subAppId 子应用id
 * @return {Promise}
 */
function login(Global, options) {
  return new Promise((resolve, reject) => {
    if (tool.isNotWs(options.wsUrl)) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.Login,
        key: "wsUrl",
      });
      return reject(errResult);
    } else if (tool.isNotString(options.imToken)) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.Login,
        key: "imToken",
      });
      return reject(errResult);
    } else if (tool.isNotEmpty(options.subAppId)) {
      let errResult = tool.parameterErr({
        name: OPERATION_TYPE.Login,
        key: "subAppId",
      });
      return reject(errResult);
    }
    handleLogin(Global, options, resolve, reject);
  });
}

function getSdkState(Global) {
  return new Promise((resolve, reject) => {
    if (Global.sdkState.loginState === IM_LOGIN_STATE.LOGGED || Global.curTab) {
      resolve(Global.sdkState);
    } else {
      let callSign = tool.createSign();
      window.localStorage.setItem("im_getSdkState", Global.tabId);
      window.localStorage.removeItem("im_getSdkState");
      Global.stateCallEvents.has(callSign) && (callSign += 1);
      Global.stateCallEvents.set(callSign, {
        timeOut: Date.now() + 3000,
        callSuc: (res) => {
          Global.stateCallEvents.delete(callSign);
          resolve(res);
        },
        callErr: (err) => {
          Global.stateCallEvents.delete(callSign);
          resolve({
            loginState: IM_LOGIN_STATE.NOT_LOGIN,
            chatsSync: SYNC_CHAT.NOT_SYNC_CHAT,
            connState: WS_STATE.NET_STATE_DISCONNECTED,
          });
        },
      });
    }
  });
}

function handleLogin(Global, config, resolve, reject) {
  getSdkState(Global).then((info) => {
    if (info.loginState === IM_LOGIN_STATE.NOT_LOGIN) {
      Global.clearData(true);
      loginWs(Global, config, resolve, reject);
    } else if (info?.imToken !== config.imToken) {
      logout(Global).then(() => {
        loginWs(Global, config, resolve, reject);
      });
    } else if (info.loginState === IM_LOGIN_STATE.LOGGED) {
      if (info.chatsSync === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
        delete info.chatsSync;
        Global.initChats();
      }
      Object.assign(Global.sdkState, info);
      let result = tool.resultSuc(OPERATION_TYPE.Login, {
        msg: "Logged in",
        uid: info.uid,
      });
      resolve(result);
    }
  });
}

function loginWs(Global, config, resolve, reject) {
  window.localStorage.setItem("im_wsCurId", Global.tabId);
  // 启动全局定时器
  Global.globalTimer();
  Object.assign(Global.sdkState, {
    loginState: IM_LOGIN_STATE.LOGGING,
    wsUrl: config.wsUrl,
    imToken: config.imToken,
    subAppId: config.subAppId,
  });
  let callSign = tool.createSign();
  Global.callEvents.has(callSign) && (callSign += 1);
  tool.createCallEvent(Global, {
    type: OPERATION_TYPE.Login,
    callSign: callSign,
    callSuc: (res) => {
      resetReconnectNum();
      resolve(res);
    },
    callErr: (err) => {
      closeWs();
      if (wsOptions.isReconect) {
        Global.handleMessage({
          type: HANDLE_TYPE.ResultError,
          data: err,
        });
      }
      let errResult = tool.serverErr(err, OPERATION_TYPE.Login);
      reject(errResult);
    },
  });
  let wsOptions = {
    wsUrl: config.wsUrl,
    imToken: config.imToken,
    subAppId: config.subAppId,
    callSign: callSign,
    isReconect: false,
    connSuc: (options) => connSuc(Global, options),
    connErr: (options, err) => connClose(Global, options, err),
  };
  connectWs(Global, wsOptions);
}

function reconnection(Global) {
  window.localStorage.setItem("im_wsCurId", Global.tabId);
  // 启动全局定时器
  Global.globalTimer();
  getSdkState(Global).then((info) => {
    if (!info.wsUrl || !info.imToken) {
      logout();
      return;
    }
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.Login,
      callSign: callSign,
      callSuc: (res) => {
        resetReconnectNum();
        resolve(res);
      },
      callErr: (err) => {
        closeWs();
        if (wsOptions.isReconect) {
          Global.handleMessage({
            type: HANDLE_TYPE.ResultError,
            data: err,
          });
        }
        let errResult = tool.serverErr(err, OPERATION_TYPE.Login);
        reject(errResult);
      },
    });
    let wsOptions = {
      wsUrl: info.wsUrl,
      imToken: info.imToken,
      subAppId: info.subAppId,
      callSign: callSign,
      isReconect: true,
      connSuc: (options) => connSuc(Global, options),
      connErr: (options, err) => connClose(Global, options, err),
    };
    connectWs(Global, wsOptions);
  });
}

// webSocket连接成功回调
function connSuc(Global, wsOptions) {
  Global.handleMessage({
    type: HANDLE_TYPE.WsStateChange,
    state: WS_STATE.NET_STATE_CONNECTED,
  });
  loginIm(Global, wsOptions)
    .then((res) => {
      const callEvent = Global.callEvents.get(wsOptions.callSign);
      wsOptions.isReconect = true;
      Global.sdkState.uid = res.data.uid;
      if (callEvent) {
        let result = tool.resultSuc(OPERATION_TYPE.Login, {
          msg: res.data.msg,
          uid: res.data.uid,
        });
        callEvent.callSuc(result);
      }
      if (Global.sdkState.loginState !== IM_LOGIN_STATE.LOGGED) {
        setTimeout(() => {
          Global.handleMessage({
            type: HANDLE_TYPE.ImLogin,
            data: {
              uid: res.data.uid,
              loginState: IM_LOGIN_STATE.LOGGED,
              wsUrl: wsOptions.wsUrl,
              imToken: wsOptions.imToken,
              subAppId: wsOptions.subAppId,
            },
          });
        }, 0);
      }
      syncChats(Global);
    })
    .catch((err) => {
      const callEvent = Global.callEvents.get(wsOptions.callSign);
      if (callEvent) {
        callEvent.callErr(err);
      } else {
        closeWs();
        Global.handleMessage({
          type: HANDLE_TYPE.ResultError,
          data: err,
        });
      }
    });
}

// webSocket连接失败回调 3.4版本更新状态
function connClose(Global, wsOptions, err) {
  Global.handleMessage({
    type: HANDLE_TYPE.WsStateChange,
    state: WS_STATE.NET_STATE_DISCONNECTED,
  });
  console.warn("连接失败回调", JSON.stringify(Global.sdkState));
}

// 登录服务器
function loginIm(Global, wsOptions) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    Global.callEvents.has(callSign) && (callSign += 1);
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.Login,
      callSign: callSign,
      callSuc: (res) => {
        resetReconnectNum();
        resolve(res);
      },
      callErr: (err) => {
        reject(err);
      },
    });
    let msg = proFormat.loginPro(
      callSign,
      wsOptions.imToken,
      wsOptions.subAppId
    );
    sendWsMsg(msg, PID.ImLogin);
  });
}

/**
 * 退出登录
 * @memberof SDK
 * @return {Promise}
 */
function logout(Global) {
  return new Promise((resolve, reject) => {
    let data = {
      code: ERROR_CODE.SUCCESS,
      isBroadcast: true,
      msg: "Success",
    };
    Global.handleMessage({
      type: HANDLE_TYPE.ImLogout,
      data: data,
    });
    let result = tool.resultSuc(OPERATION_TYPE.Logout, data);
    resolve(result);
  });
}

export { reconnection, login, logout };
