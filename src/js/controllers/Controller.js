import { SocketHandler } from '../communication/SocketHandler';

export class Controller {
  constructor(config, msg) {
    this.socket = new SocketHandler(this.onOpen, this.onMessage, this.onClose, this.onError, config);
    this.socket.initConnection();
    this.connected = false;
  }

  onOpen(event) {
    this.connected = true;
    console.log("Connected to server");
  }

  onMessage(event) {

  }

  onClose(event) {
    this.false = true;
  }

  onError(event) {
    this.false = true;
  }




}
