export const template = {
  html: `
    <form data-bind="submit: function() { }" class="accountLoginForm">
        <header data-bind="text: msg('accountInformations')"></header>
        <div><span class="accountInformationLabel" data-bind="text: msg('nickname')"></span><span data-bind="text: controller.accountInformation.nickname"></span></div>
        <div><span class="accountInformationLabel" data-bind="text: msg('email')"></span><span data-bind="text: controller.accountInformation.email"></span></div>
        <div><span class="accountInformationLabel" data-bind="text: msg('activated')"></span><span data-bind="text: controller.accountInformation.activated"></span></div>
        <div><span class="accountInformationLabel" data-bind="text: msg('balance')"></span><span data-bind="text: controller.balance"></span></div>
    </form>
  `,
}
