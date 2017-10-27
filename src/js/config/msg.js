import { msg } from './msg/msg-en';
import { msgConfig } from './msgConfig';
import { info, warn } from '../logger/logger';

export function getMessageBundle(code) {
  info(`Loading msg bundle: ${code}`);
  let bundle = require(constructBundlePath(code));
  if(!bundle) {
    warn(`No msg bundle for code: ${code} loading default: ${msgConfig.defaultLanguage}`);
    return require(constructBundlePath(msgConfig.defaultLanguage));
  }
  return bundle;
}

function constructBundlePath(code) {
  return `./msg/msg-${code}`;
}
