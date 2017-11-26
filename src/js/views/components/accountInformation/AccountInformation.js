import { Component } from '../Component';

export class AccountInformation extends Component {
  constructor() {
    super("accountinformation", require('./AccountInformationTemplate').template.html);
    this.viewModel = function(params) {
      this.controller = params.controller;
      this.msg = function(name) {
        return this.controller.msg(name);
      }

    }
  }


}
