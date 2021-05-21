import protobuf from './imProtobuf_pb.js'
import declare from './declare.js'
import pako from 'pako';
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
};

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
  let protobufJS = new protobuf.GetImToken(); // 调用Person对象 实例化
  // 赋值
  protobufJS.setSign(sign);
  protobufJS.setPhone(uid);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 登录
 * 
 * @param {*} sign 标识
 * @param {*} imToken token
 * @returns 
 */
function loginPro(sign, imToken) {
  let protobufJS = new protobuf.ImLogin();
  protobufJS.setSign(sign);
  protobufJS.setToken(imToken);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 退出
 * 
 * @param {*} sign 标识
 * @returns 
 */
function logoutPro(sign) {
  let protobufJS = new protobuf.ImLogout();
  protobufJS.setSign(sign);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 心跳
 * 
 * @param {*} sign 标识
 * @param {*} imToken token
 * @returns 
 */
function pingPro() {
  let protobufJS = new protobuf.Ping();
  protobufJS.setType(1);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 获取会话记录
 * 
 * @param {*} sign 标识
 * @param {*} uid 最后一条会话Id
 * @param {*} updateTime 会话列表更新时间
 * @returns 
 */
function chatListPro(sign, uid, updateTime) {
  let protobufJS = new protobuf.GetChatList();
  protobufJS.setSign(sign);
  protobufJS.setUid(uid);
  // protobufJS.setUpdateTime(updateTime);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 获取会话信息
 * 
 * @param {*} sign 标识
 * @param {*} uid 要获取的会话Id
 * @returns 
 */
function chatPro(sign, uid) {
  let protobufJS = new protobuf.GetChat();
  protobufJS.setSign(sign);
  protobufJS.setUid(uid);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 删除会话
 * 
 * @param {*} sign 标识
 * @param {*} uid 会话id
 * @returns 
 */
function delChatPro(sign, uid) {
  let protobufJS = new protobuf.DelChat();
  protobufJS.setSign(sign);
  protobufJS.setToUid(uid);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 获取历史消息记录
 * 
 * @param {*} sign 标识
 * @param {*} uid 会话id
 * @param {*} msgEnd 从这条消息往后拉（不包括此条）
 * @param {*} pageSize 拉多少条，默认20，最多100
 * @returns 
 */
function getMsgPro(sign, uid, msgEnd, pageSize) {
  let protobufJS = new protobuf.GetHistory();
  protobufJS.setSign(sign);
  protobufJS.setToUid(uid);
  protobufJS.setMsgEnd(msgEnd);
  // protobufJS.setMsgStart(uid); //最多拉到这条（不包括此条）
  protobufJS.setOffset(pageSize);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 发送消息
 * 
 * @param {*} sign 
 * @param {*} options  
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
function sendMsgPro(sign, options = {}) {
  let protobufJS = new protobuf.ChatS();
  protobufJS.setSign(sign);
  protobufJS.setType(options.type);
  protobufJS.setToUid(options.toUid);
  switch (options.type) {
    case declare.MSG_TYPE.Text:
      protobufJS.setBody(options.text);
      break;
    case declare.MSG_TYPE.Img:
      protobufJS.setBody(options.url);
      protobufJS.setWidth(options.width);
      protobufJS.setHeight(options.height);
      break;
    case declare.MSG_TYPE.Video:
      protobufJS.setBody(options.url);
      protobufJS.setThumb(options.thumb);
      protobufJS.setWidth(options.width);
      protobufJS.setHeight(options.height);
      protobufJS.setDuration(options.duration);
      break;
    case declare.MSG_TYPE.Audio:
      protobufJS.setBody(options.url);
      protobufJS.setDuration(options.duration);
      break;
    case declare.MSG_TYPE.GS:
      protobufJS.setLat(options.lat);
      protobufJS.setLng(options.lng);
      protobufJS.setZoom(options.zoom);
      break;
    case declare.MSG_TYPE.Custom:
      protobufJS.setBody(options.data);
      break;
    default:
      protobufJS.setBody(options.data);
      break;
  }
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 撤回消息
 * 
 * @param {*} sign 
 * @param {*} uid 会话id
 * @param {*} msgId 撤回的消息id
 * @returns 
 */
function revokeMsgPro(sign, options = {}) {
  let protobufJS = new protobuf.Revoke();
  protobufJS.setSign(sign);
  protobufJS.setToUid(options.uid);
  protobufJS.setMsgId(options.msgId);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

/** 设置已读
 * 
 * @param {*} sign 
 * @param {*} uid 会话id
 * @returns 
 */
function readMsgPro(sign, options = {}) {
  let protobufJS = new protobuf.MsgRead();
  protobufJS.setSign(sign);
  protobufJS.setToUid(options.uid);
  let bytes = protobufJS.serializeBinary();
  return bytes;
}

export default proFormat;