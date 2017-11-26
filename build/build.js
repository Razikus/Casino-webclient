(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentsRegisterer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger/logger');

var _AwesomeButtonLink = require('./views/components/awesomeButtonLink/AwesomeButtonLink');

var _CasinoView = require('./views/components/casinoview/CasinoView');

var _LoginForm = require('./views/components/loginForm/LoginForm');

var _RegisterForm = require('./views/components/registerForm/RegisterForm');

var _PasswordChangeForm = require('./views/components/passwordChangeForm/PasswordChangeForm');

var _AccountInformation = require('./views/components/accountInformation/AccountInformation');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ComponentsRegisterer = exports.ComponentsRegisterer = function () {
  function ComponentsRegisterer() {
    _classCallCheck(this, ComponentsRegisterer);

    this.componentsActive = [];
  }

  _createClass(ComponentsRegisterer, [{
    key: 'registerComponents',
    value: function registerComponents() {
      this.registerAndAddComponent(new _AwesomeButtonLink.AwesomeButtonLink());
      this.registerAndAddComponent(new _CasinoView.CasinoView());
      this.registerAndAddComponent(new _LoginForm.LoginForm());
      this.registerAndAddComponent(new _RegisterForm.RegisterForm());
      this.registerAndAddComponent(new _PasswordChangeForm.PasswordChangeForm());
      this.registerAndAddComponent(new _AccountInformation.AccountInformation());
    }
  }, {
    key: 'registerAndAddComponent',
    value: function registerAndAddComponent(component) {
      component.registerComponent();
      this.componentsActive.push(component);
      (0, _logger.info)('Registered: ' + component.bindingName);
    }
  }]);

  return ComponentsRegisterer;
}();

},{"./logger/logger":17,"./views/components/accountInformation/AccountInformation":19,"./views/components/awesomeButtonLink/AwesomeButtonLink":21,"./views/components/casinoview/CasinoView":23,"./views/components/loginForm/LoginForm":25,"./views/components/passwordChangeForm/PasswordChangeForm":27,"./views/components/registerForm/RegisterForm":29}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.globals = undefined;

var _socketConfig = require('./config/socketConfig');

var _Controller = require('./controllers/Controller');

var _msg = require('./config/msg');

var _ComponentsRegisterer = require('./ComponentsRegisterer');

var globals = exports.globals = {
  controller: new _Controller.Controller(_socketConfig.socketConfiguration, getLanguageCode(), getParameters()),
  componentsRegisterer: new _ComponentsRegisterer.ComponentsRegisterer()
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

globals.componentsRegisterer.registerComponents();

ko.applyBindings(globals.controller);

},{"./ComponentsRegisterer":1,"./config/msg":8,"./config/socketConfig":12,"./controllers/Controller":13}],3:[function(require,module,exports){
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
    key: 'tryChangePassword',
    value: function tryChangePassword(email, newPassword) {
      this.send(JSON.stringify(new _Action.PasswordChangeRequestAction(email, newPassword)));
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
  }, {
    key: 'tryActivatePassword',
    value: function tryActivatePassword(GETParameters) {
      if (GETParameters.token !== 'undefined' && GETParameters.email !== 'undefined') {
        if (GETParameters.token.length !== 0 && GETParameters.email.length !== 0) {
          this.send(JSON.stringify(new _Action.PasswordChangeAction(GETParameters.email, GETParameters.token)));
        }
      }
    }
  }]);

  return CommunicationService;
}();

},{"./shared/Action":5}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
  passwordChangeRequest: "PASSWORDCHANGEREQUEST",
  passwordChange: "PASSWORDCHANGE",
  gunfire: "GUNFIRE"
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
      password: sha256(password),
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
      password: sha256(password)
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

var PasswordChangeRequestAction = exports.PasswordChangeRequestAction = function (_Action4) {
  _inherits(PasswordChangeRequestAction, _Action4);

  function PasswordChangeRequestAction(email, newPassword) {
    _classCallCheck(this, PasswordChangeRequestAction);

    var _this4 = _possibleConstructorReturn(this, (PasswordChangeRequestAction.__proto__ || Object.getPrototypeOf(PasswordChangeRequestAction)).call(this, actionTypes.passwordChangeRequest));

    _this4.args = {
      email: email,
      newPassword: sha256(newPassword)
    };
    return _this4;
  }

  return PasswordChangeRequestAction;
}(Action);

