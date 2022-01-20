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
  JoinGroup,
  LeaveGroup,
  GroupChatS,
  GroupRevoke,
  GroupAction,
} from "./proto";
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
  let pro = new GetCosKey();
  pro.setSign(sign);
  var bytes = pro.serializeBinary();
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
  let pro = new ImLogin();
  pro.setSign(sign);
  pro.setToken(imToken);
  pro.setSubApp(subAppId);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 退出
 * @param {number} sign 标识
 * @returns {Uint8Array} 二进制数据
 */
function logoutPro(sign) {
  let pro = new ImLogout();
  pro.setSign(sign);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 心跳
 * @returns {Uint8Array} 二进制数据
 */
function pingPro() {
  let pro = new Ping();
  pro.setType(0);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 获取会话记录
 * @param {number} sign 标识
 * @param {number} updateTime 会话列表更新时间
 * @returns {Uint8Array} 二进制数据
 */
function chatListPro(sign, updateTime) {
  let pro = new GetChatList();
  pro.setSign(sign);
  pro.setUpdateTime(updateTime);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 获取会话信息
 * @param {number} sign 标识
 * @param {number} uid 要获取的会话Id
 * @returns {Uint8Array} 二进制数据
 */
function chatPro(sign, uid) {
  let pro = new GetChat();
  pro.setSign(sign);
  pro.setUid(uid);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 删除会话
 * @param {number} sign 标识
 * @param {number} uid 会话id
 * @returns {Uint8Array} 二进制数据
 */
function delChatPro(sign, uid) {
  let pro = new DelChat();
  pro.setSign(sign);
  pro.setToUid(uid);
  var bytes = pro.serializeBinary();
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
  let pro = new GetHistory();
  pro.setSign(options.sign);
  pro.setOffset(options.pageSize || 20);
  pro.setToUid(options.toUid);
  pro.setMsgStart(options.msgStart);
  pro.setMsgEnd(options.msgEnd);
  var bytes = pro.serializeBinary();
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
 * @returns {Uint8Array} 二进制数据
 */
function sendMsgPro(options) {
  let pro = new ChatS();
  pro.setSign(options.sign);
  pro.setType(options.type);
  pro.setToUid(options.toUid);
  pro.setTitle(options.title);
  pro.setBody(options.body);
  pro.setThumb(options.thumb);
  pro.setWidth(options.width);
  pro.setHeight(options.height);
  pro.setDuration(options.duration);
  pro.setLat(options.lat);
  pro.setLng(options.lng);
  pro.setZoom(options.zoom);
  var bytes = pro.serializeBinary();
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
  let pro = new Revoke();
  pro.setSign(sign);
  pro.setToUid(uid);
  pro.setMsgId(msgId);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 设置已读
 * @param {number} sign
 * @param {number} uid 会话id
 * @returns {Uint8Array} 二进制数据
 */
function readMsgPro(sign, uid) {
  let pro = new MsgRead();
  pro.setSign(sign);
  pro.setToUid(uid);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 加入聊天室
 * @param {number} sign
 * @param {number} options.gtype 群的类型，0：聊天室
 * @param {number} options.id 群id
 * @param {number} options.lastMsgId 上次离开该聊天室之前收到的最后一条消息id，该值也决定了 tips of day 是否要下发
 * @returns {Uint8Array} 二进制数据
 */
function joinRoomPro(sign, options) {
  let pro = new JoinGroup();
  pro.setSign(sign);
  pro.setGtype(options.gtype);
  pro.setId(options.id);
  pro.setLastMsgId(options.lastMsgId);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 离开聊天室
 * @param {number} sign
 * @param {number} options.gtype 群的类型，0：聊天室
 * @param {number} options.id 群id
 * @returns {Uint8Array} 二进制数据
 */
function leaveRoomPro(sign, options) {
  let pro = new LeaveGroup();
  pro.setSign(sign);
  pro.setGtype(options.gtype);
  pro.setId(options.id);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 发送群消息
 * @param {Object} options
 * @param {number} options.sign - 唯一标识
 * @param {number} options.gtype - 群类型
 * @param {number} options.type - 消息类型
 * @param {number} options.id - 接收群ID
 * @param {string} [options.title] - 消息内容
 * @param {string} options.body - 消息内容
 * @param {string} [options.thumb] - 封面图
 * @param {number} [options.width] - 封面图的宽度
 * @param {number} [options.height] - 封面图的高度
 * @param {number} [options.duration] - 时长
 * @param {string} [options.lat] - 纬度
 * @param {string} [options.lng] - 经度
 * @param {number} [options.zoom] - 地图缩放层级
 * @returns {Uint8Array} 二进制数据
 */
function sendGroupMsgPro(options) {
  let pro = new GroupChatS();
  pro.setSign(options.sign);
  pro.setGtype(options.gtype);
  pro.setId(options.id);
  pro.setType(options.type);
  pro.setTitle(options.title);
  pro.setBody(options.body);
  pro.setThumb(options.thumb);
  pro.setWidth(options.width);
  pro.setHeight(options.height);
  pro.setDuration(options.duration);
  pro.setLat(options.lat);
  pro.setLng(options.lng);
  pro.setZoom(options.zoom);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 撤销群消息
 * @param {number} sign
 * @param {number} options.gtype 群的类型，0：聊天室
 * @param {number} options.id 群id
 * @param {number} options.msgId 群消息id
 * @returns {Uint8Array} 二进制数据
 */
function groupRevokePro(options) {
  let pro = new GroupRevoke();
  pro.setSign(options.sign);
  pro.setGtype(options.gtype);
  pro.setId(options.id);
  pro.setMsgId(options.msgId);
  var bytes = pro.serializeBinary();
  return bytes;
}

/***
 * 管理群
 * @param {number} sign
 * @param {number} options.gtype 群的类型，0：聊天室
 * @param {number} options.id 群id
 * @param {number} options.action 操作类型
 * @param {Array<number>} options.uids 用户id数组
 * @param {number} options.duration 时间类型
 * @param {string} options.tod 公告内容
 * @param {string} options.reason 操作原因
 * @param {Array<number>} options.msgs 消息id数组
 * @returns {Uint8Array} 二进制数据
 */
function groupActionPro(options) {
  let pro = new GroupAction();
  pro.setSign(options.sign);
  pro.setGtype(options.gtype);
  pro.setId(options.id);
  pro.setAction(options.action);
  pro.setUidsList(options.uids);
  pro.setDuration(options.duration);
  pro.setTod(options.tod);
  pro.setReason(options.reason);
  pro.setMsgsList(options.msgs);
  var bytes = pro.serializeBinary();
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
  joinRoomPro,
  leaveRoomPro,
  sendGroupMsgPro,
  groupRevokePro,
  groupActionPro,
};

export default proFormat;
