import { Component } from '../Component';

export class AwesomeButtonLink extends Component {
  constructor() {
    super("awesomebuttonlink", require('./AwesomeButtonLinkTemplate').template.html);
    this.viewModel = function(params) {
      this.awesomeClass = params.awesomeClass;
      this.underText = params.underText;
      this.disabled = params.disabled;
      this.isDisabled = ko.computed(() => {
        return this.disabled !== undefined && this.disabled();
      }, this);
      this.onClick = function(event) {
        if(this.disabled !== undefined && this.disabled()) {
          return undefined;
        }
        return params.onClick(event);
      };
      this.materialIcon = params.materialIcon;
    }
  }


}
