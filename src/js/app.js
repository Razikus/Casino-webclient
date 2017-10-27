import { socketConfiguration } from './config/socketConfig';
import { Controller } from './controllers/Controller';
import { getMessageBundle } from './config/msg';

export const globals = {
  constroller: new Controller(socketConfiguration, getMessageBundle(getLanguageCode())),
}

function getLanguageCode() {
  return navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
}
