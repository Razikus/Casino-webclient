(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globals = undefined;

var _socketConfig = require('./config/socketConfig');

var _Controller = require('./controllers/Controller');

var _msg = require('./config/msg');

var globals = exports.globals = {
  controller: new _Controller.Controller(_socketConfig.socketConfiguration, getLanguageCode(), getParameters())
};

function getLanguageCode() {
  return navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
}

function getParameters() {
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function (item) {
    queryDict[item.split("=")[0]] = item.split("=")[1];
  });
  return queryDict;
}

ko.applyBindings(globals.controller);

},{"./config/msg":6,"./config/socketConfig":10,"./controllers/Controller":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommunicationService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Action = require('./shared/Action');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommunicationService = exports.CommunicationService = function () {
  function CommunicationService(socketHandler, controller) {
    _classCallCheck(this, CommunicationService);

    this.controller = controller;
    this.socketHandler = socketHandler;
  }

  _createClass(CommunicationService, [{
    key: 'send',
    value: function send(what) {
      this.socketHandler.send(what);
    }
  }, {
    key: 'tryRegister',
    value: function tryRegister(nick, password, email) {
      this.send(JSON.stringify(new _Action.RegisterAction(nick, password, email)));
    }
  }, {
    key: 'tryLogin',
    value: function tryLogin(nick, password) {
      this.send(JSON.stringify(new _Action.LoginAction(nick, password)));
    }
  }, {
    key: 'tryActivate',
    value: function tryActivate(GETParameters) {
      if (GETParameters.token !== 'undefined' && GETParameters.nickname !== 'undefined') {
        if (GETParameters.token.length !== 0 && GETParameters.nickname.length !== 0) {
          this.send(JSON.stringify(new _Action.ActivateAction(GETParameters.token, GETParameters.nickname)));
        }
      }
    }
  }]);

  return CommunicationService;
}();

},{"./shared/Action":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketHandler = exports.SocketHandler = function () {
  function SocketHandler(controller, config) {
    _classCallCheck(this, SocketHandler);

    this.config = config;
    this.onOpen = controller.onOpen;
    this.onClose = controller.onClose;
    this.onMessage = controller.messageController.onMessage;
    this.onError = controller.onError;
    this.controller = controller;
  }

  _createClass(SocketHandler, [{
    key: "initConnection",
    value: function initConnection() {
      this._webSocket = new WebSocket(this.config.url);
      this._webSocket.onmessage = this.onMessage;
      this._webSocket.onopen = this.onOpen;
      this._webSocket.onclose = this.onClose;
      this._webSocket.onerror = this.onError;
      this._webSocket.controller = this.controller;
    }
  }, {
    key: "send",
    value: function send(what) {
      this._webSocket.send(what);
    }
  }]);

  return SocketHandler;
}();

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var actionTypes = exports.actionTypes = {
  register: "REGISTER",
  login: "LOGIN",
  activate: "ACCOUNTACTIVATION",
  walletIncrease: "WALLETINCREASE"
};

var Action = exports.Action = function Action(type) {
  _classCallCheck(this, Action);

  this.type = type;
};

var RegisterAction = exports.RegisterAction = function (_Action) {
  _inherits(RegisterAction, _Action);

  function RegisterAction(login, password, email) {
    _classCallCheck(this, RegisterAction);

    var _this = _possibleConstructorReturn(this, (RegisterAction.__proto__ || Object.getPrototypeOf(RegisterAction)).call(this, actionTypes.register));

    _this.args = {
      login: login,
      password: password,
      email: email
    };
    return _this;
  }

  return RegisterAction;
}(Action);

var LoginAction = exports.LoginAction = function (_Action2) {
  _inherits(LoginAction, _Action2);

  function LoginAction(login, password) {
    _classCallCheck(this, LoginAction);

    var _this2 = _possibleConstructorReturn(this, (LoginAction.__proto__ || Object.getPrototypeOf(LoginAction)).call(this, actionTypes.login));

    _this2.args = {
      login: login,
      password: password
    };
    return _this2;
  }

  return LoginAction;
}(Action);

var ActivateAction = exports.ActivateAction = function (_Action3) {
  _inherits(ActivateAction, _Action3);

  function ActivateAction(token, nickname) {
    _classCallCheck(this, ActivateAction);

    var _this3 = _possibleConstructorReturn(this, (ActivateAction.__proto__ || Object.getPrototypeOf(ActivateAction)).call(this, actionTypes.activate));

    _this3.args = {
      token: token,
      nickname: nickname
    };
    return _this3;
  }

  return ActivateAction;
}(Action);

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = exports.Response = function Response(type, description, notifyType, notifyState, args) {
  _classCallCheck(this, Response);

  this.type = type;
  this.description = description;
  this.notifyType = notifyType;
  this.notifyState = notifyState;
  this.args = args;
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getMessageBundle = getMessageBundle;

var _msgConfig = require('./msgConfig');

var _logger = require('../logger/logger');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageService = exports.MessageService = function () {
  function MessageService(code) {
    _classCallCheck(this, MessageService);

    this.code = code;
    this.bundle = getMessageBundle(code);
    if (code !== _msgConfig.msgConfig.defaultLanguageCode) {
      this.defaultBundle = getMessageBundle(_msgConfig.msgConfig.defaultLanguageCode);
    }
  }

  _createClass(MessageService, [{
    key: 'msg',
    value: function msg(label) {
      var result = this.bundle.msg[label];
      if (result) {
        return result;
      } else if (this.defaultBundle != undefined && this.defaultBundle.msg[label]) {
        return this.defaultBundle.msg[label];
      } else {
        return '[' + label + ']';
      }
    }
  }]);

  return MessageService;
}();

function getMessageBundle(code) {
  (0, _logger.info)('Loading msg bundle: ' + code);
  var bundle = getBundleFor(code);
  if (!bundle) {
    bundle = getBundleFor(_msgConfig.msgConfig.defaultLanguage);
    if (bundle) {
      return bundle;
    } else {
      throw "No default bundle. Check configuration, and files. Aborting";
    }
  }
  return bundle;
}

function getBundleFor(code) {
  switch (code) {
    case "en":
      return require("./msg/msg-en.js");
    case "pl":
      return require("./msg/msg-pl.js");
    default:
      (0, _logger.warn)('No msg bundle for code: ' + code + ' loading default bundle for language: ' + _msgConfig.msgConfig.defaultLanguageCode);
      return require(_msgConfig.msgConfig.defaultLanguagePath);
  }
}

},{"../logger/logger":14,"./msg/msg-en.js":8,"./msg/msg-pl.js":9,"./msgConfig":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var msgConfig = exports.msgConfig = {
  defaultLanguagePath: './msg/msg-en.js',
  defaultLanguageCode: 'en'
};

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var msg = exports.msg = {
  connected: "Connected",
  "connected-text": "Successfully connected to casino, good luck!",
  "ERROR": "Error",
  "EMAIL_OR_LOGIN_EXISTS": "Email or login exists",
  "connection": "Connected",
  "avalaibleCoinsTitle": "Avalaible chips",
  "basketGameBank": "Sum of bank of the 'Basket' game",
  "onlinePlayers": "Online players"
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var msg = exports.msg = {
  connected: "Połączono!",
  "connected-text": "Pomyślnie połączono z kasynem!",
  "ERROR": "Error",
  "EMAIL_OR_LOGIN_EXISTS": "Email lub login istnieje",
  "connection": "Połączono",
  "avalaibleCoinsTitle": "Dostępne żetony",
  "basketGameBank": "Pula nagród w grze 'Basket'",
  "onlinePlayers": "Grający teraz"
};

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socketConfiguration = exports.socketConfiguration = {
  url: "ws://localhost:8080/CasinoServer/casino"
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SocketHandler = require('../communication/SocketHandler');

var _CommunicationService = require('../communication/CommunicationService');

var _MessageController = require('./MessageController');

var _msg = require('../config/msg');

var _logger = require('../logger/logger');

var _toaster = require('../views/utils/toaster');

var _DevService = require('../dev/DevService');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = exports.Controller = function () {
  function Controller(config, languageCode, optionalGetParameters) {
    var _this = this;

    _classCallCheck(this, Controller);

    this.messageService = new _msg.MessageService(languageCode);
    this.devService = new _DevService.DevService(this);
    this.messageController = new _MessageController.MessageController(this, this.messageService);
    this.socketConfig = config;
    this.connected = ko.observable(false);
    this.socketHandler = new _SocketHandler.SocketHandler(this, config);
    this.socketHandler.initConnection();

    this.connectionStatusClass = ko.pureComputed(function () {
      return this.connected() ? "fa fa-check-circle-o success" : 'fa fa-times-circle-o error';
    }, this);

    this.communicationService = new _CommunicationService.CommunicationService(this.socketHandler, this);

    this.subscribe("connected", function (value) {
      if (value) {
        (0, _toaster.makDefaultInfoToast)(_this.msg("connected"), _this.msg("connected-text"));
        if (optionalGetParameters) {
          _this.processGetParameters(optionalGetParameters);
        }
      }
    });
  }

  // Delegated to WebSocket object- dont use this, have to use - this.controller


  _createClass(Controller, [{
    key: 'onOpen',
    value: function onOpen(event) {
      (0, _logger.info)('Connected to server ' + this.controller.socketConfig.url);
      this.controller.connected(true);
    }
    // Delegated to WebSocket object- dont use this, have to use - this.controller

  }, {
    key: 'onClose',
    value: function onClose(event) {
      (0, _logger.warn)("Server closed connection.");
      this.controller.connected(false);
    }
    // Delegated to WebSocket object- dont use this, have to use - this.controller

  }, {
    key: 'onError',
    value: function onError(event) {
      (0, _logger.warn)("Something wrong with connection.");
      this.controller.connected(false);
    }
  }, {
    key: 'send',
    value: function send(what) {
      this.socketHandler.send(what);
    }
  }, {
    key: 'subscribe',
    value: function subscribe(observableName, func) {
      if (this[observableName]) {
        this[observableName].subscribe(func);
      }
    }
  }, {
    key: 'msg',
    value: function msg(label) {
      return this.messageService.msg(label);
    }
  }, {
    key: 'processGetParameters',
    value: function processGetParameters(optionalGetParameters) {
      if (optionalGetParameters.token != undefined && optionalGetParameters.nickname != undefined) {
        this.communicationService.tryActivate(optionalGetParameters);
      }
    }
  }]);

  return Controller;
}();

},{"../communication/CommunicationService":2,"../communication/SocketHandler":3,"../config/msg":6,"../dev/DevService":13,"../logger/logger":14,"../views/utils/toaster":15,"./MessageController":12}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Response = require('../communication/shared/Response');

var _toaster = require('../views/utils/toaster');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageController = exports.MessageController = function () {
  function MessageController(controller, messageService) {
    _classCallCheck(this, MessageController);

    this.controller = controller;
    this.messageService = messageService;
  }

  _createClass(MessageController, [{
    key: 'onMessage',
    value: function onMessage(event) {
      this.controller.messageController.recognizeEvent(event);
    }
  }, {
    key: 'recognizeEvent',
    value: function recognizeEvent(event) {
      if (event.type === 'message') {
        this.recognizeMessage(event);
      }
    }
  }, {
    key: 'recognizeMessage',
    value: function recognizeMessage(event) {
      var obj = JSON.parse(event.data);
      if (obj.className !== 'undefined') {
        this.recognizeClass(obj);
      }
    }
  }, {
    key: 'recognizeClass',
    value: function recognizeClass(object) {
      if (object.className === 'Response') {
        var response = new _Response.Response(object.type, object.description, object.notifyType, object.notifyState, object.args);

        if (response.notifyType == "TOAST") {
          (0, _toaster.makeDefaultToast)(this.messageService.msg(response.notifyState), this.messageService.msg(response.description), response.notifyState.toLowerCase());
        }
      }
    }
  }]);

  return MessageController;
}();

},{"../communication/shared/Response":5,"../views/utils/toaster":15}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DevService = exports.DevService = function () {
  function DevService(controller) {
    _classCallCheck(this, DevService);

    var self = this;
    this.controller = controller;
    this.argName = ko.observable();
    this.argValue = ko.observable();

    this.devAction = ko.observable({
      type: ko.observable(""),
      args: ko.observable({})
    });
    this.devJson = ko.computed(function () {
      return ko.toJSON(this.devAction());
    }, this);

    this.addArg = function () {
      var current = self.devAction().args();
      var index = self.argName();
      current[index] = ko.observable(self.argValue());
      self.devAction().args(current);
    };
    this.devArgs = ko.computed(function () {
      var args = self.devAction().args();
      return Object.keys(args);
    }, this);
    this.devSend = function () {
      self.controller.send(self.devJson());
    };
    this.devValueFor = function (key) {
      return self.devAction().args()[key];
    };
    this.removeArg = function (key) {
      var current = self.devAction().args();
      var index = key;
      delete current[index];
      self.devAction().args(current);
    };
    var randomString = this.randomString(8);

    this.actions = [{ type: ko.observable("REGISTER"), args: ko.observable({ login: ko.observable(randomString), password: ko.observable(randomString), email: ko.observable("") }) }, { type: ko.observable("LOGIN"), args: ko.observable({ login: ko.observable(randomString), password: ko.observable(randomString) }) }, { type: ko.observable("ACCOUNTACTIVATION"), args: ko.observable({ token: ko.observable(""), nickname: ko.observable(randomString) }) }, { type: ko.observable("PASSWORDCHANGEREQUEST"), args: ko.observable({ email: ko.observable(""), newpassword: ko.observable(this.randomString(5)) }) }, { type: ko.observable("PASSWORDCHANGE"), args: ko.observable({ email: ko.observable(""), token: ko.observable("") }) }, { type: ko.observable("MYOWN"), args: ko.observable({}) }];
  }

  _createClass(DevService, [{
    key: "randomString",
    value: function randomString(length) {
      return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
    }
  }]);

  return DevService;
}();

},{}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.warn = warn;
exports.info = info;
function log(what, color) {
  if (color) {
    console.log("%c" + what, "color: " + color);
  } else {
    console.log(what);
  }
}

function warn(what) {
  return log(what, "red");
}

function info(what) {
  return log(what, "green");
}

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeToast = makeToast;
exports.makeDefaultToast = makeDefaultToast;
exports.makDefaultInfoToast = makDefaultInfoToast;
exports.makDefaultSuccessToast = makDefaultSuccessToast;
exports.makDefaultErrorToast = makDefaultErrorToast;
exports.makDefaultWarningToast = makDefaultWarningToast;
function makeToast(heading, text, icon, hideAfter, position) {
  $.toast({
    text: text,
    heading: heading,
    icon: icon,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: hideAfter > 0 ? hideAfter : false,
    stack: 5,
    position: position,

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF'
  });
}

function makeDefaultToast(heading, text, icon) {
  $.toast({
    text: text,
    heading: heading,
    icon: icon,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF'
  });
}

function makDefaultInfoToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.information,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF'
  });
}

function makDefaultSuccessToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.success,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF'
  });
}

function makDefaultErrorToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.error,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF'
  });
}

function makDefaultWarningToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.warning,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF'
  });
}

var iconTypes = exports.iconTypes = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  information: 'info'
};

},{}]},{},[1])

//# sourceMappingURL=build.js.map
