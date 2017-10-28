import { socketConfiguration } from './config/socketConfig';
import { Controller } from './controllers/Controller';
import { getMessageBundle } from './config/msg';

export const globals = {
  controller: new Controller(socketConfiguration, getLanguageCode(), getParameters()),
}

function getLanguageCode() {
  return navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
}

function getParameters() {
  let queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
  return queryDict;
}


ko.applyBindings(globals.controller);