var PasswordChangeAction = exports.PasswordChangeAction = function (_Action5) {
  _inherits(PasswordChangeAction, _Action5);

  function PasswordChangeAction(email, token) {
    _classCallCheck(this, PasswordChangeAction);

    var _this5 = _possibleConstructorReturn(this, (PasswordChangeAction.__proto__ || Object.getPrototypeOf(PasswordChangeAction)).call(this, actionTypes.passwordChange));

    _this5.args = {
      email: email,
      token: token
    };
    return _this5;
  }

  return PasswordChangeAction;
}(Action);

var GunfireAction = exports.GunfireAction = function (_Action6) {
  _inherits(GunfireAction, _Action6);

  function GunfireAction(bid) {
    _classCallCheck(this, GunfireAction);

    var _this6 = _possibleConstructorReturn(this, (GunfireAction.__proto__ || Object.getPrototypeOf(GunfireAction)).call(this, actionTypes.gunfire));

    _this6.args = {
      bid: bid
    };
    return _this6;
  }

  return GunfireAction;
}(Action);

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebClientAction = exports.WebClientAction = function WebClientAction(type, args) {
  _classCallCheck(this, WebClientAction);

  this.type = type;
  this.args = args;
};

},{}],8:[function(require,module,exports){
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

},{"../logger/logger":17,"./msg/msg-en.js":10,"./msg/msg-pl.js":11,"./msgConfig":9}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var msgConfig = exports.msgConfig = {
  defaultLanguagePath: './msg/msg-en.js',
  defaultLanguageCode: 'en'
};

},{}],10:[function(require,module,exports){
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
  "onlinePlayers": "Online players",
  "account": "Account",
  "payments": "Payments",
  "basket": "Basket game",
  "gunner": "Gunner",
  "home": "Home",
  'REFRESHING': 'Refreshing...',
  'TOKEN_IS_ACTIVATED': 'Token is already activated.',
  'NOT_ACTIVATED': 'Account not activated. Check e-mail.',
  'SUCCESSFUL_ACTIVATION': 'Success activation! You can now log-in.',
  'BAD_NICKNAME_OR_TOKEN': 'Bad nickname or token.',
  'SUCCESSFULL_LOGIN': 'Successful login.',
  'SUCCESSFULL_REGISTERED': 'Succsesful register. Check your e-mail!',
  'UNDEFINED_ERROR': 'There was a problem... Please try again later or contact administrator.',
  'SUCCESS': 'Success!',
  'MAIL_WITH_NEXT_STEPS_HAS_BEEN_SENT_TO_YOUR_ADRESS': 'Mail with next steps has been sended to your e-mail.',
  'SORRY_THERE_IS_AN_PROBLEM_WITH_THIS_ACTION_TRY_AGAIN_LATER': 'There was a problem... Please try again later.',
  'PASSWORD_HAS_BEEN_CHANGED': 'Password changed!',
  "notlogged": "Not logged",
  "username": "Username",
  "password": "Password",
  "email": "E-mail",
  "register": "Register",
  "login": "Login",
  "clickHereIfYouWantToLogin": "Click here if you want to login",
  "clickHereIfYouWantToRegister": "Click here if you want to register",
  "clickHereIfYouWantToChangePassword": "Click here if you want to change password",
  "newPassword": "New password",
  "sendRequest": "Send request",
  "BAD_LOGIN_OR_PASSWORD": "Bad login or password",
  "passwordChange": "Password change",
  "accountInformations": "Account informations",
  "nickname": "Nickname",
  "activated": "Activated",
  "balance": "Balance"
};

},{}],11:[function(require,module,exports){
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
  "onlinePlayers": "Grający teraz",
  "account": "Konto",
  "payments": "Płatności",
  "basket": "Koszyczek",
  "gunner": "Rewolwer",
  "home": "Główna",
  'REFRESHING': 'Odświeżam...',
  'TOKEN_IS_ACTIVATED': 'Token jest już aktywowany.'
};

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socketConfiguration = exports.socketConfiguration = {
  url: "ws://approxteam.com:8080/CasinoServer/casino"
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SocketHandler = require('../communication/SocketHandler');

var _CommunicationService = require('../communication/CommunicationService');

var _MessageController = require('./MessageController');

var _ViewController = require('./ViewController');

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
    this.viewController = new _ViewController.ViewController(this);
    this.messageController = new _MessageController.MessageController(this, this.messageService);
    this.socketConfig = config;
    this.connected = ko.observable(false);
    this.socketHandler = new _SocketHandler.SocketHandler(this, config);
    this.socketHandler.initConnection();

    this.balance = ko.observable(this.msg("notlogged"));

    this.state = ko.observable("NOTLOGGED");
    this.isNotLogged = ko.computed(function () {
      return _this.state() == "NOTLOGGED";
    }, this);

    this.connectionStatusClass = ko.pureComputed(function () {
      return this.connected() ? "fa fa-check-circle-o success" : 'fa fa-times-circle-o error';
    }, this);

    this.playersCount = ko.observable(this.msg('REFRESHING'));

    this.communicationService = new _CommunicationService.CommunicationService(this.socketHandler, this);

    this.onSwitchView = function (view) {
      var _this2 = this;

      return function (event) {
        _this2.viewController.switchView(view);
      };
    };

    this.subscribe("connected", function (value) {
      if (value) {
        (0, _toaster.makDefaultInfoToast)(_this.msg("connected"), _this.msg("connected-text"));
        if (optionalGetParameters) {
          _this.processGetParameters(optionalGetParameters);
        }
      }
    });

    this.accountInformation = {
      nickname: ko.observable(""),
      email: ko.observable(""),
      activated: ko.observable("")
    };
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
      if (optionalGetParameters.token != undefined) {
        if (optionalGetParameters.nickname != undefined) {
          this.communicationService.tryActivate(optionalGetParameters);
        } else if (optionalGetParameters.email != undefined) {
          this.communicationService.tryActivatePassword(optionalGetParameters);
        }
      }
    }
  }]);

  return Controller;
}();

},{"../communication/CommunicationService":3,"../communication/SocketHandler":4,"../config/msg":8,"../dev/DevService":16,"../logger/logger":17,"../views/utils/toaster":31,"./MessageController":14,"./ViewController":15}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Response = require('../communication/shared/Response');

