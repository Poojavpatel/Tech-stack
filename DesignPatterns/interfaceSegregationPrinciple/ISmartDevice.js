"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartPhone = void 0;
var SmartPhone = /** @class */ (function () {
    function SmartPhone() {
    }
    SmartPhone.prototype.call = function (contact) {
        console.log("Calling ".concat(contact));
    };
    SmartPhone.prototype.sendSms = function (contact, message) {
        console.log("Sending ".concat(message, " to ").concat(contact));
    };
    SmartPhone.prototype.openApp = function (path) {
        console.log("Opening app ".concat(path));
    };
    SmartPhone.prototype.connectWifi = function (ssid) {
        console.log("Connecting to wifi ".concat(ssid));
    };
    return SmartPhone;
}());
exports.SmartPhone = SmartPhone;
var phone = new SmartPhone();
phone.call("John");
phone.sendSms("John", "How are you");
phone.openApp("Instagram");
phone.connectWifi("home");
