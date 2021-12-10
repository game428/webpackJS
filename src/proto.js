/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Ping = (function() {

    function Ping(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Ping.prototype.type = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    Ping.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(8).int64(message.type);
        return writer;
    };

    Ping.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Ping();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.type = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Ping.fromObject = function fromObject(object) {
        if (object instanceof $root.Ping)
            return object;
        var message = new $root.Ping();
        if (object.type != null)
            if ($util.Long)
                (message.type = $util.Long.fromValue(object.type)).unsigned = false;
            else if (typeof object.type === "string")
                message.type = parseInt(object.type, 10);
            else if (typeof object.type === "number")
                message.type = object.type;
            else if (typeof object.type === "object")
                message.type = new $util.LongBits(object.type.low >>> 0, object.type.high >>> 0).toNumber();
        return message;
    };

    Ping.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.type = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.type = options.longs === String ? "0" : 0;
        if (message.type != null && message.hasOwnProperty("type"))
            if (typeof message.type === "number")
                object.type = options.longs === String ? String(message.type) : message.type;
            else
                object.type = options.longs === String ? $util.Long.prototype.toString.call(message.type) : options.longs === Number ? new $util.LongBits(message.type.low >>> 0, message.type.high >>> 0).toNumber() : message.type;
        return object;
    };

    Ping.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ping;
})();

$root.ImLogin = (function() {

    function ImLogin(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ImLogin.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ImLogin.prototype.token = "";
    ImLogin.prototype.ct = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ImLogin.prototype.subApp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ImLogin.prototype.pushChannel = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ImLogin.prototype.pushToken = "";
    ImLogin.prototype.lastToken = "";

    ImLogin.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(18).string(message.token);
        if (message.ct != null && Object.hasOwnProperty.call(message, "ct"))
            writer.uint32(24).int64(message.ct);
        if (message.subApp != null && Object.hasOwnProperty.call(message, "subApp"))
            writer.uint32(32).int64(message.subApp);
        if (message.pushChannel != null && Object.hasOwnProperty.call(message, "pushChannel"))
            writer.uint32(40).int64(message.pushChannel);
        if (message.pushToken != null && Object.hasOwnProperty.call(message, "pushToken"))
            writer.uint32(50).string(message.pushToken);
        if (message.lastToken != null && Object.hasOwnProperty.call(message, "lastToken"))
            writer.uint32(58).string(message.lastToken);
        return writer;
    };

    ImLogin.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImLogin();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.token = reader.string();
                break;
            case 3:
                message.ct = reader.int64();
                break;
            case 4:
                message.subApp = reader.int64();
                break;
            case 5:
                message.pushChannel = reader.int64();
                break;
            case 6:
                message.pushToken = reader.string();
                break;
            case 7:
                message.lastToken = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ImLogin.fromObject = function fromObject(object) {
        if (object instanceof $root.ImLogin)
            return object;
        var message = new $root.ImLogin();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.token != null)
            message.token = String(object.token);
        if (object.ct != null)
            if ($util.Long)
                (message.ct = $util.Long.fromValue(object.ct)).unsigned = false;
            else if (typeof object.ct === "string")
                message.ct = parseInt(object.ct, 10);
            else if (typeof object.ct === "number")
                message.ct = object.ct;
            else if (typeof object.ct === "object")
                message.ct = new $util.LongBits(object.ct.low >>> 0, object.ct.high >>> 0).toNumber();
        if (object.subApp != null)
            if ($util.Long)
                (message.subApp = $util.Long.fromValue(object.subApp)).unsigned = false;
            else if (typeof object.subApp === "string")
                message.subApp = parseInt(object.subApp, 10);
            else if (typeof object.subApp === "number")
                message.subApp = object.subApp;
            else if (typeof object.subApp === "object")
                message.subApp = new $util.LongBits(object.subApp.low >>> 0, object.subApp.high >>> 0).toNumber();
        if (object.pushChannel != null)
            if ($util.Long)
                (message.pushChannel = $util.Long.fromValue(object.pushChannel)).unsigned = false;
            else if (typeof object.pushChannel === "string")
                message.pushChannel = parseInt(object.pushChannel, 10);
            else if (typeof object.pushChannel === "number")
                message.pushChannel = object.pushChannel;
            else if (typeof object.pushChannel === "object")
                message.pushChannel = new $util.LongBits(object.pushChannel.low >>> 0, object.pushChannel.high >>> 0).toNumber();
        if (object.pushToken != null)
            message.pushToken = String(object.pushToken);
        if (object.lastToken != null)
            message.lastToken = String(object.lastToken);
        return message;
    };

    ImLogin.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            object.token = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.ct = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.ct = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.subApp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.subApp = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.pushChannel = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.pushChannel = options.longs === String ? "0" : 0;
            object.pushToken = "";
            object.lastToken = "";
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.token != null && message.hasOwnProperty("token"))
            object.token = message.token;
        if (message.ct != null && message.hasOwnProperty("ct"))
            if (typeof message.ct === "number")
                object.ct = options.longs === String ? String(message.ct) : message.ct;
            else
                object.ct = options.longs === String ? $util.Long.prototype.toString.call(message.ct) : options.longs === Number ? new $util.LongBits(message.ct.low >>> 0, message.ct.high >>> 0).toNumber() : message.ct;
        if (message.subApp != null && message.hasOwnProperty("subApp"))
            if (typeof message.subApp === "number")
                object.subApp = options.longs === String ? String(message.subApp) : message.subApp;
            else
                object.subApp = options.longs === String ? $util.Long.prototype.toString.call(message.subApp) : options.longs === Number ? new $util.LongBits(message.subApp.low >>> 0, message.subApp.high >>> 0).toNumber() : message.subApp;
        if (message.pushChannel != null && message.hasOwnProperty("pushChannel"))
            if (typeof message.pushChannel === "number")
                object.pushChannel = options.longs === String ? String(message.pushChannel) : message.pushChannel;
            else
                object.pushChannel = options.longs === String ? $util.Long.prototype.toString.call(message.pushChannel) : options.longs === Number ? new $util.LongBits(message.pushChannel.low >>> 0, message.pushChannel.high >>> 0).toNumber() : message.pushChannel;
        if (message.pushToken != null && message.hasOwnProperty("pushToken"))
            object.pushToken = message.pushToken;
        if (message.lastToken != null && message.hasOwnProperty("lastToken"))
            object.lastToken = message.lastToken;
        return object;
    };

    ImLogin.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImLogin;
})();

$root.ImLogout = (function() {

    function ImLogout(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ImLogout.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    ImLogout.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        return writer;
    };

    ImLogout.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ImLogout();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ImLogout.fromObject = function fromObject(object) {
        if (object instanceof $root.ImLogout)
            return object;
        var message = new $root.ImLogout();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        return message;
    };

    ImLogout.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        return object;
    };

    ImLogout.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImLogout;
})();

$root.Result = (function() {

    function Result(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Result.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    Result.prototype.code = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    Result.prototype.msg = "";
    Result.prototype.nowTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    Result.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    Result.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(16).int64(message.code);
        if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
            writer.uint32(26).string(message.msg);
        if (message.nowTime != null && Object.hasOwnProperty.call(message, "nowTime"))
            writer.uint32(32).int64(message.nowTime);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(40).int64(message.uid);
        return writer;
    };

    Result.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Result();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.code = reader.int64();
                break;
            case 3:
                message.msg = reader.string();
                break;
            case 4:
                message.nowTime = reader.int64();
                break;
            case 5:
                message.uid = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Result.fromObject = function fromObject(object) {
        if (object instanceof $root.Result)
            return object;
        var message = new $root.Result();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.code != null)
            if ($util.Long)
                (message.code = $util.Long.fromValue(object.code)).unsigned = false;
            else if (typeof object.code === "string")
                message.code = parseInt(object.code, 10);
            else if (typeof object.code === "number")
                message.code = object.code;
            else if (typeof object.code === "object")
                message.code = new $util.LongBits(object.code.low >>> 0, object.code.high >>> 0).toNumber();
        if (object.msg != null)
            message.msg = String(object.msg);
        if (object.nowTime != null)
            if ($util.Long)
                (message.nowTime = $util.Long.fromValue(object.nowTime)).unsigned = false;
            else if (typeof object.nowTime === "string")
                message.nowTime = parseInt(object.nowTime, 10);
            else if (typeof object.nowTime === "number")
                message.nowTime = object.nowTime;
            else if (typeof object.nowTime === "object")
                message.nowTime = new $util.LongBits(object.nowTime.low >>> 0, object.nowTime.high >>> 0).toNumber();
        if (object.uid != null)
            if ($util.Long)
                (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
            else if (typeof object.uid === "string")
                message.uid = parseInt(object.uid, 10);
            else if (typeof object.uid === "number")
                message.uid = object.uid;
            else if (typeof object.uid === "object")
                message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        return message;
    };

    Result.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.code = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.code = options.longs === String ? "0" : 0;
            object.msg = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.nowTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.nowTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.code != null && message.hasOwnProperty("code"))
            if (typeof message.code === "number")
                object.code = options.longs === String ? String(message.code) : message.code;
            else
                object.code = options.longs === String ? $util.Long.prototype.toString.call(message.code) : options.longs === Number ? new $util.LongBits(message.code.low >>> 0, message.code.high >>> 0).toNumber() : message.code;
        if (message.msg != null && message.hasOwnProperty("msg"))
            object.msg = message.msg;
        if (message.nowTime != null && message.hasOwnProperty("nowTime"))
            if (typeof message.nowTime === "number")
                object.nowTime = options.longs === String ? String(message.nowTime) : message.nowTime;
            else
                object.nowTime = options.longs === String ? $util.Long.prototype.toString.call(message.nowTime) : options.longs === Number ? new $util.LongBits(message.nowTime.low >>> 0, message.nowTime.high >>> 0).toNumber() : message.nowTime;
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        return object;
    };

    Result.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Result;
})();

