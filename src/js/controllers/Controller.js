import { SocketHandler } from '../communication/SocketHandler';
import { MessageController } from './MessageController';
import { MessageService } from '../config/msg';
import { info, warn } from '../logger/logger';

export class Controller {
  constructor(config, languageCode) {
    this.messageController = new MessageController();
    this.messageService = new MessageService(languageCode);
    this.socketConfig = config;
    this.connected = ko.observable(false);
    this.socketHandler = new SocketHandler(this, config);
    this.socketHandler.initConnection();
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



}
