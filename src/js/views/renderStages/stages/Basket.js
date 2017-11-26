import { info } from '../../../logger/logger.js';


export class Basket {
  constructor(app, controller) {
    this.app = app;
    this.controller = controller;

    info("Basket initialized");
  }
}
