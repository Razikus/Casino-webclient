export class DevService {
  constructor(controller) {
    let self = this;
    this.controller = controller;
    this.argName = ko.observable();
    this.argValue = ko.observable();

    this.devAction = ko.observable({
      type: ko.observable(""),
      args: ko.observable({}),
    });
    this.devJson = ko.computed(function() {
        return ko.toJSON(this.devAction());
    }, this);

    this.addArg = function() {
      let current = self.devAction().args();
      let index = self.argName();
      current[index] = ko.observable(self.argValue());
      self.devAction().args(current);
    };
    this.devArgs = ko.computed(function() {
        let args = self.devAction().args();
        return Object.keys(args);
    }, this);
    this.devSend = function() {
      self.controller.send(self.devJson());
    };
    this.devValueFor = function(key) {
      return self.devAction().args()[key];
    }
    this.removeArg = function(key) {
      let current = self.devAction().args();
      let index = key;
      delete current[index];
      self.devAction().args(current);
    }

    this.actions = [
      { type: ko.observable("REGISTER"), args: ko.observable({ login: ko.observable(""), password: ko.observable(""), email: ko.observable("")})},
      { type: ko.observable("LOGIN"), args: ko.observable({ login: ko.observable(""), password: ko.observable("")})},
      { type: ko.observable("ACCOUNTACTIVATION"), args: ko.observable({ token: ko.observable(""), nickname: ko.observable("")})},
      { type: ko.observable("MYOWN"), args: ko.observable({ })},

    ]
  }
}