$root.ChatS = (function() {

    function ChatS(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ChatS.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatS.prototype.type = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatS.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatS.prototype.title = "";
    ChatS.prototype.body = "";
    ChatS.prototype.thumb = "";
    ChatS.prototype.width = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatS.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatS.prototype.duration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatS.prototype.lat = 0;
    ChatS.prototype.lng = 0;
    ChatS.prototype.zoom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatS.prototype.pushTitle = "";
    ChatS.prototype.pushBody = "";
    ChatS.prototype.pushSound = "";

    ChatS.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(16).int64(message.type);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(24).int64(message.toUid);
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(34).string(message.title);
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(42).string(message.body);
        if (message.thumb != null && Object.hasOwnProperty.call(message, "thumb"))
            writer.uint32(50).string(message.thumb);
        if (message.width != null && Object.hasOwnProperty.call(message, "width"))
            writer.uint32(56).int64(message.width);
        if (message.height != null && Object.hasOwnProperty.call(message, "height"))
            writer.uint32(64).int64(message.height);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(72).int64(message.duration);
        if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
            writer.uint32(81).double(message.lat);
        if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
            writer.uint32(89).double(message.lng);
        if (message.zoom != null && Object.hasOwnProperty.call(message, "zoom"))
            writer.uint32(96).int64(message.zoom);
        if (message.pushTitle != null && Object.hasOwnProperty.call(message, "pushTitle"))
            writer.uint32(106).string(message.pushTitle);
        if (message.pushBody != null && Object.hasOwnProperty.call(message, "pushBody"))
            writer.uint32(114).string(message.pushBody);
        if (message.pushSound != null && Object.hasOwnProperty.call(message, "pushSound"))
            writer.uint32(122).string(message.pushSound);
        return writer;
    };

    ChatS.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatS();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.type = reader.int64();
                break;
            case 3:
                message.toUid = reader.int64();
                break;
            case 4:
                message.title = reader.string();
                break;
            case 5:
                message.body = reader.string();
                break;
            case 6:
                message.thumb = reader.string();
                break;
            case 7:
                message.width = reader.int64();
                break;
            case 8:
                message.height = reader.int64();
                break;
            case 9:
                message.duration = reader.int64();
                break;
            case 10:
                message.lat = reader.double();
                break;
            case 11:
                message.lng = reader.double();
                break;
            case 12:
                message.zoom = reader.int64();
                break;
            case 13:
                message.pushTitle = reader.string();
                break;
            case 14:
                message.pushBody = reader.string();
                break;
            case 15:
                message.pushSound = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ChatS.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatS)
            return object;
        var message = new $root.ChatS();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.type != null)
            if ($util.Long)
                (message.type = $util.Long.fromValue(object.type)).unsigned = false;
            else if (typeof object.type === "string")
                message.type = parseInt(object.type, 10);
            else if (typeof object.type === "number")
                message.type = object.type;
            else if (typeof object.type === "object")
                message.type = new $util.LongBits(object.type.low >>> 0, object.type.high >>> 0).toNumber();
        if (object.toUid != null)
            if ($util.Long)
                (message.toUid = $util.Long.fromValue(object.toUid)).unsigned = false;
            else if (typeof object.toUid === "string")
                message.toUid = parseInt(object.toUid, 10);
            else if (typeof object.toUid === "number")
                message.toUid = object.toUid;
            else if (typeof object.toUid === "object")
                message.toUid = new $util.LongBits(object.toUid.low >>> 0, object.toUid.high >>> 0).toNumber();
        if (object.title != null)
            message.title = String(object.title);
        if (object.body != null)
            message.body = String(object.body);
        if (object.thumb != null)
            message.thumb = String(object.thumb);
        if (object.width != null)
            if ($util.Long)
                (message.width = $util.Long.fromValue(object.width)).unsigned = false;
            else if (typeof object.width === "string")
                message.width = parseInt(object.width, 10);
            else if (typeof object.width === "number")
                message.width = object.width;
            else if (typeof object.width === "object")
                message.width = new $util.LongBits(object.width.low >>> 0, object.width.high >>> 0).toNumber();
        if (object.height != null)
            if ($util.Long)
                (message.height = $util.Long.fromValue(object.height)).unsigned = false;
            else if (typeof object.height === "string")
                message.height = parseInt(object.height, 10);
            else if (typeof object.height === "number")
                message.height = object.height;
            else if (typeof object.height === "object")
                message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber();
        if (object.duration != null)
            if ($util.Long)
                (message.duration = $util.Long.fromValue(object.duration)).unsigned = false;
            else if (typeof object.duration === "string")
                message.duration = parseInt(object.duration, 10);
            else if (typeof object.duration === "number")
                message.duration = object.duration;
            else if (typeof object.duration === "object")
                message.duration = new $util.LongBits(object.duration.low >>> 0, object.duration.high >>> 0).toNumber();
        if (object.lat != null)
            message.lat = Number(object.lat);
        if (object.lng != null)
            message.lng = Number(object.lng);
        if (object.zoom != null)
            if ($util.Long)
                (message.zoom = $util.Long.fromValue(object.zoom)).unsigned = false;
            else if (typeof object.zoom === "string")
                message.zoom = parseInt(object.zoom, 10);
            else if (typeof object.zoom === "number")
                message.zoom = object.zoom;
            else if (typeof object.zoom === "object")
                message.zoom = new $util.LongBits(object.zoom.low >>> 0, object.zoom.high >>> 0).toNumber();
        if (object.pushTitle != null)
            message.pushTitle = String(object.pushTitle);
        if (object.pushBody != null)
            message.pushBody = String(object.pushBody);
        if (object.pushSound != null)
            message.pushSound = String(object.pushSound);
        return message;
    };

    ChatS.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.type = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.type = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.toUid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.toUid = options.longs === String ? "0" : 0;
            object.title = "";
            object.body = "";
            object.thumb = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.width = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.width = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.height = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.duration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.duration = options.longs === String ? "0" : 0;
            object.lat = 0;
            object.lng = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.zoom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.zoom = options.longs === String ? "0" : 0;
            object.pushTitle = "";
            object.pushBody = "";
            object.pushSound = "";
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.type != null && message.hasOwnProperty("type"))
            if (typeof message.type === "number")
                object.type = options.longs === String ? String(message.type) : message.type;
            else
                object.type = options.longs === String ? $util.Long.prototype.toString.call(message.type) : options.longs === Number ? new $util.LongBits(message.type.low >>> 0, message.type.high >>> 0).toNumber() : message.type;
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (typeof message.toUid === "number")
                object.toUid = options.longs === String ? String(message.toUid) : message.toUid;
            else
                object.toUid = options.longs === String ? $util.Long.prototype.toString.call(message.toUid) : options.longs === Number ? new $util.LongBits(message.toUid.low >>> 0, message.toUid.high >>> 0).toNumber() : message.toUid;
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = message.body;
        if (message.thumb != null && message.hasOwnProperty("thumb"))
            object.thumb = message.thumb;
        if (message.width != null && message.hasOwnProperty("width"))
            if (typeof message.width === "number")
                object.width = options.longs === String ? String(message.width) : message.width;
            else
                object.width = options.longs === String ? $util.Long.prototype.toString.call(message.width) : options.longs === Number ? new $util.LongBits(message.width.low >>> 0, message.width.high >>> 0).toNumber() : message.width;
        if (message.height != null && message.hasOwnProperty("height"))
            if (typeof message.height === "number")
                object.height = options.longs === String ? String(message.height) : message.height;
            else
                object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber() : message.height;
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (typeof message.duration === "number")
                object.duration = options.longs === String ? String(message.duration) : message.duration;
            else
                object.duration = options.longs === String ? $util.Long.prototype.toString.call(message.duration) : options.longs === Number ? new $util.LongBits(message.duration.low >>> 0, message.duration.high >>> 0).toNumber() : message.duration;
        if (message.lat != null && message.hasOwnProperty("lat"))
            object.lat = options.json && !isFinite(message.lat) ? String(message.lat) : message.lat;
        if (message.lng != null && message.hasOwnProperty("lng"))
            object.lng = options.json && !isFinite(message.lng) ? String(message.lng) : message.lng;
        if (message.zoom != null && message.hasOwnProperty("zoom"))
            if (typeof message.zoom === "number")
                object.zoom = options.longs === String ? String(message.zoom) : message.zoom;
            else
                object.zoom = options.longs === String ? $util.Long.prototype.toString.call(message.zoom) : options.longs === Number ? new $util.LongBits(message.zoom.low >>> 0, message.zoom.high >>> 0).toNumber() : message.zoom;
        if (message.pushTitle != null && message.hasOwnProperty("pushTitle"))
            object.pushTitle = message.pushTitle;
        if (message.pushBody != null && message.hasOwnProperty("pushBody"))
            object.pushBody = message.pushBody;
        if (message.pushSound != null && message.hasOwnProperty("pushSound"))
            object.pushSound = message.pushSound;
        return object;
    };

    ChatS.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatS;
})();

