import { Component } from '../Component';

export class RegisterForm extends Component {
  constructor() {
    super("registerform", require('./RegisterFormTemplate').template.html);
    this.viewModel = function(params) {
      this.controller = params.controller;
      this.accountCurrentView = params.accountCurrentView;
      this.msg = function(name) {
        return this.controller.msg(name);
      }

      this.registerForm = {
        login: ko.observable(""),
        password: ko.observable(""),
        email: ko.observable(""),
      }

      this.onChangeLoginForm = function(state) {
        return function() {
          this.accountCurrentView(state);
        }
      }

      this.doRegister = function() {
        this.controller.communicationService.tryRegister(this.registerForm.login(), this.registerForm.password(), this.registerForm.email());
      }

    }
  }


}
