import {
  GetCosKey,
  ImLogin,
  ImLogout,
  Ping,
  GetChatList,
  GetChat,
  DelChat,
  GetHistory,
  ChatS,
  Revoke,
  MsgRead,
} from "./proto.js";
import pako from "pako";

/***
 * 压缩处理以及拼接pid
 * @param {Uint8Array} bytes 处理好的消息体
 * @param {number} pid 消息体对应的pid
 * @returns {Uint8Array} 二进制数据
 */
function compress(bytes, pid) {
  let compressBytes = bytes;
  let isCompress = 0;
  if (bytes.length > 10) {
    isCompress = 1;
    compressBytes = pako.deflate(bytes, {
      level: 5,
      to: "Uint8Array",
    });
  }
  let nBytes = new Uint8Array([pid, isCompress, ...compressBytes]);
  return nBytes;
}

/***
 * 获取cos
 * @param {number} sign 标识
 * @returns {Uint8Array} 二进制数据
 */
function cosPro(sign) {
  let bytes = GetCosKey.encode(GetCosKey.fromObject({ sign: sign })).finish();
  return bytes;
}

/***
 * 登录
 * @param {number} sign 标识
 * @param {string} imToken token
 * @param {number} subAppId 子应用id
 * @returns {Uint8Array} 二进制数据
 */
function loginPro(sign, imToken, subAppId) {
  let bytes = ImLogin.encode(
    ImLogin.fromObject({ sign: sign, token: imToken, subApp: subAppId })
  ).finish();
  return bytes;
}

/***
 * 退出
 * @param {number} sign 标识
 * @returns {Uint8Array} 二进制数据
 */
function logoutPro(sign) {
  let bytes = ImLogout.encode(ImLogout.fromObject({ sign: sign })).finish();
  return bytes;
}

/***
 * 心跳
 * @returns {Uint8Array} 二进制数据
 */
function pingPro() {
  let bytes = Ping.encode(Ping.fromObject({ type: 0 })).finish();
  return bytes;
}

/***
 * 获取会话记录
 * @param {number} sign 标识
 * @param {number} updateTime 会话列表更新时间
 * @returns {Uint8Array} 二进制数据
 */
function chatListPro(sign, updateTime) {
  let bytes = GetChatList.encode(
    GetChatList.fromObject({ sign: sign, updateTime: updateTime })
  ).finish();
  return bytes;
}

/***
 * 获取会话信息
 * @param {number} sign 标识
 * @param {number} uid 要获取的会话Id
 * @returns {Uint8Array} 二进制数据
 */
function chatPro(sign, uid) {
  let bytes = GetChat.encode(
    GetChat.fromObject({ sign: sign, uid: uid })
  ).finish();
  return bytes;
}

/***
 * 删除会话
 * @param {number} sign 标识
 * @param {number} uid 会话id
 * @returns {Uint8Array} 二进制数据
 */
function delChatPro(sign, uid) {
  let bytes = DelChat.encode(
    DelChat.fromObject({ sign: sign, toUid: uid })
  ).finish();
  return bytes;
}

/***
 * 获取历史消息记录
 * @param {Object} options
 * @param {number} options.sign 标识
 * @param {number} options.toUid 会话id
 * @param {number} [options.msgStart] 最多拉到这条（不包括此条）
 * @param {number} [options.msgEnd] 从这条消息往后拉（不包括此条）
 * @param {number} [options.pageSize] 拉多少条，默认20，最多100
 * @returns {Uint8Array} 二进制数据
 */
function getMsgPro(options) {
  options.offset = options.pageSize || 20;
  let bytes = GetHistory.encode(GetHistory.fromObject(options)).finish();
  return bytes;
}

/***
 * 发送消息
 * @param {Object} options
 * @param {number} options.sign - 唯一标识
 * @param {number} options.type - 消息类型
 * @param {number} options.toUid - 发送给谁
 * @param {string} [options.title] - 消息内容
 * @param {string} options.body - 消息内容
 * @param {string} [options.thumb] - 封面图
 * @param {number} [options.width] - 封面图的宽度
 * @param {number} [options.height] - 封面图的高度
 * @param {number} [options.duration] - 时长
 * @param {string} [options.lat] - 纬度
 * @param {string} [options.lng] - 经度
 * @param {number} [options.zoom] - 地图缩放层级
 */
function sendMsgPro(options) {
  let bytes = ChatS.encode(ChatS.fromObject(options)).finish();
  return bytes;
}

/***
 * 撤回消息
 * @param {number} sign
 * @param {number} uid 会话id
 * @param {number} [msgId] 撤回的消息id
 * @returns {Uint8Array} 二进制数据
 */
function revokeMsgPro(sign, uid, msgId) {
  let bytes = Revoke.encode(
    Revoke.fromObject({ sign: sign, toUid: uid, msgId: msgId })
  ).finish();
  return bytes;
}

/***
 * 设置已读
 * @param {number} sign
 * @param {number} uid 会话id
 * @returns {Uint8Array} 二进制数据
 */
function readMsgPro(sign, uid) {
  let bytes = MsgRead.encode(
    MsgRead.fromObject({ sign: sign, toUid: uid })
  ).finish();
  return bytes;
}

let proFormat = {
  compress,
  loginPro,
  logoutPro,
  chatListPro,
  delChatPro,
  pingPro,
  getMsgPro,
  sendMsgPro,
  revokeMsgPro,
  readMsgPro,
  chatPro,
  cosPro,
};

export default proFormat;
