import { SocketHandler } from '../communication/SocketHandler';
import { MessageController } from './MessageController';

export class Controller {
  constructor(config, msg) {
    this.messageController = new MessageController();
    this.socket = new SocketHandler(this.onOpen, messageController.recognizeMessage, this.onClose, this.onError, config);
    this.socket.initConnection();
    this.connected = false;
  }

  onOpen(event) {
    this.connected = true;
    console.log("Connected to server");
  }

  onClose(event) {
    this.false = true;
  }

  onError(event) {
    this.false = true;
  }




}
