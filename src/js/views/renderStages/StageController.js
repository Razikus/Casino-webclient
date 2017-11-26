import { Gunner } from './stages/Gunner';
import { Basket } from './stages/Basket';

export const renderGlobal = {
  currentApp: null,
  currentGame: null,
  currentStage: null,
  loader: PIXI.loader,
}

export class StageController {
  constructor(controller, viewController) {
    this.controller = controller;
    this.viewController = viewController;
    self = this;
    this.viewController.canvasInitialized.subscribe(function(canvasInitialized) {
      self.switchStage(canvasInitialized, self.viewController.currentView());
    });
  }

  switchStage(canvasInitialized, newStage) {
    if(!canvasInitialized) {
      this.clearApp();
      return;
    }
    if(newStage.canvas) {
      if(renderGlobal.currentApp != null) {
        this.clearApp();
      }
      renderGlobal.currentApp = this.initApplication();

      if(newStage.name == "GUNNER") {
        renderGlobal.currentGame = new Gunner(renderGlobal.currentApp, this.controller);
      } else if(newStage.name == "BASKET") {
        renderGlobal.currentGame = new Basket(renderGlobal.currentApp, this.controller);
      }

      //renderGlobal.currentApp.addChild(newStage);
    } else {
      if(renderGlobal.currentApp != null) {
        this.clearApp();
      }
    }
  }

  getCenterOfWindow() {
    return [this.getRendererWidth() / 2, this.getRendererHeight() / 2]
  }

   getRendererWidth() {
    return renderGlobal.currentApp.renderer.width;
  }

   getRendererHeight() {
    return renderGlobal.currentApp.renderer.height;
  }

  clearApp() {
    if(renderGlobal.currentApp != null) {
        renderGlobal.currentApp.destroy();
        renderGlobal.currentApp = null;
    }
  }

  initApplication() {
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
        this.resize(app.renderer, ratio);
    };
    return app;
  }

  resize(renderer, ratio) {
      if (window.innerWidth / window.innerHeight >= ratio) {
          var w = window.innerHeight * ratio;
          var h = window.innerHeight;
      } else {
          var w = window.innerWidth;
          var h = window.innerWidth / ratio;
      }
      renderer.view.style.width = w + 'px';
      renderer.view.style.height = h + 'px';
  }

}
