import { msgConfig } from './msgConfig';
import { info, warn } from '../logger/logger';

export function getMessageBundle(code) {
  info(`Loading msg bundle: ${code}`);
  let bundle = getBundleFor(constructBundlePath(code));
  if(!bundle) {
    warn(`No msg bundle for code: ${code} loading default bundle for language: ${msgConfig.defaultLanguage}`);
    bundle = getBundleFor(constructBundlePath(msgConfig.defaultLanguage));
    if(bundle) {
      return bundle;
    } else {
      throw "No default bundle. Check configuration, and files. Aborting";
    }
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
