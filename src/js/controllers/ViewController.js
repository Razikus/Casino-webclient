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
    if(this.currentView().canvas) {
      let mainCanvas = document.getElementById("mainGame");
      let rendererOptions = {
        antialiasing: false,
        transparent: false,
        resolution: window.devicePixelRatio,
        autoResize: true,
      }
      let ratio = window.innerWidth / window.innerHeight;
      let app = new PIXI.Application(window.innerWidth, window.innerHeight, {view: mainCanvas}, rendererOptions);
      window.onresize = function(event) {
          resize(app.renderer, ratio);
      };
    }
  }

   getProperlyEnumFromCode(enumCode) {
     if(views.enumCode !== undefined) {
       return views.enumCode;
     } else {
       return views[enumCode.toUpperCase()];
     }
   }
}