$root.ChatSR = (function() {

    function ChatSR(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ChatSR.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatSR.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatSR.prototype.msgTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    ChatSR.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(16).int64(message.msgId);
        if (message.msgTime != null && Object.hasOwnProperty.call(message, "msgTime"))
            writer.uint32(24).int64(message.msgTime);
        return writer;
    };

    ChatSR.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatSR();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.msgId = reader.int64();
                break;
            case 3:
                message.msgTime = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ChatSR.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatSR)
            return object;
        var message = new $root.ChatSR();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.msgId != null)
            if ($util.Long)
                (message.msgId = $util.Long.fromValue(object.msgId)).unsigned = false;
            else if (typeof object.msgId === "string")
                message.msgId = parseInt(object.msgId, 10);
            else if (typeof object.msgId === "number")
                message.msgId = object.msgId;
            else if (typeof object.msgId === "object")
                message.msgId = new $util.LongBits(object.msgId.low >>> 0, object.msgId.high >>> 0).toNumber();
        if (object.msgTime != null)
            if ($util.Long)
                (message.msgTime = $util.Long.fromValue(object.msgTime)).unsigned = false;
            else if (typeof object.msgTime === "string")
                message.msgTime = parseInt(object.msgTime, 10);
            else if (typeof object.msgTime === "number")
                message.msgTime = object.msgTime;
            else if (typeof object.msgTime === "object")
                message.msgTime = new $util.LongBits(object.msgTime.low >>> 0, object.msgTime.high >>> 0).toNumber();
        return message;
    };

    ChatSR.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgTime = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (typeof message.msgId === "number")
                object.msgId = options.longs === String ? String(message.msgId) : message.msgId;
            else
                object.msgId = options.longs === String ? $util.Long.prototype.toString.call(message.msgId) : options.longs === Number ? new $util.LongBits(message.msgId.low >>> 0, message.msgId.high >>> 0).toNumber() : message.msgId;
        if (message.msgTime != null && message.hasOwnProperty("msgTime"))
            if (typeof message.msgTime === "number")
                object.msgTime = options.longs === String ? String(message.msgTime) : message.msgTime;
            else
                object.msgTime = options.longs === String ? $util.Long.prototype.toString.call(message.msgTime) : options.longs === Number ? new $util.LongBits(message.msgTime.low >>> 0, message.msgTime.high >>> 0).toNumber() : message.msgTime;
        return object;
    };

    ChatSR.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatSR;
})();

$root.ChatR = (function() {

    function ChatR(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ChatR.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.fromUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.msgTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.sput = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.newMsg = false;
    ChatR.prototype.type = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.title = "";
    ChatR.prototype.body = "";
    ChatR.prototype.thumb = "";
    ChatR.prototype.width = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.duration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.lat = 0;
    ChatR.prototype.lng = 0;
    ChatR.prototype.zoom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatR.prototype.pushTitle = "";
    ChatR.prototype.pushBody = "";
    ChatR.prototype.pushSound = "";

    ChatR.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.fromUid != null && Object.hasOwnProperty.call(message, "fromUid"))
            writer.uint32(16).int64(message.fromUid);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(24).int64(message.toUid);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(32).int64(message.msgId);
        if (message.msgTime != null && Object.hasOwnProperty.call(message, "msgTime"))
            writer.uint32(40).int64(message.msgTime);
        if (message.sput != null && Object.hasOwnProperty.call(message, "sput"))
            writer.uint32(48).int64(message.sput);
        if (message.newMsg != null && Object.hasOwnProperty.call(message, "newMsg"))
            writer.uint32(56).bool(message.newMsg);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(64).int64(message.type);
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(74).string(message.title);
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(82).string(message.body);
        if (message.thumb != null && Object.hasOwnProperty.call(message, "thumb"))
            writer.uint32(90).string(message.thumb);
        if (message.width != null && Object.hasOwnProperty.call(message, "width"))
            writer.uint32(96).int64(message.width);
        if (message.height != null && Object.hasOwnProperty.call(message, "height"))
            writer.uint32(104).int64(message.height);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(112).int64(message.duration);
        if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
            writer.uint32(121).double(message.lat);
        if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
            writer.uint32(129).double(message.lng);
        if (message.zoom != null && Object.hasOwnProperty.call(message, "zoom"))
            writer.uint32(136).int64(message.zoom);
        if (message.pushTitle != null && Object.hasOwnProperty.call(message, "pushTitle"))
            writer.uint32(146).string(message.pushTitle);
        if (message.pushBody != null && Object.hasOwnProperty.call(message, "pushBody"))
            writer.uint32(154).string(message.pushBody);
        if (message.pushSound != null && Object.hasOwnProperty.call(message, "pushSound"))
            writer.uint32(162).string(message.pushSound);
        return writer;
    };

    ChatR.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatR();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.fromUid = reader.int64();
                break;
            case 3:
                message.toUid = reader.int64();
                break;
            case 4:
                message.msgId = reader.int64();
                break;
            case 5:
                message.msgTime = reader.int64();
                break;
            case 6:
                message.sput = reader.int64();
                break;
            case 7:
                message.newMsg = reader.bool();
                break;
            case 8:
                message.type = reader.int64();
                break;
            case 9:
                message.title = reader.string();
                break;
            case 10:
                message.body = reader.string();
                break;
            case 11:
                message.thumb = reader.string();
                break;
            case 12:
                message.width = reader.int64();
                break;
            case 13:
                message.height = reader.int64();
                break;
            case 14:
                message.duration = reader.int64();
                break;
            case 15:
                message.lat = reader.double();
                break;
            case 16:
                message.lng = reader.double();
                break;
            case 17:
                message.zoom = reader.int64();
                break;
            case 18:
                message.pushTitle = reader.string();
                break;
            case 19:
                message.pushBody = reader.string();
                break;
            case 20:
                message.pushSound = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ChatR.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatR)
            return object;
        var message = new $root.ChatR();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.fromUid != null)
            if ($util.Long)
                (message.fromUid = $util.Long.fromValue(object.fromUid)).unsigned = false;
            else if (typeof object.fromUid === "string")
                message.fromUid = parseInt(object.fromUid, 10);
            else if (typeof object.fromUid === "number")
                message.fromUid = object.fromUid;
            else if (typeof object.fromUid === "object")
                message.fromUid = new $util.LongBits(object.fromUid.low >>> 0, object.fromUid.high >>> 0).toNumber();
        if (object.toUid != null)
            if ($util.Long)
                (message.toUid = $util.Long.fromValue(object.toUid)).unsigned = false;
            else if (typeof object.toUid === "string")
                message.toUid = parseInt(object.toUid, 10);
            else if (typeof object.toUid === "number")
                message.toUid = object.toUid;
            else if (typeof object.toUid === "object")
                message.toUid = new $util.LongBits(object.toUid.low >>> 0, object.toUid.high >>> 0).toNumber();
        if (object.msgId != null)
            if ($util.Long)
                (message.msgId = $util.Long.fromValue(object.msgId)).unsigned = false;
            else if (typeof object.msgId === "string")
                message.msgId = parseInt(object.msgId, 10);
            else if (typeof object.msgId === "number")
                message.msgId = object.msgId;
            else if (typeof object.msgId === "object")
                message.msgId = new $util.LongBits(object.msgId.low >>> 0, object.msgId.high >>> 0).toNumber();
        if (object.msgTime != null)
            if ($util.Long)
                (message.msgTime = $util.Long.fromValue(object.msgTime)).unsigned = false;
            else if (typeof object.msgTime === "string")
                message.msgTime = parseInt(object.msgTime, 10);
            else if (typeof object.msgTime === "number")
                message.msgTime = object.msgTime;
            else if (typeof object.msgTime === "object")
                message.msgTime = new $util.LongBits(object.msgTime.low >>> 0, object.msgTime.high >>> 0).toNumber();
        if (object.sput != null)
            if ($util.Long)
                (message.sput = $util.Long.fromValue(object.sput)).unsigned = false;
            else if (typeof object.sput === "string")
                message.sput = parseInt(object.sput, 10);
            else if (typeof object.sput === "number")
                message.sput = object.sput;
            else if (typeof object.sput === "object")
                message.sput = new $util.LongBits(object.sput.low >>> 0, object.sput.high >>> 0).toNumber();
        if (object.newMsg != null)
            message.newMsg = Boolean(object.newMsg);
        if (object.type != null)
            if ($util.Long)
                (message.type = $util.Long.fromValue(object.type)).unsigned = false;
            else if (typeof object.type === "string")
                message.type = parseInt(object.type, 10);
            else if (typeof object.type === "number")
                message.type = object.type;
            else if (typeof object.type === "object")
                message.type = new $util.LongBits(object.type.low >>> 0, object.type.high >>> 0).toNumber();
        if (object.title != null)
            message.title = String(object.title);
        if (object.body != null)
            message.body = String(object.body);
        if (object.thumb != null)
            message.thumb = String(object.thumb);
        if (object.width != null)
            if ($util.Long)
                (message.width = $util.Long.fromValue(object.width)).unsigned = false;
            else if (typeof object.width === "string")
                message.width = parseInt(object.width, 10);
            else if (typeof object.width === "number")
                message.width = object.width;
            else if (typeof object.width === "object")
                message.width = new $util.LongBits(object.width.low >>> 0, object.width.high >>> 0).toNumber();
        if (object.height != null)
            if ($util.Long)
                (message.height = $util.Long.fromValue(object.height)).unsigned = false;
            else if (typeof object.height === "string")
                message.height = parseInt(object.height, 10);
            else if (typeof object.height === "number")
                message.height = object.height;
            else if (typeof object.height === "object")
                message.height = new $util.LongBits(object.height.low >>> 0, object.height.high >>> 0).toNumber();
        if (object.duration != null)
            if ($util.Long)
                (message.duration = $util.Long.fromValue(object.duration)).unsigned = false;
            else if (typeof object.duration === "string")
                message.duration = parseInt(object.duration, 10);
            else if (typeof object.duration === "number")
                message.duration = object.duration;
            else if (typeof object.duration === "object")
                message.duration = new $util.LongBits(object.duration.low >>> 0, object.duration.high >>> 0).toNumber();
        if (object.lat != null)
            message.lat = Number(object.lat);
        if (object.lng != null)
            message.lng = Number(object.lng);
        if (object.zoom != null)
            if ($util.Long)
                (message.zoom = $util.Long.fromValue(object.zoom)).unsigned = false;
            else if (typeof object.zoom === "string")
                message.zoom = parseInt(object.zoom, 10);
            else if (typeof object.zoom === "number")
                message.zoom = object.zoom;
            else if (typeof object.zoom === "object")
                message.zoom = new $util.LongBits(object.zoom.low >>> 0, object.zoom.high >>> 0).toNumber();
        if (object.pushTitle != null)
            message.pushTitle = String(object.pushTitle);
        if (object.pushBody != null)
            message.pushBody = String(object.pushBody);
        if (object.pushSound != null)
            message.pushSound = String(object.pushSound);
        return message;
    };

    ChatR.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.fromUid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.fromUid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.toUid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.toUid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sput = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sput = options.longs === String ? "0" : 0;
            object.newMsg = false;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.type = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.type = options.longs === String ? "0" : 0;
            object.title = "";
            object.body = "";
            object.thumb = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.width = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.width = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.height = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.height = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.duration = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.duration = options.longs === String ? "0" : 0;
            object.lat = 0;
            object.lng = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.zoom = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.zoom = options.longs === String ? "0" : 0;
            object.pushTitle = "";
            object.pushBody = "";
            object.pushSound = "";
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.fromUid != null && message.hasOwnProperty("fromUid"))
            if (typeof message.fromUid === "number")
                object.fromUid = options.longs === String ? String(message.fromUid) : message.fromUid;
            else
                object.fromUid = options.longs === String ? $util.Long.prototype.toString.call(message.fromUid) : options.longs === Number ? new $util.LongBits(message.fromUid.low >>> 0, message.fromUid.high >>> 0).toNumber() : message.fromUid;
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (typeof message.toUid === "number")
                object.toUid = options.longs === String ? String(message.toUid) : message.toUid;
            else
                object.toUid = options.longs === String ? $util.Long.prototype.toString.call(message.toUid) : options.longs === Number ? new $util.LongBits(message.toUid.low >>> 0, message.toUid.high >>> 0).toNumber() : message.toUid;
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (typeof message.msgId === "number")
                object.msgId = options.longs === String ? String(message.msgId) : message.msgId;
            else
                object.msgId = options.longs === String ? $util.Long.prototype.toString.call(message.msgId) : options.longs === Number ? new $util.LongBits(message.msgId.low >>> 0, message.msgId.high >>> 0).toNumber() : message.msgId;
        if (message.msgTime != null && message.hasOwnProperty("msgTime"))
            if (typeof message.msgTime === "number")
                object.msgTime = options.longs === String ? String(message.msgTime) : message.msgTime;
            else
                object.msgTime = options.longs === String ? $util.Long.prototype.toString.call(message.msgTime) : options.longs === Number ? new $util.LongBits(message.msgTime.low >>> 0, message.msgTime.high >>> 0).toNumber() : message.msgTime;
        if (message.sput != null && message.hasOwnProperty("sput"))
            if (typeof message.sput === "number")
                object.sput = options.longs === String ? String(message.sput) : message.sput;
            else
                object.sput = options.longs === String ? $util.Long.prototype.toString.call(message.sput) : options.longs === Number ? new $util.LongBits(message.sput.low >>> 0, message.sput.high >>> 0).toNumber() : message.sput;
        if (message.newMsg != null && message.hasOwnProperty("newMsg"))
            object.newMsg = message.newMsg;
        if (message.type != null && message.hasOwnProperty("type"))
            if (typeof message.type === "number")
                object.type = options.longs === String ? String(message.type) : message.type;
            else
                object.type = options.longs === String ? $util.Long.prototype.toString.call(message.type) : options.longs === Number ? new $util.LongBits(message.type.low >>> 0, message.type.high >>> 0).toNumber() : message.type;
        if (message.title != null && message.hasOwnProperty("title"))
            object.title = message.title;
        if (message.body != null && message.hasOwnProperty("body"))
            object.body = message.body;
        if (message.thumb != null && message.hasOwnProperty("thumb"))
            object.thumb = message.thumb;
        if (message.width != null && message.hasOwnProperty("width"))
            if (typeof message.width === "number")
                object.width = options.longs === String ? String(message.width) : message.width;
            else
                object.width = options.longs === String ? $util.Long.prototype.toString.call(message.width) : options.longs === Number ? new $util.LongBits(message.width.low >>> 0, message.width.high >>> 0).toNumber() : message.width;
        if (message.height != null && message.hasOwnProperty("height"))
            if (typeof message.height === "number")
                object.height = options.longs === String ? String(message.height) : message.height;
            else
                object.height = options.longs === String ? $util.Long.prototype.toString.call(message.height) : options.longs === Number ? new $util.LongBits(message.height.low >>> 0, message.height.high >>> 0).toNumber() : message.height;
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (typeof message.duration === "number")
                object.duration = options.longs === String ? String(message.duration) : message.duration;
            else
                object.duration = options.longs === String ? $util.Long.prototype.toString.call(message.duration) : options.longs === Number ? new $util.LongBits(message.duration.low >>> 0, message.duration.high >>> 0).toNumber() : message.duration;
        if (message.lat != null && message.hasOwnProperty("lat"))
            object.lat = options.json && !isFinite(message.lat) ? String(message.lat) : message.lat;
        if (message.lng != null && message.hasOwnProperty("lng"))
            object.lng = options.json && !isFinite(message.lng) ? String(message.lng) : message.lng;
        if (message.zoom != null && message.hasOwnProperty("zoom"))
            if (typeof message.zoom === "number")
                object.zoom = options.longs === String ? String(message.zoom) : message.zoom;
            else
                object.zoom = options.longs === String ? $util.Long.prototype.toString.call(message.zoom) : options.longs === Number ? new $util.LongBits(message.zoom.low >>> 0, message.zoom.high >>> 0).toNumber() : message.zoom;
        if (message.pushTitle != null && message.hasOwnProperty("pushTitle"))
            object.pushTitle = message.pushTitle;
        if (message.pushBody != null && message.hasOwnProperty("pushBody"))
            object.pushBody = message.pushBody;
        if (message.pushSound != null && message.hasOwnProperty("pushSound"))
            object.pushSound = message.pushSound;
        return object;
    };

    ChatR.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatR;
})();

