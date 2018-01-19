import { info } from '../../../logger/logger.js';


export class Basket {
  constructor(app, controller) {
    this.app = app;
    this.controller = controller;

    this.gun = PIXI.Sprite.fromImage('assets/images/basket/basket.png');

    info("Basket initialized");
  }

  getStage() {
      let stage = new PIXI.Container();
      let self = this;


      this.gun.anchor.set(0.5);
      this.gun.x = this.app.screen.width / 2;
      this.gun.y = this.app.screen.height / 2;
      this.gun.interactive = true;
      this.gun.buttonMode = true;

      this.gun.on('pointerdown', function() {
        self.controller.communicationService.playBasket();
      });
      stage.addChild(this.gun);
      return stage;
  }
}
