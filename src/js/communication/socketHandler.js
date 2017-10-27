
export class SocketHandler {
  constructor(onOpen, onClose, onMessage, onError, config) {
    this.config = config;
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.onMessage = onMessage;
    this.onError = onError;
  }

  initConnection() {
    this._webSocket = new WebSocket(this.config.url);
    this._webSocket.onmessage = this.onMessage;
    this._webSocket.onopen = this.onOpen;
    this._webSocket.onclose = this.onClose;
    this._webSocket.onerror = this.onError;
  }

  send(what) {
    this._webSocket.send(what);
  }
}
