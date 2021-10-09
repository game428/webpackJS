/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Ping = (function() {

    /**
     * Properties of a Ping.
     * @exports IPing
     * @interface IPing
     * @property {number|Long|null} [type] Ping type
     */

    /**
     * Constructs a new Ping.
     * @exports Ping
     * @classdesc Represents a Ping.
     * @implements IPing
     * @constructor
     * @param {IPing=} [properties] Properties to set
     */
    function Ping(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Ping type.
     * @member {number|Long} type
     * @memberof Ping
     * @instance
     */
    Ping.prototype.type = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Ping instance using the specified properties.
     * @function create
     * @memberof Ping
     * @static
     * @param {IPing=} [properties] Properties to set
     * @returns {Ping} Ping instance
     */
    Ping.create = function create(properties) {
        return new Ping(properties);
    };

    /**
     * Encodes the specified Ping message. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encode
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.type);
        return writer;
    };

    /**
     * Encodes the specified Ping message, length delimited. Does not implicitly {@link Ping.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Ping
     * @static
     * @param {IPing} message Ping message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Ping.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Ping message from the specified reader or buffer.
     * @function decode
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a Ping message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Ping
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Ping} Ping
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Ping.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Ping message.
     * @function verify
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Ping.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type) && !(message.type && $util.isInteger(message.type.low) && $util.isInteger(message.type.high)))
                return "type: integer|Long expected";
        return null;
    };

    /**
     * Creates a Ping message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Ping
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Ping} Ping
     */
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

    /**
     * Creates a plain object from a Ping message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Ping
     * @static
     * @param {Ping} message Ping
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this Ping to JSON.
     * @function toJSON
     * @memberof Ping
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Ping.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Ping;
})();

$root.ImLogin = (function() {

    /**
     * Properties of an ImLogin.
     * @exports IImLogin
     * @interface IImLogin
     * @property {number|Long|null} [sign] ImLogin sign
     * @property {string|null} [token] ImLogin token
     * @property {number|Long|null} [ct] ImLogin ct
     * @property {number|Long|null} [subApp] ImLogin subApp
     * @property {number|Long|null} [pushChannel] ImLogin pushChannel
     * @property {string|null} [pushToken] ImLogin pushToken
     * @property {string|null} [lastToken] ImLogin lastToken
     */

    /**
     * Constructs a new ImLogin.
     * @exports ImLogin
     * @classdesc Represents an ImLogin.
     * @implements IImLogin
     * @constructor
     * @param {IImLogin=} [properties] Properties to set
     */
    function ImLogin(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImLogin sign.
     * @member {number|Long} sign
     * @memberof ImLogin
     * @instance
     */
    ImLogin.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ImLogin token.
     * @member {string} token
     * @memberof ImLogin
     * @instance
     */
    ImLogin.prototype.token = "";

    /**
     * ImLogin ct.
     * @member {number|Long} ct
     * @memberof ImLogin
     * @instance
     */
    ImLogin.prototype.ct = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ImLogin subApp.
     * @member {number|Long} subApp
     * @memberof ImLogin
     * @instance
     */
    ImLogin.prototype.subApp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ImLogin pushChannel.
     * @member {number|Long} pushChannel
     * @memberof ImLogin
     * @instance
     */
    ImLogin.prototype.pushChannel = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ImLogin pushToken.
     * @member {string} pushToken
     * @memberof ImLogin
     * @instance
     */
    ImLogin.prototype.pushToken = "";

    /**
     * ImLogin lastToken.
     * @member {string} lastToken
     * @memberof ImLogin
     * @instance
     */
    ImLogin.prototype.lastToken = "";

    /**
     * Creates a new ImLogin instance using the specified properties.
     * @function create
     * @memberof ImLogin
     * @static
     * @param {IImLogin=} [properties] Properties to set
     * @returns {ImLogin} ImLogin instance
     */
    ImLogin.create = function create(properties) {
        return new ImLogin(properties);
    };

    /**
     * Encodes the specified ImLogin message. Does not implicitly {@link ImLogin.verify|verify} messages.
     * @function encode
     * @memberof ImLogin
     * @static
     * @param {IImLogin} message ImLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImLogin.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
        if (message.ct != null && Object.hasOwnProperty.call(message, "ct"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.ct);
        if (message.subApp != null && Object.hasOwnProperty.call(message, "subApp"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.subApp);
        if (message.pushChannel != null && Object.hasOwnProperty.call(message, "pushChannel"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.pushChannel);
        if (message.pushToken != null && Object.hasOwnProperty.call(message, "pushToken"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.pushToken);
        if (message.lastToken != null && Object.hasOwnProperty.call(message, "lastToken"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.lastToken);
        return writer;
    };

    /**
     * Encodes the specified ImLogin message, length delimited. Does not implicitly {@link ImLogin.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImLogin
     * @static
     * @param {IImLogin} message ImLogin message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImLogin.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImLogin message from the specified reader or buffer.
     * @function decode
     * @memberof ImLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImLogin} ImLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes an ImLogin message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImLogin
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImLogin} ImLogin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImLogin.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImLogin message.
     * @function verify
     * @memberof ImLogin
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImLogin.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.token != null && message.hasOwnProperty("token"))
            if (!$util.isString(message.token))
                return "token: string expected";
        if (message.ct != null && message.hasOwnProperty("ct"))
            if (!$util.isInteger(message.ct) && !(message.ct && $util.isInteger(message.ct.low) && $util.isInteger(message.ct.high)))
                return "ct: integer|Long expected";
        if (message.subApp != null && message.hasOwnProperty("subApp"))
            if (!$util.isInteger(message.subApp) && !(message.subApp && $util.isInteger(message.subApp.low) && $util.isInteger(message.subApp.high)))
                return "subApp: integer|Long expected";
        if (message.pushChannel != null && message.hasOwnProperty("pushChannel"))
            if (!$util.isInteger(message.pushChannel) && !(message.pushChannel && $util.isInteger(message.pushChannel.low) && $util.isInteger(message.pushChannel.high)))
                return "pushChannel: integer|Long expected";
        if (message.pushToken != null && message.hasOwnProperty("pushToken"))
            if (!$util.isString(message.pushToken))
                return "pushToken: string expected";
        if (message.lastToken != null && message.hasOwnProperty("lastToken"))
            if (!$util.isString(message.lastToken))
                return "lastToken: string expected";
        return null;
    };

    /**
     * Creates an ImLogin message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImLogin
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImLogin} ImLogin
     */
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

    /**
     * Creates a plain object from an ImLogin message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImLogin
     * @static
     * @param {ImLogin} message ImLogin
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ImLogin to JSON.
     * @function toJSON
     * @memberof ImLogin
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImLogin.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImLogin;
})();

$root.ImLogout = (function() {

    /**
     * Properties of an ImLogout.
     * @exports IImLogout
     * @interface IImLogout
     * @property {number|Long|null} [sign] ImLogout sign
     */

    /**
     * Constructs a new ImLogout.
     * @exports ImLogout
     * @classdesc Represents an ImLogout.
     * @implements IImLogout
     * @constructor
     * @param {IImLogout=} [properties] Properties to set
     */
    function ImLogout(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ImLogout sign.
     * @member {number|Long} sign
     * @memberof ImLogout
     * @instance
     */
    ImLogout.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new ImLogout instance using the specified properties.
     * @function create
     * @memberof ImLogout
     * @static
     * @param {IImLogout=} [properties] Properties to set
     * @returns {ImLogout} ImLogout instance
     */
    ImLogout.create = function create(properties) {
        return new ImLogout(properties);
    };

    /**
     * Encodes the specified ImLogout message. Does not implicitly {@link ImLogout.verify|verify} messages.
     * @function encode
     * @memberof ImLogout
     * @static
     * @param {IImLogout} message ImLogout message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImLogout.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        return writer;
    };

    /**
     * Encodes the specified ImLogout message, length delimited. Does not implicitly {@link ImLogout.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ImLogout
     * @static
     * @param {IImLogout} message ImLogout message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ImLogout.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an ImLogout message from the specified reader or buffer.
     * @function decode
     * @memberof ImLogout
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ImLogout} ImLogout
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes an ImLogout message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ImLogout
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ImLogout} ImLogout
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ImLogout.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an ImLogout message.
     * @function verify
     * @memberof ImLogout
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ImLogout.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        return null;
    };

    /**
     * Creates an ImLogout message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ImLogout
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ImLogout} ImLogout
     */
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

    /**
     * Creates a plain object from an ImLogout message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ImLogout
     * @static
     * @param {ImLogout} message ImLogout
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ImLogout to JSON.
     * @function toJSON
     * @memberof ImLogout
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ImLogout.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ImLogout;
})();

$root.Result = (function() {

    /**
     * Properties of a Result.
     * @exports IResult
     * @interface IResult
     * @property {number|Long|null} [sign] Result sign
     * @property {number|Long|null} [code] Result code
     * @property {string|null} [msg] Result msg
     * @property {number|Long|null} [nowTime] Result nowTime
     * @property {number|Long|null} [uid] Result uid
     */

    /**
     * Constructs a new Result.
     * @exports Result
     * @classdesc Represents a Result.
     * @implements IResult
     * @constructor
     * @param {IResult=} [properties] Properties to set
     */
    function Result(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Result sign.
     * @member {number|Long} sign
     * @memberof Result
     * @instance
     */
    Result.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Result code.
     * @member {number|Long} code
     * @memberof Result
     * @instance
     */
    Result.prototype.code = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Result msg.
     * @member {string} msg
     * @memberof Result
     * @instance
     */
    Result.prototype.msg = "";

    /**
     * Result nowTime.
     * @member {number|Long} nowTime
     * @memberof Result
     * @instance
     */
    Result.prototype.nowTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Result uid.
     * @member {number|Long} uid
     * @memberof Result
     * @instance
     */
    Result.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Result instance using the specified properties.
     * @function create
     * @memberof Result
     * @static
     * @param {IResult=} [properties] Properties to set
     * @returns {Result} Result instance
     */
    Result.create = function create(properties) {
        return new Result(properties);
    };

    /**
     * Encodes the specified Result message. Does not implicitly {@link Result.verify|verify} messages.
     * @function encode
     * @memberof Result
     * @static
     * @param {IResult} message Result message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Result.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.code);
        if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.msg);
        if (message.nowTime != null && Object.hasOwnProperty.call(message, "nowTime"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.nowTime);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.uid);
        return writer;
    };

    /**
     * Encodes the specified Result message, length delimited. Does not implicitly {@link Result.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Result
     * @static
     * @param {IResult} message Result message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Result.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Result message from the specified reader or buffer.
     * @function decode
     * @memberof Result
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Result} Result
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a Result message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Result
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Result} Result
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Result.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Result message.
     * @function verify
     * @memberof Result
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Result.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.code != null && message.hasOwnProperty("code"))
            if (!$util.isInteger(message.code) && !(message.code && $util.isInteger(message.code.low) && $util.isInteger(message.code.high)))
                return "code: integer|Long expected";
        if (message.msg != null && message.hasOwnProperty("msg"))
            if (!$util.isString(message.msg))
                return "msg: string expected";
        if (message.nowTime != null && message.hasOwnProperty("nowTime"))
            if (!$util.isInteger(message.nowTime) && !(message.nowTime && $util.isInteger(message.nowTime.low) && $util.isInteger(message.nowTime.high)))
                return "nowTime: integer|Long expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        return null;
    };

    /**
     * Creates a Result message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Result
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Result} Result
     */
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

    /**
     * Creates a plain object from a Result message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Result
     * @static
     * @param {Result} message Result
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this Result to JSON.
     * @function toJSON
     * @memberof Result
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Result.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Result;
})();

$root.ChatS = (function() {

    /**
     * Properties of a ChatS.
     * @exports IChatS
     * @interface IChatS
     * @property {number|Long|null} [sign] ChatS sign
     * @property {number|Long|null} [type] ChatS type
     * @property {number|Long|null} [toUid] ChatS toUid
     * @property {string|null} [title] ChatS title
     * @property {string|null} [body] ChatS body
     * @property {string|null} [thumb] ChatS thumb
     * @property {number|Long|null} [width] ChatS width
     * @property {number|Long|null} [height] ChatS height
     * @property {number|Long|null} [duration] ChatS duration
     * @property {number|null} [lat] ChatS lat
     * @property {number|null} [lng] ChatS lng
     * @property {number|Long|null} [zoom] ChatS zoom
     * @property {string|null} [accId] ChatS accId
     * @property {string|null} [pushTitle] ChatS pushTitle
     * @property {string|null} [pushBody] ChatS pushBody
     * @property {string|null} [pushSound] ChatS pushSound
     */

    /**
     * Constructs a new ChatS.
     * @exports ChatS
     * @classdesc Represents a ChatS.
     * @implements IChatS
     * @constructor
     * @param {IChatS=} [properties] Properties to set
     */
    function ChatS(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatS sign.
     * @member {number|Long} sign
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatS type.
     * @member {number|Long} type
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.type = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatS toUid.
     * @member {number|Long} toUid
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatS title.
     * @member {string} title
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.title = "";

    /**
     * ChatS body.
     * @member {string} body
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.body = "";

    /**
     * ChatS thumb.
     * @member {string} thumb
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.thumb = "";

    /**
     * ChatS width.
     * @member {number|Long} width
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.width = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatS height.
     * @member {number|Long} height
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatS duration.
     * @member {number|Long} duration
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.duration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatS lat.
     * @member {number} lat
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.lat = 0;

    /**
     * ChatS lng.
     * @member {number} lng
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.lng = 0;

    /**
     * ChatS zoom.
     * @member {number|Long} zoom
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.zoom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatS accId.
     * @member {string} accId
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.accId = "";

    /**
     * ChatS pushTitle.
     * @member {string} pushTitle
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.pushTitle = "";

    /**
     * ChatS pushBody.
     * @member {string} pushBody
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.pushBody = "";

    /**
     * ChatS pushSound.
     * @member {string} pushSound
     * @memberof ChatS
     * @instance
     */
    ChatS.prototype.pushSound = "";

    /**
     * Creates a new ChatS instance using the specified properties.
     * @function create
     * @memberof ChatS
     * @static
     * @param {IChatS=} [properties] Properties to set
     * @returns {ChatS} ChatS instance
     */
    ChatS.create = function create(properties) {
        return new ChatS(properties);
    };

    /**
     * Encodes the specified ChatS message. Does not implicitly {@link ChatS.verify|verify} messages.
     * @function encode
     * @memberof ChatS
     * @static
     * @param {IChatS} message ChatS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatS.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.type);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.toUid);
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.title);
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.body);
        if (message.thumb != null && Object.hasOwnProperty.call(message, "thumb"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.thumb);
        if (message.width != null && Object.hasOwnProperty.call(message, "width"))
            writer.uint32(/* id 7, wireType 0 =*/56).int64(message.width);
        if (message.height != null && Object.hasOwnProperty.call(message, "height"))
            writer.uint32(/* id 8, wireType 0 =*/64).int64(message.height);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(/* id 9, wireType 0 =*/72).int64(message.duration);
        if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
            writer.uint32(/* id 10, wireType 1 =*/81).double(message.lat);
        if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
            writer.uint32(/* id 11, wireType 1 =*/89).double(message.lng);
        if (message.zoom != null && Object.hasOwnProperty.call(message, "zoom"))
            writer.uint32(/* id 12, wireType 0 =*/96).int64(message.zoom);
        if (message.accId != null && Object.hasOwnProperty.call(message, "accId"))
            writer.uint32(/* id 13, wireType 2 =*/106).string(message.accId);
        if (message.pushTitle != null && Object.hasOwnProperty.call(message, "pushTitle"))
            writer.uint32(/* id 14, wireType 2 =*/114).string(message.pushTitle);
        if (message.pushBody != null && Object.hasOwnProperty.call(message, "pushBody"))
            writer.uint32(/* id 15, wireType 2 =*/122).string(message.pushBody);
        if (message.pushSound != null && Object.hasOwnProperty.call(message, "pushSound"))
            writer.uint32(/* id 16, wireType 2 =*/130).string(message.pushSound);
        return writer;
    };

    /**
     * Encodes the specified ChatS message, length delimited. Does not implicitly {@link ChatS.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatS
     * @static
     * @param {IChatS} message ChatS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatS.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatS message from the specified reader or buffer.
     * @function decode
     * @memberof ChatS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatS} ChatS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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
                message.accId = reader.string();
                break;
            case 14:
                message.pushTitle = reader.string();
                break;
            case 15:
                message.pushBody = reader.string();
                break;
            case 16:
                message.pushSound = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ChatS message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatS} ChatS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatS.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatS message.
     * @function verify
     * @memberof ChatS
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatS.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type) && !(message.type && $util.isInteger(message.type.low) && $util.isInteger(message.type.high)))
                return "type: integer|Long expected";
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (!$util.isInteger(message.toUid) && !(message.toUid && $util.isInteger(message.toUid.low) && $util.isInteger(message.toUid.high)))
                return "toUid: integer|Long expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.body != null && message.hasOwnProperty("body"))
            if (!$util.isString(message.body))
                return "body: string expected";
        if (message.thumb != null && message.hasOwnProperty("thumb"))
            if (!$util.isString(message.thumb))
                return "thumb: string expected";
        if (message.width != null && message.hasOwnProperty("width"))
            if (!$util.isInteger(message.width) && !(message.width && $util.isInteger(message.width.low) && $util.isInteger(message.width.high)))
                return "width: integer|Long expected";
        if (message.height != null && message.hasOwnProperty("height"))
            if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                return "height: integer|Long expected";
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (!$util.isInteger(message.duration) && !(message.duration && $util.isInteger(message.duration.low) && $util.isInteger(message.duration.high)))
                return "duration: integer|Long expected";
        if (message.lat != null && message.hasOwnProperty("lat"))
            if (typeof message.lat !== "number")
                return "lat: number expected";
        if (message.lng != null && message.hasOwnProperty("lng"))
            if (typeof message.lng !== "number")
                return "lng: number expected";
        if (message.zoom != null && message.hasOwnProperty("zoom"))
            if (!$util.isInteger(message.zoom) && !(message.zoom && $util.isInteger(message.zoom.low) && $util.isInteger(message.zoom.high)))
                return "zoom: integer|Long expected";
        if (message.accId != null && message.hasOwnProperty("accId"))
            if (!$util.isString(message.accId))
                return "accId: string expected";
        if (message.pushTitle != null && message.hasOwnProperty("pushTitle"))
            if (!$util.isString(message.pushTitle))
                return "pushTitle: string expected";
        if (message.pushBody != null && message.hasOwnProperty("pushBody"))
            if (!$util.isString(message.pushBody))
                return "pushBody: string expected";
        if (message.pushSound != null && message.hasOwnProperty("pushSound"))
            if (!$util.isString(message.pushSound))
                return "pushSound: string expected";
        return null;
    };

    /**
     * Creates a ChatS message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatS
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatS} ChatS
     */
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
        if (object.accId != null)
            message.accId = String(object.accId);
        if (object.pushTitle != null)
            message.pushTitle = String(object.pushTitle);
        if (object.pushBody != null)
            message.pushBody = String(object.pushBody);
        if (object.pushSound != null)
            message.pushSound = String(object.pushSound);
        return message;
    };

    /**
     * Creates a plain object from a ChatS message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatS
     * @static
     * @param {ChatS} message ChatS
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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
            object.accId = "";
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
        if (message.accId != null && message.hasOwnProperty("accId"))
            object.accId = message.accId;
        if (message.pushTitle != null && message.hasOwnProperty("pushTitle"))
            object.pushTitle = message.pushTitle;
        if (message.pushBody != null && message.hasOwnProperty("pushBody"))
            object.pushBody = message.pushBody;
        if (message.pushSound != null && message.hasOwnProperty("pushSound"))
            object.pushSound = message.pushSound;
        return object;
    };

    /**
     * Converts this ChatS to JSON.
     * @function toJSON
     * @memberof ChatS
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatS.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatS;
})();

$root.ChatSR = (function() {

    /**
     * Properties of a ChatSR.
     * @exports IChatSR
     * @interface IChatSR
     * @property {number|Long|null} [sign] ChatSR sign
     * @property {number|Long|null} [msgId] ChatSR msgId
     * @property {number|Long|null} [msgTime] ChatSR msgTime
     */

    /**
     * Constructs a new ChatSR.
     * @exports ChatSR
     * @classdesc Represents a ChatSR.
     * @implements IChatSR
     * @constructor
     * @param {IChatSR=} [properties] Properties to set
     */
    function ChatSR(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatSR sign.
     * @member {number|Long} sign
     * @memberof ChatSR
     * @instance
     */
    ChatSR.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatSR msgId.
     * @member {number|Long} msgId
     * @memberof ChatSR
     * @instance
     */
    ChatSR.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatSR msgTime.
     * @member {number|Long} msgTime
     * @memberof ChatSR
     * @instance
     */
    ChatSR.prototype.msgTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new ChatSR instance using the specified properties.
     * @function create
     * @memberof ChatSR
     * @static
     * @param {IChatSR=} [properties] Properties to set
     * @returns {ChatSR} ChatSR instance
     */
    ChatSR.create = function create(properties) {
        return new ChatSR(properties);
    };

    /**
     * Encodes the specified ChatSR message. Does not implicitly {@link ChatSR.verify|verify} messages.
     * @function encode
     * @memberof ChatSR
     * @static
     * @param {IChatSR} message ChatSR message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatSR.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.msgId);
        if (message.msgTime != null && Object.hasOwnProperty.call(message, "msgTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.msgTime);
        return writer;
    };

    /**
     * Encodes the specified ChatSR message, length delimited. Does not implicitly {@link ChatSR.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatSR
     * @static
     * @param {IChatSR} message ChatSR message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatSR.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatSR message from the specified reader or buffer.
     * @function decode
     * @memberof ChatSR
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatSR} ChatSR
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a ChatSR message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatSR
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatSR} ChatSR
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatSR.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatSR message.
     * @function verify
     * @memberof ChatSR
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatSR.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (!$util.isInteger(message.msgId) && !(message.msgId && $util.isInteger(message.msgId.low) && $util.isInteger(message.msgId.high)))
                return "msgId: integer|Long expected";
        if (message.msgTime != null && message.hasOwnProperty("msgTime"))
            if (!$util.isInteger(message.msgTime) && !(message.msgTime && $util.isInteger(message.msgTime.low) && $util.isInteger(message.msgTime.high)))
                return "msgTime: integer|Long expected";
        return null;
    };

    /**
     * Creates a ChatSR message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatSR
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatSR} ChatSR
     */
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

    /**
     * Creates a plain object from a ChatSR message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatSR
     * @static
     * @param {ChatSR} message ChatSR
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ChatSR to JSON.
     * @function toJSON
     * @memberof ChatSR
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatSR.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatSR;
})();

$root.ChatR = (function() {

    /**
     * Properties of a ChatR.
     * @exports IChatR
     * @interface IChatR
     * @property {number|Long|null} [sign] ChatR sign
     * @property {number|Long|null} [fromUid] ChatR fromUid
     * @property {number|Long|null} [toUid] ChatR toUid
     * @property {number|Long|null} [msgId] ChatR msgId
     * @property {number|Long|null} [msgTime] ChatR msgTime
     * @property {number|Long|null} [sput] ChatR sput
     * @property {boolean|null} [newMsg] ChatR newMsg
     * @property {number|Long|null} [type] ChatR type
     * @property {string|null} [title] ChatR title
     * @property {string|null} [body] ChatR body
     * @property {string|null} [thumb] ChatR thumb
     * @property {number|Long|null} [width] ChatR width
     * @property {number|Long|null} [height] ChatR height
     * @property {number|Long|null} [duration] ChatR duration
     * @property {number|null} [lat] ChatR lat
     * @property {number|null} [lng] ChatR lng
     * @property {number|Long|null} [zoom] ChatR zoom
     * @property {string|null} [pushTitle] ChatR pushTitle
     * @property {string|null} [pushBody] ChatR pushBody
     * @property {string|null} [pushSound] ChatR pushSound
     */

    /**
     * Constructs a new ChatR.
     * @exports ChatR
     * @classdesc Represents a ChatR.
     * @implements IChatR
     * @constructor
     * @param {IChatR=} [properties] Properties to set
     */
    function ChatR(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatR sign.
     * @member {number|Long} sign
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR fromUid.
     * @member {number|Long} fromUid
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.fromUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR toUid.
     * @member {number|Long} toUid
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR msgId.
     * @member {number|Long} msgId
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR msgTime.
     * @member {number|Long} msgTime
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.msgTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR sput.
     * @member {number|Long} sput
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.sput = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR newMsg.
     * @member {boolean} newMsg
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.newMsg = false;

    /**
     * ChatR type.
     * @member {number|Long} type
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.type = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR title.
     * @member {string} title
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.title = "";

    /**
     * ChatR body.
     * @member {string} body
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.body = "";

    /**
     * ChatR thumb.
     * @member {string} thumb
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.thumb = "";

    /**
     * ChatR width.
     * @member {number|Long} width
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.width = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR height.
     * @member {number|Long} height
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR duration.
     * @member {number|Long} duration
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.duration = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR lat.
     * @member {number} lat
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.lat = 0;

    /**
     * ChatR lng.
     * @member {number} lng
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.lng = 0;

    /**
     * ChatR zoom.
     * @member {number|Long} zoom
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.zoom = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatR pushTitle.
     * @member {string} pushTitle
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.pushTitle = "";

    /**
     * ChatR pushBody.
     * @member {string} pushBody
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.pushBody = "";

    /**
     * ChatR pushSound.
     * @member {string} pushSound
     * @memberof ChatR
     * @instance
     */
    ChatR.prototype.pushSound = "";

    /**
     * Creates a new ChatR instance using the specified properties.
     * @function create
     * @memberof ChatR
     * @static
     * @param {IChatR=} [properties] Properties to set
     * @returns {ChatR} ChatR instance
     */
    ChatR.create = function create(properties) {
        return new ChatR(properties);
    };

    /**
     * Encodes the specified ChatR message. Does not implicitly {@link ChatR.verify|verify} messages.
     * @function encode
     * @memberof ChatR
     * @static
     * @param {IChatR} message ChatR message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatR.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.fromUid != null && Object.hasOwnProperty.call(message, "fromUid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.fromUid);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.toUid);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.msgId);
        if (message.msgTime != null && Object.hasOwnProperty.call(message, "msgTime"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.msgTime);
        if (message.sput != null && Object.hasOwnProperty.call(message, "sput"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.sput);
        if (message.newMsg != null && Object.hasOwnProperty.call(message, "newMsg"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.newMsg);
        if (message.type != null && Object.hasOwnProperty.call(message, "type"))
            writer.uint32(/* id 8, wireType 0 =*/64).int64(message.type);
        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.title);
        if (message.body != null && Object.hasOwnProperty.call(message, "body"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.body);
        if (message.thumb != null && Object.hasOwnProperty.call(message, "thumb"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.thumb);
        if (message.width != null && Object.hasOwnProperty.call(message, "width"))
            writer.uint32(/* id 12, wireType 0 =*/96).int64(message.width);
        if (message.height != null && Object.hasOwnProperty.call(message, "height"))
            writer.uint32(/* id 13, wireType 0 =*/104).int64(message.height);
        if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
            writer.uint32(/* id 14, wireType 0 =*/112).int64(message.duration);
        if (message.lat != null && Object.hasOwnProperty.call(message, "lat"))
            writer.uint32(/* id 15, wireType 1 =*/121).double(message.lat);
        if (message.lng != null && Object.hasOwnProperty.call(message, "lng"))
            writer.uint32(/* id 16, wireType 1 =*/129).double(message.lng);
        if (message.zoom != null && Object.hasOwnProperty.call(message, "zoom"))
            writer.uint32(/* id 17, wireType 0 =*/136).int64(message.zoom);
        if (message.pushTitle != null && Object.hasOwnProperty.call(message, "pushTitle"))
            writer.uint32(/* id 18, wireType 2 =*/146).string(message.pushTitle);
        if (message.pushBody != null && Object.hasOwnProperty.call(message, "pushBody"))
            writer.uint32(/* id 19, wireType 2 =*/154).string(message.pushBody);
        if (message.pushSound != null && Object.hasOwnProperty.call(message, "pushSound"))
            writer.uint32(/* id 20, wireType 2 =*/162).string(message.pushSound);
        return writer;
    };

    /**
     * Encodes the specified ChatR message, length delimited. Does not implicitly {@link ChatR.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatR
     * @static
     * @param {IChatR} message ChatR message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatR.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatR message from the specified reader or buffer.
     * @function decode
     * @memberof ChatR
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatR} ChatR
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a ChatR message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatR
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatR} ChatR
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatR.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatR message.
     * @function verify
     * @memberof ChatR
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatR.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.fromUid != null && message.hasOwnProperty("fromUid"))
            if (!$util.isInteger(message.fromUid) && !(message.fromUid && $util.isInteger(message.fromUid.low) && $util.isInteger(message.fromUid.high)))
                return "fromUid: integer|Long expected";
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (!$util.isInteger(message.toUid) && !(message.toUid && $util.isInteger(message.toUid.low) && $util.isInteger(message.toUid.high)))
                return "toUid: integer|Long expected";
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (!$util.isInteger(message.msgId) && !(message.msgId && $util.isInteger(message.msgId.low) && $util.isInteger(message.msgId.high)))
                return "msgId: integer|Long expected";
        if (message.msgTime != null && message.hasOwnProperty("msgTime"))
            if (!$util.isInteger(message.msgTime) && !(message.msgTime && $util.isInteger(message.msgTime.low) && $util.isInteger(message.msgTime.high)))
                return "msgTime: integer|Long expected";
        if (message.sput != null && message.hasOwnProperty("sput"))
            if (!$util.isInteger(message.sput) && !(message.sput && $util.isInteger(message.sput.low) && $util.isInteger(message.sput.high)))
                return "sput: integer|Long expected";
        if (message.newMsg != null && message.hasOwnProperty("newMsg"))
            if (typeof message.newMsg !== "boolean")
                return "newMsg: boolean expected";
        if (message.type != null && message.hasOwnProperty("type"))
            if (!$util.isInteger(message.type) && !(message.type && $util.isInteger(message.type.low) && $util.isInteger(message.type.high)))
                return "type: integer|Long expected";
        if (message.title != null && message.hasOwnProperty("title"))
            if (!$util.isString(message.title))
                return "title: string expected";
        if (message.body != null && message.hasOwnProperty("body"))
            if (!$util.isString(message.body))
                return "body: string expected";
        if (message.thumb != null && message.hasOwnProperty("thumb"))
            if (!$util.isString(message.thumb))
                return "thumb: string expected";
        if (message.width != null && message.hasOwnProperty("width"))
            if (!$util.isInteger(message.width) && !(message.width && $util.isInteger(message.width.low) && $util.isInteger(message.width.high)))
                return "width: integer|Long expected";
        if (message.height != null && message.hasOwnProperty("height"))
            if (!$util.isInteger(message.height) && !(message.height && $util.isInteger(message.height.low) && $util.isInteger(message.height.high)))
                return "height: integer|Long expected";
        if (message.duration != null && message.hasOwnProperty("duration"))
            if (!$util.isInteger(message.duration) && !(message.duration && $util.isInteger(message.duration.low) && $util.isInteger(message.duration.high)))
                return "duration: integer|Long expected";
        if (message.lat != null && message.hasOwnProperty("lat"))
            if (typeof message.lat !== "number")
                return "lat: number expected";
        if (message.lng != null && message.hasOwnProperty("lng"))
            if (typeof message.lng !== "number")
                return "lng: number expected";
        if (message.zoom != null && message.hasOwnProperty("zoom"))
            if (!$util.isInteger(message.zoom) && !(message.zoom && $util.isInteger(message.zoom.low) && $util.isInteger(message.zoom.high)))
                return "zoom: integer|Long expected";
        if (message.pushTitle != null && message.hasOwnProperty("pushTitle"))
            if (!$util.isString(message.pushTitle))
                return "pushTitle: string expected";
        if (message.pushBody != null && message.hasOwnProperty("pushBody"))
            if (!$util.isString(message.pushBody))
                return "pushBody: string expected";
        if (message.pushSound != null && message.hasOwnProperty("pushSound"))
            if (!$util.isString(message.pushSound))
                return "pushSound: string expected";
        return null;
    };

    /**
     * Creates a ChatR message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatR
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatR} ChatR
     */
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

    /**
     * Creates a plain object from a ChatR message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatR
     * @static
     * @param {ChatR} message ChatR
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ChatR to JSON.
     * @function toJSON
     * @memberof ChatR
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatR.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatR;
})();

$root.ChatRBatch = (function() {

    /**
     * Properties of a ChatRBatch.
     * @exports IChatRBatch
     * @interface IChatRBatch
     * @property {number|Long|null} [sign] ChatRBatch sign
     * @property {Array.<IChatR>|null} [msgs] ChatRBatch msgs
     */

    /**
     * Constructs a new ChatRBatch.
     * @exports ChatRBatch
     * @classdesc Represents a ChatRBatch.
     * @implements IChatRBatch
     * @constructor
     * @param {IChatRBatch=} [properties] Properties to set
     */
    function ChatRBatch(properties) {
        this.msgs = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatRBatch sign.
     * @member {number|Long} sign
     * @memberof ChatRBatch
     * @instance
     */
    ChatRBatch.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatRBatch msgs.
     * @member {Array.<IChatR>} msgs
     * @memberof ChatRBatch
     * @instance
     */
    ChatRBatch.prototype.msgs = $util.emptyArray;

    /**
     * Creates a new ChatRBatch instance using the specified properties.
     * @function create
     * @memberof ChatRBatch
     * @static
     * @param {IChatRBatch=} [properties] Properties to set
     * @returns {ChatRBatch} ChatRBatch instance
     */
    ChatRBatch.create = function create(properties) {
        return new ChatRBatch(properties);
    };

    /**
     * Encodes the specified ChatRBatch message. Does not implicitly {@link ChatRBatch.verify|verify} messages.
     * @function encode
     * @memberof ChatRBatch
     * @static
     * @param {IChatRBatch} message ChatRBatch message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatRBatch.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.msgs != null && message.msgs.length)
            for (var i = 0; i < message.msgs.length; ++i)
                $root.ChatR.encode(message.msgs[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ChatRBatch message, length delimited. Does not implicitly {@link ChatRBatch.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatRBatch
     * @static
     * @param {IChatRBatch} message ChatRBatch message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatRBatch.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatRBatch message from the specified reader or buffer.
     * @function decode
     * @memberof ChatRBatch
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatRBatch} ChatRBatch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a ChatRBatch message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatRBatch
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatRBatch} ChatRBatch
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatRBatch.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatRBatch message.
     * @function verify
     * @memberof ChatRBatch
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatRBatch.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.msgs != null && message.hasOwnProperty("msgs")) {
            if (!Array.isArray(message.msgs))
                return "msgs: array expected";
            for (var i = 0; i < message.msgs.length; ++i) {
                var error = $root.ChatR.verify(message.msgs[i]);
                if (error)
                    return "msgs." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ChatRBatch message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatRBatch
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatRBatch} ChatRBatch
     */
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

    /**
     * Creates a plain object from a ChatRBatch message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatRBatch
     * @static
     * @param {ChatRBatch} message ChatRBatch
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ChatRBatch to JSON.
     * @function toJSON
     * @memberof ChatRBatch
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatRBatch.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatRBatch;
})();

$root.GetHistory = (function() {

    /**
     * Properties of a GetHistory.
     * @exports IGetHistory
     * @interface IGetHistory
     * @property {number|Long|null} [sign] GetHistory sign
     * @property {number|Long|null} [toUid] GetHistory toUid
     * @property {number|Long|null} [msgEnd] GetHistory msgEnd
     * @property {number|Long|null} [msgStart] GetHistory msgStart
     * @property {number|Long|null} [offset] GetHistory offset
     */

    /**
     * Constructs a new GetHistory.
     * @exports GetHistory
     * @classdesc Represents a GetHistory.
     * @implements IGetHistory
     * @constructor
     * @param {IGetHistory=} [properties] Properties to set
     */
    function GetHistory(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetHistory sign.
     * @member {number|Long} sign
     * @memberof GetHistory
     * @instance
     */
    GetHistory.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetHistory toUid.
     * @member {number|Long} toUid
     * @memberof GetHistory
     * @instance
     */
    GetHistory.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetHistory msgEnd.
     * @member {number|Long} msgEnd
     * @memberof GetHistory
     * @instance
     */
    GetHistory.prototype.msgEnd = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetHistory msgStart.
     * @member {number|Long} msgStart
     * @memberof GetHistory
     * @instance
     */
    GetHistory.prototype.msgStart = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetHistory offset.
     * @member {number|Long} offset
     * @memberof GetHistory
     * @instance
     */
    GetHistory.prototype.offset = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new GetHistory instance using the specified properties.
     * @function create
     * @memberof GetHistory
     * @static
     * @param {IGetHistory=} [properties] Properties to set
     * @returns {GetHistory} GetHistory instance
     */
    GetHistory.create = function create(properties) {
        return new GetHistory(properties);
    };

    /**
     * Encodes the specified GetHistory message. Does not implicitly {@link GetHistory.verify|verify} messages.
     * @function encode
     * @memberof GetHistory
     * @static
     * @param {IGetHistory} message GetHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetHistory.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.toUid);
        if (message.msgEnd != null && Object.hasOwnProperty.call(message, "msgEnd"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.msgEnd);
        if (message.msgStart != null && Object.hasOwnProperty.call(message, "msgStart"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.msgStart);
        if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.offset);
        return writer;
    };

    /**
     * Encodes the specified GetHistory message, length delimited. Does not implicitly {@link GetHistory.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetHistory
     * @static
     * @param {IGetHistory} message GetHistory message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetHistory.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetHistory message from the specified reader or buffer.
     * @function decode
     * @memberof GetHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetHistory} GetHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a GetHistory message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetHistory
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetHistory} GetHistory
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetHistory.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetHistory message.
     * @function verify
     * @memberof GetHistory
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetHistory.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (!$util.isInteger(message.toUid) && !(message.toUid && $util.isInteger(message.toUid.low) && $util.isInteger(message.toUid.high)))
                return "toUid: integer|Long expected";
        if (message.msgEnd != null && message.hasOwnProperty("msgEnd"))
            if (!$util.isInteger(message.msgEnd) && !(message.msgEnd && $util.isInteger(message.msgEnd.low) && $util.isInteger(message.msgEnd.high)))
                return "msgEnd: integer|Long expected";
        if (message.msgStart != null && message.hasOwnProperty("msgStart"))
            if (!$util.isInteger(message.msgStart) && !(message.msgStart && $util.isInteger(message.msgStart.low) && $util.isInteger(message.msgStart.high)))
                return "msgStart: integer|Long expected";
        if (message.offset != null && message.hasOwnProperty("offset"))
            if (!$util.isInteger(message.offset) && !(message.offset && $util.isInteger(message.offset.low) && $util.isInteger(message.offset.high)))
                return "offset: integer|Long expected";
        return null;
    };

    /**
     * Creates a GetHistory message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetHistory
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetHistory} GetHistory
     */
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

    /**
     * Creates a plain object from a GetHistory message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetHistory
     * @static
     * @param {GetHistory} message GetHistory
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this GetHistory to JSON.
     * @function toJSON
     * @memberof GetHistory
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetHistory.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetHistory;
})();

$root.Revoke = (function() {

    /**
     * Properties of a Revoke.
     * @exports IRevoke
     * @interface IRevoke
     * @property {number|Long|null} [sign] Revoke sign
     * @property {number|Long|null} [toUid] Revoke toUid
     * @property {number|Long|null} [msgId] Revoke msgId
     */

    /**
     * Constructs a new Revoke.
     * @exports Revoke
     * @classdesc Represents a Revoke.
     * @implements IRevoke
     * @constructor
     * @param {IRevoke=} [properties] Properties to set
     */
    function Revoke(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Revoke sign.
     * @member {number|Long} sign
     * @memberof Revoke
     * @instance
     */
    Revoke.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Revoke toUid.
     * @member {number|Long} toUid
     * @memberof Revoke
     * @instance
     */
    Revoke.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Revoke msgId.
     * @member {number|Long} msgId
     * @memberof Revoke
     * @instance
     */
    Revoke.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Revoke instance using the specified properties.
     * @function create
     * @memberof Revoke
     * @static
     * @param {IRevoke=} [properties] Properties to set
     * @returns {Revoke} Revoke instance
     */
    Revoke.create = function create(properties) {
        return new Revoke(properties);
    };

    /**
     * Encodes the specified Revoke message. Does not implicitly {@link Revoke.verify|verify} messages.
     * @function encode
     * @memberof Revoke
     * @static
     * @param {IRevoke} message Revoke message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Revoke.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.toUid);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.msgId);
        return writer;
    };

    /**
     * Encodes the specified Revoke message, length delimited. Does not implicitly {@link Revoke.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Revoke
     * @static
     * @param {IRevoke} message Revoke message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Revoke.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Revoke message from the specified reader or buffer.
     * @function decode
     * @memberof Revoke
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Revoke} Revoke
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a Revoke message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Revoke
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Revoke} Revoke
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Revoke.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Revoke message.
     * @function verify
     * @memberof Revoke
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Revoke.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (!$util.isInteger(message.toUid) && !(message.toUid && $util.isInteger(message.toUid.low) && $util.isInteger(message.toUid.high)))
                return "toUid: integer|Long expected";
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (!$util.isInteger(message.msgId) && !(message.msgId && $util.isInteger(message.msgId.low) && $util.isInteger(message.msgId.high)))
                return "msgId: integer|Long expected";
        return null;
    };

    /**
     * Creates a Revoke message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Revoke
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Revoke} Revoke
     */
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

    /**
     * Creates a plain object from a Revoke message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Revoke
     * @static
     * @param {Revoke} message Revoke
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this Revoke to JSON.
     * @function toJSON
     * @memberof Revoke
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Revoke.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Revoke;
})();

$root.MsgRead = (function() {

    /**
     * Properties of a MsgRead.
     * @exports IMsgRead
     * @interface IMsgRead
     * @property {number|Long|null} [sign] MsgRead sign
     * @property {number|Long|null} [toUid] MsgRead toUid
     * @property {number|Long|null} [msgId] MsgRead msgId
     */

    /**
     * Constructs a new MsgRead.
     * @exports MsgRead
     * @classdesc Represents a MsgRead.
     * @implements IMsgRead
     * @constructor
     * @param {IMsgRead=} [properties] Properties to set
     */
    function MsgRead(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MsgRead sign.
     * @member {number|Long} sign
     * @memberof MsgRead
     * @instance
     */
    MsgRead.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MsgRead toUid.
     * @member {number|Long} toUid
     * @memberof MsgRead
     * @instance
     */
    MsgRead.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * MsgRead msgId.
     * @member {number|Long} msgId
     * @memberof MsgRead
     * @instance
     */
    MsgRead.prototype.msgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new MsgRead instance using the specified properties.
     * @function create
     * @memberof MsgRead
     * @static
     * @param {IMsgRead=} [properties] Properties to set
     * @returns {MsgRead} MsgRead instance
     */
    MsgRead.create = function create(properties) {
        return new MsgRead(properties);
    };

    /**
     * Encodes the specified MsgRead message. Does not implicitly {@link MsgRead.verify|verify} messages.
     * @function encode
     * @memberof MsgRead
     * @static
     * @param {IMsgRead} message MsgRead message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MsgRead.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.toUid);
        if (message.msgId != null && Object.hasOwnProperty.call(message, "msgId"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.msgId);
        return writer;
    };

    /**
     * Encodes the specified MsgRead message, length delimited. Does not implicitly {@link MsgRead.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MsgRead
     * @static
     * @param {IMsgRead} message MsgRead message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MsgRead.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MsgRead message from the specified reader or buffer.
     * @function decode
     * @memberof MsgRead
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MsgRead} MsgRead
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a MsgRead message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MsgRead
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MsgRead} MsgRead
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MsgRead.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MsgRead message.
     * @function verify
     * @memberof MsgRead
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MsgRead.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (!$util.isInteger(message.toUid) && !(message.toUid && $util.isInteger(message.toUid.low) && $util.isInteger(message.toUid.high)))
                return "toUid: integer|Long expected";
        if (message.msgId != null && message.hasOwnProperty("msgId"))
            if (!$util.isInteger(message.msgId) && !(message.msgId && $util.isInteger(message.msgId.low) && $util.isInteger(message.msgId.high)))
                return "msgId: integer|Long expected";
        return null;
    };

    /**
     * Creates a MsgRead message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MsgRead
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MsgRead} MsgRead
     */
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

    /**
     * Creates a plain object from a MsgRead message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MsgRead
     * @static
     * @param {MsgRead} message MsgRead
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this MsgRead to JSON.
     * @function toJSON
     * @memberof MsgRead
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MsgRead.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MsgRead;
})();

$root.DelChat = (function() {

    /**
     * Properties of a DelChat.
     * @exports IDelChat
     * @interface IDelChat
     * @property {number|Long|null} [sign] DelChat sign
     * @property {number|Long|null} [toUid] DelChat toUid
     */

    /**
     * Constructs a new DelChat.
     * @exports DelChat
     * @classdesc Represents a DelChat.
     * @implements IDelChat
     * @constructor
     * @param {IDelChat=} [properties] Properties to set
     */
    function DelChat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DelChat sign.
     * @member {number|Long} sign
     * @memberof DelChat
     * @instance
     */
    DelChat.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * DelChat toUid.
     * @member {number|Long} toUid
     * @memberof DelChat
     * @instance
     */
    DelChat.prototype.toUid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new DelChat instance using the specified properties.
     * @function create
     * @memberof DelChat
     * @static
     * @param {IDelChat=} [properties] Properties to set
     * @returns {DelChat} DelChat instance
     */
    DelChat.create = function create(properties) {
        return new DelChat(properties);
    };

    /**
     * Encodes the specified DelChat message. Does not implicitly {@link DelChat.verify|verify} messages.
     * @function encode
     * @memberof DelChat
     * @static
     * @param {IDelChat} message DelChat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DelChat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.toUid != null && Object.hasOwnProperty.call(message, "toUid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.toUid);
        return writer;
    };

    /**
     * Encodes the specified DelChat message, length delimited. Does not implicitly {@link DelChat.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DelChat
     * @static
     * @param {IDelChat} message DelChat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DelChat.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DelChat message from the specified reader or buffer.
     * @function decode
     * @memberof DelChat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DelChat} DelChat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a DelChat message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DelChat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DelChat} DelChat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DelChat.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DelChat message.
     * @function verify
     * @memberof DelChat
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DelChat.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.toUid != null && message.hasOwnProperty("toUid"))
            if (!$util.isInteger(message.toUid) && !(message.toUid && $util.isInteger(message.toUid.low) && $util.isInteger(message.toUid.high)))
                return "toUid: integer|Long expected";
        return null;
    };

    /**
     * Creates a DelChat message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DelChat
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DelChat} DelChat
     */
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

    /**
     * Creates a plain object from a DelChat message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DelChat
     * @static
     * @param {DelChat} message DelChat
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this DelChat to JSON.
     * @function toJSON
     * @memberof DelChat
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DelChat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DelChat;
})();

$root.GetChatList = (function() {

    /**
     * Properties of a GetChatList.
     * @exports IGetChatList
     * @interface IGetChatList
     * @property {number|Long|null} [sign] GetChatList sign
     * @property {number|Long|null} [updateTime] GetChatList updateTime
     * @property {number|Long|null} [uid] GetChatList uid
     */

    /**
     * Constructs a new GetChatList.
     * @exports GetChatList
     * @classdesc Represents a GetChatList.
     * @implements IGetChatList
     * @constructor
     * @param {IGetChatList=} [properties] Properties to set
     */
    function GetChatList(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetChatList sign.
     * @member {number|Long} sign
     * @memberof GetChatList
     * @instance
     */
    GetChatList.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetChatList updateTime.
     * @member {number|Long} updateTime
     * @memberof GetChatList
     * @instance
     */
    GetChatList.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetChatList uid.
     * @member {number|Long} uid
     * @memberof GetChatList
     * @instance
     */
    GetChatList.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new GetChatList instance using the specified properties.
     * @function create
     * @memberof GetChatList
     * @static
     * @param {IGetChatList=} [properties] Properties to set
     * @returns {GetChatList} GetChatList instance
     */
    GetChatList.create = function create(properties) {
        return new GetChatList(properties);
    };

    /**
     * Encodes the specified GetChatList message. Does not implicitly {@link GetChatList.verify|verify} messages.
     * @function encode
     * @memberof GetChatList
     * @static
     * @param {IGetChatList} message GetChatList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetChatList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.updateTime);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.uid);
        return writer;
    };

    /**
     * Encodes the specified GetChatList message, length delimited. Does not implicitly {@link GetChatList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetChatList
     * @static
     * @param {IGetChatList} message GetChatList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetChatList.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetChatList message from the specified reader or buffer.
     * @function decode
     * @memberof GetChatList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetChatList} GetChatList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a GetChatList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetChatList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetChatList} GetChatList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetChatList.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetChatList message.
     * @function verify
     * @memberof GetChatList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetChatList.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high)))
                return "updateTime: integer|Long expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        return null;
    };

    /**
     * Creates a GetChatList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetChatList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetChatList} GetChatList
     */
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

    /**
     * Creates a plain object from a GetChatList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetChatList
     * @static
     * @param {GetChatList} message GetChatList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this GetChatList to JSON.
     * @function toJSON
     * @memberof GetChatList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetChatList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetChatList;
})();

$root.ChatItem = (function() {

    /**
     * Properties of a ChatItem.
     * @exports IChatItem
     * @interface IChatItem
     * @property {number|Long|null} [sign] ChatItem sign
     * @property {number|Long|null} [uid] ChatItem uid
     * @property {number|Long|null} [msgEnd] ChatItem msgEnd
     * @property {number|Long|null} [msgLastRead] ChatItem msgLastRead
     * @property {number|Long|null} [showMsgId] ChatItem showMsgId
     * @property {number|Long|null} [showMsgType] ChatItem showMsgType
     * @property {string|null} [showMsg] ChatItem showMsg
     * @property {number|Long|null} [showMsgTime] ChatItem showMsgTime
     * @property {number|Long|null} [unread] ChatItem unread
     * @property {boolean|null} [matched] ChatItem matched
     * @property {boolean|null} [newMsg] ChatItem newMsg
     * @property {boolean|null} [myMove] ChatItem myMove
     * @property {boolean|null} [iceBreak] ChatItem iceBreak
     * @property {boolean|null} [tipFree] ChatItem tipFree
     * @property {boolean|null} [topAlbum] ChatItem topAlbum
     * @property {boolean|null} [iBlockU] ChatItem iBlockU
     * @property {boolean|null} [iChatU] ChatItem iChatU
     * @property {boolean|null} [uChatI] ChatItem uChatI
     * @property {boolean|null} [deleted] ChatItem deleted
     */

    /**
     * Constructs a new ChatItem.
     * @exports ChatItem
     * @classdesc Represents a ChatItem.
     * @implements IChatItem
     * @constructor
     * @param {IChatItem=} [properties] Properties to set
     */
    function ChatItem(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatItem sign.
     * @member {number|Long} sign
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem uid.
     * @member {number|Long} uid
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem msgEnd.
     * @member {number|Long} msgEnd
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.msgEnd = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem msgLastRead.
     * @member {number|Long} msgLastRead
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.msgLastRead = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem showMsgId.
     * @member {number|Long} showMsgId
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.showMsgId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem showMsgType.
     * @member {number|Long} showMsgType
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.showMsgType = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem showMsg.
     * @member {string} showMsg
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.showMsg = "";

    /**
     * ChatItem showMsgTime.
     * @member {number|Long} showMsgTime
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.showMsgTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem unread.
     * @member {number|Long} unread
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.unread = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItem matched.
     * @member {boolean} matched
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.matched = false;

    /**
     * ChatItem newMsg.
     * @member {boolean} newMsg
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.newMsg = false;

    /**
     * ChatItem myMove.
     * @member {boolean} myMove
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.myMove = false;

    /**
     * ChatItem iceBreak.
     * @member {boolean} iceBreak
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.iceBreak = false;

    /**
     * ChatItem tipFree.
     * @member {boolean} tipFree
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.tipFree = false;

    /**
     * ChatItem topAlbum.
     * @member {boolean} topAlbum
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.topAlbum = false;

    /**
     * ChatItem iBlockU.
     * @member {boolean} iBlockU
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.iBlockU = false;

    /**
     * ChatItem iChatU.
     * @member {boolean} iChatU
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.iChatU = false;

    /**
     * ChatItem uChatI.
     * @member {boolean} uChatI
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.uChatI = false;

    /**
     * ChatItem deleted.
     * @member {boolean} deleted
     * @memberof ChatItem
     * @instance
     */
    ChatItem.prototype.deleted = false;

    /**
     * Creates a new ChatItem instance using the specified properties.
     * @function create
     * @memberof ChatItem
     * @static
     * @param {IChatItem=} [properties] Properties to set
     * @returns {ChatItem} ChatItem instance
     */
    ChatItem.create = function create(properties) {
        return new ChatItem(properties);
    };

    /**
     * Encodes the specified ChatItem message. Does not implicitly {@link ChatItem.verify|verify} messages.
     * @function encode
     * @memberof ChatItem
     * @static
     * @param {IChatItem} message ChatItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatItem.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
        if (message.msgEnd != null && Object.hasOwnProperty.call(message, "msgEnd"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.msgEnd);
        if (message.msgLastRead != null && Object.hasOwnProperty.call(message, "msgLastRead"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.msgLastRead);
        if (message.showMsgId != null && Object.hasOwnProperty.call(message, "showMsgId"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.showMsgId);
        if (message.showMsgType != null && Object.hasOwnProperty.call(message, "showMsgType"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.showMsgType);
        if (message.showMsg != null && Object.hasOwnProperty.call(message, "showMsg"))
            writer.uint32(/* id 7, wireType 2 =*/58).string(message.showMsg);
        if (message.showMsgTime != null && Object.hasOwnProperty.call(message, "showMsgTime"))
            writer.uint32(/* id 8, wireType 0 =*/64).int64(message.showMsgTime);
        if (message.unread != null && Object.hasOwnProperty.call(message, "unread"))
            writer.uint32(/* id 9, wireType 0 =*/72).int64(message.unread);
        if (message.matched != null && Object.hasOwnProperty.call(message, "matched"))
            writer.uint32(/* id 10, wireType 0 =*/80).bool(message.matched);
        if (message.newMsg != null && Object.hasOwnProperty.call(message, "newMsg"))
            writer.uint32(/* id 11, wireType 0 =*/88).bool(message.newMsg);
        if (message.myMove != null && Object.hasOwnProperty.call(message, "myMove"))
            writer.uint32(/* id 12, wireType 0 =*/96).bool(message.myMove);
        if (message.iceBreak != null && Object.hasOwnProperty.call(message, "iceBreak"))
            writer.uint32(/* id 13, wireType 0 =*/104).bool(message.iceBreak);
        if (message.tipFree != null && Object.hasOwnProperty.call(message, "tipFree"))
            writer.uint32(/* id 14, wireType 0 =*/112).bool(message.tipFree);
        if (message.topAlbum != null && Object.hasOwnProperty.call(message, "topAlbum"))
            writer.uint32(/* id 15, wireType 0 =*/120).bool(message.topAlbum);
        if (message.iBlockU != null && Object.hasOwnProperty.call(message, "iBlockU"))
            writer.uint32(/* id 16, wireType 0 =*/128).bool(message.iBlockU);
        if (message.iChatU != null && Object.hasOwnProperty.call(message, "iChatU"))
            writer.uint32(/* id 17, wireType 0 =*/136).bool(message.iChatU);
        if (message.uChatI != null && Object.hasOwnProperty.call(message, "uChatI"))
            writer.uint32(/* id 18, wireType 0 =*/144).bool(message.uChatI);
        if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
            writer.uint32(/* id 19, wireType 0 =*/152).bool(message.deleted);
        return writer;
    };

    /**
     * Encodes the specified ChatItem message, length delimited. Does not implicitly {@link ChatItem.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatItem
     * @static
     * @param {IChatItem} message ChatItem message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatItem.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatItem message from the specified reader or buffer.
     * @function decode
     * @memberof ChatItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatItem} ChatItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a ChatItem message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatItem
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatItem} ChatItem
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatItem.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatItem message.
     * @function verify
     * @memberof ChatItem
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatItem.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        if (message.msgEnd != null && message.hasOwnProperty("msgEnd"))
            if (!$util.isInteger(message.msgEnd) && !(message.msgEnd && $util.isInteger(message.msgEnd.low) && $util.isInteger(message.msgEnd.high)))
                return "msgEnd: integer|Long expected";
        if (message.msgLastRead != null && message.hasOwnProperty("msgLastRead"))
            if (!$util.isInteger(message.msgLastRead) && !(message.msgLastRead && $util.isInteger(message.msgLastRead.low) && $util.isInteger(message.msgLastRead.high)))
                return "msgLastRead: integer|Long expected";
        if (message.showMsgId != null && message.hasOwnProperty("showMsgId"))
            if (!$util.isInteger(message.showMsgId) && !(message.showMsgId && $util.isInteger(message.showMsgId.low) && $util.isInteger(message.showMsgId.high)))
                return "showMsgId: integer|Long expected";
        if (message.showMsgType != null && message.hasOwnProperty("showMsgType"))
            if (!$util.isInteger(message.showMsgType) && !(message.showMsgType && $util.isInteger(message.showMsgType.low) && $util.isInteger(message.showMsgType.high)))
                return "showMsgType: integer|Long expected";
        if (message.showMsg != null && message.hasOwnProperty("showMsg"))
            if (!$util.isString(message.showMsg))
                return "showMsg: string expected";
        if (message.showMsgTime != null && message.hasOwnProperty("showMsgTime"))
            if (!$util.isInteger(message.showMsgTime) && !(message.showMsgTime && $util.isInteger(message.showMsgTime.low) && $util.isInteger(message.showMsgTime.high)))
                return "showMsgTime: integer|Long expected";
        if (message.unread != null && message.hasOwnProperty("unread"))
            if (!$util.isInteger(message.unread) && !(message.unread && $util.isInteger(message.unread.low) && $util.isInteger(message.unread.high)))
                return "unread: integer|Long expected";
        if (message.matched != null && message.hasOwnProperty("matched"))
            if (typeof message.matched !== "boolean")
                return "matched: boolean expected";
        if (message.newMsg != null && message.hasOwnProperty("newMsg"))
            if (typeof message.newMsg !== "boolean")
                return "newMsg: boolean expected";
        if (message.myMove != null && message.hasOwnProperty("myMove"))
            if (typeof message.myMove !== "boolean")
                return "myMove: boolean expected";
        if (message.iceBreak != null && message.hasOwnProperty("iceBreak"))
            if (typeof message.iceBreak !== "boolean")
                return "iceBreak: boolean expected";
        if (message.tipFree != null && message.hasOwnProperty("tipFree"))
            if (typeof message.tipFree !== "boolean")
                return "tipFree: boolean expected";
        if (message.topAlbum != null && message.hasOwnProperty("topAlbum"))
            if (typeof message.topAlbum !== "boolean")
                return "topAlbum: boolean expected";
        if (message.iBlockU != null && message.hasOwnProperty("iBlockU"))
            if (typeof message.iBlockU !== "boolean")
                return "iBlockU: boolean expected";
        if (message.iChatU != null && message.hasOwnProperty("iChatU"))
            if (typeof message.iChatU !== "boolean")
                return "iChatU: boolean expected";
        if (message.uChatI != null && message.hasOwnProperty("uChatI"))
            if (typeof message.uChatI !== "boolean")
                return "uChatI: boolean expected";
        if (message.deleted != null && message.hasOwnProperty("deleted"))
            if (typeof message.deleted !== "boolean")
                return "deleted: boolean expected";
        return null;
    };

    /**
     * Creates a ChatItem message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatItem
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatItem} ChatItem
     */
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

    /**
     * Creates a plain object from a ChatItem message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatItem
     * @static
     * @param {ChatItem} message ChatItem
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ChatItem to JSON.
     * @function toJSON
     * @memberof ChatItem
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatItem.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatItem;
})();

$root.ChatItemUpdate = (function() {

    /**
     * Properties of a ChatItemUpdate.
     * @exports IChatItemUpdate
     * @interface IChatItemUpdate
     * @property {number|Long|null} [sign] ChatItemUpdate sign
     * @property {number|Long|null} [uid] ChatItemUpdate uid
     * @property {number|Long|null} [event] ChatItemUpdate event
     * @property {number|Long|null} [updateTime] ChatItemUpdate updateTime
     * @property {number|Long|null} [msgLastRead] ChatItemUpdate msgLastRead
     * @property {number|Long|null} [unread] ChatItemUpdate unread
     * @property {boolean|null} [iBlockU] ChatItemUpdate iBlockU
     * @property {boolean|null} [deleted] ChatItemUpdate deleted
     */

    /**
     * Constructs a new ChatItemUpdate.
     * @exports ChatItemUpdate
     * @classdesc Represents a ChatItemUpdate.
     * @implements IChatItemUpdate
     * @constructor
     * @param {IChatItemUpdate=} [properties] Properties to set
     */
    function ChatItemUpdate(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatItemUpdate sign.
     * @member {number|Long} sign
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItemUpdate uid.
     * @member {number|Long} uid
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItemUpdate event.
     * @member {number|Long} event
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.event = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItemUpdate updateTime.
     * @member {number|Long} updateTime
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItemUpdate msgLastRead.
     * @member {number|Long} msgLastRead
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.msgLastRead = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItemUpdate unread.
     * @member {number|Long} unread
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.unread = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatItemUpdate iBlockU.
     * @member {boolean} iBlockU
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.iBlockU = false;

    /**
     * ChatItemUpdate deleted.
     * @member {boolean} deleted
     * @memberof ChatItemUpdate
     * @instance
     */
    ChatItemUpdate.prototype.deleted = false;

    /**
     * Creates a new ChatItemUpdate instance using the specified properties.
     * @function create
     * @memberof ChatItemUpdate
     * @static
     * @param {IChatItemUpdate=} [properties] Properties to set
     * @returns {ChatItemUpdate} ChatItemUpdate instance
     */
    ChatItemUpdate.create = function create(properties) {
        return new ChatItemUpdate(properties);
    };

    /**
     * Encodes the specified ChatItemUpdate message. Does not implicitly {@link ChatItemUpdate.verify|verify} messages.
     * @function encode
     * @memberof ChatItemUpdate
     * @static
     * @param {IChatItemUpdate} message ChatItemUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatItemUpdate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
        if (message.event != null && Object.hasOwnProperty.call(message, "event"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.event);
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.updateTime);
        if (message.msgLastRead != null && Object.hasOwnProperty.call(message, "msgLastRead"))
            writer.uint32(/* id 5, wireType 0 =*/40).int64(message.msgLastRead);
        if (message.unread != null && Object.hasOwnProperty.call(message, "unread"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.unread);
        if (message.iBlockU != null && Object.hasOwnProperty.call(message, "iBlockU"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.iBlockU);
        if (message.deleted != null && Object.hasOwnProperty.call(message, "deleted"))
            writer.uint32(/* id 8, wireType 0 =*/64).bool(message.deleted);
        return writer;
    };

    /**
     * Encodes the specified ChatItemUpdate message, length delimited. Does not implicitly {@link ChatItemUpdate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatItemUpdate
     * @static
     * @param {IChatItemUpdate} message ChatItemUpdate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatItemUpdate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatItemUpdate message from the specified reader or buffer.
     * @function decode
     * @memberof ChatItemUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatItemUpdate} ChatItemUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a ChatItemUpdate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatItemUpdate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatItemUpdate} ChatItemUpdate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatItemUpdate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatItemUpdate message.
     * @function verify
     * @memberof ChatItemUpdate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatItemUpdate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        if (message.event != null && message.hasOwnProperty("event"))
            if (!$util.isInteger(message.event) && !(message.event && $util.isInteger(message.event.low) && $util.isInteger(message.event.high)))
                return "event: integer|Long expected";
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high)))
                return "updateTime: integer|Long expected";
        if (message.msgLastRead != null && message.hasOwnProperty("msgLastRead"))
            if (!$util.isInteger(message.msgLastRead) && !(message.msgLastRead && $util.isInteger(message.msgLastRead.low) && $util.isInteger(message.msgLastRead.high)))
                return "msgLastRead: integer|Long expected";
        if (message.unread != null && message.hasOwnProperty("unread"))
            if (!$util.isInteger(message.unread) && !(message.unread && $util.isInteger(message.unread.low) && $util.isInteger(message.unread.high)))
                return "unread: integer|Long expected";
        if (message.iBlockU != null && message.hasOwnProperty("iBlockU"))
            if (typeof message.iBlockU !== "boolean")
                return "iBlockU: boolean expected";
        if (message.deleted != null && message.hasOwnProperty("deleted"))
            if (typeof message.deleted !== "boolean")
                return "deleted: boolean expected";
        return null;
    };

    /**
     * Creates a ChatItemUpdate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatItemUpdate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatItemUpdate} ChatItemUpdate
     */
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

    /**
     * Creates a plain object from a ChatItemUpdate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatItemUpdate
     * @static
     * @param {ChatItemUpdate} message ChatItemUpdate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ChatItemUpdate to JSON.
     * @function toJSON
     * @memberof ChatItemUpdate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatItemUpdate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatItemUpdate;
})();

$root.ChatList = (function() {

    /**
     * Properties of a ChatList.
     * @exports IChatList
     * @interface IChatList
     * @property {number|Long|null} [sign] ChatList sign
     * @property {Array.<IChatItem>|null} [chatItems] ChatList chatItems
     * @property {number|Long|null} [updateTime] ChatList updateTime
     * @property {boolean|null} [hasMore] ChatList hasMore
     */

    /**
     * Constructs a new ChatList.
     * @exports ChatList
     * @classdesc Represents a ChatList.
     * @implements IChatList
     * @constructor
     * @param {IChatList=} [properties] Properties to set
     */
    function ChatList(properties) {
        this.chatItems = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatList sign.
     * @member {number|Long} sign
     * @memberof ChatList
     * @instance
     */
    ChatList.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatList chatItems.
     * @member {Array.<IChatItem>} chatItems
     * @memberof ChatList
     * @instance
     */
    ChatList.prototype.chatItems = $util.emptyArray;

    /**
     * ChatList updateTime.
     * @member {number|Long} updateTime
     * @memberof ChatList
     * @instance
     */
    ChatList.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ChatList hasMore.
     * @member {boolean} hasMore
     * @memberof ChatList
     * @instance
     */
    ChatList.prototype.hasMore = false;

    /**
     * Creates a new ChatList instance using the specified properties.
     * @function create
     * @memberof ChatList
     * @static
     * @param {IChatList=} [properties] Properties to set
     * @returns {ChatList} ChatList instance
     */
    ChatList.create = function create(properties) {
        return new ChatList(properties);
    };

    /**
     * Encodes the specified ChatList message. Does not implicitly {@link ChatList.verify|verify} messages.
     * @function encode
     * @memberof ChatList
     * @static
     * @param {IChatList} message ChatList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.chatItems != null && message.chatItems.length)
            for (var i = 0; i < message.chatItems.length; ++i)
                $root.ChatItem.encode(message.chatItems[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.updateTime);
        if (message.hasMore != null && Object.hasOwnProperty.call(message, "hasMore"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.hasMore);
        return writer;
    };

    /**
     * Encodes the specified ChatList message, length delimited. Does not implicitly {@link ChatList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatList
     * @static
     * @param {IChatList} message ChatList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatList.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatList message from the specified reader or buffer.
     * @function decode
     * @memberof ChatList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatList} ChatList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a ChatList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatList} ChatList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatList.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatList message.
     * @function verify
     * @memberof ChatList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatList.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.chatItems != null && message.hasOwnProperty("chatItems")) {
            if (!Array.isArray(message.chatItems))
                return "chatItems: array expected";
            for (var i = 0; i < message.chatItems.length; ++i) {
                var error = $root.ChatItem.verify(message.chatItems[i]);
                if (error)
                    return "chatItems." + error;
            }
        }
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high)))
                return "updateTime: integer|Long expected";
        if (message.hasMore != null && message.hasOwnProperty("hasMore"))
            if (typeof message.hasMore !== "boolean")
                return "hasMore: boolean expected";
        return null;
    };

    /**
     * Creates a ChatList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatList} ChatList
     */
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

    /**
     * Creates a plain object from a ChatList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatList
     * @static
     * @param {ChatList} message ChatList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this ChatList to JSON.
     * @function toJSON
     * @memberof ChatList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ChatList;
})();

$root.GetProfile = (function() {

    /**
     * Properties of a GetProfile.
     * @exports IGetProfile
     * @interface IGetProfile
     * @property {number|Long|null} [sign] GetProfile sign
     * @property {number|Long|null} [uid] GetProfile uid
     * @property {number|Long|null} [updateTime] GetProfile updateTime
     */

    /**
     * Constructs a new GetProfile.
     * @exports GetProfile
     * @classdesc Represents a GetProfile.
     * @implements IGetProfile
     * @constructor
     * @param {IGetProfile=} [properties] Properties to set
     */
    function GetProfile(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetProfile sign.
     * @member {number|Long} sign
     * @memberof GetProfile
     * @instance
     */
    GetProfile.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetProfile uid.
     * @member {number|Long} uid
     * @memberof GetProfile
     * @instance
     */
    GetProfile.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetProfile updateTime.
     * @member {number|Long} updateTime
     * @memberof GetProfile
     * @instance
     */
    GetProfile.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new GetProfile instance using the specified properties.
     * @function create
     * @memberof GetProfile
     * @static
     * @param {IGetProfile=} [properties] Properties to set
     * @returns {GetProfile} GetProfile instance
     */
    GetProfile.create = function create(properties) {
        return new GetProfile(properties);
    };

    /**
     * Encodes the specified GetProfile message. Does not implicitly {@link GetProfile.verify|verify} messages.
     * @function encode
     * @memberof GetProfile
     * @static
     * @param {IGetProfile} message GetProfile message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetProfile.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.updateTime);
        return writer;
    };

    /**
     * Encodes the specified GetProfile message, length delimited. Does not implicitly {@link GetProfile.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetProfile
     * @static
     * @param {IGetProfile} message GetProfile message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetProfile.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetProfile message from the specified reader or buffer.
     * @function decode
     * @memberof GetProfile
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetProfile} GetProfile
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetProfile.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetProfile();
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
                message.updateTime = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GetProfile message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetProfile
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetProfile} GetProfile
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetProfile.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetProfile message.
     * @function verify
     * @memberof GetProfile
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetProfile.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high)))
                return "updateTime: integer|Long expected";
        return null;
    };

    /**
     * Creates a GetProfile message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetProfile
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetProfile} GetProfile
     */
    GetProfile.fromObject = function fromObject(object) {
        if (object instanceof $root.GetProfile)
            return object;
        var message = new $root.GetProfile();
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
        if (object.updateTime != null)
            if ($util.Long)
                (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false;
            else if (typeof object.updateTime === "string")
                message.updateTime = parseInt(object.updateTime, 10);
            else if (typeof object.updateTime === "number")
                message.updateTime = object.updateTime;
            else if (typeof object.updateTime === "object")
                message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a GetProfile message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetProfile
     * @static
     * @param {GetProfile} message GetProfile
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GetProfile.toObject = function toObject(message, options) {
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
                object.updateTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updateTime = options.longs === String ? "0" : 0;
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
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (typeof message.updateTime === "number")
                object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime;
            else
                object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime;
        return object;
    };

    /**
     * Converts this GetProfile to JSON.
     * @function toJSON
     * @memberof GetProfile
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetProfile.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetProfile;
})();

$root.GetProfiles = (function() {

    /**
     * Properties of a GetProfiles.
     * @exports IGetProfiles
     * @interface IGetProfiles
     * @property {number|Long|null} [sign] GetProfiles sign
     * @property {Array.<IGetProfile>|null} [getProfiles] GetProfiles getProfiles
     */

    /**
     * Constructs a new GetProfiles.
     * @exports GetProfiles
     * @classdesc Represents a GetProfiles.
     * @implements IGetProfiles
     * @constructor
     * @param {IGetProfiles=} [properties] Properties to set
     */
    function GetProfiles(properties) {
        this.getProfiles = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetProfiles sign.
     * @member {number|Long} sign
     * @memberof GetProfiles
     * @instance
     */
    GetProfiles.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetProfiles getProfiles.
     * @member {Array.<IGetProfile>} getProfiles
     * @memberof GetProfiles
     * @instance
     */
    GetProfiles.prototype.getProfiles = $util.emptyArray;

    /**
     * Creates a new GetProfiles instance using the specified properties.
     * @function create
     * @memberof GetProfiles
     * @static
     * @param {IGetProfiles=} [properties] Properties to set
     * @returns {GetProfiles} GetProfiles instance
     */
    GetProfiles.create = function create(properties) {
        return new GetProfiles(properties);
    };

    /**
     * Encodes the specified GetProfiles message. Does not implicitly {@link GetProfiles.verify|verify} messages.
     * @function encode
     * @memberof GetProfiles
     * @static
     * @param {IGetProfiles} message GetProfiles message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetProfiles.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.getProfiles != null && message.getProfiles.length)
            for (var i = 0; i < message.getProfiles.length; ++i)
                $root.GetProfile.encode(message.getProfiles[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified GetProfiles message, length delimited. Does not implicitly {@link GetProfiles.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetProfiles
     * @static
     * @param {IGetProfiles} message GetProfiles message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetProfiles.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetProfiles message from the specified reader or buffer.
     * @function decode
     * @memberof GetProfiles
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetProfiles} GetProfiles
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetProfiles.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetProfiles();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                if (!(message.getProfiles && message.getProfiles.length))
                    message.getProfiles = [];
                message.getProfiles.push($root.GetProfile.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GetProfiles message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetProfiles
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetProfiles} GetProfiles
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetProfiles.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetProfiles message.
     * @function verify
     * @memberof GetProfiles
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetProfiles.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.getProfiles != null && message.hasOwnProperty("getProfiles")) {
            if (!Array.isArray(message.getProfiles))
                return "getProfiles: array expected";
            for (var i = 0; i < message.getProfiles.length; ++i) {
                var error = $root.GetProfile.verify(message.getProfiles[i]);
                if (error)
                    return "getProfiles." + error;
            }
        }
        return null;
    };

    /**
     * Creates a GetProfiles message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetProfiles
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetProfiles} GetProfiles
     */
    GetProfiles.fromObject = function fromObject(object) {
        if (object instanceof $root.GetProfiles)
            return object;
        var message = new $root.GetProfiles();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.getProfiles) {
            if (!Array.isArray(object.getProfiles))
                throw TypeError(".GetProfiles.getProfiles: array expected");
            message.getProfiles = [];
            for (var i = 0; i < object.getProfiles.length; ++i) {
                if (typeof object.getProfiles[i] !== "object")
                    throw TypeError(".GetProfiles.getProfiles: object expected");
                message.getProfiles[i] = $root.GetProfile.fromObject(object.getProfiles[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a GetProfiles message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetProfiles
     * @static
     * @param {GetProfiles} message GetProfiles
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GetProfiles.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.getProfiles = [];
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
        if (message.getProfiles && message.getProfiles.length) {
            object.getProfiles = [];
            for (var j = 0; j < message.getProfiles.length; ++j)
                object.getProfiles[j] = $root.GetProfile.toObject(message.getProfiles[j], options);
        }
        return object;
    };

    /**
     * Converts this GetProfiles to JSON.
     * @function toJSON
     * @memberof GetProfiles
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetProfiles.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetProfiles;
})();

$root.Profile = (function() {

    /**
     * Properties of a Profile.
     * @exports IProfile
     * @interface IProfile
     * @property {number|Long|null} [sign] Profile sign
     * @property {number|Long|null} [uid] Profile uid
     * @property {number|Long|null} [updateTime] Profile updateTime
     * @property {string|null} [nickName] Profile nickName
     * @property {string|null} [avatar] Profile avatar
     * @property {number|Long|null} [gender] Profile gender
     * @property {boolean|null} [gold] Profile gold
     * @property {boolean|null} [verified] Profile verified
     */

    /**
     * Constructs a new Profile.
     * @exports Profile
     * @classdesc Represents a Profile.
     * @implements IProfile
     * @constructor
     * @param {IProfile=} [properties] Properties to set
     */
    function Profile(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Profile sign.
     * @member {number|Long} sign
     * @memberof Profile
     * @instance
     */
    Profile.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Profile uid.
     * @member {number|Long} uid
     * @memberof Profile
     * @instance
     */
    Profile.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Profile updateTime.
     * @member {number|Long} updateTime
     * @memberof Profile
     * @instance
     */
    Profile.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Profile nickName.
     * @member {string} nickName
     * @memberof Profile
     * @instance
     */
    Profile.prototype.nickName = "";

    /**
     * Profile avatar.
     * @member {string} avatar
     * @memberof Profile
     * @instance
     */
    Profile.prototype.avatar = "";

    /**
     * Profile gender.
     * @member {number|Long} gender
     * @memberof Profile
     * @instance
     */
    Profile.prototype.gender = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Profile gold.
     * @member {boolean} gold
     * @memberof Profile
     * @instance
     */
    Profile.prototype.gold = false;

    /**
     * Profile verified.
     * @member {boolean} verified
     * @memberof Profile
     * @instance
     */
    Profile.prototype.verified = false;

    /**
     * Creates a new Profile instance using the specified properties.
     * @function create
     * @memberof Profile
     * @static
     * @param {IProfile=} [properties] Properties to set
     * @returns {Profile} Profile instance
     */
    Profile.create = function create(properties) {
        return new Profile(properties);
    };

    /**
     * Encodes the specified Profile message. Does not implicitly {@link Profile.verify|verify} messages.
     * @function encode
     * @memberof Profile
     * @static
     * @param {IProfile} message Profile message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Profile.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.updateTime);
        if (message.nickName != null && Object.hasOwnProperty.call(message, "nickName"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.nickName);
        if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.avatar);
        if (message.gender != null && Object.hasOwnProperty.call(message, "gender"))
            writer.uint32(/* id 6, wireType 0 =*/48).int64(message.gender);
        if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.gold);
        if (message.verified != null && Object.hasOwnProperty.call(message, "verified"))
            writer.uint32(/* id 8, wireType 0 =*/64).bool(message.verified);
        return writer;
    };

    /**
     * Encodes the specified Profile message, length delimited. Does not implicitly {@link Profile.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Profile
     * @static
     * @param {IProfile} message Profile message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Profile.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Profile message from the specified reader or buffer.
     * @function decode
     * @memberof Profile
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Profile} Profile
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Profile.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Profile();
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
                message.updateTime = reader.int64();
                break;
            case 4:
                message.nickName = reader.string();
                break;
            case 5:
                message.avatar = reader.string();
                break;
            case 6:
                message.gender = reader.int64();
                break;
            case 7:
                message.gold = reader.bool();
                break;
            case 8:
                message.verified = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Profile message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Profile
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Profile} Profile
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Profile.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Profile message.
     * @function verify
     * @memberof Profile
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Profile.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high)))
                return "updateTime: integer|Long expected";
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            if (!$util.isString(message.nickName))
                return "nickName: string expected";
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            if (!$util.isString(message.avatar))
                return "avatar: string expected";
        if (message.gender != null && message.hasOwnProperty("gender"))
            if (!$util.isInteger(message.gender) && !(message.gender && $util.isInteger(message.gender.low) && $util.isInteger(message.gender.high)))
                return "gender: integer|Long expected";
        if (message.gold != null && message.hasOwnProperty("gold"))
            if (typeof message.gold !== "boolean")
                return "gold: boolean expected";
        if (message.verified != null && message.hasOwnProperty("verified"))
            if (typeof message.verified !== "boolean")
                return "verified: boolean expected";
        return null;
    };

    /**
     * Creates a Profile message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Profile
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Profile} Profile
     */
    Profile.fromObject = function fromObject(object) {
        if (object instanceof $root.Profile)
            return object;
        var message = new $root.Profile();
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
        if (object.updateTime != null)
            if ($util.Long)
                (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false;
            else if (typeof object.updateTime === "string")
                message.updateTime = parseInt(object.updateTime, 10);
            else if (typeof object.updateTime === "number")
                message.updateTime = object.updateTime;
            else if (typeof object.updateTime === "object")
                message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber();
        if (object.nickName != null)
            message.nickName = String(object.nickName);
        if (object.avatar != null)
            message.avatar = String(object.avatar);
        if (object.gender != null)
            if ($util.Long)
                (message.gender = $util.Long.fromValue(object.gender)).unsigned = false;
            else if (typeof object.gender === "string")
                message.gender = parseInt(object.gender, 10);
            else if (typeof object.gender === "number")
                message.gender = object.gender;
            else if (typeof object.gender === "object")
                message.gender = new $util.LongBits(object.gender.low >>> 0, object.gender.high >>> 0).toNumber();
        if (object.gold != null)
            message.gold = Boolean(object.gold);
        if (object.verified != null)
            message.verified = Boolean(object.verified);
        return message;
    };

    /**
     * Creates a plain object from a Profile message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Profile
     * @static
     * @param {Profile} message Profile
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Profile.toObject = function toObject(message, options) {
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
                object.updateTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updateTime = options.longs === String ? "0" : 0;
            object.nickName = "";
            object.avatar = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.gender = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.gender = options.longs === String ? "0" : 0;
            object.gold = false;
            object.verified = false;
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
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (typeof message.updateTime === "number")
                object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime;
            else
                object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime;
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            object.nickName = message.nickName;
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            object.avatar = message.avatar;
        if (message.gender != null && message.hasOwnProperty("gender"))
            if (typeof message.gender === "number")
                object.gender = options.longs === String ? String(message.gender) : message.gender;
            else
                object.gender = options.longs === String ? $util.Long.prototype.toString.call(message.gender) : options.longs === Number ? new $util.LongBits(message.gender.low >>> 0, message.gender.high >>> 0).toNumber() : message.gender;
        if (message.gold != null && message.hasOwnProperty("gold"))
            object.gold = message.gold;
        if (message.verified != null && message.hasOwnProperty("verified"))
            object.verified = message.verified;
        return object;
    };

    /**
     * Converts this Profile to JSON.
     * @function toJSON
     * @memberof Profile
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Profile.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Profile;
})();

$root.ProfileList = (function() {

    /**
     * Properties of a ProfileList.
     * @exports IProfileList
     * @interface IProfileList
     * @property {Array.<IProfile>|null} [profiles] ProfileList profiles
     */

    /**
     * Constructs a new ProfileList.
     * @exports ProfileList
     * @classdesc Represents a ProfileList.
     * @implements IProfileList
     * @constructor
     * @param {IProfileList=} [properties] Properties to set
     */
    function ProfileList(properties) {
        this.profiles = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ProfileList profiles.
     * @member {Array.<IProfile>} profiles
     * @memberof ProfileList
     * @instance
     */
    ProfileList.prototype.profiles = $util.emptyArray;

    /**
     * Creates a new ProfileList instance using the specified properties.
     * @function create
     * @memberof ProfileList
     * @static
     * @param {IProfileList=} [properties] Properties to set
     * @returns {ProfileList} ProfileList instance
     */
    ProfileList.create = function create(properties) {
        return new ProfileList(properties);
    };

    /**
     * Encodes the specified ProfileList message. Does not implicitly {@link ProfileList.verify|verify} messages.
     * @function encode
     * @memberof ProfileList
     * @static
     * @param {IProfileList} message ProfileList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProfileList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.profiles != null && message.profiles.length)
            for (var i = 0; i < message.profiles.length; ++i)
                $root.Profile.encode(message.profiles[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ProfileList message, length delimited. Does not implicitly {@link ProfileList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ProfileList
     * @static
     * @param {IProfileList} message ProfileList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProfileList.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ProfileList message from the specified reader or buffer.
     * @function decode
     * @memberof ProfileList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ProfileList} ProfileList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProfileList.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ProfileList();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.profiles && message.profiles.length))
                    message.profiles = [];
                message.profiles.push($root.Profile.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ProfileList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ProfileList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ProfileList} ProfileList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProfileList.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ProfileList message.
     * @function verify
     * @memberof ProfileList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ProfileList.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.profiles != null && message.hasOwnProperty("profiles")) {
            if (!Array.isArray(message.profiles))
                return "profiles: array expected";
            for (var i = 0; i < message.profiles.length; ++i) {
                var error = $root.Profile.verify(message.profiles[i]);
                if (error)
                    return "profiles." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ProfileList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ProfileList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ProfileList} ProfileList
     */
    ProfileList.fromObject = function fromObject(object) {
        if (object instanceof $root.ProfileList)
            return object;
        var message = new $root.ProfileList();
        if (object.profiles) {
            if (!Array.isArray(object.profiles))
                throw TypeError(".ProfileList.profiles: array expected");
            message.profiles = [];
            for (var i = 0; i < object.profiles.length; ++i) {
                if (typeof object.profiles[i] !== "object")
                    throw TypeError(".ProfileList.profiles: object expected");
                message.profiles[i] = $root.Profile.fromObject(object.profiles[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a ProfileList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ProfileList
     * @static
     * @param {ProfileList} message ProfileList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ProfileList.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.profiles = [];
        if (message.profiles && message.profiles.length) {
            object.profiles = [];
            for (var j = 0; j < message.profiles.length; ++j)
                object.profiles[j] = $root.Profile.toObject(message.profiles[j], options);
        }
        return object;
    };

    /**
     * Converts this ProfileList to JSON.
     * @function toJSON
     * @memberof ProfileList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ProfileList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ProfileList;
})();

$root.GetChat = (function() {

    /**
     * Properties of a GetChat.
     * @exports IGetChat
     * @interface IGetChat
     * @property {number|Long|null} [sign] GetChat sign
     * @property {number|Long|null} [uid] GetChat uid
     */

    /**
     * Constructs a new GetChat.
     * @exports GetChat
     * @classdesc Represents a GetChat.
     * @implements IGetChat
     * @constructor
     * @param {IGetChat=} [properties] Properties to set
     */
    function GetChat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetChat sign.
     * @member {number|Long} sign
     * @memberof GetChat
     * @instance
     */
    GetChat.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetChat uid.
     * @member {number|Long} uid
     * @memberof GetChat
     * @instance
     */
    GetChat.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new GetChat instance using the specified properties.
     * @function create
     * @memberof GetChat
     * @static
     * @param {IGetChat=} [properties] Properties to set
     * @returns {GetChat} GetChat instance
     */
    GetChat.create = function create(properties) {
        return new GetChat(properties);
    };

    /**
     * Encodes the specified GetChat message. Does not implicitly {@link GetChat.verify|verify} messages.
     * @function encode
     * @memberof GetChat
     * @static
     * @param {IGetChat} message GetChat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetChat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
        return writer;
    };

    /**
     * Encodes the specified GetChat message, length delimited. Does not implicitly {@link GetChat.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetChat
     * @static
     * @param {IGetChat} message GetChat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetChat.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetChat message from the specified reader or buffer.
     * @function decode
     * @memberof GetChat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetChat} GetChat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a GetChat message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetChat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetChat} GetChat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetChat.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetChat message.
     * @function verify
     * @memberof GetChat
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetChat.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        return null;
    };

    /**
     * Creates a GetChat message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetChat
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetChat} GetChat
     */
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

    /**
     * Creates a plain object from a GetChat message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetChat
     * @static
     * @param {GetChat} message GetChat
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this GetChat to JSON.
     * @function toJSON
     * @memberof GetChat
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetChat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetChat;
})();

$root.GetCosKey = (function() {

    /**
     * Properties of a GetCosKey.
     * @exports IGetCosKey
     * @interface IGetCosKey
     * @property {number|Long|null} [sign] GetCosKey sign
     */

    /**
     * Constructs a new GetCosKey.
     * @exports GetCosKey
     * @classdesc Represents a GetCosKey.
     * @implements IGetCosKey
     * @constructor
     * @param {IGetCosKey=} [properties] Properties to set
     */
    function GetCosKey(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetCosKey sign.
     * @member {number|Long} sign
     * @memberof GetCosKey
     * @instance
     */
    GetCosKey.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new GetCosKey instance using the specified properties.
     * @function create
     * @memberof GetCosKey
     * @static
     * @param {IGetCosKey=} [properties] Properties to set
     * @returns {GetCosKey} GetCosKey instance
     */
    GetCosKey.create = function create(properties) {
        return new GetCosKey(properties);
    };

    /**
     * Encodes the specified GetCosKey message. Does not implicitly {@link GetCosKey.verify|verify} messages.
     * @function encode
     * @memberof GetCosKey
     * @static
     * @param {IGetCosKey} message GetCosKey message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetCosKey.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        return writer;
    };

    /**
     * Encodes the specified GetCosKey message, length delimited. Does not implicitly {@link GetCosKey.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetCosKey
     * @static
     * @param {IGetCosKey} message GetCosKey message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetCosKey.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetCosKey message from the specified reader or buffer.
     * @function decode
     * @memberof GetCosKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetCosKey} GetCosKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a GetCosKey message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetCosKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetCosKey} GetCosKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetCosKey.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetCosKey message.
     * @function verify
     * @memberof GetCosKey
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetCosKey.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        return null;
    };

    /**
     * Creates a GetCosKey message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetCosKey
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetCosKey} GetCosKey
     */
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

    /**
     * Creates a plain object from a GetCosKey message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetCosKey
     * @static
     * @param {GetCosKey} message GetCosKey
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this GetCosKey to JSON.
     * @function toJSON
     * @memberof GetCosKey
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetCosKey.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetCosKey;
})();

$root.CosKey = (function() {

    /**
     * Properties of a CosKey.
     * @exports ICosKey
     * @interface ICosKey
     * @property {number|Long|null} [sign] CosKey sign
     * @property {string|null} [token] CosKey token
     * @property {string|null} [id] CosKey id
     * @property {string|null} [key] CosKey key
     * @property {string|null} [bucket] CosKey bucket
     * @property {string|null} [region] CosKey region
     * @property {number|Long|null} [startTime] CosKey startTime
     * @property {number|Long|null} [expTime] CosKey expTime
     * @property {string|null} [path] CosKey path
     * @property {string|null} [pathDemo] CosKey pathDemo
     */

    /**
     * Constructs a new CosKey.
     * @exports CosKey
     * @classdesc Represents a CosKey.
     * @implements ICosKey
     * @constructor
     * @param {ICosKey=} [properties] Properties to set
     */
    function CosKey(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * CosKey sign.
     * @member {number|Long} sign
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CosKey token.
     * @member {string} token
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.token = "";

    /**
     * CosKey id.
     * @member {string} id
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.id = "";

    /**
     * CosKey key.
     * @member {string} key
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.key = "";

    /**
     * CosKey bucket.
     * @member {string} bucket
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.bucket = "";

    /**
     * CosKey region.
     * @member {string} region
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.region = "";

    /**
     * CosKey startTime.
     * @member {number|Long} startTime
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.startTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CosKey expTime.
     * @member {number|Long} expTime
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.expTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * CosKey path.
     * @member {string} path
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.path = "";

    /**
     * CosKey pathDemo.
     * @member {string} pathDemo
     * @memberof CosKey
     * @instance
     */
    CosKey.prototype.pathDemo = "";

    /**
     * Creates a new CosKey instance using the specified properties.
     * @function create
     * @memberof CosKey
     * @static
     * @param {ICosKey=} [properties] Properties to set
     * @returns {CosKey} CosKey instance
     */
    CosKey.create = function create(properties) {
        return new CosKey(properties);
    };

    /**
     * Encodes the specified CosKey message. Does not implicitly {@link CosKey.verify|verify} messages.
     * @function encode
     * @memberof CosKey
     * @static
     * @param {ICosKey} message CosKey message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CosKey.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.token != null && Object.hasOwnProperty.call(message, "token"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.id);
        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.key);
        if (message.bucket != null && Object.hasOwnProperty.call(message, "bucket"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.bucket);
        if (message.region != null && Object.hasOwnProperty.call(message, "region"))
            writer.uint32(/* id 6, wireType 2 =*/50).string(message.region);
        if (message.startTime != null && Object.hasOwnProperty.call(message, "startTime"))
            writer.uint32(/* id 7, wireType 0 =*/56).int64(message.startTime);
        if (message.expTime != null && Object.hasOwnProperty.call(message, "expTime"))
            writer.uint32(/* id 8, wireType 0 =*/64).int64(message.expTime);
        if (message.path != null && Object.hasOwnProperty.call(message, "path"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.path);
        if (message.pathDemo != null && Object.hasOwnProperty.call(message, "pathDemo"))
            writer.uint32(/* id 10, wireType 2 =*/82).string(message.pathDemo);
        return writer;
    };

    /**
     * Encodes the specified CosKey message, length delimited. Does not implicitly {@link CosKey.verify|verify} messages.
     * @function encodeDelimited
     * @memberof CosKey
     * @static
     * @param {ICosKey} message CosKey message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    CosKey.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a CosKey message from the specified reader or buffer.
     * @function decode
     * @memberof CosKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {CosKey} CosKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes a CosKey message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof CosKey
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {CosKey} CosKey
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    CosKey.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a CosKey message.
     * @function verify
     * @memberof CosKey
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    CosKey.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.token != null && message.hasOwnProperty("token"))
            if (!$util.isString(message.token))
                return "token: string expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isString(message.id))
                return "id: string expected";
        if (message.key != null && message.hasOwnProperty("key"))
            if (!$util.isString(message.key))
                return "key: string expected";
        if (message.bucket != null && message.hasOwnProperty("bucket"))
            if (!$util.isString(message.bucket))
                return "bucket: string expected";
        if (message.region != null && message.hasOwnProperty("region"))
            if (!$util.isString(message.region))
                return "region: string expected";
        if (message.startTime != null && message.hasOwnProperty("startTime"))
            if (!$util.isInteger(message.startTime) && !(message.startTime && $util.isInteger(message.startTime.low) && $util.isInteger(message.startTime.high)))
                return "startTime: integer|Long expected";
        if (message.expTime != null && message.hasOwnProperty("expTime"))
            if (!$util.isInteger(message.expTime) && !(message.expTime && $util.isInteger(message.expTime.low) && $util.isInteger(message.expTime.high)))
                return "expTime: integer|Long expected";
        if (message.path != null && message.hasOwnProperty("path"))
            if (!$util.isString(message.path))
                return "path: string expected";
        if (message.pathDemo != null && message.hasOwnProperty("pathDemo"))
            if (!$util.isString(message.pathDemo))
                return "pathDemo: string expected";
        return null;
    };

    /**
     * Creates a CosKey message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof CosKey
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {CosKey} CosKey
     */
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

    /**
     * Creates a plain object from a CosKey message. Also converts values to other types if specified.
     * @function toObject
     * @memberof CosKey
     * @static
     * @param {CosKey} message CosKey
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this CosKey to JSON.
     * @function toJSON
     * @memberof CosKey
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    CosKey.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return CosKey;
})();

$root.UpdatePushToken = (function() {

    /**
     * Properties of an UpdatePushToken.
     * @exports IUpdatePushToken
     * @interface IUpdatePushToken
     * @property {number|Long|null} [sign] UpdatePushToken sign
     * @property {number|Long|null} [pushChannel] UpdatePushToken pushChannel
     * @property {string|null} [pushToken] UpdatePushToken pushToken
     */

    /**
     * Constructs a new UpdatePushToken.
     * @exports UpdatePushToken
     * @classdesc Represents an UpdatePushToken.
     * @implements IUpdatePushToken
     * @constructor
     * @param {IUpdatePushToken=} [properties] Properties to set
     */
    function UpdatePushToken(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UpdatePushToken sign.
     * @member {number|Long} sign
     * @memberof UpdatePushToken
     * @instance
     */
    UpdatePushToken.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * UpdatePushToken pushChannel.
     * @member {number|Long} pushChannel
     * @memberof UpdatePushToken
     * @instance
     */
    UpdatePushToken.prototype.pushChannel = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * UpdatePushToken pushToken.
     * @member {string} pushToken
     * @memberof UpdatePushToken
     * @instance
     */
    UpdatePushToken.prototype.pushToken = "";

    /**
     * Creates a new UpdatePushToken instance using the specified properties.
     * @function create
     * @memberof UpdatePushToken
     * @static
     * @param {IUpdatePushToken=} [properties] Properties to set
     * @returns {UpdatePushToken} UpdatePushToken instance
     */
    UpdatePushToken.create = function create(properties) {
        return new UpdatePushToken(properties);
    };

    /**
     * Encodes the specified UpdatePushToken message. Does not implicitly {@link UpdatePushToken.verify|verify} messages.
     * @function encode
     * @memberof UpdatePushToken
     * @static
     * @param {IUpdatePushToken} message UpdatePushToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdatePushToken.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.pushChannel != null && Object.hasOwnProperty.call(message, "pushChannel"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.pushChannel);
        if (message.pushToken != null && Object.hasOwnProperty.call(message, "pushToken"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.pushToken);
        return writer;
    };

    /**
     * Encodes the specified UpdatePushToken message, length delimited. Does not implicitly {@link UpdatePushToken.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UpdatePushToken
     * @static
     * @param {IUpdatePushToken} message UpdatePushToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UpdatePushToken.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes an UpdatePushToken message from the specified reader or buffer.
     * @function decode
     * @memberof UpdatePushToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UpdatePushToken} UpdatePushToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
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

    /**
     * Decodes an UpdatePushToken message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UpdatePushToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UpdatePushToken} UpdatePushToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UpdatePushToken.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies an UpdatePushToken message.
     * @function verify
     * @memberof UpdatePushToken
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UpdatePushToken.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.pushChannel != null && message.hasOwnProperty("pushChannel"))
            if (!$util.isInteger(message.pushChannel) && !(message.pushChannel && $util.isInteger(message.pushChannel.low) && $util.isInteger(message.pushChannel.high)))
                return "pushChannel: integer|Long expected";
        if (message.pushToken != null && message.hasOwnProperty("pushToken"))
            if (!$util.isString(message.pushToken))
                return "pushToken: string expected";
        return null;
    };

    /**
     * Creates an UpdatePushToken message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UpdatePushToken
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UpdatePushToken} UpdatePushToken
     */
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

    /**
     * Creates a plain object from an UpdatePushToken message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UpdatePushToken
     * @static
     * @param {UpdatePushToken} message UpdatePushToken
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
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

    /**
     * Converts this UpdatePushToken to JSON.
     * @function toJSON
     * @memberof UpdatePushToken
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UpdatePushToken.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UpdatePushToken;
})();

$root.ProfileOnline = (function() {

    /**
     * Properties of a ProfileOnline.
     * @exports IProfileOnline
     * @interface IProfileOnline
     * @property {number|Long|null} [uid] ProfileOnline uid
     * @property {number|Long|null} [updateTime] ProfileOnline updateTime
     * @property {string|null} [nickName] ProfileOnline nickName
     * @property {string|null} [avatar] ProfileOnline avatar
     * @property {boolean|null} [gold] ProfileOnline gold
     * @property {boolean|null} [verified] ProfileOnline verified
     */

    /**
     * Constructs a new ProfileOnline.
     * @exports ProfileOnline
     * @classdesc Represents a ProfileOnline.
     * @implements IProfileOnline
     * @constructor
     * @param {IProfileOnline=} [properties] Properties to set
     */
    function ProfileOnline(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ProfileOnline uid.
     * @member {number|Long} uid
     * @memberof ProfileOnline
     * @instance
     */
    ProfileOnline.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ProfileOnline updateTime.
     * @member {number|Long} updateTime
     * @memberof ProfileOnline
     * @instance
     */
    ProfileOnline.prototype.updateTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * ProfileOnline nickName.
     * @member {string} nickName
     * @memberof ProfileOnline
     * @instance
     */
    ProfileOnline.prototype.nickName = "";

    /**
     * ProfileOnline avatar.
     * @member {string} avatar
     * @memberof ProfileOnline
     * @instance
     */
    ProfileOnline.prototype.avatar = "";

    /**
     * ProfileOnline gold.
     * @member {boolean} gold
     * @memberof ProfileOnline
     * @instance
     */
    ProfileOnline.prototype.gold = false;

    /**
     * ProfileOnline verified.
     * @member {boolean} verified
     * @memberof ProfileOnline
     * @instance
     */
    ProfileOnline.prototype.verified = false;

    /**
     * Creates a new ProfileOnline instance using the specified properties.
     * @function create
     * @memberof ProfileOnline
     * @static
     * @param {IProfileOnline=} [properties] Properties to set
     * @returns {ProfileOnline} ProfileOnline instance
     */
    ProfileOnline.create = function create(properties) {
        return new ProfileOnline(properties);
    };

    /**
     * Encodes the specified ProfileOnline message. Does not implicitly {@link ProfileOnline.verify|verify} messages.
     * @function encode
     * @memberof ProfileOnline
     * @static
     * @param {IProfileOnline} message ProfileOnline message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProfileOnline.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uid);
        if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.updateTime);
        if (message.nickName != null && Object.hasOwnProperty.call(message, "nickName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickName);
        if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.avatar);
        if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.gold);
        if (message.verified != null && Object.hasOwnProperty.call(message, "verified"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.verified);
        return writer;
    };

    /**
     * Encodes the specified ProfileOnline message, length delimited. Does not implicitly {@link ProfileOnline.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ProfileOnline
     * @static
     * @param {IProfileOnline} message ProfileOnline message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ProfileOnline.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ProfileOnline message from the specified reader or buffer.
     * @function decode
     * @memberof ProfileOnline
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ProfileOnline} ProfileOnline
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProfileOnline.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ProfileOnline();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.uid = reader.int64();
                break;
            case 2:
                message.updateTime = reader.int64();
                break;
            case 3:
                message.nickName = reader.string();
                break;
            case 4:
                message.avatar = reader.string();
                break;
            case 5:
                message.gold = reader.bool();
                break;
            case 6:
                message.verified = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ProfileOnline message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ProfileOnline
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ProfileOnline} ProfileOnline
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ProfileOnline.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ProfileOnline message.
     * @function verify
     * @memberof ProfileOnline
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ProfileOnline.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high)))
                return "updateTime: integer|Long expected";
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            if (!$util.isString(message.nickName))
                return "nickName: string expected";
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            if (!$util.isString(message.avatar))
                return "avatar: string expected";
        if (message.gold != null && message.hasOwnProperty("gold"))
            if (typeof message.gold !== "boolean")
                return "gold: boolean expected";
        if (message.verified != null && message.hasOwnProperty("verified"))
            if (typeof message.verified !== "boolean")
                return "verified: boolean expected";
        return null;
    };

    /**
     * Creates a ProfileOnline message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ProfileOnline
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ProfileOnline} ProfileOnline
     */
    ProfileOnline.fromObject = function fromObject(object) {
        if (object instanceof $root.ProfileOnline)
            return object;
        var message = new $root.ProfileOnline();
        if (object.uid != null)
            if ($util.Long)
                (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
            else if (typeof object.uid === "string")
                message.uid = parseInt(object.uid, 10);
            else if (typeof object.uid === "number")
                message.uid = object.uid;
            else if (typeof object.uid === "object")
                message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        if (object.updateTime != null)
            if ($util.Long)
                (message.updateTime = $util.Long.fromValue(object.updateTime)).unsigned = false;
            else if (typeof object.updateTime === "string")
                message.updateTime = parseInt(object.updateTime, 10);
            else if (typeof object.updateTime === "number")
                message.updateTime = object.updateTime;
            else if (typeof object.updateTime === "object")
                message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber();
        if (object.nickName != null)
            message.nickName = String(object.nickName);
        if (object.avatar != null)
            message.avatar = String(object.avatar);
        if (object.gold != null)
            message.gold = Boolean(object.gold);
        if (object.verified != null)
            message.verified = Boolean(object.verified);
        return message;
    };

    /**
     * Creates a plain object from a ProfileOnline message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ProfileOnline
     * @static
     * @param {ProfileOnline} message ProfileOnline
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ProfileOnline.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.updateTime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updateTime = options.longs === String ? "0" : 0;
            object.nickName = "";
            object.avatar = "";
            object.gold = false;
            object.verified = false;
        }
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        if (message.updateTime != null && message.hasOwnProperty("updateTime"))
            if (typeof message.updateTime === "number")
                object.updateTime = options.longs === String ? String(message.updateTime) : message.updateTime;
            else
                object.updateTime = options.longs === String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber() : message.updateTime;
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            object.nickName = message.nickName;
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            object.avatar = message.avatar;
        if (message.gold != null && message.hasOwnProperty("gold"))
            object.gold = message.gold;
        if (message.verified != null && message.hasOwnProperty("verified"))
            object.verified = message.verified;
        return object;
    };

    /**
     * Converts this ProfileOnline to JSON.
     * @function toJSON
     * @memberof ProfileOnline
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ProfileOnline.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return ProfileOnline;
})();

$root.UsrOnline = (function() {

    /**
     * Properties of a UsrOnline.
     * @exports IUsrOnline
     * @interface IUsrOnline
     * @property {number|Long|null} [uid] UsrOnline uid
     */

    /**
     * Constructs a new UsrOnline.
     * @exports UsrOnline
     * @classdesc Represents a UsrOnline.
     * @implements IUsrOnline
     * @constructor
     * @param {IUsrOnline=} [properties] Properties to set
     */
    function UsrOnline(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UsrOnline uid.
     * @member {number|Long} uid
     * @memberof UsrOnline
     * @instance
     */
    UsrOnline.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new UsrOnline instance using the specified properties.
     * @function create
     * @memberof UsrOnline
     * @static
     * @param {IUsrOnline=} [properties] Properties to set
     * @returns {UsrOnline} UsrOnline instance
     */
    UsrOnline.create = function create(properties) {
        return new UsrOnline(properties);
    };

    /**
     * Encodes the specified UsrOnline message. Does not implicitly {@link UsrOnline.verify|verify} messages.
     * @function encode
     * @memberof UsrOnline
     * @static
     * @param {IUsrOnline} message UsrOnline message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UsrOnline.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uid);
        return writer;
    };

    /**
     * Encodes the specified UsrOnline message, length delimited. Does not implicitly {@link UsrOnline.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UsrOnline
     * @static
     * @param {IUsrOnline} message UsrOnline message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UsrOnline.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a UsrOnline message from the specified reader or buffer.
     * @function decode
     * @memberof UsrOnline
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UsrOnline} UsrOnline
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UsrOnline.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UsrOnline();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.uid = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a UsrOnline message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UsrOnline
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UsrOnline} UsrOnline
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UsrOnline.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a UsrOnline message.
     * @function verify
     * @memberof UsrOnline
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UsrOnline.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        return null;
    };

    /**
     * Creates a UsrOnline message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UsrOnline
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UsrOnline} UsrOnline
     */
    UsrOnline.fromObject = function fromObject(object) {
        if (object instanceof $root.UsrOnline)
            return object;
        var message = new $root.UsrOnline();
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

    /**
     * Creates a plain object from a UsrOnline message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UsrOnline
     * @static
     * @param {UsrOnline} message UsrOnline
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UsrOnline.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        return object;
    };

    /**
     * Converts this UsrOnline to JSON.
     * @function toJSON
     * @memberof UsrOnline
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UsrOnline.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UsrOnline;
})();

$root.UsrOffline = (function() {

    /**
     * Properties of a UsrOffline.
     * @exports IUsrOffline
     * @interface IUsrOffline
     * @property {number|Long|null} [uid] UsrOffline uid
     */

    /**
     * Constructs a new UsrOffline.
     * @exports UsrOffline
     * @classdesc Represents a UsrOffline.
     * @implements IUsrOffline
     * @constructor
     * @param {IUsrOffline=} [properties] Properties to set
     */
    function UsrOffline(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * UsrOffline uid.
     * @member {number|Long} uid
     * @memberof UsrOffline
     * @instance
     */
    UsrOffline.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new UsrOffline instance using the specified properties.
     * @function create
     * @memberof UsrOffline
     * @static
     * @param {IUsrOffline=} [properties] Properties to set
     * @returns {UsrOffline} UsrOffline instance
     */
    UsrOffline.create = function create(properties) {
        return new UsrOffline(properties);
    };

    /**
     * Encodes the specified UsrOffline message. Does not implicitly {@link UsrOffline.verify|verify} messages.
     * @function encode
     * @memberof UsrOffline
     * @static
     * @param {IUsrOffline} message UsrOffline message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UsrOffline.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uid);
        return writer;
    };

    /**
     * Encodes the specified UsrOffline message, length delimited. Does not implicitly {@link UsrOffline.verify|verify} messages.
     * @function encodeDelimited
     * @memberof UsrOffline
     * @static
     * @param {IUsrOffline} message UsrOffline message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UsrOffline.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a UsrOffline message from the specified reader or buffer.
     * @function decode
     * @memberof UsrOffline
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {UsrOffline} UsrOffline
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UsrOffline.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.UsrOffline();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.uid = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a UsrOffline message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof UsrOffline
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {UsrOffline} UsrOffline
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UsrOffline.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a UsrOffline message.
     * @function verify
     * @memberof UsrOffline
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    UsrOffline.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        return null;
    };

    /**
     * Creates a UsrOffline message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UsrOffline
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {UsrOffline} UsrOffline
     */
    UsrOffline.fromObject = function fromObject(object) {
        if (object instanceof $root.UsrOffline)
            return object;
        var message = new $root.UsrOffline();
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

    /**
     * Creates a plain object from a UsrOffline message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UsrOffline
     * @static
     * @param {UsrOffline} message UsrOffline
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UsrOffline.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        return object;
    };

    /**
     * Converts this UsrOffline to JSON.
     * @function toJSON
     * @memberof UsrOffline
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UsrOffline.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UsrOffline;
})();

$root.Signup = (function() {

    /**
     * Properties of a Signup.
     * @exports ISignup
     * @interface ISignup
     * @property {number|Long|null} [sign] Signup sign
     * @property {number|Long|null} [phone] Signup phone
     * @property {string|null} [nickName] Signup nickName
     * @property {string|null} [avatar] Signup avatar
     * @property {string|null} [pic] Signup pic
     * @property {boolean|null} [gold] Signup gold
     * @property {boolean|null} [verified] Signup verified
     */

    /**
     * Constructs a new Signup.
     * @exports Signup
     * @classdesc Represents a Signup.
     * @implements ISignup
     * @constructor
     * @param {ISignup=} [properties] Properties to set
     */
    function Signup(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Signup sign.
     * @member {number|Long} sign
     * @memberof Signup
     * @instance
     */
    Signup.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Signup phone.
     * @member {number|Long} phone
     * @memberof Signup
     * @instance
     */
    Signup.prototype.phone = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Signup nickName.
     * @member {string} nickName
     * @memberof Signup
     * @instance
     */
    Signup.prototype.nickName = "";

    /**
     * Signup avatar.
     * @member {string} avatar
     * @memberof Signup
     * @instance
     */
    Signup.prototype.avatar = "";

    /**
     * Signup pic.
     * @member {string} pic
     * @memberof Signup
     * @instance
     */
    Signup.prototype.pic = "";

    /**
     * Signup gold.
     * @member {boolean} gold
     * @memberof Signup
     * @instance
     */
    Signup.prototype.gold = false;

    /**
     * Signup verified.
     * @member {boolean} verified
     * @memberof Signup
     * @instance
     */
    Signup.prototype.verified = false;

    /**
     * Creates a new Signup instance using the specified properties.
     * @function create
     * @memberof Signup
     * @static
     * @param {ISignup=} [properties] Properties to set
     * @returns {Signup} Signup instance
     */
    Signup.create = function create(properties) {
        return new Signup(properties);
    };

    /**
     * Encodes the specified Signup message. Does not implicitly {@link Signup.verify|verify} messages.
     * @function encode
     * @memberof Signup
     * @static
     * @param {ISignup} message Signup message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Signup.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.phone != null && Object.hasOwnProperty.call(message, "phone"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.phone);
        if (message.nickName != null && Object.hasOwnProperty.call(message, "nickName"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.nickName);
        if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.avatar);
        if (message.pic != null && Object.hasOwnProperty.call(message, "pic"))
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.pic);
        if (message.gold != null && Object.hasOwnProperty.call(message, "gold"))
            writer.uint32(/* id 6, wireType 0 =*/48).bool(message.gold);
        if (message.verified != null && Object.hasOwnProperty.call(message, "verified"))
            writer.uint32(/* id 7, wireType 0 =*/56).bool(message.verified);
        return writer;
    };

    /**
     * Encodes the specified Signup message, length delimited. Does not implicitly {@link Signup.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Signup
     * @static
     * @param {ISignup} message Signup message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Signup.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Signup message from the specified reader or buffer.
     * @function decode
     * @memberof Signup
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Signup} Signup
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Signup.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Signup();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.phone = reader.int64();
                break;
            case 3:
                message.nickName = reader.string();
                break;
            case 4:
                message.avatar = reader.string();
                break;
            case 5:
                message.pic = reader.string();
                break;
            case 6:
                message.gold = reader.bool();
                break;
            case 7:
                message.verified = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Signup message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Signup
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Signup} Signup
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Signup.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Signup message.
     * @function verify
     * @memberof Signup
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Signup.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.phone != null && message.hasOwnProperty("phone"))
            if (!$util.isInteger(message.phone) && !(message.phone && $util.isInteger(message.phone.low) && $util.isInteger(message.phone.high)))
                return "phone: integer|Long expected";
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            if (!$util.isString(message.nickName))
                return "nickName: string expected";
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            if (!$util.isString(message.avatar))
                return "avatar: string expected";
        if (message.pic != null && message.hasOwnProperty("pic"))
            if (!$util.isString(message.pic))
                return "pic: string expected";
        if (message.gold != null && message.hasOwnProperty("gold"))
            if (typeof message.gold !== "boolean")
                return "gold: boolean expected";
        if (message.verified != null && message.hasOwnProperty("verified"))
            if (typeof message.verified !== "boolean")
                return "verified: boolean expected";
        return null;
    };

    /**
     * Creates a Signup message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Signup
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Signup} Signup
     */
    Signup.fromObject = function fromObject(object) {
        if (object instanceof $root.Signup)
            return object;
        var message = new $root.Signup();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.phone != null)
            if ($util.Long)
                (message.phone = $util.Long.fromValue(object.phone)).unsigned = false;
            else if (typeof object.phone === "string")
                message.phone = parseInt(object.phone, 10);
            else if (typeof object.phone === "number")
                message.phone = object.phone;
            else if (typeof object.phone === "object")
                message.phone = new $util.LongBits(object.phone.low >>> 0, object.phone.high >>> 0).toNumber();
        if (object.nickName != null)
            message.nickName = String(object.nickName);
        if (object.avatar != null)
            message.avatar = String(object.avatar);
        if (object.pic != null)
            message.pic = String(object.pic);
        if (object.gold != null)
            message.gold = Boolean(object.gold);
        if (object.verified != null)
            message.verified = Boolean(object.verified);
        return message;
    };

    /**
     * Creates a plain object from a Signup message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Signup
     * @static
     * @param {Signup} message Signup
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Signup.toObject = function toObject(message, options) {
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
                object.phone = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.phone = options.longs === String ? "0" : 0;
            object.nickName = "";
            object.avatar = "";
            object.pic = "";
            object.gold = false;
            object.verified = false;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.phone != null && message.hasOwnProperty("phone"))
            if (typeof message.phone === "number")
                object.phone = options.longs === String ? String(message.phone) : message.phone;
            else
                object.phone = options.longs === String ? $util.Long.prototype.toString.call(message.phone) : options.longs === Number ? new $util.LongBits(message.phone.low >>> 0, message.phone.high >>> 0).toNumber() : message.phone;
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            object.nickName = message.nickName;
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            object.avatar = message.avatar;
        if (message.pic != null && message.hasOwnProperty("pic"))
            object.pic = message.pic;
        if (message.gold != null && message.hasOwnProperty("gold"))
            object.gold = message.gold;
        if (message.verified != null && message.hasOwnProperty("verified"))
            object.verified = message.verified;
        return object;
    };

    /**
     * Converts this Signup to JSON.
     * @function toJSON
     * @memberof Signup
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Signup.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Signup;
})();

$root.FetchSpark = (function() {

    /**
     * Properties of a FetchSpark.
     * @exports IFetchSpark
     * @interface IFetchSpark
     * @property {number|Long|null} [sign] FetchSpark sign
     */

    /**
     * Constructs a new FetchSpark.
     * @exports FetchSpark
     * @classdesc Represents a FetchSpark.
     * @implements IFetchSpark
     * @constructor
     * @param {IFetchSpark=} [properties] Properties to set
     */
    function FetchSpark(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * FetchSpark sign.
     * @member {number|Long} sign
     * @memberof FetchSpark
     * @instance
     */
    FetchSpark.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new FetchSpark instance using the specified properties.
     * @function create
     * @memberof FetchSpark
     * @static
     * @param {IFetchSpark=} [properties] Properties to set
     * @returns {FetchSpark} FetchSpark instance
     */
    FetchSpark.create = function create(properties) {
        return new FetchSpark(properties);
    };

    /**
     * Encodes the specified FetchSpark message. Does not implicitly {@link FetchSpark.verify|verify} messages.
     * @function encode
     * @memberof FetchSpark
     * @static
     * @param {IFetchSpark} message FetchSpark message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FetchSpark.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        return writer;
    };

    /**
     * Encodes the specified FetchSpark message, length delimited. Does not implicitly {@link FetchSpark.verify|verify} messages.
     * @function encodeDelimited
     * @memberof FetchSpark
     * @static
     * @param {IFetchSpark} message FetchSpark message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    FetchSpark.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a FetchSpark message from the specified reader or buffer.
     * @function decode
     * @memberof FetchSpark
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {FetchSpark} FetchSpark
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FetchSpark.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.FetchSpark();
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

    /**
     * Decodes a FetchSpark message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof FetchSpark
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {FetchSpark} FetchSpark
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    FetchSpark.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a FetchSpark message.
     * @function verify
     * @memberof FetchSpark
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    FetchSpark.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        return null;
    };

    /**
     * Creates a FetchSpark message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof FetchSpark
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {FetchSpark} FetchSpark
     */
    FetchSpark.fromObject = function fromObject(object) {
        if (object instanceof $root.FetchSpark)
            return object;
        var message = new $root.FetchSpark();
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

    /**
     * Creates a plain object from a FetchSpark message. Also converts values to other types if specified.
     * @function toObject
     * @memberof FetchSpark
     * @static
     * @param {FetchSpark} message FetchSpark
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    FetchSpark.toObject = function toObject(message, options) {
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

    /**
     * Converts this FetchSpark to JSON.
     * @function toJSON
     * @memberof FetchSpark
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    FetchSpark.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return FetchSpark;
})();

$root.Spark = (function() {

    /**
     * Properties of a Spark.
     * @exports ISpark
     * @interface ISpark
     * @property {number|Long|null} [uid] Spark uid
     * @property {string|null} [nickName] Spark nickName
     * @property {string|null} [avatar] Spark avatar
     * @property {string|null} [pic] Spark pic
     */

    /**
     * Constructs a new Spark.
     * @exports Spark
     * @classdesc Represents a Spark.
     * @implements ISpark
     * @constructor
     * @param {ISpark=} [properties] Properties to set
     */
    function Spark(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Spark uid.
     * @member {number|Long} uid
     * @memberof Spark
     * @instance
     */
    Spark.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Spark nickName.
     * @member {string} nickName
     * @memberof Spark
     * @instance
     */
    Spark.prototype.nickName = "";

    /**
     * Spark avatar.
     * @member {string} avatar
     * @memberof Spark
     * @instance
     */
    Spark.prototype.avatar = "";

    /**
     * Spark pic.
     * @member {string} pic
     * @memberof Spark
     * @instance
     */
    Spark.prototype.pic = "";

    /**
     * Creates a new Spark instance using the specified properties.
     * @function create
     * @memberof Spark
     * @static
     * @param {ISpark=} [properties] Properties to set
     * @returns {Spark} Spark instance
     */
    Spark.create = function create(properties) {
        return new Spark(properties);
    };

    /**
     * Encodes the specified Spark message. Does not implicitly {@link Spark.verify|verify} messages.
     * @function encode
     * @memberof Spark
     * @static
     * @param {ISpark} message Spark message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Spark.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uid);
        if (message.nickName != null && Object.hasOwnProperty.call(message, "nickName"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickName);
        if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.avatar);
        if (message.pic != null && Object.hasOwnProperty.call(message, "pic"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.pic);
        return writer;
    };

    /**
     * Encodes the specified Spark message, length delimited. Does not implicitly {@link Spark.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Spark
     * @static
     * @param {ISpark} message Spark message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Spark.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Spark message from the specified reader or buffer.
     * @function decode
     * @memberof Spark
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Spark} Spark
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Spark.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Spark();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.uid = reader.int64();
                break;
            case 2:
                message.nickName = reader.string();
                break;
            case 3:
                message.avatar = reader.string();
                break;
            case 4:
                message.pic = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Spark message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Spark
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Spark} Spark
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Spark.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Spark message.
     * @function verify
     * @memberof Spark
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Spark.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                return "uid: integer|Long expected";
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            if (!$util.isString(message.nickName))
                return "nickName: string expected";
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            if (!$util.isString(message.avatar))
                return "avatar: string expected";
        if (message.pic != null && message.hasOwnProperty("pic"))
            if (!$util.isString(message.pic))
                return "pic: string expected";
        return null;
    };

    /**
     * Creates a Spark message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Spark
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Spark} Spark
     */
    Spark.fromObject = function fromObject(object) {
        if (object instanceof $root.Spark)
            return object;
        var message = new $root.Spark();
        if (object.uid != null)
            if ($util.Long)
                (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
            else if (typeof object.uid === "string")
                message.uid = parseInt(object.uid, 10);
            else if (typeof object.uid === "number")
                message.uid = object.uid;
            else if (typeof object.uid === "object")
                message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
        if (object.nickName != null)
            message.nickName = String(object.nickName);
        if (object.avatar != null)
            message.avatar = String(object.avatar);
        if (object.pic != null)
            message.pic = String(object.pic);
        return message;
    };

    /**
     * Creates a plain object from a Spark message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Spark
     * @static
     * @param {Spark} message Spark
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Spark.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.uid = options.longs === String ? "0" : 0;
            object.nickName = "";
            object.avatar = "";
            object.pic = "";
        }
        if (message.uid != null && message.hasOwnProperty("uid"))
            if (typeof message.uid === "number")
                object.uid = options.longs === String ? String(message.uid) : message.uid;
            else
                object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
        if (message.nickName != null && message.hasOwnProperty("nickName"))
            object.nickName = message.nickName;
        if (message.avatar != null && message.hasOwnProperty("avatar"))
            object.avatar = message.avatar;
        if (message.pic != null && message.hasOwnProperty("pic"))
            object.pic = message.pic;
        return object;
    };

    /**
     * Converts this Spark to JSON.
     * @function toJSON
     * @memberof Spark
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Spark.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Spark;
})();

$root.Sparks = (function() {

    /**
     * Properties of a Sparks.
     * @exports ISparks
     * @interface ISparks
     * @property {number|Long|null} [sign] Sparks sign
     * @property {Array.<ISpark>|null} [sparks] Sparks sparks
     */

    /**
     * Constructs a new Sparks.
     * @exports Sparks
     * @classdesc Represents a Sparks.
     * @implements ISparks
     * @constructor
     * @param {ISparks=} [properties] Properties to set
     */
    function Sparks(properties) {
        this.sparks = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Sparks sign.
     * @member {number|Long} sign
     * @memberof Sparks
     * @instance
     */
    Sparks.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Sparks sparks.
     * @member {Array.<ISpark>} sparks
     * @memberof Sparks
     * @instance
     */
    Sparks.prototype.sparks = $util.emptyArray;

    /**
     * Creates a new Sparks instance using the specified properties.
     * @function create
     * @memberof Sparks
     * @static
     * @param {ISparks=} [properties] Properties to set
     * @returns {Sparks} Sparks instance
     */
    Sparks.create = function create(properties) {
        return new Sparks(properties);
    };

    /**
     * Encodes the specified Sparks message. Does not implicitly {@link Sparks.verify|verify} messages.
     * @function encode
     * @memberof Sparks
     * @static
     * @param {ISparks} message Sparks message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Sparks.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.sparks != null && message.sparks.length)
            for (var i = 0; i < message.sparks.length; ++i)
                $root.Spark.encode(message.sparks[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified Sparks message, length delimited. Does not implicitly {@link Sparks.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Sparks
     * @static
     * @param {ISparks} message Sparks message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Sparks.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Sparks message from the specified reader or buffer.
     * @function decode
     * @memberof Sparks
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Sparks} Sparks
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Sparks.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Sparks();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                if (!(message.sparks && message.sparks.length))
                    message.sparks = [];
                message.sparks.push($root.Spark.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Sparks message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Sparks
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Sparks} Sparks
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Sparks.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Sparks message.
     * @function verify
     * @memberof Sparks
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Sparks.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.sparks != null && message.hasOwnProperty("sparks")) {
            if (!Array.isArray(message.sparks))
                return "sparks: array expected";
            for (var i = 0; i < message.sparks.length; ++i) {
                var error = $root.Spark.verify(message.sparks[i]);
                if (error)
                    return "sparks." + error;
            }
        }
        return null;
    };

    /**
     * Creates a Sparks message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Sparks
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Sparks} Sparks
     */
    Sparks.fromObject = function fromObject(object) {
        if (object instanceof $root.Sparks)
            return object;
        var message = new $root.Sparks();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.sparks) {
            if (!Array.isArray(object.sparks))
                throw TypeError(".Sparks.sparks: array expected");
            message.sparks = [];
            for (var i = 0; i < object.sparks.length; ++i) {
                if (typeof object.sparks[i] !== "object")
                    throw TypeError(".Sparks.sparks: object expected");
                message.sparks[i] = $root.Spark.fromObject(object.sparks[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a Sparks message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Sparks
     * @static
     * @param {Sparks} message Sparks
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Sparks.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.sparks = [];
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
        if (message.sparks && message.sparks.length) {
            object.sparks = [];
            for (var j = 0; j < message.sparks.length; ++j)
                object.sparks[j] = $root.Spark.toObject(message.sparks[j], options);
        }
        return object;
    };

    /**
     * Converts this Sparks to JSON.
     * @function toJSON
     * @memberof Sparks
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Sparks.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Sparks;
})();

$root.GetImToken = (function() {

    /**
     * Properties of a GetImToken.
     * @exports IGetImToken
     * @interface IGetImToken
     * @property {number|Long|null} [sign] GetImToken sign
     * @property {number|Long|null} [phone] GetImToken phone
     */

    /**
     * Constructs a new GetImToken.
     * @exports GetImToken
     * @classdesc Represents a GetImToken.
     * @implements IGetImToken
     * @constructor
     * @param {IGetImToken=} [properties] Properties to set
     */
    function GetImToken(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GetImToken sign.
     * @member {number|Long} sign
     * @memberof GetImToken
     * @instance
     */
    GetImToken.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * GetImToken phone.
     * @member {number|Long} phone
     * @memberof GetImToken
     * @instance
     */
    GetImToken.prototype.phone = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new GetImToken instance using the specified properties.
     * @function create
     * @memberof GetImToken
     * @static
     * @param {IGetImToken=} [properties] Properties to set
     * @returns {GetImToken} GetImToken instance
     */
    GetImToken.create = function create(properties) {
        return new GetImToken(properties);
    };

    /**
     * Encodes the specified GetImToken message. Does not implicitly {@link GetImToken.verify|verify} messages.
     * @function encode
     * @memberof GetImToken
     * @static
     * @param {IGetImToken} message GetImToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetImToken.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        if (message.phone != null && Object.hasOwnProperty.call(message, "phone"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.phone);
        return writer;
    };

    /**
     * Encodes the specified GetImToken message, length delimited. Does not implicitly {@link GetImToken.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GetImToken
     * @static
     * @param {IGetImToken} message GetImToken message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GetImToken.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GetImToken message from the specified reader or buffer.
     * @function decode
     * @memberof GetImToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GetImToken} GetImToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetImToken.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GetImToken();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.sign = reader.int64();
                break;
            case 2:
                message.phone = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GetImToken message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GetImToken
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GetImToken} GetImToken
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GetImToken.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GetImToken message.
     * @function verify
     * @memberof GetImToken
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GetImToken.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        if (message.phone != null && message.hasOwnProperty("phone"))
            if (!$util.isInteger(message.phone) && !(message.phone && $util.isInteger(message.phone.low) && $util.isInteger(message.phone.high)))
                return "phone: integer|Long expected";
        return null;
    };

    /**
     * Creates a GetImToken message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GetImToken
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GetImToken} GetImToken
     */
    GetImToken.fromObject = function fromObject(object) {
        if (object instanceof $root.GetImToken)
            return object;
        var message = new $root.GetImToken();
        if (object.sign != null)
            if ($util.Long)
                (message.sign = $util.Long.fromValue(object.sign)).unsigned = false;
            else if (typeof object.sign === "string")
                message.sign = parseInt(object.sign, 10);
            else if (typeof object.sign === "number")
                message.sign = object.sign;
            else if (typeof object.sign === "object")
                message.sign = new $util.LongBits(object.sign.low >>> 0, object.sign.high >>> 0).toNumber();
        if (object.phone != null)
            if ($util.Long)
                (message.phone = $util.Long.fromValue(object.phone)).unsigned = false;
            else if (typeof object.phone === "string")
                message.phone = parseInt(object.phone, 10);
            else if (typeof object.phone === "number")
                message.phone = object.phone;
            else if (typeof object.phone === "object")
                message.phone = new $util.LongBits(object.phone.low >>> 0, object.phone.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a GetImToken message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GetImToken
     * @static
     * @param {GetImToken} message GetImToken
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GetImToken.toObject = function toObject(message, options) {
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
                object.phone = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.phone = options.longs === String ? "0" : 0;
        }
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (typeof message.sign === "number")
                object.sign = options.longs === String ? String(message.sign) : message.sign;
            else
                object.sign = options.longs === String ? $util.Long.prototype.toString.call(message.sign) : options.longs === Number ? new $util.LongBits(message.sign.low >>> 0, message.sign.high >>> 0).toNumber() : message.sign;
        if (message.phone != null && message.hasOwnProperty("phone"))
            if (typeof message.phone === "number")
                object.phone = options.longs === String ? String(message.phone) : message.phone;
            else
                object.phone = options.longs === String ? $util.Long.prototype.toString.call(message.phone) : options.longs === Number ? new $util.LongBits(message.phone.low >>> 0, message.phone.high >>> 0).toNumber() : message.phone;
        return object;
    };

    /**
     * Converts this GetImToken to JSON.
     * @function toJSON
     * @memberof GetImToken
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GetImToken.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GetImToken;
})();

$root.RobotOn = (function() {

    /**
     * Properties of a RobotOn.
     * @exports IRobotOn
     * @interface IRobotOn
     * @property {number|Long|null} [sign] RobotOn sign
     */

    /**
     * Constructs a new RobotOn.
     * @exports RobotOn
     * @classdesc Represents a RobotOn.
     * @implements IRobotOn
     * @constructor
     * @param {IRobotOn=} [properties] Properties to set
     */
    function RobotOn(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RobotOn sign.
     * @member {number|Long} sign
     * @memberof RobotOn
     * @instance
     */
    RobotOn.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new RobotOn instance using the specified properties.
     * @function create
     * @memberof RobotOn
     * @static
     * @param {IRobotOn=} [properties] Properties to set
     * @returns {RobotOn} RobotOn instance
     */
    RobotOn.create = function create(properties) {
        return new RobotOn(properties);
    };

    /**
     * Encodes the specified RobotOn message. Does not implicitly {@link RobotOn.verify|verify} messages.
     * @function encode
     * @memberof RobotOn
     * @static
     * @param {IRobotOn} message RobotOn message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotOn.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        return writer;
    };

    /**
     * Encodes the specified RobotOn message, length delimited. Does not implicitly {@link RobotOn.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RobotOn
     * @static
     * @param {IRobotOn} message RobotOn message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotOn.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RobotOn message from the specified reader or buffer.
     * @function decode
     * @memberof RobotOn
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RobotOn} RobotOn
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotOn.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RobotOn();
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

    /**
     * Decodes a RobotOn message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RobotOn
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RobotOn} RobotOn
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotOn.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RobotOn message.
     * @function verify
     * @memberof RobotOn
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RobotOn.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        return null;
    };

    /**
     * Creates a RobotOn message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RobotOn
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RobotOn} RobotOn
     */
    RobotOn.fromObject = function fromObject(object) {
        if (object instanceof $root.RobotOn)
            return object;
        var message = new $root.RobotOn();
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

    /**
     * Creates a plain object from a RobotOn message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RobotOn
     * @static
     * @param {RobotOn} message RobotOn
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RobotOn.toObject = function toObject(message, options) {
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

    /**
     * Converts this RobotOn to JSON.
     * @function toJSON
     * @memberof RobotOn
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RobotOn.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RobotOn;
})();

$root.RobotOff = (function() {

    /**
     * Properties of a RobotOff.
     * @exports IRobotOff
     * @interface IRobotOff
     * @property {number|Long|null} [sign] RobotOff sign
     */

    /**
     * Constructs a new RobotOff.
     * @exports RobotOff
     * @classdesc Represents a RobotOff.
     * @implements IRobotOff
     * @constructor
     * @param {IRobotOff=} [properties] Properties to set
     */
    function RobotOff(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * RobotOff sign.
     * @member {number|Long} sign
     * @memberof RobotOff
     * @instance
     */
    RobotOff.prototype.sign = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new RobotOff instance using the specified properties.
     * @function create
     * @memberof RobotOff
     * @static
     * @param {IRobotOff=} [properties] Properties to set
     * @returns {RobotOff} RobotOff instance
     */
    RobotOff.create = function create(properties) {
        return new RobotOff(properties);
    };

    /**
     * Encodes the specified RobotOff message. Does not implicitly {@link RobotOff.verify|verify} messages.
     * @function encode
     * @memberof RobotOff
     * @static
     * @param {IRobotOff} message RobotOff message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotOff.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sign != null && Object.hasOwnProperty.call(message, "sign"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.sign);
        return writer;
    };

    /**
     * Encodes the specified RobotOff message, length delimited. Does not implicitly {@link RobotOff.verify|verify} messages.
     * @function encodeDelimited
     * @memberof RobotOff
     * @static
     * @param {IRobotOff} message RobotOff message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    RobotOff.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a RobotOff message from the specified reader or buffer.
     * @function decode
     * @memberof RobotOff
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {RobotOff} RobotOff
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotOff.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.RobotOff();
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

    /**
     * Decodes a RobotOff message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof RobotOff
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {RobotOff} RobotOff
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    RobotOff.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a RobotOff message.
     * @function verify
     * @memberof RobotOff
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    RobotOff.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.sign != null && message.hasOwnProperty("sign"))
            if (!$util.isInteger(message.sign) && !(message.sign && $util.isInteger(message.sign.low) && $util.isInteger(message.sign.high)))
                return "sign: integer|Long expected";
        return null;
    };

    /**
     * Creates a RobotOff message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof RobotOff
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {RobotOff} RobotOff
     */
    RobotOff.fromObject = function fromObject(object) {
        if (object instanceof $root.RobotOff)
            return object;
        var message = new $root.RobotOff();
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

    /**
     * Creates a plain object from a RobotOff message. Also converts values to other types if specified.
     * @function toObject
     * @memberof RobotOff
     * @static
     * @param {RobotOff} message RobotOff
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    RobotOff.toObject = function toObject(message, options) {
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

    /**
     * Converts this RobotOff to JSON.
     * @function toJSON
     * @memberof RobotOff
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    RobotOff.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return RobotOff;
})();

module.exports = $root;
