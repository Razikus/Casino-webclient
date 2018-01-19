import { Response } from '../communication/shared/Response';
import { WebClientAction } from '../communication/shared/WebClientAction';
import { makeDefaultToast } from '../views/utils/toaster';
import { warn } from '../logger/logger';

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
    console.log(obj);
    if(obj.className !== 'undefined') {
      this.recognizeClass(obj);
    } else {
      warn("Cannot understand: " + event.data);
    }
  }

  recognizeClass(object) {
    if(object.className === 'Response') {
      let response = new Response(object.type, object.description, object.notifyType, object.notifyState, object.args);
      this.recognizeNotifier(response);
    } else if(object.className === 'WebClientAction') {
      let action = new WebClientAction(object.type, object.args);
      this.recognizeAction(action);
    } else {
      if(object.className) {
        warn("Cannot understand: " + object.className);
      }
    }
  }

  recognizeNotifier(responseObject) {
    if(responseObject.notifyType == "TOAST") {
      makeDefaultToast(this.messageService.msg(responseObject.notifyState), this.messageService.msg(responseObject.description), responseObject.notifyState.toLowerCase());
    }
  }

  recognizeAction(action) {
    if(action.type === "REFRESHUSERS") {
      this.controller.playersCount(action.args.players);
    } else if(action.type === "REFRESHMONEY") {
      this.controller.balance(action.args.money);
    } else if(action.type === "CHANGE_STATE") {
      this.controller.state(action.args.newState);
    } else if(action.type === "ACCOUNTINFORMATION") {
      this.controller.accountInformation.nickname(action.args.nickname);
      this.controller.accountInformation.email(action.args.email);
      this.controller.accountInformation.activated( action.args.activated);
    } else if(action.type === "GUN_FIRE_RESPONSE") {
      this.controller.viewController.stageController.notifyAbout(action);
    } else if(action.type === "BASKETINFORMATION") {
      this.controller.basketInformation.basketCap(action.args.basketCap);
      this.controller.basketInformation.basketBid(action.args.basketBid);
      this.controller.basketInformation.basketNow(action.args.basketNow);
    }
  }
}
