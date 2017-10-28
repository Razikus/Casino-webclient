import { SocketHandler } from '../communication/SocketHandler';
import { CommunicationService } from '../communication/CommunicationService';
import { MessageController } from './MessageController';
import { MessageService } from '../config/msg';
import { info, warn } from '../logger/logger';
import { makDefaultInfoToast } from '../views/utils/toaster';

export class Controller {
  constructor(config, languageCode, optionalGetParameters) {
    this.messageController = new MessageController(this);
    this.messageService = new MessageService(languageCode);
    this.socketConfig = config;
    this.connected = ko.observable(false);
    this.socketHandler = new SocketHandler(this, config);
    this.socketHandler.initConnection();


    this.communicationService = new CommunicationService(this.socketHandler, this);

    this.subscribe("connected", (value) => {
      if(value) {
        makDefaultInfoToast(this.msg("connected"), this.msg("connected-text"));
        this.communicationService.tryRegister("Razikus", "adam4541", "adam.razniewski@gmail.com");
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
    if(optionalGetParameters.token != undefined && optionalGetParameters.nickname != undefined) {
      this.communicationService.tryActivate(optionalGetParameters);
    }
  }


}
