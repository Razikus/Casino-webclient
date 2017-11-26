import { Component } from '../Component';

export class RegisterForm extends Component {
  constructor() {
    super("registerform", require('./RegisterFormTemplate').template.html);
    this.viewModel = function(params) {
      console.log(params);
      this.controller = params.controller;
      this.loginFormActivated = params.loginFormActivated;
      this.msg = function(name) {
        return this.controller.msg(name);
      }

      this.registerForm = {
        login: ko.observable("Login"),
        password: ko.observable("Password"),
        email: ko.observable("email"),
      }

      this.onChangeLoginForm = function() {
        this.loginFormActivated(!this.loginFormActivated())
      }
      this.doRegister = function() {
        this.controller.communicationService.tryRegister(this.registerForm.login(), this.registerForm.password(), this.registerForm.email());
      }

    }
  }


}
