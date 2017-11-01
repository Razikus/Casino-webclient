export const actionTypes = {
  register: "REGISTER",
  login: "LOGIN",
  activate: "ACCOUNTACTIVATION",
  passwordChangeRequest: "PASSWORDCHANGEREQUEST",
  passwordChange: "PASSWORDCHANGE",
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

export class PasswordChangeRequestAction extends Action {
  constructor(email, newPassword) {
    super(actionTypes.activate);
    this.args = {
      email: email,
      newPassword: newPassword,
    }
  }
}

export class PasswordChangeAction extends Action {
  constructor(email, token) {
    super(actionTypes.activate);
    this.args = {
      email: email,
      token: token,
    }
  }
}
