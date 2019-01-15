"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dispatcher = (function () {
    function Dispatcher() {
        this.callbacks = [];
    }
    Dispatcher.prototype.register = function (callback) {
        this.callbacks.push(callback);
    };
    Dispatcher.prototype.dispatch = function (action) {
        this.callbacks.forEach(function (callback) {
            callback(action);
        });
    };
    return Dispatcher;
}());
exports.default = Dispatcher;
