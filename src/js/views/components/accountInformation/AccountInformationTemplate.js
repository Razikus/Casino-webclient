export const template = {
  html: `
    <form data-bind="submit: function() { }" class="accountLoginForm">
        <header data-bind="text: msg('passwordChange')"></header>
        <div><span data-bind="text: msg('nickname')"></span></div>
        <div><span data-bind="text: msg('email')"></span></div>
        <div><span data-bind="text: msg('activated')"></span></div>
    </form>
  `,
}
