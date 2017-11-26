import { Component } from '../Component';

export class PasswordChangeForm extends Component {
  constructor() {
    super("passwordchangeform", require('./PasswordChangeFormTemplate').template.html);
    this.viewModel = function(params) {
      this.controller = params.controller;
      this.accountCurrentView = params.accountCurrentView;
      this.msg = function(name) {
        return this.controller.msg(name);
      }

      this.passwordChangeForm = {
        email: ko.observable(""),
        newPassword: ko.observable(""),
      }

      this.onChangeLoginForm = function(state) {
        return function() {
          this.accountCurrentView(state);
        }
      }

      this.doPasswordChange = function() {
        this.controller.communicationService.tryChangePassword(this.passwordChangeForm.email(), this.passwordChangeForm.newPassword());
      }

    }
  }


}
