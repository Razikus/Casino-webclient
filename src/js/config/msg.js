import { msgConfig } from './msgConfig';
import { info, warn } from '../logger/logger';

export function getMessageBundle(code) {
  info(`Loading msg bundle: ${code}`);
  let bundle = getBundleFor(constructBundlePath(code));
  if(!bundle) {
    warn(`No msg bundle for code: ${code} loading default: ${msgConfig.defaultLanguage}`);
    return getBundleFor(constructBundlePath(msgConfig.defaultLanguage));
  }
  return bundle;
}

function getBundleFor(path) {
  try {
    return require(path);
  } catch(err) {
    return undefined;
  }
}

function constructBundlePath(code) {
  return `./msg/msg-${code}`;
}
