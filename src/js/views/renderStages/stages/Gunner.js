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

export class Gunner {
  constructor(app, controller) {
    this.app = app;
    this.controller = controller;

    info("Gunner initialized");
  }

  getStage() {
    let stage = new PIXI.Container();
    let test = createSmallerText("Gunner", 100, 100);

    stage.addChild(test);
    return stage;
  }
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