var _WebClientAction = require('../communication/shared/WebClientAction');

var _toaster = require('../views/utils/toaster');

var _logger = require('../logger/logger');

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
      } else {
        (0, _logger.warn)("Cannot understand: " + event.data);
      }
    }
  }, {
    key: 'recognizeClass',
    value: function recognizeClass(object) {
      if (object.className === 'Response') {
        var response = new _Response.Response(object.type, object.description, object.notifyType, object.notifyState, object.args);
        this.recognizeNotifier(response);
      } else if (object.className === 'WebClientAction') {
        var action = new _WebClientAction.WebClientAction(object.type, object.args);
        this.recognizeAction(action);
      } else {
        if (object.className) {
          (0, _logger.warn)("Cannot understand: " + object.className);
        }
      }
    }
  }, {
    key: 'recognizeNotifier',
    value: function recognizeNotifier(responseObject) {
      if (responseObject.notifyType == "TOAST") {
        (0, _toaster.makeDefaultToast)(this.messageService.msg(responseObject.notifyState), this.messageService.msg(responseObject.description), responseObject.notifyState.toLowerCase());
      }
    }
  }, {
    key: 'recognizeAction',
    value: function recognizeAction(action) {
      if (action.type === "REFRESHUSERS") {
        this.controller.playersCount(action.args.players);
      } else if (action.type === "REFRESHMONEY") {
        this.controller.balance(action.args.money);
      } else if (action.type === "CHANGE_STATE") {
        this.controller.state(action.args.newState);
      } else if (action.type === "ACCOUNTINFORMATION") {
        this.controller.accountInformation.nickname(action.args.nickname);
        this.controller.accountInformation.email(action.args.email);
        this.controller.accountInformation.activated(action.args.activated);
      }
    }
  }]);

  return MessageController;
}();

},{"../communication/shared/Response":6,"../communication/shared/WebClientAction":7,"../logger/logger":17,"../views/utils/toaster":31}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var views = exports.views = {
  MAINMENU: { name: "MAINMENU", canvas: false },
  ACCOUNT: { name: "ACCOUNT", canvas: false },
  PAYMENTS: { name: "PAYMENTS", canvas: false },
  BASKET: { name: "BASKET", canvas: true },
  GUNNER: { name: "GUNNER", canvas: true }
};

