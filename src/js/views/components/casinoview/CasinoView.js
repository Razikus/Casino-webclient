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
      this.msg = function(name) {
        return this.controller.msg(name);
      }

      this.accountCurrentView = ko.observable("LOGIN");

      this.shouldShowLoginForm = ko.computed(() => {
          return this.controller.isNotLogged() && this.accountCurrentView() == "LOGIN";
      }, this);

      this.shouldShowRegisterForm = ko.computed(() => {
          return this.controller.isNotLogged() && this.accountCurrentView() == "REGISTER";
      }, this);

      this.shouldShowPasswordChangeForm = ko.computed(() => {
          return this.controller.isNotLogged() && this.accountCurrentView() == "PASSWORDCHANGE";
      }, this);

    }

  }



}
