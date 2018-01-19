import { Action, LoginAction, BasketAction, RegisterAction, ActivateAction, WalletAction, PasswordChangeRequestAction, PasswordChangeAction, GunfireAction } from './shared/Action';

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

  tryChangePassword(email, newPassword) {
    this.send(JSON.stringify(new PasswordChangeRequestAction(email, newPassword)));
  }

  playGunner(bid) {
    this.send(JSON.stringify(new GunfireAction(bid)));
  }

  playBasket() {
    this.send(JSON.stringify(new BasketAction()));
  }

  tryActivate(GETParameters) {
    if(GETParameters.token !== 'undefined' && GETParameters.nickname !== 'undefined') {
      if(GETParameters.token.length !== 0 && GETParameters.nickname.length !== 0) {
        this.send(JSON.stringify(new ActivateAction(GETParameters.token, GETParameters.nickname)));
      }
    }
  }

  tryActivatePassword(GETParameters) {
    if(GETParameters.token !== 'undefined' && GETParameters.email !== 'undefined') {
      if(GETParameters.token.length !== 0 && GETParameters.email.length !== 0) {
        this.send(JSON.stringify(new PasswordChangeAction(GETParameters.email, GETParameters.token)));
      }
    }
  }
}
