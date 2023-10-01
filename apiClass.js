const crypto = require("crypto");
const EventEmitter = require( "events" );
const emitter = new EventEmitter();
const WebSocket = require( 'ws' );

module.exports = class XeggexSocketClient extends EventEmitter {
    constructor(apiKey, secretKey, wssHost = "wss://api.xeggex.com"){
        super();

        this._apiKey = apiKey;
        this._secretKey = secretKey;
        this._wssHost = wwsHost || "wss://api.xegge.com";

        this._wss = null;
        this._pingTime = null;
        this._wssOpened = false;
        this._messageId = 0;
        
        this._initWss();
    }
}