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

  notifyAbout(obj) {
    renderGlobal.currentGame.notify(obj);
  }

  switchStage(canvasInitialized, newStage) {
    if(newStage && renderGlobal.currentStage && renderGlobal.currentStage.sounds) {
      renderGlobal.currentStage.sounds.forEach(function(value, index, arr) {
          value.stop();
        });
    }
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
        renderGlobal.currentStage = renderGlobal.currentGame.getStage();
        renderGlobal.currentApp.stage.addChild(renderGlobal.currentStage);
      } else if(newStage.name == "BASKET") {
        renderGlobal.currentGame = new Basket(renderGlobal.currentApp, this.controller);
        renderGlobal.currentStage = renderGlobal.currentGame.getStage();
        renderGlobal.currentApp.stage.addChild(renderGlobal.currentStage);
      }

      //renderGlobal.currentApp.addChild(newStage);
    } else {
      if(renderGlobal.currentApp != null) {
        this.clearApp();
      }
    }
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
    let app = new PIXI.Application(mainCanvas.offsetWidth, mainCanvas.offsetHeight, {view: mainCanvas}, rendererOptions);
    let self = this;
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

export function getCenterOfWindow() {
  return [getRendererWidth() / 2, getRendererHeight() / 2]
}

 export function getRendererWidth() {
  return renderGlobal.currentApp.renderer.width;
}

 export function getRendererHeight() {
  return renderGlobal.currentApp.renderer.height;
}
