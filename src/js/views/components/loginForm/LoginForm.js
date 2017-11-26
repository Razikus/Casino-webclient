import { Component } from '../Component';

export class LoginForm extends Component {
  constructor() {
    super("loginform", require('./LoginFormTemplate').template.html);
    this.viewModel = function(params) {
      console.log(params);
      this.controller = params.controller;
      this.loginFormActivated = params.loginFormActivated;
      this.msg = function(name) {
        return this.controller.msg(name);
      }
      this.loginForm = {
        login: ko.observable("Login"),
          password: ko.observable("Password"),
      }
      this.doLogin = function() {
        this.controller.communicationService.tryLogin(this.loginForm.login(), this.loginForm.password());
      }

      this.onChangeLoginForm = function() {
        this.loginFormActivated(!this.loginFormActivated())
      }

    }
  }


}
