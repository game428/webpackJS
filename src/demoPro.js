import { GetProfile, GetProfiles, FetchSpark } from "../proto.js";

/***
 * 获取cos
 * @param {number} sign 标识
 * @param {number} uid 用户id
 * @returns {Uint8Array} 二进制数据
 */
function profilePro(sign, uid, updateTime) {
  let bytes = GetProfile.encode(
    GetProfile.fromObject({ sign, uid, updateTime })
  ).finish();
  return bytes;
}

function profilesPro(sign, profiles) {
  let bytes = GetProfiles.encode(
    GetProfiles.fromObject({ sign, getProfiles: profiles })
  ).finish();
  return bytes;
}

function sparkPro(sign) {
  let bytes = FetchSpark.encode(FetchSpark.fromObject({ sign })).finish();
  return bytes;
}

export { profilePro, profilesPro, sparkPro };