$root.ChatRBatch = (function() {

    function ChatRBatch(properties) {
        this.msgs = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ChatRBatch.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatRBatch.prototype.msgs = $util.emptyArray;

    ChatRBatch.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.msgs != null && message.msgs.length)
            for (var i = 0; i < message.msgs.length; ++i)
                $root.ChatR.encode(message.msgs[i], writer.uint32(18).fork()).ldelim();
        return writer;
    };

    ChatRBatch.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatRBatch();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                if (!(message.msgs && message.msgs.length))
                    message.msgs = [];
                message.msgs.push($root.ChatR.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ChatRBatch.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatRBatch)
            return object;
        var message = new $root.ChatRBatch();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.msgs) {
            if (!Array.isArray(object.msgs))
                throw TypeError(".ChatRBatch.msgs: array expected");
            message.msgs = [];
            for (var i = 0; i < object.msgs.length; ++i) {
                if (typeof object.msgs[i] !== "object")
                    throw TypeError(".ChatRBatch.msgs: object expected");
                message.msgs[i] = $root.ChatR.fromObject(object.msgs[i]);
            }
        }
        return message;
    };

    ChatRBatch.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.msgs = [];
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.msgs && message.msgs.length) {
            object.msgs = [];
            for (var j = 0; j < message.msgs.length; ++j)
                object.msgs[j] = $root.ChatR.toObject(message.msgs[j], options);
        }
        return object;
    };

    ChatRBatch.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatRBatch;
})();

$root.GetHistory = (function() {

    function GetHistory(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    GetHistory.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    GetHistory.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    GetHistory.prototype.msgEnd = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    GetHistory.prototype.msgStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    GetHistory.prototype.offset = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    GetHistory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(16).int64(message.toUid);
        if (message.msgEnd != null && Object.hasOwnProperty.call(message, "msgEnd"))
            writer.uint32(24).int64(message.msgEnd);
        if (message.msgStart != null && Object.hasOwnProperty.call(message, "msgStart"))
            writer.uint32(32).int64(message.msgStart);
        if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
            writer.uint32(40).int64(message.offset);
        return writer;
    };

    GetHistory.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetHistory();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.toUid = reader.int64();
                break;
            case 3:
                message.msgEnd = reader.int64();
                break;
            case 4:
                message.msgStart = reader.int64();
                break;
            case 5:
                message.offset = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    GetHistory.fromObject = function fromObject(object) {
        if (object instanceof $root.GetHistory)
            return object;
        var message = new $root.GetHistory();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.toUid != null)
            if ($util.Long)
                (message.toUid = $util.Long.fromValue(object.toUid)).unsigned = false;
            else if (typeof object.toUid === "string")
                message.toUid = parseInt(object.toUid, 10);
            else if (typeof object.toUid === "number")
                message.toUid = object.toUid;
            else if (typeof object.toUid === "object")
                message.toUid = new $util.LongBits(object.toUid.low >>> 0, object.toUid.high >>> 0).toNumber();
        if (object.msgEnd != null)
            if ($util.Long)
                (message.msgEnd = $util.Long.fromValue(object.msgEnd)).unsigned = false;
            else if (typeof object.msgEnd === "string")
                message.msgEnd = parseInt(object.msgEnd, 10);
            else if (typeof object.msgEnd === "number")
                message.msgEnd = object.msgEnd;
            else if (typeof object.msgEnd === "object")
                message.msgEnd = new $util.LongBits(object.msgEnd.low >>> 0, object.msgEnd.high >>> 0).toNumber();
        if (object.msgStart != null)
            if ($util.Long)
                (message.msgStart = $util.Long.fromValue(object.msgStart)).unsigned = false;
            else if (typeof object.msgStart === "string")
                message.msgStart = parseInt(object.msgStart, 10);
            else if (typeof object.msgStart === "number")
                message.msgStart = object.msgStart;
            else if (typeof object.msgStart === "object")
                message.msgStart = new $util.LongBits(object.msgStart.low >>> 0, object.msgStart.high >>> 0).toNumber();
        if (object.offset != null)
            if ($util.Long)
                (message.offset = $util.Long.fromValue(object.offset)).unsigned = false;
            else if (typeof object.offset === "string")
                message.offset = parseInt(object.offset, 10);
            else if (typeof object.offset === "number")
                message.offset = object.offset;
            else if (typeof object.offset === "object")
                message.offset = new $util.LongBits(object.offset.low >>> 0, object.offset.high >>> 0).toNumber();
        return message;
    };

    GetHistory.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.toUid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.toUid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgEnd = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgEnd = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgStart = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgStart = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.offset = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.offset = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (typeof message.toUid === "number")
                object.toUid = options.longs === String ? String(message.toUid) : message.toUid;
            else
                object.toUid = options.longs === String ? $util.Long.prototype.toString.call(message.toUid) : options.longs === Number ? new $util.LongBits(message.toUid.low >>> 0, message.toUid.high >>> 0).toNumber() : message.toUid;
        if (message.msgEnd != null && message.hasOwnProperty("msgEnd"))
            if (typeof message.msgEnd === "number")
                object.msgEnd = options.longs === String ? String(message.msgEnd) : message.msgEnd;
            else
                object.msgEnd = options.longs === String ? $util.Long.prototype.toString.call(message.msgEnd) : options.longs === Number ? new $util.LongBits(message.msgEnd.low >>> 0, message.msgEnd.high >>> 0).toNumber() : message.msgEnd;
        if (message.msgStart != null && message.hasOwnProperty("msgStart"))
            if (typeof message.msgStart === "number")
                object.msgStart = options.longs === String ? String(message.msgStart) : message.msgStart;
            else
                object.msgStart = options.longs === String ? $util.Long.prototype.toString.call(message.msgStart) : options.longs === Number ? new $util.LongBits(message.msgStart.low >>> 0, message.msgStart.high >>> 0).toNumber() : message.msgStart;
        if (message.offset != null && message.hasOwnProperty("offset"))
            if (typeof message.offset === "number")
                object.offset = options.longs === String ? String(message.offset) : message.offset;
            else
                object.offset = options.longs === String ? $util.Long.prototype.toString.call(message.offset) : options.longs === Number ? new $util.LongBits(message.offset.low >>> 0, message.offset.high >>> 0).toNumber() : message.offset;
        return object;
    };

    GetHistory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetHistory;
})();

