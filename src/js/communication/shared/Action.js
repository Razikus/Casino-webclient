export const actionTypes = {
  register: "REGISTER",
  login: "LOGIN",
  activate: "ACCOUNTACTIVATION",
  walletIncrease: "WALLETINCREASE",
}

export class Action {
  constructor(type) {
    this.type = type;
  }
}

export class RegisterAction extends Action {
  constructor(login, password, email) {
    super(actionTypes.register);
    this.args = {
      login: login,
      password: password,
      email: email
    }
  }
}

export class LoginAction extends Action {
  constructor(login, password) {
    super(actionTypes.login);
    this.args = {
      login: login,
      password: password,
    }
  }
}

export class ActivateAction extends Action {
  constructor(token, nickname) {
    super(actionTypes.activate);
    this.args = {
      token: token,
      nickname: nickname,
    }
  }
}
