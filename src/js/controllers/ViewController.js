export const views = {
  MAINMENU: {name: "MAINMENU", canvas: false},
  ACCOUNT: {name: "ACCOUNT", canvas: false},
  PAYMENTS: {name: "PAYMENTS", canvas: false},
  BASKET: {name: "BASKET", canvas: true},
  GUNNER: {name: "GUNNER", canvas: true},
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
