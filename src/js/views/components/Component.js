
export class Component {
  constructor(bindingName, template) {
    this.bindingName = bindingName;
    this.template = template;
  }

  registerComponent() {
    ko.components.register(this.bindingName, { viewModel: this.viewModel, template: this.template });
  }
}
