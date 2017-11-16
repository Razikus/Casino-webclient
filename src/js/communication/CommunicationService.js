import { Action, LoginAction, RegisterAction, ActivateAction, WalletAction, PasswordChangeRequestAction, PasswordChangeAction } from './shared/Action';

export class CommunicationService {
  constructor(socketHandler, controller) {
    this.controller = controller;
    this.socketHandler = socketHandler;
  }

  send(what) {
    this.socketHandler.send(what);
  }

  tryRegister(nick, password, email) {
    console.log(JSON.stringify(new RegisterAction(nick, password, email)));
    this.send(JSON.stringify(new RegisterAction(nick, password, email)));
  }

  tryLogin(nick, password) {
    this.send(JSON.stringify(new LoginAction(nick, password)));
  }

  tryChangePassword(email, newPassword) {
    this.send(JSON.stringify(new PasswordChangeRequestAction(email, newPassword)));
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
        console.log(JSON.stringify(new PasswordChangeAction(GETParameters.email, GETParameters.token)))
        this.send(JSON.stringify(new PasswordChangeAction(GETParameters.email, GETParameters.token)));
      }
    }
  }
}
