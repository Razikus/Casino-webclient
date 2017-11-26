import { Component } from '../Component';

export class LoginForm extends Component {
  constructor() {
    super("loginform", require('./LoginFormTemplate').template.html);
    this.viewModel = function(params) {
      this.controller = params.controller;
      this.accountCurrentView = params.accountCurrentView;
      this.msg = function(name) {
        return this.controller.msg(name);
      }
      this.loginForm = {
        login: ko.observable(""),
        password: ko.observable(""),
      }
      this.doLogin = function() {
        this.controller.communicationService.tryLogin(this.loginForm.login(), this.loginForm.password());
      }

      this.onChangeLoginForm = function(state) {
        return function() {
          this.accountCurrentView(state);
        }
      }

    }
  }


}
