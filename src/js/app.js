import { socketConfiguration } from './config/socketConfig';
import { Controller } from './controllers/Controller';
import { getMessageBundle } from './config/msg';
import { ComponentsRegisterer } from './ComponentsRegisterer';

export const globals = {
  controller: new Controller(socketConfiguration, getLanguageCode(), getParameters()),
  componentsRegisterer: new ComponentsRegisterer(),
}

function getLanguageCode() {
  return navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
}

function getParameters() {
  let queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})
  return queryDict;
}


globals.componentsRegisterer.registerComponents();

ko.applyBindings(globals.controller);
