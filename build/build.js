(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globals = undefined;

var _socketConfig = require('./config/socketConfig');

var _Controller = require('./controllers/Controller');

var globals = exports.globals = {
  constroller: new _Controller.Controller(_socketConfig.socketConfiguration, {})
};

},{"./config/socketConfig":3,"./controllers/Controller":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketHandler = exports.SocketHandler = function () {
  function SocketHandler(onOpen, onClose, onMessage, onError, config) {
    _classCallCheck(this, SocketHandler);

    this.config = config;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onMessage = onMessage;
    this.onError = onError;
  }

  _createClass(SocketHandler, [{
    key: "initConnection",
    value: function initConnection() {
      this._webSocket = new WebSocket(this.config.url);
      this._webSocket.onmessage = this.onMessage;
      this._webSocket.onopen = this.onOpen;
      this._webSocket.onclose = this.onClose;
      this._webSocket.onerror = this.onError;
    }
  }, {
    key: "send",
    value: function send(what) {
      this._webSocket.send(what);
    }
  }]);

  return SocketHandler;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socketConfiguration = exports.socketConfiguration = {
  url: "ws://approxteam.com:8080/CasinoServer/casino"
};

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SocketHandler = require("../communication/SocketHandler");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = exports.Controller = function () {
  function Controller(config, msg) {
    _classCallCheck(this, Controller);

    this.socket = new _SocketHandler.SocketHandler(this.onOpen, this.onMessage, this.onClose, this.onError, config);
    this.socket.initConnection();
    this.connected = false;
  }

  _createClass(Controller, [{
    key: "onOpen",
    value: function onOpen(event) {
      this.connected = true;
      console.log("Connected to server");
    }
  }, {
    key: "onMessage",
    value: function onMessage(event) {}
  }, {
    key: "onClose",
    value: function onClose(event) {
      this.false = true;
    }
  }, {
    key: "onError",
    value: function onError(event) {
      this.false = true;
    }
  }]);

  return Controller;
}();

},{"../communication/SocketHandler":2}]},{},[1])

//# sourceMappingURL=build.js.map
