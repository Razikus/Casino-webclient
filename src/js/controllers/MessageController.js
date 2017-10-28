import { Response } from '../communication/shared/Response';
import { makeDefaultToast } from '../views/utils/toaster';

export class MessageController {
  constructor(controller, messageService) {
    this.controller = controller;
    this.messageService = messageService;
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
      let response = new Response(object.type, object.description, object.notifyType, object.notifyState, object.args);

      if(response.notifyType == "TOAST") {
        makeDefaultToast(this.messageService.msg(response.notifyState), this.messageService.msg(response.description), response.notifyState.toLowerCase());
      }
    }
  }
}
