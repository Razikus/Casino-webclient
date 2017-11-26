import { info } from '../../../logger/logger.js';


export class Gunner {
  constructor(app, controller) {
    this.app = app;
    this.controller = controller;

    info("Gunner initialized");
  }
}