var ViewController = exports.ViewController = function () {
  function ViewController(mainController) {
    _classCallCheck(this, ViewController);

    this.mainController = mainController;
    this.currentView = ko.observable(views.MAINMENU);
  }

  _createClass(ViewController, [{
    key: "switchView",
    value: function switchView(newView) {
      this.currentView(this.getProperlyEnumFromCode(newView));
      if (this.currentView().canvas) {
        var mainCanvas = document.getElementById("mainGame");
        var rendererOptions = {
          antialiasing: false,
          transparent: false,
          resolution: window.devicePixelRatio,
          autoResize: true
        };
        var ratio = window.innerWidth / window.innerHeight;
        var app = new PIXI.Application(window.innerWidth, window.innerHeight, { view: mainCanvas }, rendererOptions);
        window.onresize = function (event) {
          resize(app.renderer, ratio);
        };
      }
    }
  }, {
    key: "getProperlyEnumFromCode",
    value: function getProperlyEnumFromCode(enumCode) {
      if (views.enumCode !== undefined) {
        return views.enumCode;
      } else {
        return views[enumCode.toUpperCase()];
      }
    }
  }]);

  return ViewController;
}();

},{}],16:[function(require,module,exports){
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

    this.actions = [{ type: ko.observable("REGISTER"), args: ko.observable({ login: ko.observable(randomString), password: ko.observable(randomString), email: ko.observable("") }) }, { type: ko.observable("LOGIN"), args: ko.observable({ login: ko.observable(randomString), password: ko.observable(randomString) }) }, { type: ko.observable("ACCOUNTACTIVATION"), args: ko.observable({ token: ko.observable(""), nickname: ko.observable(randomString) }) }, { type: ko.observable("PASSWORDCHANGEREQUEST"), args: ko.observable({ email: ko.observable(""), newPassword: ko.observable(this.randomString(5)) }) }, { type: ko.observable("PASSWORDCHANGE"), args: ko.observable({ email: ko.observable(""), token: ko.observable("") }) }, { type: ko.observable("GUNFIRE"), args: ko.observable({ bid: ko.observable(50) }) }, { type: ko.observable("MYOWN"), args: ko.observable({}) }];
  }

  _createClass(DevService, [{
    key: "randomString",
    value: function randomString(length) {
      return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, length);
    }
  }]);

  return DevService;
}();

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
  function Component(bindingName, template) {
    _classCallCheck(this, Component);

    this.bindingName = bindingName;
    this.template = template;
  }

  _createClass(Component, [{
    key: "registerComponent",
    value: function registerComponent() {
      ko.components.register(this.bindingName, { viewModel: this.viewModel, template: this.template });
    }
  }]);

  return Component;
}();

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountInformation = undefined;

