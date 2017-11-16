export const views = {
  MAINMENU: "MAINMENU",
  ACCOUNT: "ACCOUNT",
  PAYMENTS: "PAYMENTS",
  BASKET: "BASKET",
  GUNNER: "GUNNER",
}


export class ViewController {
  constructor(mainController) {
    this.mainController = mainController;
    this.currentView = ko.observable(views.MAINMENU);
  }

  switchView(newView) {
    this.currentView(this.getProperlyEnumFromCode(newView));
  }

   getProperlyEnumFromCode(enumCode) {
     if(views.enumCode !== undefined) {
       return views.enumCode;
     } else {
       return views[enumCode.toUpperCase()];
     }
   }
}
