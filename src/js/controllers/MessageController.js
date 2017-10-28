import { Response } from '../communication/shared/Response';

export class MessageController {
  constructor(controller) {
    this.controller = controller;
  }

  onMessage(event) {
    this.controller.messageController.recognizeEvent(event);
  }

  recognizeEvent(event) {
    if(event.type === 'message') {
      this.recognizeMessage(event);
    }
  }

  recognizeMessage(event) {
    let obj = JSON.parse(event.data);
    if(obj.className !== 'undefined') {
      this.recognizeClass(obj);
    }
  }

  recognizeClass(object) {
    if(object.className === 'Response') {
      let response = new Response(object.type, object.description, object.notifyType, object.args);
      console.log(response);
    }
  }
}
