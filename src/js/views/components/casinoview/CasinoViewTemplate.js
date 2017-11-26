export const template = {
  html: `
    <!-- ko if: shouldShowCanvas -->
      <canvas id="mainGame"></canvas>
    <!-- /ko -->

    <!-- ko ifnot: shouldShowCanvas -->
      <!-- ko if: currentView().name == 'MAINMENU' -->
        <span data-bind="text:currentView().name" id="mainGame"></span>
      <!-- /ko -->
      <!-- ko if: currentView().name == 'ACCOUNT' -->
        <!-- ko if: shouldShowLoginForm -->
          <loginform params="controller: controller, loginFormActivated: loginFormActivated"></loginform>
        <!-- /ko -->
        <!-- ko if: shouldShowRegisterForm -->
          <form data-bind="submit: doRegister" class="accountLoginForm">
              <header data-bind="text: msg('register')"></header>
              <label><span data-bind="text: msg('username')"></span> <span>*</span></label>
              <input data-bind="value: registerForm.login"></input>
              <div class="help">At least 6 character</div>
              <label><span data-bind="text: msg('password')"></span> <span>*</span></label>
              <input type="password" data-bind="value: registerForm.password"></input>
              <div class="help">Use upper and lowercase lettes as well</div>
              <label><span data-bind="text: msg('email')"></span> <span>*</span></label>
              <input type="email" data-bind="value: registerForm.email"></input>
              <div class="help">Use upper and lowercase lettes as well</div>
              <button data-bind="text: msg('register')" type="submit"></button>
              <div data-bind="text: msg('clickHereIfYouWantToLogin'), click: onChangeLoginForm" class="help"></div>
          </form>
        <!-- /ko -->
      <!-- /ko -->
      <!-- ko if: currentView().name == 'PAYMENTS' -->
        <span data-bind="text:currentView().name" id="mainGame"></span>
      <!-- /ko -->
    <!-- /ko -->
  `,
}
