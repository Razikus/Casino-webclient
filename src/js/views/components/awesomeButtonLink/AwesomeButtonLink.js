import { Component } from '../Component';

export class AwesomeButtonLink extends Component {
  constructor() {
    super("awesomebuttonlink", require('./AwesomeButtonLinkTemplate').template.html);
    this.viewModel = function(params) {
      this.awesomeClass = params.awesomeClass;
      this.underText = params.underText;
      this.onClick = params.onClick;
      this.materialIcon = params.materialIcon;
    }
  }


}
