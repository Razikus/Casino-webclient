import { warn, info } from './logger/logger';
import { AwesomeButtonLink } from './views/components/awesomeButtonLink/AwesomeButtonLink';
import { CasinoView } from './views/components/casinoview/CasinoView';
import { LoginForm } from './views/components/loginForm/LoginForm';
import { RegisterForm } from './views/components/registerForm/RegisterForm';
import { PasswordChangeForm } from './views/components/passwordChangeForm/PasswordChangeForm';

export class ComponentsRegisterer {
  constructor() {
    this.componentsActive = [];
  }

  registerComponents() {
    this.registerAndAddComponent(new AwesomeButtonLink());
    this.registerAndAddComponent(new CasinoView());
    this.registerAndAddComponent(new LoginForm());
    this.registerAndAddComponent(new RegisterForm());
    this.registerAndAddComponent(new PasswordChangeForm());
  }

  registerAndAddComponent(component) {
    component.registerComponent();
    this.componentsActive.push(component);
    info(`Registered: ${component.bindingName}`);
  }
}
