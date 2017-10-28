
export class SocketHandler {
  constructor(controller, config) {
    this.config = config;
    this.onOpen = controller.onOpen;
    this.onClose = controller.onClose;
    this.onMessage = controller.messageController.onMessage;
    this.onError = controller.onError;
    this.controller = controller;
  }

  initConnection() {
    this._webSocket = new WebSocket(this.config.url);
    this._webSocket.onmessage = this.onMessage;
    this._webSocket.onopen = this.onOpen;
    this._webSocket.onclose = this.onClose;
    this._webSocket.onerror = this.onError;
    this._webSocket.controller = this.controller;
  }

  send(what) {
    this._webSocket.send(what);
  }
}
