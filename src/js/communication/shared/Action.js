export const actionTypes = {
  register: "REGISTER",
  login: "LOGIN",
  activate: "ACCOUNTACTIVATION",
  passwordChangeRequest: "PASSWORDCHANGEREQUEST",
  passwordChange: "PASSWORDCHANGE",
  gunfire: "GUNFIRE",
  basket: "BASKET",
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
      password: sha256(password),
      email: email
    }
  }
}

export class LoginAction extends Action {
  constructor(login, password) {
    super(actionTypes.login);
    this.args = {
      login: login,
      password: sha256(password),
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

export class PasswordChangeRequestAction extends Action {
  constructor(email, newPassword) {
    super(actionTypes.passwordChangeRequest);
    this.args = {
      email: email,
      newPassword: sha256(newPassword),
    }
  }
}

export class PasswordChangeAction extends Action {
  constructor(email, token) {
    super(actionTypes.passwordChange);
    this.args = {
      email: email,
      token: token,
    }
  }
}

export class GunfireAction extends Action {
  constructor(bid) {
    super(actionTypes.gunfire);
    this.args = {
      bid: bid,
    }
  }
}

export class BasketAction extends Action {
  constructor() {
    super(actionTypes.basket);
    this.args = {
      basketType: "Basic",
    }
  }
}
