export class Response {
  constructor(type, description, notifyType, notifyState, args) {
    this.type = type;
    this.description = description;
    this.notifyType = notifyType;
    this.notifyState = notifyState;
    this.args = args;
  }
}
