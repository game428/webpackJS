import {
  GetCosKey,
  GetImToken,
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
} from './proto.js'
import pako from 'pako';

/** 压缩处理以及拼接pid
 * 
 * @param {*} bytes 处理好的消息体
 * @param {*} pid 消息体对应的pid
 */
function compress(bytes, pid) {
  let compressBytes = bytes;
  let isCompress = 0;
  if (bytes.length > 10) {
    isCompress = 1;
    compressBytes = pako.deflate(bytes, {
      level: 5,
      to: 'Uint8Array'
    });
  }
  let nBytes = new Uint8Array([pid, isCompress, ...compressBytes]);
  return nBytes;
}

/** 获取token demo用
 * 
 * @param {*} sign 标识
 * @param {*} uid 用户id
 * @returns 
 */
function tokenPro(sign, uid) {
  let bytes = GetImToken.encode(
    GetImToken.create({ sign: sign, phone: uid })
  ).finish();
  return bytes;
}
/** 获取cos
 * 
 * @param {*} sign 标识
 * @returns 
 */
function cosPro(sign) {
  let bytes = GetCosKey.encode(
    GetCosKey.create({ sign: sign })
  ).finish();
  return bytes;
}

/** 登录
 * 
 * @param {*} sign 标识
 * @param {*} imToken token
 * @returns 
 */
function loginPro(sign, imToken) {
  let bytes = ImLogin.encode(
    ImLogin.create({ sign: sign, token: imToken })
  ).finish();
  return bytes;
}

/** 退出
 * 
 * @param {*} sign 标识
 * @returns 
 */
function logoutPro(sign) {
  let bytes = ImLogout.encode(ImLogout.create({ sign: sign })).finish();
  return bytes;
}

/** 心跳
 * 
 * @param {*} sign 标识
 * @param {*} imToken token
 * @returns 
 */
function pingPro() {
  let bytes = Ping.encode(Ping.create({ type: 1 })).finish();
  return bytes;
}

/** 获取会话记录
 * 
 * @param {*} sign 标识
 * @param {*} updateTime 会话列表更新时间
 * @returns 
 */
function chatListPro(sign, updateTime) {
  let bytes = GetChatList.encode(
    GetChatList.create({ sign: sign, updateTime: updateTime })
  ).finish();
  return bytes;
}

/** 获取会话信息
 * 
 * @param {*} sign 标识
 * @param {*} uid 要获取的会话Id
 * @returns 
 */
function chatPro(sign, uid) {
  let bytes = GetChat.encode(GetChat.create({ sign: sign, uid: uid })).finish();
  return bytes;
}

/** 删除会话
 * 
 * @param {*} sign 标识
 * @param {*} uid 会话id
 * @returns 
 */
function delChatPro(sign, uid) {
  let bytes = DelChat.encode(DelChat.create({ sign: sign, uid: uid })).finish();
  return bytes;
}

/** 获取历史消息记录
 * 
 * @param {*} sign 标识
 * @param {*} uid 会话id
 * @param {*} msgStart //最多拉到这条（不包括此条）
 * @param {*} msgEnd 从这条消息往后拉（不包括此条）
 * @param {*} pageSize 拉多少条，默认20，最多100
 * @returns 
 */
function getMsgPro(options) {
  options.offset = options.pageSize;
  options.toUid = options.uid;
  let bytes = GetHistory.encode(GetHistory.create(options)).finish();
  return bytes;
}

/** 发送消息
 * 
 * @param {* } options
 * @param int64 sign // 唯一标识
 * @param int64 type = 2;// 消息类型 
 * @param int64 to_uid = 3; //发送给谁
 * @param string title = 4; //消息内容
 * @param string body = 5; //消息内容
 * @param string thumb = 6; //封面图
 * @param int64 width = 7; //封面图的宽度
 * @param int64 height = 8; //封面图的高度
 * @param int64 duration = 9;//时长
 * @param double lat = 10;//纬度
 * @param double lng = 11;//经度
 * @param int64 zoom = 12;//地图缩放层级
 */
function sendMsgPro(options) {
  let bytes = ChatS.encode(ChatS.create(options)).finish();
  return bytes;
}

/** 撤回消息
 * 
 * @param {*} sign 
 * @param {*} uid 会话id
 * @param {*} msgId 撤回的消息id
 * @returns 
 */
function revokeMsgPro(sign, uid, msgId) {
  let bytes = Revoke.encode(
    Revoke.create({ sign: sign, toUid: uid, msgId: msgId })
  ).finish();
  return bytes;
}

/** 设置已读
 * 
 * @param {*} sign 
 * @param {*} uid 会话id
 * @returns 
 */
function readMsgPro(sign, uid) {
  let bytes = MsgRead.encode(
    MsgRead.create({ sign: sign, toUid: uid })
  ).finish();
  return bytes;
}

let proFormat = {
  compress,
  loginPro,
  logoutPro,
  tokenPro,
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