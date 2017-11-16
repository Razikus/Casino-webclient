export const template = {
  html: `
  <div class="upperMenuItem">
    <i data-bind="css: awesomeClass, click: onClick, text: materialIcon, attr: { disabled: isDisabled }"></i>
    <div data-bind="text: underText, click: onClick, attr: { disabled: isDisabled }"></div>
  </div>
  `,
}
