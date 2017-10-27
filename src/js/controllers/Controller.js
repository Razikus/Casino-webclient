import { SocketHandler } from '../communication/SocketHandler';
import { MessageController } from './MessageController';
import { info, warn } from '../logger/logger';

export class Controller {
  constructor(config, msg) {
    this.messageController = new MessageController();
    this.socketConfig = config;
    this.msg = msg;
    this.connected = false;
    this.socketHandler = new SocketHandler(this, config);
    this.socketHandler.initConnection();
  }

  // Delegated to WebSocket object- dont use this, have to use - this.controller
  onOpen(event) {
    info(`Connected to server ${this.controller.socketConfig.url}`);
  }
  // Delegated to WebSocket object- dont use this, have to use - this.controller
  onClose(event) {
    warn("Server closed connection.")
  }
  // Delegated to WebSocket object- dont use this, have to use - this.controller
  onError(event) {
    warn("Something wrong with connection.")
  }




}
