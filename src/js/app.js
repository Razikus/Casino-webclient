import { socketConfiguration } from './config/socketConfig';
import { Controller } from './controllers/Controller';

export const globals = {
  constroller: new Controller(socketConfiguration, {}),
}