var _Component2 = require('../Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountInformation = exports.AccountInformation = function (_Component) {
  _inherits(AccountInformation, _Component);

  function AccountInformation() {
    _classCallCheck(this, AccountInformation);

    var _this = _possibleConstructorReturn(this, (AccountInformation.__proto__ || Object.getPrototypeOf(AccountInformation)).call(this, "accountinformation", require('./AccountInformationTemplate').template.html));

    _this.viewModel = function (params) {
      this.controller = params.controller;
      this.msg = function (name) {
        return this.controller.msg(name);
      };
    };
    return _this;
  }

  return AccountInformation;
}(_Component2.Component);

},{"../Component":18,"./AccountInformationTemplate":20}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = {
  html: "\n    <form data-bind=\"submit: function() { }\" class=\"accountLoginForm\">\n        <header data-bind=\"text: msg('accountInformations')\"></header>\n        <div><span class=\"accountInformationLabel\" data-bind=\"text: msg('nickname')\"></span><span data-bind=\"text: controller.accountInformation.nickname\"></span></div>\n        <div><span class=\"accountInformationLabel\" data-bind=\"text: msg('email')\"></span><span data-bind=\"text: controller.accountInformation.email\"></span></div>\n        <div><span class=\"accountInformationLabel\" data-bind=\"text: msg('activated')\"></span><span data-bind=\"text: controller.accountInformation.activated\"></span></div>\n        <div><span class=\"accountInformationLabel\" data-bind=\"text: msg('balance')\"></span><span data-bind=\"text: controller.balance\"></span></div>\n    </form>\n  "
};

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwesomeButtonLink = undefined;

var _Component2 = require('../Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AwesomeButtonLink = exports.AwesomeButtonLink = function (_Component) {
  _inherits(AwesomeButtonLink, _Component);

  function AwesomeButtonLink() {
    _classCallCheck(this, AwesomeButtonLink);

    var _this = _possibleConstructorReturn(this, (AwesomeButtonLink.__proto__ || Object.getPrototypeOf(AwesomeButtonLink)).call(this, "awesomebuttonlink", require('./AwesomeButtonLinkTemplate').template.html));

    _this.viewModel = function (params) {
      var _this2 = this;

      this.awesomeClass = params.awesomeClass;
      this.underText = params.underText;
      this.disabled = params.disabled;
      this.isDisabled = ko.computed(function () {
        return _this2.disabled !== undefined && _this2.disabled();
      }, this);
      this.onClick = function (event) {
        if (this.disabled !== undefined && this.disabled()) {
          return undefined;
        }
        return params.onClick(event);
      };
      this.materialIcon = params.materialIcon;
    };
    return _this;
  }

  return AwesomeButtonLink;
}(_Component2.Component);

},{"../Component":18,"./AwesomeButtonLinkTemplate":22}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = {
  html: "\n  <div class=\"upperMenuItem\">\n    <i data-bind=\"css: awesomeClass, click: onClick, text: materialIcon, attr: { disabled: isDisabled }\"></i>\n    <div data-bind=\"text: underText, click: onClick, attr: { disabled: isDisabled }\"></div>\n  </div>\n  "
};

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CasinoView = undefined;

var _Component2 = require('../Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CasinoView = exports.CasinoView = function (_Component) {
    _inherits(CasinoView, _Component);

    function CasinoView() {
        _classCallCheck(this, CasinoView);

        var _this = _possibleConstructorReturn(this, (CasinoView.__proto__ || Object.getPrototypeOf(CasinoView)).call(this, "casinoview", require('./CasinoViewTemplate').template.html));

        _this.viewModel = function (params) {
            var _this2 = this;

            this.currentView = params.currentView;
            this.controller = params.controller;
            this.shouldShowCanvas = ko.computed(function () {
                return _this2.currentView().canvas;
            }, this);
            this.msg = function (name) {
                return this.controller.msg(name);
            };

            this.accountCurrentView = ko.observable("LOGIN");

            this.shouldShowLoginForm = ko.computed(function () {
                return _this2.controller.isNotLogged() && _this2.accountCurrentView() == "LOGIN";
            }, this);

            this.shouldShowRegisterForm = ko.computed(function () {
                return _this2.controller.isNotLogged() && _this2.accountCurrentView() == "REGISTER";
            }, this);

            this.shouldShowPasswordChangeForm = ko.computed(function () {
                return _this2.controller.isNotLogged() && _this2.accountCurrentView() == "PASSWORDCHANGE";
            }, this);

            this.shouldShowAccountInformation = ko.computed(function () {
                return !_this2.controller.isNotLogged();
            }, this);
        };

        return _this;
    }

    return CasinoView;
}(_Component2.Component);

},{"../Component":18,"./CasinoViewTemplate":24}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = {
  html: "\n    <!-- ko if: shouldShowCanvas -->\n      <canvas id=\"mainGame\"></canvas>\n    <!-- /ko -->\n\n    <!-- ko ifnot: shouldShowCanvas -->\n      <!-- ko if: currentView().name == 'MAINMENU' -->\n        <span data-bind=\"text:currentView().name\" id=\"mainGame\"></span>\n      <!-- /ko -->\n      <!-- ko if: currentView().name == 'ACCOUNT' -->\n        <!-- ko if: shouldShowLoginForm -->\n          <loginform params=\"controller: controller, accountCurrentView: accountCurrentView\"></loginform>\n        <!-- /ko -->\n        <!-- ko if: shouldShowRegisterForm -->\n          <registerform params=\"controller: controller, accountCurrentView: accountCurrentView\"></registerform>\n        <!-- /ko -->\n        <!-- ko if: shouldShowPasswordChangeForm -->\n          <passwordchangeform params=\"controller: controller, accountCurrentView: accountCurrentView\"></passwordchangeform>\n        <!-- /ko -->\n        <!-- ko if: shouldShowAccountInformation -->\n          <accountinformation params=\"controller: controller\"></accountinformation>\n        <!-- /ko -->\n      <!-- /ko -->\n      <!-- ko if: currentView().name == 'PAYMENTS' -->\n        <span data-bind=\"text:currentView().name\" id=\"mainGame\"></span>\n      <!-- /ko -->\n    <!-- /ko -->\n  "
};

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginForm = undefined;

