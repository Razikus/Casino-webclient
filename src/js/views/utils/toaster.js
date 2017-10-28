export function makeToast(heading, text, icon, hideAfter, position) {
  $.toast({
    text: text,
    heading: heading,
    icon: icon,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: hideAfter > 0 ? hideAfter : false,
    stack: 5,
    position: position,

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF',
  });
}

export function makeDefaultToast(heading, text, icon) {
  $.toast({
    text: text,
    heading: heading,
    icon: icon,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF',
  });
}

export function makDefaultInfoToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.information,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF',
  });
}

export function makDefaultSuccessToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.success,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF',
  });
}

export function makDefaultErrorToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.error,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF',
  });
}

export function makDefaultWarningToast(heading, text) {
  $.toast({
    text: text,
    heading: heading,
    icon: iconTypes.warning,
    showHideTransition: 'fade',
    allowToastClose: true,
    hideAfter: 3000,
    stack: 5,
    position: 'bottom-left',

    textAlign: 'left',
    loader: true,
    loaderBg: '#329CBF',
  });
}

export const iconTypes = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  information: 'info',
}
