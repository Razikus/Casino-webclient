export const template = {
  html: `
    <form data-bind="submit: doPasswordChange" class="accountLoginForm">
        <header data-bind="text: msg('passwordChange')"></header>
        <label><span data-bind="text: msg('email')"></span> <span>*</span></label>
        <input type="email" data-bind="attr: {'placeholder' : msg('email')}, value: passwordChangeForm.email"></input>
        <div class="help"></div>
        <label><span data-bind="text: msg('newPassword')"></span> <span>*</span></label>
        <input type="password" data-bind="attr: {'placeholder' : msg('password')}, value: passwordChangeForm.newPassword"></input>
        <div class="help"></div>
        <button data-bind="text: msg('sendRequest')" type="submit"></button>
        <div data-bind="text: msg('clickHereIfYouWantToLogin'), click: onChangeLoginForm('LOGIN')" class="help"></div>
    </form>
  `,
}