var _Component2 = require('../Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = exports.LoginForm = function (_Component) {
  _inherits(LoginForm, _Component);

  function LoginForm() {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, "loginform", require('./LoginFormTemplate').template.html));

    _this.viewModel = function (params) {
      this.controller = params.controller;
      this.accountCurrentView = params.accountCurrentView;
      this.msg = function (name) {
        return this.controller.msg(name);
      };
      this.loginForm = {
        login: ko.observable(""),
        password: ko.observable("")
      };
      this.doLogin = function () {
        this.controller.communicationService.tryLogin(this.loginForm.login(), this.loginForm.password());
      };

      this.onChangeLoginForm = function (state) {
        return function () {
          this.accountCurrentView(state);
        };
      };
    };
    return _this;
  }

  return LoginForm;
}(_Component2.Component);

},{"../Component":18,"./LoginFormTemplate":26}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = {
  html: "\n    <form data-bind=\"submit: doLogin\" class=\"accountLoginForm\">\n        <header data-bind=\"text: msg('login')\"></header>\n        <label><span data-bind=\"text: msg('username')\"></span> <span>*</span></label>\n        <input data-bind=\"attr: {'placeholder' : msg('login')}, value: loginForm.login\"></input>\n        <div class=\"help\">At least 6 character</div>\n        <label><span data-bind=\"text: msg('password')\"></span> <span>*</span></label>\n        <input type=\"password\" data-bind=\"attr: {'placeholder' : msg('password')}, value: loginForm.password\"></input>\n        <div class=\"help\">Use upper and lowercase lettes as well</div>\n        <button data-bind=\"text: msg('login')\" type=\"submit\"></button>\n        <div data-bind=\"text: msg('clickHereIfYouWantToRegister'), click: onChangeLoginForm('REGISTER')\" class=\"help\"></div>\n        <div data-bind=\"text: msg('clickHereIfYouWantToChangePassword'), click: onChangeLoginForm('PASSWORDCHANGE')\" class=\"help\"></div>\n    </form>\n  "
};

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordChangeForm = undefined;

