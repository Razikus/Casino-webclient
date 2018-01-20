export const template = {
  html: `
    <!-- ko if: shouldShowCanvas -->
        <!-- ko if: currentView().name == 'GUNNER' -->
          <canvas id="mainGame"></canvas>
          <span hidden="true" data-bind="template: { afterRender: afterRenderCanvas }"></span>
        <!-- /ko -->
        <!-- ko if: currentView().name == 'BASKET' -->
          <canvas id="mainGame"></canvas>
          <span hidden="true" data-bind="template: { afterRender: afterRenderCanvas }"></span>
        <!-- /ko -->
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
        <!-- ko if: shouldShowAccountInformation -->
          <accountinformation params="controller: controller"></accountinformation>
        <!-- /ko -->
      <!-- /ko -->
      <!-- ko if: currentView().name == 'PAYMENTS' -->
        <span data-bind="text:'PAYMENTS ARE OFF'" id="mainGame"></span>
      <!-- /ko -->
    <!-- /ko -->
  `,
}
