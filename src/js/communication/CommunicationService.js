import { Action, LoginAction, RegisterAction, ActivateAction, WalletAction } from './shared/Action';

export class CommunicationService {
  constructor(socketHandler, controller) {
    this.controller = controller;
    this.socketHandler = socketHandler;
  }

  send(what) {
    this.socketHandler.send(what);
  }

  tryRegister(nick, password, email) {
    this.send(JSON.stringify(new RegisterAction(nick, password, email)));
  }

  tryLogin(nick, password) {
    this.send(JSON.stringify(new LoginAction(nick, password)));
  }

  tryWalletIncrease(nick) {
    this.send(JSON.stringify(new WalletAction(nick)));
  }

  tryActivate(GETParameters) {
    if(GETParameters.token !== 'undefined' && GETParameters.nickname !== 'undefined') {
      if(GETParameters.token.length !== 0 && GETParameters.nickname.length !== 0) {
        this.send(JSON.stringify(new ActivateAction(GETParameters.token, GETParameters.nickname)));
      }
    }
  }
}
