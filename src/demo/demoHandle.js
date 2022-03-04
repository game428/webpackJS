import { DEMO_EVENT, LOCAL_MESSAGE_TYPE } from "../sdkTypes";
import localNotice from "../localNotice";
import tool from "../tool";

function handleProfileUpdate(Global, msim, options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.DemoUpdateProfile, options);
  }
  if (msim[DEMO_EVENT.PROFILE_UPDATE]) {
    let result = tool.resultNotice(DEMO_EVENT.PROFILE_UPDATE, options.data);
    msim[DEMO_EVENT.PROFILE_UPDATE](result);
  }
}

function handleUsrOnline(Global, msim, options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.DemoUpdateProfile, options);
  }
  if (msim[DEMO_EVENT.USR_ONLINE]) {
    let result = tool.resultNotice(DEMO_EVENT.USR_ONLINE, options.data);
    msim[DEMO_EVENT.USR_ONLINE](result);
  }
}

function handleUsrOffline(Global, msim, options) {
  if (Global.curTab) {
    localNotice.onMessageNotice(LOCAL_MESSAGE_TYPE.DemoUpdateProfile, options);
  }
  if (msim[DEMO_EVENT.USR_OFFFLINE]) {
    let result = tool.resultNotice(DEMO_EVENT.USR_OFFFLINE, options.data);
    msim[DEMO_EVENT.USR_OFFFLINE](result);
  }
}

export { handleProfileUpdate, handleUsrOffline, handleUsrOnline };
