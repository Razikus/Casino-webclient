import { info } from '../../../logger/logger.js';

const textStyle = new PIXI.TextStyle({
    fontFamily: 'Impact',
    fontSize: 50,
    fill: ['#ffffff', '#FFFFFF'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#4a1850',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

export class Basket {
  constructor(app, controller) {
    this.app = app;
    this.controller = controller;

    this.basket = PIXI.Sprite.fromImage('assets/images/basket/basket.png');

    this.sounds = getSounds();
    this.sounds.once('load', function() {
      info("Gunner sounds initialized");
    })
    info("Basket initialized");
  }

  getStage() {
      let stage = new PIXI.Container();
      let self = this;

      stage.sounds = [this.sounds];
      self = this;

      this.state = createSmallerText(self.controller.basketInformation.basketNow() + "/" + self.controller.basketInformation.basketCap() + ": " + self.controller.basketInformation.basketBid(), 200, 100);
      this.basket.anchor.set(0.5);
      this.basket.x = this.app.screen.width / 2;
      this.basket.y = this.app.screen.height / 2;
      this.basket.interactive = true;
      this.basket.buttonMode = true;
      this.basket.on('pointerdown', function() {
        self.sounds.stop();
        self.sounds.play();
        self.controller.communicationService.playBasket();
      });

      this.controller.basketInformation.basketNow.subscribe(function() {
        self.state.text = self.controller.basketInformation.basketNow() + "/" + self.controller.basketInformation.basketCap() + ": " + self.controller.basketInformation.basketBid()
      })
      stage.addChild(this.basket);
      stage.addChild(this.state);
      return stage;
  }
}
function getSounds() {
    return new Howl({
      src: ["assets/sounds/basket/cash.wav"]});
  }

  function createSmallerText(text, x, y) {
    let textSprite = new PIXI.Text(text, textStyle);
    textSprite.x = x;
    textSprite.y = y;
    textSprite.anchor.set(0.5);
    textSprite.interactive = true;
    textSprite.buttonMode = true;
    return textSprite;
  }
