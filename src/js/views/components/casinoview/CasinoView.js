import { Component } from '../Component';

export class CasinoView extends Component {
  constructor() {
    super("casinoview", require('./CasinoViewTemplate').template.html);
    this.viewModel = function(params) {
      this.currentView = params.currentView;
      this.controller = params.controller;
      this.shouldShowCanvas = ko.computed(() => {
        return this.currentView().canvas;
      }, this);
      this.doLogin = function() {
        this.controller.communicationService.tryLogin(this.loginForm.login(), this.loginForm.password());
      }
      this.doRegister = function() {
        this.controller.communicationService.tryRegister(this.registerForm.login(), this.registerForm.password(), this.registerForm.email());
      }
      this.msg = function(name) {
        return this.controller.msg(name);
      }

      this.loginForm = {
        login: ko.observable("Login"),
        password: ko.observable("Password"),
      }

      this.registerForm = {
        login: ko.observable("Login"),
        password: ko.observable("Password"),
        email: ko.observable("email"),
      }
      this.loginFormActivated = ko.observable(true);

      this.onChangeLoginForm = function() {
        this.loginFormActivated(!this.loginFormActivated())
      }
    }

  }



}
