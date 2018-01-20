export const template = {
  html: `
    <form data-bind="submit: doLogin" class="accountLoginForm">
        <header data-bind="text: msg('login')"></header>
        <label><span data-bind="text: msg('username')"></span> <span>*</span></label>
        <input data-bind="attr: {'placeholder' : msg('login')}, value: loginForm.login"></input>
        <div class="help"></div>
        <label><span data-bind="text: msg('password')"></span> <span>*</span></label>
        <input type="password" data-bind="attr: {'placeholder' : msg('password')}, value: loginForm.password"></input>
        <div class="help"></div>
        <button data-bind="text: msg('login')" type="submit"></button>
        <div data-bind="text: msg('clickHereIfYouWantToRegister'), click: onChangeLoginForm('REGISTER')" class="help"></div>
        <div data-bind="text: msg('clickHereIfYouWantToChangePassword'), click: onChangeLoginForm('PASSWORDCHANGE')" class="help"></div>
    </form>
  `,
}
