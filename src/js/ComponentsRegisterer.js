import { warn, info } from './logger/logger';
import { AwesomeButtonLink } from './views/components/awesomeButtonLink/AwesomeButtonLink';

export class ComponentsRegisterer {
  constructor() {
    this.componentsActive = [];
  }

  registerComponents() {
    this.registerAndAddComponent(new AwesomeButtonLink());
  }

  registerAndAddComponent(component) {
    component.registerComponent();
    this.componentsActive.push(component);
    info(`Registered: ${component.bindingName}`);
  }
}
