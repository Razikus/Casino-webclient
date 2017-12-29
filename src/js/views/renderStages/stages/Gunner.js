import { info } from '../../../logger/logger.js';
import { makDefaultSuccessToast, makDefaultErrorToast } from '../../utils/toaster';

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

export class Gunner {
  constructor(app, controller) {
    this.app = app;
    this.controller = controller;
    this.gun = PIXI.Sprite.fromImage('assets/images/gunner/gun.png');
    this.sounds = getSounds();
    this.sounds.once('load', function() {
      info("Gunner sounds initialized");
    })
    info("Gunner game initialized");
  }

  getStage() {
    let stage = new PIXI.Container();
    let self = this;
    stage.sounds = [this.sounds];
    this.sounds.play('entry');
    this.gun.anchor.set(0.5);
    this.gun.x = this.app.screen.width / 2;
    this.gun.y = this.app.screen.height / 2;
    this.gun.interactive = true;
    this.gun.buttonMode = true;
    this.bid = 50;

    this.bid50 = createSmallerText("50", 40, 40);
    this.bid100 = createSmallerText("100!", 130, 40);
    this.bid200 = createSmallerText("200!!!", 240, 40);
    this.choosen = this.bid50;
    this.bid50.on('pointerdown', function() {
      self.bid = 50;
      self.choosen = self.bid50;
    });

    this.bid100.on('pointerdown', function() {
      self.bid = 100;
      self.choosen = self.bid100;
    });

    this.bid200.on('pointerdown', function() {
      self.bid = 200;
      self.choosen = self.bid200;
    });

    stage.addChild(this.bid50);
    stage.addChild(this.bid100);
    stage.addChild(this.bid200);

    this.gun.on('pointerdown', function() {
      self.controller.communicationService.playGunner(self.bid);
    });
    stage.addChild(this.gun);

    this.app.ticker.add(function(delta) {
      self.choosen.rotation += 0.1 * delta;
    });

    return stage;
  }

  notify(object) {
    if(object.type === "GUN_FIRE_RESPONSE") {
      this.sounds.stop();
      if(object.args.win == 1) {
        this.sounds.play('win');
        makDefaultSuccessToast(this.controller.msg("Win"), this.controller.msg("winmuch") + ": " + object.args.howMany);
      } else if(object.args.win == 0) {
        this.sounds.play('lose');
        makDefaultErrorToast(this.controller.msg("Lose"), this.controller.msg("tryagain"));
      }
    }
  }
}



function getSounds() {
    return new Howl({
      src: ["assets/sounds/gunner/gunner.mp3"],
      sprite: {
        entry: [0, 13900],
        lose: [14000, 4500],
        win: [18700, 24200]
      }});
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
