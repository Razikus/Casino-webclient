import { msgConfig } from './msgConfig';
import { info, warn } from '../logger/logger';

export class MessageService {
  constructor(code) {
    this.code = code;
    this.bundle = getMessageBundle(code);
    if(code !== msgConfig.defaultLanguageCode) {
      this.defaultBundle = getMessageBundle(msgConfig.defaultLanguageCode);
    }
  }

  msg(label) {
    let result = this.bundle.msg[label];
    if(result) {
      return result;
    } else if(this.defaultBundle != undefined && this.defaultBundle.msg[label]) {
      return this.defaultBundle.msg[label];
    } else {
      return `[${label}]`;
    }
  }
}

export function getMessageBundle(code) {
  info(`Loading msg bundle: ${code}`);
  let bundle = getBundleFor(code);
  if(!bundle) {
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
      warn(`No msg bundle for code: ${code} loading default bundle for language: ${msgConfig.defaultLanguageCode}`);
      return require(msgConfig.defaultLanguagePath);
  }
}