$root.Revoke = (function() {

    function Revoke(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    Revoke.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    Revoke.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    Revoke.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    Revoke.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(16).int64(message.toUid);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(24).int64(message.msgId);
        return writer;
    };

    Revoke.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Revoke();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.toUid = reader.int64();
                break;
            case 3:
                message.msgId = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    Revoke.fromObject = function fromObject(object) {
        if (object instanceof $root.Revoke)
            return object;
        var message = new $root.Revoke();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.toUid != null)
            if ($util.Long)
                (message.toUid = $util.Long.fromValue(object.toUid)).unsigned = false;
            else if (typeof object.toUid === "string")
                message.toUid = parseInt(object.toUid, 10);
            else if (typeof object.toUid === "number")
                message.toUid = object.toUid;
            else if (typeof object.toUid === "object")
                message.toUid = new $util.LongBits(object.toUid.low >>> 0, object.toUid.high >>> 0).toNumber();
        if (object.msgId != null)
            if ($util.Long)
                (message.msgId = $util.Long.fromValue(object.msgId)).unsigned = false;
            else if (typeof object.msgId === "string")
                message.msgId = parseInt(object.msgId, 10);
            else if (typeof object.msgId === "number")
                message.msgId = object.msgId;
            else if (typeof object.msgId === "object")
                message.msgId = new $util.LongBits(object.msgId.low >>> 0, object.msgId.high >>> 0).toNumber();
        return message;
    };

    Revoke.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.toUid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.toUid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgId = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (typeof message.toUid === "number")
                object.toUid = options.longs === String ? String(message.toUid) : message.toUid;
            else
                object.toUid = options.longs === String ? $util.Long.prototype.toString.call(message.toUid) : options.longs === Number ? new $util.LongBits(message.toUid.low >>> 0, message.toUid.high >>> 0).toNumber() : message.toUid;
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (typeof message.msgId === "number")
                object.msgId = options.longs === String ? String(message.msgId) : message.msgId;
            else
                object.msgId = options.longs === String ? $util.Long.prototype.toString.call(message.msgId) : options.longs === Number ? new $util.LongBits(message.msgId.low >>> 0, message.msgId.high >>> 0).toNumber() : message.msgId;
        return object;
    };

    Revoke.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Revoke;
})();

$root.MsgRead = (function() {

    function MsgRead(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    MsgRead.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    MsgRead.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    MsgRead.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    MsgRead.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(16).int64(message.toUid);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(24).int64(message.msgId);
        return writer;
    };

    MsgRead.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MsgRead();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.toUid = reader.int64();
                break;
            case 3:
                message.msgId = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    MsgRead.fromObject = function fromObject(object) {
        if (object instanceof $root.MsgRead)
            return object;
        var message = new $root.MsgRead();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.toUid != null)
            if ($util.Long)
                (message.toUid = $util.Long.fromValue(object.toUid)).unsigned = false;
            else if (typeof object.toUid === "string")
                message.toUid = parseInt(object.toUid, 10);
            else if (typeof object.toUid === "number")
                message.toUid = object.toUid;
            else if (typeof object.toUid === "object")
                message.toUid = new $util.LongBits(object.toUid.low >>> 0, object.toUid.high >>> 0).toNumber();
        if (object.msgId != null)
            if ($util.Long)
                (message.msgId = $util.Long.fromValue(object.msgId)).unsigned = false;
            else if (typeof object.msgId === "string")
                message.msgId = parseInt(object.msgId, 10);
            else if (typeof object.msgId === "number")
                message.msgId = object.msgId;
            else if (typeof object.msgId === "object")
                message.msgId = new $util.LongBits(object.msgId.low >>> 0, object.msgId.high >>> 0).toNumber();
        return message;
    };

    MsgRead.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.toUid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.toUid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgId = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (typeof message.toUid === "number")
                object.toUid = options.longs === String ? String(message.toUid) : message.toUid;
            else
                object.toUid = options.longs === String ? $util.Long.prototype.toString.call(message.toUid) : options.longs === Number ? new $util.LongBits(message.toUid.low >>> 0, message.toUid.high >>> 0).toNumber() : message.toUid;
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (typeof message.msgId === "number")
                object.msgId = options.longs === String ? String(message.msgId) : message.msgId;
            else
                object.msgId = options.longs === String ? $util.Long.prototype.toString.call(message.msgId) : options.longs === Number ? new $util.LongBits(message.msgId.low >>> 0, message.msgId.high >>> 0).toNumber() : message.msgId;
        return object;
    };

    MsgRead.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MsgRead;
})();

$root.DelChat = (function() {

    function DelChat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    DelChat.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    DelChat.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    DelChat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(16).int64(message.toUid);
        return writer;
    };

    DelChat.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DelChat();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.toUid = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    DelChat.fromObject = function fromObject(object) {
        if (object instanceof $root.DelChat)
            return object;
        var message = new $root.DelChat();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.toUid != null)
            if ($util.Long)
                (message.toUid = $util.Long.fromValue(object.toUid)).unsigned = false;
            else if (typeof object.toUid === "string")
                message.toUid = parseInt(object.toUid, 10);
            else if (typeof object.toUid === "number")
                message.toUid = object.toUid;
            else if (typeof object.toUid === "object")
                message.toUid = new $util.LongBits(object.toUid.low >>> 0, object.toUid.high >>> 0).toNumber();
        return message;
    };

    DelChat.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.toUid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.toUid = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (typeof message.toUid === "number")
                object.toUid = options.longs === String ? String(message.toUid) : message.toUid;
            else
                object.toUid = options.longs === String ? $util.Long.prototype.toString.call(message.toUid) : options.longs === Number ? new $util.LongBits(message.toUid.low >>> 0, message.toUid.high >>> 0).toNumber() : message.toUid;
        return object;
    };

    DelChat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DelChat;
})();

$root.GetChatList = (function() {

    function GetChatList(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    GetChatList.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    GetChatList.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    GetChatList.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    GetChatList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(16).int64(message.updateTime);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(24).int64(message.uid);
        return writer;
    };

    GetChatList.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetChatList();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.updateTime = reader.int64();
                break;
            case 3:
                message.uid = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    GetChatList.fromObject = function fromObject(object) {
        if (object instanceof $root.GetChatList)
            return object;
        var message = new $root.GetChatList();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.updateTime != null)
            if ($util.Long)
                (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false;
            else if (typeof object.updateTime === "string")
                message.updateTime = parseInt(object.updateTime, 10);
            else if (typeof object.updateTime === "number")
                message.updateTime = object.updateTime;
            else if (typeof object.updateTime === "object")
                message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber();
        if (object.uid != null)
            if ($util.Long)
                (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
            else if (typeof object.uid === "string")
                message.uid = parseInt(object.uid, 10);
            else if (typeof object.uid === "number")
                message.uid = object.uid;
            else if (typeof object.uid === "object")
                message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        return message;
    };

    GetChatList.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.updateTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updateTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (typeof message.updateTime === "number")
                object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime;
            else
                object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime;
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        return object;
    };

    GetChatList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetChatList;
})();

