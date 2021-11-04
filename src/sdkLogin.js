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
import { connectWs, closeWs, sendWsMsg } from "./ws";
import localDexie from "./dexieDB";
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

function handleLogin(Global, config, resolve, reject) {
  localDexie
    .getInfo()
    .then((info) => {
      if (!info) {
        localDexie.initInfo();
      }
      if (!info || info.loginState === IM_LOGIN_STATE.NOT_LOGIN) {
        loginWs(Global, config, resolve, reject);
      } else if (info?.imToken !== config.imToken) {
        logout(Global).then(() => {
          loginWs(Global, config, resolve, reject);
        });
      } else if (info.loginState === IM_LOGIN_STATE.LOGGED) {
        if (info.chatsSync === SYNC_CHAT.SYNC_CHAT_SUCCESS) {
          Global.initChats();
        } else {
          Global.chatsSync = info.chatsSync;
        }
        Global.connState = info.connState;
        Global.loginState = info.loginState;
        Global.uid = info.uid;
        let result = tool.resultSuc(OPERATION_TYPE.Login, {
          msg: "Logged in",
          uid: info.uid,
        });
        resolve(result);
      }
    })
    .catch((err) => {
      Global.loginState = IM_LOGIN_STATE.NOT_LOGIN;
      localDexie.updateInfo({ loginState: Global.loginState });
      reject(err);
    });
}

function loginWs(Global, config, resolve, reject) {
  window.localStorage.setItem("im_wsCurId", Global.tabId);
  // 启动全局定时器
  Global.globalTimer();
  Global.loginState = IM_LOGIN_STATE.LOGGING;
  localDexie.updateInfo({
    loginState: Global.loginState,
    wsUrl: config.wsUrl,
    imToken: config.imToken,
    subAppId: config.subAppId,
  });
  let wsOptions = {
    wsUrl: config.wsUrl,
    imToken: config.imToken,
    subAppId: config.subAppId,
    resolve: resolve,
    reject: reject,
    connSuc: (options) => connSuc(Global, options),
    connErr: (options, err) => connClose(Global, options, err),
  };
  connectWs(Global, wsOptions);
}

function reconnection(Global) {
  window.localStorage.setItem("im_wsCurId", Global.tabId);
  // 启动全局定时器
  Global.globalTimer();
  localDexie.getInfo().then((info) => {
    let wsOptions = {
      wsUrl: info.wsUrl,
      imToken: info.imToken,
      subAppId: info.subAppId,
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
      if (wsOptions.isReconect !== true) {
        Global.uid = res.data.uid;
        let result = tool.resultSuc(OPERATION_TYPE.Login, {
          msg: res.data.msg,
          uid: res.data.uid,
        });
        wsOptions.resolve && wsOptions.resolve(result);
        setTimeout(() => {
          Global.handleMessage({
            type: HANDLE_TYPE.ImLogin,
            data: res.data,
          });
        }, 0);
      } else {
        localDexie.updateInfo({
          uid: res.data.uid,
        });
      }
      syncChats(Global);
    })
    .catch((err) => {
      wsOptions.reject && wsOptions.reject(err);
    });
}

// webSocket连接失败回调
function connClose(Global, wsOptions, err) {
  if (Global.connState !== WS_STATE.NET_STATE_DISCONNECTED) {
    Global.handleMessage({
      type: HANDLE_TYPE.WsStateChange,
      state: WS_STATE.NET_STATE_DISCONNECTED,
    });
  }
  if (wsOptions.isReconect !== true && wsOptions.reject) {
    let errResult = tool.resultErr(
      "Failed to establish websocket connection",
      OPERATION_TYPE.Login,
      ERROR_CODE.CONNECTERR
    );
    wsOptions.reject(errResult);
  }
}

// 登录服务器
function loginIm(Global, wsOptions) {
  return new Promise((resolve, reject) => {
    let callSign = tool.createSign();
    tool.createCallEvent(Global, {
      type: OPERATION_TYPE.Login,
      callSign: callSign,
      callSuc: (res) => {
        resolve(res);
      },
      callErr: (err) => {
        // 可能出现code 9 11
        closeWs();
        let errResult = tool.serverErr(err, OPERATION_TYPE.Login);
        reject(errResult);
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
