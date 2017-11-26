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
          <loginform params="controller: controller, accountCurrentView: accountCurrentView"></loginform>
        <!-- /ko -->
        <!-- ko if: shouldShowRegisterForm -->
          <registerform params="controller: controller, accountCurrentView: accountCurrentView"></registerform>
        <!-- /ko -->
        <!-- ko if: shouldShowPasswordChangeForm -->
          <passwordchangeform params="controller: controller, accountCurrentView: accountCurrentView"></passwordchangeform>
        <!-- /ko -->
      <!-- /ko -->
      <!-- ko if: currentView().name == 'PAYMENTS' -->
        <span data-bind="text:currentView().name" id="mainGame"></span>
      <!-- /ko -->
    <!-- /ko -->
  `,
}