$root.ChatItem = (function() {

    function ChatItem(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ChatItem.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.msgEnd = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.msgLastRead = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.showMsgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.showMsgType = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.showMsg = "";
    ChatItem.prototype.showMsgTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.unread = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItem.prototype.matched = false;
    ChatItem.prototype.newMsg = false;
    ChatItem.prototype.myMove = false;
    ChatItem.prototype.iceBreak = false;
    ChatItem.prototype.tipFree = false;
    ChatItem.prototype.topAlbum = false;
    ChatItem.prototype.iBlockU = false;
    ChatItem.prototype.iChatU = false;
    ChatItem.prototype.uChatI = false;
    ChatItem.prototype.deleted = false;

    ChatItem.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(16).int64(message.uid);
        if (message.msgEnd != null && Object.hasOwnProperty.call(message, "msgEnd"))
            writer.uint32(24).int64(message.msgEnd);
        if (message.msgLastRead != null && Object.hasOwnProperty.call(message, "msgLastRead"))
            writer.uint32(32).int64(message.msgLastRead);
        if (message.showMsgId != null && Object.hasOwnProperty.call(message, "showMsgId"))
            writer.uint32(40).int64(message.showMsgId);
        if (message.showMsgType != null && Object.hasOwnProperty.call(message, "showMsgType"))
            writer.uint32(48).int64(message.showMsgType);
        if (message.showMsg != null && Object.hasOwnProperty.call(message, "showMsg"))
            writer.uint32(58).string(message.showMsg);
        if (message.showMsgTime != null && Object.hasOwnProperty.call(message, "showMsgTime"))
            writer.uint32(64).int64(message.showMsgTime);
        if (message.unread != null && Object.hasOwnProperty.call(message, "unread"))
            writer.uint32(72).int64(message.unread);
        if (message.matched != null && Object.hasOwnProperty.call(message, "matched"))
            writer.uint32(80).bool(message.matched);
        if (message.newMsg != null && Object.hasOwnProperty.call(message, "newMsg"))
            writer.uint32(88).bool(message.newMsg);
        if (message.myMove != null && Object.hasOwnProperty.call(message, "myMove"))
            writer.uint32(96).bool(message.myMove);
        if (message.iceBreak != null && Object.hasOwnProperty.call(message, "iceBreak"))
            writer.uint32(104).bool(message.iceBreak);
        if (message.tipFree != null && Object.hasOwnProperty.call(message, "tipFree"))
            writer.uint32(112).bool(message.tipFree);
        if (message.topAlbum != null && Object.hasOwnProperty.call(message, "topAlbum"))
            writer.uint32(120).bool(message.topAlbum);
        if (message.iBlockU != null && Object.hasOwnProperty.call(message, "iBlockU"))
            writer.uint32(128).bool(message.iBlockU);
        if (message.iChatU != null && Object.hasOwnProperty.call(message, "iChatU"))
            writer.uint32(136).bool(message.iChatU);
        if (message.uChatI != null && Object.hasOwnProperty.call(message, "uChatI"))
            writer.uint32(144).bool(message.uChatI);
        if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
            writer.uint32(152).bool(message.deleted);
        return writer;
    };

    ChatItem.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatItem();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.uid = reader.int64();
                break;
            case 3:
                message.msgEnd = reader.int64();
                break;
            case 4:
                message.msgLastRead = reader.int64();
                break;
            case 5:
                message.showMsgId = reader.int64();
                break;
            case 6:
                message.showMsgType = reader.int64();
                break;
            case 7:
                message.showMsg = reader.string();
                break;
            case 8:
                message.showMsgTime = reader.int64();
                break;
            case 9:
                message.unread = reader.int64();
                break;
            case 10:
                message.matched = reader.bool();
                break;
            case 11:
                message.newMsg = reader.bool();
                break;
            case 12:
                message.myMove = reader.bool();
                break;
            case 13:
                message.iceBreak = reader.bool();
                break;
            case 14:
                message.tipFree = reader.bool();
                break;
            case 15:
                message.topAlbum = reader.bool();
                break;
            case 16:
                message.iBlockU = reader.bool();
                break;
            case 17:
                message.iChatU = reader.bool();
                break;
            case 18:
                message.uChatI = reader.bool();
                break;
            case 19:
                message.deleted = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ChatItem.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatItem)
            return object;
        var message = new $root.ChatItem();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.uid != null)
            if ($util.Long)
                (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
            else if (typeof object.uid === "string")
                message.uid = parseInt(object.uid, 10);
            else if (typeof object.uid === "number")
                message.uid = object.uid;
            else if (typeof object.uid === "object")
                message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        if (object.msgEnd != null)
            if ($util.Long)
                (message.msgEnd = $util.Long.fromValue(object.msgEnd)).unsigned = false;
            else if (typeof object.msgEnd === "string")
                message.msgEnd = parseInt(object.msgEnd, 10);
            else if (typeof object.msgEnd === "number")
                message.msgEnd = object.msgEnd;
            else if (typeof object.msgEnd === "object")
                message.msgEnd = new $util.LongBits(object.msgEnd.low >>> 0, object.msgEnd.high >>> 0).toNumber();
        if (object.msgLastRead != null)
            if ($util.Long)
                (message.msgLastRead = $util.Long.fromValue(object.msgLastRead)).unsigned = false;
            else if (typeof object.msgLastRead === "string")
                message.msgLastRead = parseInt(object.msgLastRead, 10);
            else if (typeof object.msgLastRead === "number")
                message.msgLastRead = object.msgLastRead;
            else if (typeof object.msgLastRead === "object")
                message.msgLastRead = new $util.LongBits(object.msgLastRead.low >>> 0, object.msgLastRead.high >>> 0).toNumber();
        if (object.showMsgId != null)
            if ($util.Long)
                (message.showMsgId = $util.Long.fromValue(object.showMsgId)).unsigned = false;
            else if (typeof object.showMsgId === "string")
                message.showMsgId = parseInt(object.showMsgId, 10);
            else if (typeof object.showMsgId === "number")
                message.showMsgId = object.showMsgId;
            else if (typeof object.showMsgId === "object")
                message.showMsgId = new $util.LongBits(object.showMsgId.low >>> 0, object.showMsgId.high >>> 0).toNumber();
        if (object.showMsgType != null)
            if ($util.Long)
                (message.showMsgType = $util.Long.fromValue(object.showMsgType)).unsigned = false;
            else if (typeof object.showMsgType === "string")
                message.showMsgType = parseInt(object.showMsgType, 10);
            else if (typeof object.showMsgType === "number")
                message.showMsgType = object.showMsgType;
            else if (typeof object.showMsgType === "object")
                message.showMsgType = new $util.LongBits(object.showMsgType.low >>> 0, object.showMsgType.high >>> 0).toNumber();
        if (object.showMsg != null)
            message.showMsg = String(object.showMsg);
        if (object.showMsgTime != null)
            if ($util.Long)
                (message.showMsgTime = $util.Long.fromValue(object.showMsgTime)).unsigned = false;
            else if (typeof object.showMsgTime === "string")
                message.showMsgTime = parseInt(object.showMsgTime, 10);
            else if (typeof object.showMsgTime === "number")
                message.showMsgTime = object.showMsgTime;
            else if (typeof object.showMsgTime === "object")
                message.showMsgTime = new $util.LongBits(object.showMsgTime.low >>> 0, object.showMsgTime.high >>> 0).toNumber();
        if (object.unread != null)
            if ($util.Long)
                (message.unread = $util.Long.fromValue(object.unread)).unsigned = false;
            else if (typeof object.unread === "string")
                message.unread = parseInt(object.unread, 10);
            else if (typeof object.unread === "number")
                message.unread = object.unread;
            else if (typeof object.unread === "object")
                message.unread = new $util.LongBits(object.unread.low >>> 0, object.unread.high >>> 0).toNumber();
        if (object.matched != null)
            message.matched = Boolean(object.matched);
        if (object.newMsg != null)
            message.newMsg = Boolean(object.newMsg);
        if (object.myMove != null)
            message.myMove = Boolean(object.myMove);
        if (object.iceBreak != null)
            message.iceBreak = Boolean(object.iceBreak);
        if (object.tipFree != null)
            message.tipFree = Boolean(object.tipFree);
        if (object.topAlbum != null)
            message.topAlbum = Boolean(object.topAlbum);
        if (object.iBlockU != null)
            message.iBlockU = Boolean(object.iBlockU);
        if (object.iChatU != null)
            message.iChatU = Boolean(object.iChatU);
        if (object.uChatI != null)
            message.uChatI = Boolean(object.uChatI);
        if (object.deleted != null)
            message.deleted = Boolean(object.deleted);
        return message;
    };

    ChatItem.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgEnd = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgEnd = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgLastRead = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgLastRead = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.showMsgId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.showMsgId = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.showMsgType = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.showMsgType = options.longs === String ? "0" : 0;
            object.showMsg = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.showMsgTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.showMsgTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.unread = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.unread = options.longs === String ? "0" : 0;
            object.matched = false;
            object.newMsg = false;
            object.myMove = false;
            object.iceBreak = false;
            object.tipFree = false;
            object.topAlbum = false;
            object.iBlockU = false;
            object.iChatU = false;
            object.uChatI = false;
            object.deleted = false;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        if (message.msgEnd != null && message.hasOwnProperty("msgEnd"))
            if (typeof message.msgEnd === "number")
                object.msgEnd = options.longs === String ? String(message.msgEnd) : message.msgEnd;
            else
                object.msgEnd = options.longs === String ? $util.Long.prototype.toString.call(message.msgEnd) : options.longs === Number ? new $util.LongBits(message.msgEnd.low >>> 0, message.msgEnd.high >>> 0).toNumber() : message.msgEnd;
        if (message.msgLastRead != null && message.hasOwnProperty("msgLastRead"))
            if (typeof message.msgLastRead === "number")
                object.msgLastRead = options.longs === String ? String(message.msgLastRead) : message.msgLastRead;
            else
                object.msgLastRead = options.longs === String ? $util.Long.prototype.toString.call(message.msgLastRead) : options.longs === Number ? new $util.LongBits(message.msgLastRead.low >>> 0, message.msgLastRead.high >>> 0).toNumber() : message.msgLastRead;
        if (message.showMsgId != null && message.hasOwnProperty("showMsgId"))
            if (typeof message.showMsgId === "number")
                object.showMsgId = options.longs === String ? String(message.showMsgId) : message.showMsgId;
            else
                object.showMsgId = options.longs === String ? $util.Long.prototype.toString.call(message.showMsgId) : options.longs === Number ? new $util.LongBits(message.showMsgId.low >>> 0, message.showMsgId.high >>> 0).toNumber() : message.showMsgId;
        if (message.showMsgType != null && message.hasOwnProperty("showMsgType"))
            if (typeof message.showMsgType === "number")
                object.showMsgType = options.longs === String ? String(message.showMsgType) : message.showMsgType;
            else
                object.showMsgType = options.longs === String ? $util.Long.prototype.toString.call(message.showMsgType) : options.longs === Number ? new $util.LongBits(message.showMsgType.low >>> 0, message.showMsgType.high >>> 0).toNumber() : message.showMsgType;
        if (message.showMsg != null && message.hasOwnProperty("showMsg"))
            object.showMsg = message.showMsg;
        if (message.showMsgTime != null && message.hasOwnProperty("showMsgTime"))
            if (typeof message.showMsgTime === "number")
                object.showMsgTime = options.longs === String ? String(message.showMsgTime) : message.showMsgTime;
            else
                object.showMsgTime = options.longs === String ? $util.Long.prototype.toString.call(message.showMsgTime) : options.longs === Number ? new $util.LongBits(message.showMsgTime.low >>> 0, message.showMsgTime.high >>> 0).toNumber() : message.showMsgTime;
        if (message.unread != null && message.hasOwnProperty("unread"))
            if (typeof message.unread === "number")
                object.unread = options.longs === String ? String(message.unread) : message.unread;
            else
                object.unread = options.longs === String ? $util.Long.prototype.toString.call(message.unread) : options.longs === Number ? new $util.LongBits(message.unread.low >>> 0, message.unread.high >>> 0).toNumber() : message.unread;
        if (message.matched != null && message.hasOwnProperty("matched"))
            object.matched = message.matched;
        if (message.newMsg != null && message.hasOwnProperty("newMsg"))
            object.newMsg = message.newMsg;
        if (message.myMove != null && message.hasOwnProperty("myMove"))
            object.myMove = message.myMove;
        if (message.iceBreak != null && message.hasOwnProperty("iceBreak"))
            object.iceBreak = message.iceBreak;
        if (message.tipFree != null && message.hasOwnProperty("tipFree"))
            object.tipFree = message.tipFree;
        if (message.topAlbum != null && message.hasOwnProperty("topAlbum"))
            object.topAlbum = message.topAlbum;
        if (message.iBlockU != null && message.hasOwnProperty("iBlockU"))
            object.iBlockU = message.iBlockU;
        if (message.iChatU != null && message.hasOwnProperty("iChatU"))
            object.iChatU = message.iChatU;
        if (message.uChatI != null && message.hasOwnProperty("uChatI"))
            object.uChatI = message.uChatI;
        if (message.deleted != null && message.hasOwnProperty("deleted"))
            object.deleted = message.deleted;
        return object;
    };

    ChatItem.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatItem;
})();

