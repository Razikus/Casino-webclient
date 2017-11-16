import { Component } from '../Component';

export class CasinoView extends Component {
  constructor() {
    super("casinoview", require('./CasinoViewTemplate').template.html);
    this.viewModel = function(params) {
      this.currentView = params.currentView;
    }
  }


}
