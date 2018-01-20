export const template = {
  html: `
    <form data-bind="submit: doRegister" class="accountLoginForm">
        <header data-bind="text: msg('register')"></header>
        <label><span data-bind="text: msg('username')"></span> <span>*</span></label>
        <input data-bind="attr: {'placeholder' : msg('username')}, value: registerForm.login"></input>
        <div class="help"></div>
        <label><span data-bind="text: msg('password')"></span> <span>*</span></label>
        <input type="password" data-bind="attr: {'placeholder' : msg('password')}, value: registerForm.password"></input>
        <div class="help"></div>
        <label><span data-bind="text: msg('email')"></span> <span>*</span></label>
        <input type="email" data-bind="attr: {'placeholder' : msg('email')}, value: registerForm.email"></input>
        <div class="help"></div>
        <button data-bind="text: msg('register')" type="submit"></button>
        <div data-bind="text: msg('clickHereIfYouWantToLogin'), click: onChangeLoginForm('LOGIN')" class="help"></div>
    </form>
  `,
}