$root.ChatItemUpdate = (function() {

    function ChatItemUpdate(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ChatItemUpdate.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItemUpdate.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItemUpdate.prototype.event = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItemUpdate.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItemUpdate.prototype.msgLastRead = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItemUpdate.prototype.unread = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatItemUpdate.prototype.iBlockU = false;
    ChatItemUpdate.prototype.deleted = false;

    ChatItemUpdate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(16).int64(message.uid);
        if (message.event != null && Object.hasOwnProperty.call(message, "event"))
            writer.uint32(24).int64(message.event);
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(32).int64(message.updateTime);
        if (message.msgLastRead != null && Object.hasOwnProperty.call(message, "msgLastRead"))
            writer.uint32(40).int64(message.msgLastRead);
        if (message.unread != null && Object.hasOwnProperty.call(message, "unread"))
            writer.uint32(48).int64(message.unread);
        if (message.iBlockU != null && Object.hasOwnProperty.call(message, "iBlockU"))
            writer.uint32(56).bool(message.iBlockU);
        if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
            writer.uint32(64).bool(message.deleted);
        return writer;
    };

    ChatItemUpdate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatItemUpdate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.uid = reader.int64();
                break;
            case 3:
                message.event = reader.int64();
                break;
            case 4:
                message.updateTime = reader.int64();
                break;
            case 5:
                message.msgLastRead = reader.int64();
                break;
            case 6:
                message.unread = reader.int64();
                break;
            case 7:
                message.iBlockU = reader.bool();
                break;
            case 8:
                message.deleted = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ChatItemUpdate.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatItemUpdate)
            return object;
        var message = new $root.ChatItemUpdate();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.uid != null)
            if ($util.Long)
                (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
            else if (typeof object.uid === "string")
                message.uid = parseInt(object.uid, 10);
            else if (typeof object.uid === "number")
                message.uid = object.uid;
            else if (typeof object.uid === "object")
                message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        if (object.event != null)
            if ($util.Long)
                (message.event = $util.Long.fromValue(object.event)).unsigned = false;
            else if (typeof object.event === "string")
                message.event = parseInt(object.event, 10);
            else if (typeof object.event === "number")
                message.event = object.event;
            else if (typeof object.event === "object")
                message.event = new $util.LongBits(object.event.low >>> 0, object.event.high >>> 0).toNumber();
        if (object.updateTime != null)
            if ($util.Long)
                (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false;
            else if (typeof object.updateTime === "string")
                message.updateTime = parseInt(object.updateTime, 10);
            else if (typeof object.updateTime === "number")
                message.updateTime = object.updateTime;
            else if (typeof object.updateTime === "object")
                message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber();
        if (object.msgLastRead != null)
            if ($util.Long)
                (message.msgLastRead = $util.Long.fromValue(object.msgLastRead)).unsigned = false;
            else if (typeof object.msgLastRead === "string")
                message.msgLastRead = parseInt(object.msgLastRead, 10);
            else if (typeof object.msgLastRead === "number")
                message.msgLastRead = object.msgLastRead;
            else if (typeof object.msgLastRead === "object")
                message.msgLastRead = new $util.LongBits(object.msgLastRead.low >>> 0, object.msgLastRead.high >>> 0).toNumber();
        if (object.unread != null)
            if ($util.Long)
                (message.unread = $util.Long.fromValue(object.unread)).unsigned = false;
            else if (typeof object.unread === "string")
                message.unread = parseInt(object.unread, 10);
            else if (typeof object.unread === "number")
                message.unread = object.unread;
            else if (typeof object.unread === "object")
                message.unread = new $util.LongBits(object.unread.low >>> 0, object.unread.high >>> 0).toNumber();
        if (object.iBlockU != null)
            message.iBlockU = Boolean(object.iBlockU);
        if (object.deleted != null)
            message.deleted = Boolean(object.deleted);
        return message;
    };

    ChatItemUpdate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.event = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.event = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.updateTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updateTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.msgLastRead = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.msgLastRead = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.unread = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.unread = options.longs === String ? "0" : 0;
            object.iBlockU = false;
            object.deleted = false;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        if (message.event != null && message.hasOwnProperty("event"))
            if (typeof message.event === "number")
                object.event = options.longs === String ? String(message.event) : message.event;
            else
                object.event = options.longs === String ? $util.Long.prototype.toString.call(message.event) : options.longs === Number ? new $util.LongBits(message.event.low >>> 0, message.event.high >>> 0).toNumber() : message.event;
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (typeof message.updateTime === "number")
                object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime;
            else
                object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime;
        if (message.msgLastRead != null && message.hasOwnProperty("msgLastRead"))
            if (typeof message.msgLastRead === "number")
                object.msgLastRead = options.longs === String ? String(message.msgLastRead) : message.msgLastRead;
            else
                object.msgLastRead = options.longs === String ? $util.Long.prototype.toString.call(message.msgLastRead) : options.longs === Number ? new $util.LongBits(message.msgLastRead.low >>> 0, message.msgLastRead.high >>> 0).toNumber() : message.msgLastRead;
        if (message.unread != null && message.hasOwnProperty("unread"))
            if (typeof message.unread === "number")
                object.unread = options.longs === String ? String(message.unread) : message.unread;
            else
                object.unread = options.longs === String ? $util.Long.prototype.toString.call(message.unread) : options.longs === Number ? new $util.LongBits(message.unread.low >>> 0, message.unread.high >>> 0).toNumber() : message.unread;
        if (message.iBlockU != null && message.hasOwnProperty("iBlockU"))
            object.iBlockU = message.iBlockU;
        if (message.deleted != null && message.hasOwnProperty("deleted"))
            object.deleted = message.deleted;
        return object;
    };

    ChatItemUpdate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatItemUpdate;
})();

