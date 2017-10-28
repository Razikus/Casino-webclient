import { msgConfig } from './msgConfig';
import { info, warn } from '../logger/logger';

export function getMessageBundle(code) {
  info(`Loading msg bundle: ${code}`);
  let bundle = getBundleFor(code);
  if(!bundle) {
    warn(`No msg bundle for code: ${code} loading default bundle for language: ${msgConfig.defaultLanguage}`);
    bundle = getBundleFor(msgConfig.defaultLanguage);
    if(bundle) {
      return bundle;
    } else {
      throw "No default bundle. Check configuration, and files. Aborting";
    }
  }
  return bundle;
}

function getBundleFor(code) {
  switch(code) {
    case "en":
      return require("./msg/msg-en.js");
    case "pl":
      return require("./msg/msg-pl.js");
    default:
      return require(msgConfig.defaultLanguage);
  }
}
