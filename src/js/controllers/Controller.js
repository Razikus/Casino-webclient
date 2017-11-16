import { SocketHandler } from '../communication/SocketHandler';
import { CommunicationService } from '../communication/CommunicationService';
import { MessageController } from './MessageController';
import { ViewController } from './ViewController';
import { MessageService } from '../config/msg';
import { info, warn } from '../logger/logger';
import { makDefaultInfoToast } from '../views/utils/toaster';
import { DevService } from '../dev/DevService';

export class Controller {
  constructor(config, languageCode, optionalGetParameters) {
    this.messageService = new MessageService(languageCode);
    this.devService = new DevService(this);
    this.viewController = new ViewController(this);
    this.messageController = new MessageController(this, this.messageService);
    this.socketConfig = config;
    this.connected = ko.observable(false);
    this.socketHandler = new SocketHandler(this, config);
    this.socketHandler.initConnection();

    this.state = ko.observable("NOTLOGGED");
    this.isNotLogged = ko.computed(() => {
        return this.state() == "NOTLOGGED";
    }, this);

    this.connectionStatusClass = ko.pureComputed(function() {
      return this.connected() ? "fa fa-check-circle-o success" : 'fa fa-times-circle-o error';
    }, this);

    this.playersCount = ko.observable(this.msg('REFRESHING'));

    this.communicationService = new CommunicationService(this.socketHandler, this);

    this.onSwitchView = function(view) {
      return (event) => {
        this.viewController.switchView(view);
      }
    }


    this.subscribe("connected", (value) => {
      if(value) {
        makDefaultInfoToast(this.msg("connected"), this.msg("connected-text"));
        if(optionalGetParameters) {
          this.processGetParameters(optionalGetParameters);
        }
      }
    });

  }

  // Delegated to WebSocket object- dont use this, have to use - this.controller
  onOpen(event) {
    info(`Connected to server ${this.controller.socketConfig.url}`);
    this.controller.connected(true);
  }
  // Delegated to WebSocket object- dont use this, have to use - this.controller
  onClose(event) {
    warn("Server closed connection.")
    this.controller.connected(false);
  }
  // Delegated to WebSocket object- dont use this, have to use - this.controller
  onError(event) {
    warn("Something wrong with connection.")
    this.controller.connected(false);
  }

  send(what) {
    this.socketHandler.send(what);
  }

  subscribe(observableName, func) {
    if(this[observableName]) {
      this[observableName].subscribe(func);
    }
  }

  msg(label) {
    return this.messageService.msg(label);
  }

  processGetParameters(optionalGetParameters) {
    if(optionalGetParameters.token != undefined) {
      if(optionalGetParameters.nickname != undefined) {
        this.communicationService.tryActivate(optionalGetParameters);
      } else if(optionalGetParameters.email != undefined) {
        this.communicationService.tryActivatePassword(optionalGetParameters);
      }
    }
  }
}