$root.ChatList = (function() {

    function ChatList(properties) {
        this.chatItems = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    ChatList.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatList.prototype.chatItems = $util.emptyArray;
    ChatList.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    ChatList.prototype.hasMore = false;

    ChatList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.chatItems != null && message.chatItems.length)
            for (var i = 0; i < message.chatItems.length; ++i)
                $root.ChatItem.encode(message.chatItems[i], writer.uint32(18).fork()).ldelim();
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(24).int64(message.updateTime);
        if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
            writer.uint32(32).bool(message.hasMore);
        return writer;
    };

    ChatList.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ChatList();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                if (!(message.chatItems && message.chatItems.length))
                    message.chatItems = [];
                message.chatItems.push($root.ChatItem.decode(reader, reader.uint32()));
                break;
            case 3:
                message.updateTime = reader.int64();
                break;
            case 4:
                message.hasMore = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    ChatList.fromObject = function fromObject(object) {
        if (object instanceof $root.ChatList)
            return object;
        var message = new $root.ChatList();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.chatItems) {
            if (!Array.isArray(object.chatItems))
                throw TypeError(".ChatList.chatItems: array expected");
            message.chatItems = [];
            for (var i = 0; i < object.chatItems.length; ++i) {
                if (typeof object.chatItems[i] !== "object")
                    throw TypeError(".ChatList.chatItems: object expected");
                message.chatItems[i] = $root.ChatItem.fromObject(object.chatItems[i]);
            }
        }
        if (object.updateTime != null)
            if ($util.Long)
                (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false;
            else if (typeof object.updateTime === "string")
                message.updateTime = parseInt(object.updateTime, 10);
            else if (typeof object.updateTime === "number")
                message.updateTime = object.updateTime;
            else if (typeof object.updateTime === "object")
                message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber();
        if (object.hasMore != null)
            message.hasMore = Boolean(object.hasMore);
        return message;
    };

    ChatList.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.chatItems = [];
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.updateTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updateTime = options.longs === String ? "0" : 0;
            object.hasMore = false;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.chatItems && message.chatItems.length) {
            object.chatItems = [];
            for (var j = 0; j < message.chatItems.length; ++j)
                object.chatItems[j] = $root.ChatItem.toObject(message.chatItems[j], options);
        }
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (typeof message.updateTime === "number")
                object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime;
            else
                object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime;
        if (message.hasMore != null && message.hasOwnProperty("hasMore"))
            object.hasMore = message.hasMore;
        return object;
    };

    ChatList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatList;
})();

$root.GetChat = (function() {

    function GetChat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    GetChat.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    GetChat.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    GetChat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(16).int64(message.uid);
        return writer;
    };

    GetChat.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetChat();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.uid = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    GetChat.fromObject = function fromObject(object) {
        if (object instanceof $root.GetChat)
            return object;
        var message = new $root.GetChat();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.uid != null)
            if ($util.Long)
                (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
            else if (typeof object.uid === "string")
                message.uid = parseInt(object.uid, 10);
            else if (typeof object.uid === "number")
                message.uid = object.uid;
            else if (typeof object.uid === "object")
                message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        return message;
    };

    GetChat.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        return object;
    };

    GetChat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetChat;
})();

$root.GetCosKey = (function() {

    function GetCosKey(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    GetCosKey.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    GetCosKey.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        return writer;
    };

    GetCosKey.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetCosKey();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    GetCosKey.fromObject = function fromObject(object) {
        if (object instanceof $root.GetCosKey)
            return object;
        var message = new $root.GetCosKey();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        return message;
    };

    GetCosKey.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        return object;
    };

    GetCosKey.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetCosKey;
})();

$root.CosKey = (function() {

    function CosKey(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    CosKey.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    CosKey.prototype.token = "";
    CosKey.prototype.id = "";
    CosKey.prototype.key = "";
    CosKey.prototype.bucket = "";
    CosKey.prototype.region = "";
    CosKey.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    CosKey.prototype.expTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    CosKey.prototype.path = "";
    CosKey.prototype.pathDemo = "";

    CosKey.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(18).string(message.token);
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(26).string(message.id);
        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
            writer.uint32(34).string(message.key);
        if (message.bucket != null && Object.hasOwnProperty.call(message, "bucket"))
            writer.uint32(42).string(message.bucket);
        if (message.region != null && Object.hasOwnProperty.call(message, "region"))
            writer.uint32(50).string(message.region);
        if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
            writer.uint32(56).int64(message.startTime);
        if (message.expTime != null && Object.hasOwnProperty.call(message, "expTime"))
            writer.uint32(64).int64(message.expTime);
        if (message.path != null && Object.hasOwnProperty.call(message, "path"))
            writer.uint32(74).string(message.path);
        if (message.pathDemo != null && Object.hasOwnProperty.call(message, "pathDemo"))
            writer.uint32(82).string(message.pathDemo);
        return writer;
    };

    CosKey.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.CosKey();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.token = reader.string();
                break;
            case 3:
                message.id = reader.string();
                break;
            case 4:
                message.key = reader.string();
                break;
            case 5:
                message.bucket = reader.string();
                break;
            case 6:
                message.region = reader.string();
                break;
            case 7:
                message.startTime = reader.int64();
                break;
            case 8:
                message.expTime = reader.int64();
                break;
            case 9:
                message.path = reader.string();
                break;
            case 10:
                message.pathDemo = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    CosKey.fromObject = function fromObject(object) {
        if (object instanceof $root.CosKey)
            return object;
        var message = new $root.CosKey();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.token != null)
            message.token = String(object.token);
        if (object.id != null)
            message.id = String(object.id);
        if (object.key != null)
            message.key = String(object.key);
        if (object.bucket != null)
            message.bucket = String(object.bucket);
        if (object.region != null)
            message.region = String(object.region);
        if (object.startTime != null)
            if ($util.Long)
                (message.startTime = $util.Long.fromValue(object.startTime)).unsigned = false;
            else if (typeof object.startTime === "string")
                message.startTime = parseInt(object.startTime, 10);
            else if (typeof object.startTime === "number")
                message.startTime = object.startTime;
            else if (typeof object.startTime === "object")
                message.startTime = new $util.LongBits(object.startTime.low >>> 0, object.startTime.high >>> 0).toNumber();
        if (object.expTime != null)
            if ($util.Long)
                (message.expTime = $util.Long.fromValue(object.expTime)).unsigned = false;
            else if (typeof object.expTime === "string")
                message.expTime = parseInt(object.expTime, 10);
            else if (typeof object.expTime === "number")
                message.expTime = object.expTime;
            else if (typeof object.expTime === "object")
                message.expTime = new $util.LongBits(object.expTime.low >>> 0, object.expTime.high >>> 0).toNumber();
        if (object.path != null)
            message.path = String(object.path);
        if (object.pathDemo != null)
            message.pathDemo = String(object.pathDemo);
        return message;
    };

    CosKey.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            object.token = "";
            object.id = "";
            object.key = "";
            object.bucket = "";
            object.region = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.startTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.startTime = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.expTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.expTime = options.longs === String ? "0" : 0;
            object.path = "";
            object.pathDemo = "";
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.token != null && message.hasOwnProperty("token"))
            object.token = message.token;
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.key != null && message.hasOwnProperty("key"))
            object.key = message.key;
        if (message.bucket != null && message.hasOwnProperty("bucket"))
            object.bucket = message.bucket;
        if (message.region != null && message.hasOwnProperty("region"))
            object.region = message.region;
        if (message.startTime != null && message.hasOwnProperty("startTime"))
            if (typeof message.startTime === "number")
                object.startTime = options.longs === String ? String(message.startTime) : message.startTime;
            else
                object.startTime = options.longs === String ? $util.Long.prototype.toString.call(message.startTime) : options.longs === Number ? new $util.LongBits(message.startTime.low >>> 0, message.startTime.high >>> 0).toNumber() : message.startTime;
        if (message.expTime != null && message.hasOwnProperty("expTime"))
            if (typeof message.expTime === "number")
                object.expTime = options.longs === String ? String(message.expTime) : message.expTime;
            else
                object.expTime = options.longs === String ? $util.Long.prototype.toString.call(message.expTime) : options.longs === Number ? new $util.LongBits(message.expTime.low >>> 0, message.expTime.high >>> 0).toNumber() : message.expTime;
        if (message.path != null && message.hasOwnProperty("path"))
            object.path = message.path;
        if (message.pathDemo != null && message.hasOwnProperty("pathDemo"))
            object.pathDemo = message.pathDemo;
        return object;
    };

    CosKey.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CosKey;
})();

$root.UpdatePushToken = (function() {

    function UpdatePushToken(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    UpdatePushToken.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    UpdatePushToken.prototype.pushChannel = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    UpdatePushToken.prototype.pushToken = "";

    UpdatePushToken.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(8).int64(message.sign);
        if (message.pushChannel != null && Object.hasOwnProperty.call(message, "pushChannel"))
            writer.uint32(16).int64(message.pushChannel);
        if (message.pushToken != null && Object.hasOwnProperty.call(message, "pushToken"))
            writer.uint32(26).string(message.pushToken);
        return writer;
    };

    UpdatePushToken.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UpdatePushToken();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.pushChannel = reader.int64();
                break;
            case 3:
                message.pushToken = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    UpdatePushToken.fromObject = function fromObject(object) {
        if (object instanceof $root.UpdatePushToken)
            return object;
        var message = new $root.UpdatePushToken();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.pushChannel != null)
            if ($util.Long)
                (message.pushChannel = $util.Long.fromValue(object.pushChannel)).unsigned = false;
            else if (typeof object.pushChannel === "string")
                message.pushChannel = parseInt(object.pushChannel, 10);
            else if (typeof object.pushChannel === "number")
                message.pushChannel = object.pushChannel;
            else if (typeof object.pushChannel === "object")
                message.pushChannel = new $util.LongBits(object.pushChannel.low >>> 0, object.pushChannel.high >>> 0).toNumber();
        if (object.pushToken != null)
            message.pushToken = String(object.pushToken);
        return message;
    };

    UpdatePushToken.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.sign = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.sign = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.pushChannel = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.pushChannel = options.longs === String ? "0" : 0;
            object.pushToken = "";
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.pushChannel != null && message.hasOwnProperty("pushChannel"))
            if (typeof message.pushChannel === "number")
                object.pushChannel = options.longs === String ? String(message.pushChannel) : message.pushChannel;
            else
                object.pushChannel = options.longs === String ? $util.Long.prototype.toString.call(message.pushChannel) : options.longs === Number ? new $util.LongBits(message.pushChannel.low >>> 0, message.pushChannel.high >>> 0).toNumber() : message.pushChannel;
        if (message.pushToken != null && message.hasOwnProperty("pushToken"))
            object.pushToken = message.pushToken;
        return object;
    };

    UpdatePushToken.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpdatePushToken;
})();

module.exports = $root;
