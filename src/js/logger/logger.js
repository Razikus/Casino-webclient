export function log(what, color) {
  if(color) {
    console.log("%c" + what, "color: " + color);
  } else {
    console.log(what);
  }
}

export function warn(what) {
  return log(what, "red");
}

export function info(what) {
  return log(what, "green");
}