var _Component2 = require('../Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasswordChangeForm = exports.PasswordChangeForm = function (_Component) {
  _inherits(PasswordChangeForm, _Component);

  function PasswordChangeForm() {
    _classCallCheck(this, PasswordChangeForm);

    var _this = _possibleConstructorReturn(this, (PasswordChangeForm.__proto__ || Object.getPrototypeOf(PasswordChangeForm)).call(this, "passwordchangeform", require('./PasswordChangeFormTemplate').template.html));

    _this.viewModel = function (params) {
      this.controller = params.controller;
      this.accountCurrentView = params.accountCurrentView;
      this.msg = function (name) {
        return this.controller.msg(name);
      };

      this.passwordChangeForm = {
        email: ko.observable(""),
        newPassword: ko.observable("")
      };

      this.onChangeLoginForm = function (state) {
        return function () {
          this.accountCurrentView(state);
        };
      };

      this.doPasswordChange = function () {
        this.controller.communicationService.tryChangePassword(this.passwordChangeForm.email(), this.passwordChangeForm.newPassword());
      };
    };
    return _this;
  }

  return PasswordChangeForm;
}(_Component2.Component);

},{"../Component":18,"./PasswordChangeFormTemplate":28}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = {
  html: "\n    <form data-bind=\"submit: doPasswordChange\" class=\"accountLoginForm\">\n        <header data-bind=\"text: msg('passwordChange')\"></header>\n        <label><span data-bind=\"text: msg('email')\"></span> <span>*</span></label>\n        <input type=\"email\" data-bind=\"attr: {'placeholder' : msg('email')}, value: passwordChangeForm.email\"></input>\n        <div class=\"help\">At least 6 character</div>\n        <label><span data-bind=\"text: msg('newPassword')\"></span> <span>*</span></label>\n        <input type=\"password\" data-bind=\"attr: {'placeholder' : msg('password')}, value: passwordChangeForm.newPassword\"></input>\n        <div class=\"help\">Use upper and lowercase lettes as well</div>\n        <button data-bind=\"text: msg('sendRequest')\" type=\"submit\"></button>\n        <div data-bind=\"text: msg('clickHereIfYouWantToLogin'), click: onChangeLoginForm('LOGIN')\" class=\"help\"></div>\n    </form>\n  "
};

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterForm = undefined;

var _Component2 = require('../Component');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RegisterForm = exports.RegisterForm = function (_Component) {
  _inherits(RegisterForm, _Component);

  function RegisterForm() {
    _classCallCheck(this, RegisterForm);

    var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, "registerform", require('./RegisterFormTemplate').template.html));

    _this.viewModel = function (params) {
      this.controller = params.controller;
      this.accountCurrentView = params.accountCurrentView;
      this.msg = function (name) {
        return this.controller.msg(name);
      };

      this.registerForm = {
        login: ko.observable(""),
        password: ko.observable(""),
        email: ko.observable("")
      };

      this.onChangeLoginForm = function (state) {
        return function () {
          this.accountCurrentView(state);
        };
      };

      this.doRegister = function () {
        this.controller.communicationService.tryRegister(this.registerForm.login(), this.registerForm.password(), this.registerForm.email());
      };
    };
    return _this;
  }

  return RegisterForm;
}(_Component2.Component);

},{"../Component":18,"./RegisterFormTemplate":30}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var template = exports.template = {
  html: "\n    <form data-bind=\"submit: doRegister\" class=\"accountLoginForm\">\n        <header data-bind=\"text: msg('register')\"></header>\n        <label><span data-bind=\"text: msg('username')\"></span> <span>*</span></label>\n        <input data-bind=\"attr: {'placeholder' : msg('username')}, value: registerForm.login\"></input>\n        <div class=\"help\">At least 6 character</div>\n        <label><span data-bind=\"text: msg('password')\"></span> <span>*</span></label>\n        <input type=\"password\" data-bind=\"attr: {'placeholder' : msg('password')}, value: registerForm.password\"></input>\n        <div class=\"help\">Use upper and lowercase lettes as well</div>\n        <label><span data-bind=\"text: msg('email')\"></span> <span>*</span></label>\n        <input type=\"email\" data-bind=\"attr: {'placeholder' : msg('email')}, value: registerForm.email\"></input>\n        <div class=\"help\">Use upper and lowercase lettes as well</div>\n        <button data-bind=\"text: msg('register')\" type=\"submit\"></button>\n        <div data-bind=\"text: msg('clickHereIfYouWantToLogin'), click: onChangeLoginForm('LOGIN')\" class=\"help\"></div>\n    </form>\n  "
};

},{}],31:[function(require,module,exports){
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

},{}]},{},[2])

//# sourceMappingURL=build.js.map
