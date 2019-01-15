"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter() {
        this.listeners = {};
    }
    EventEmitter.prototype.on = function (eventName, callback) {
        var _this = this;
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
        return function () {
            _this.listeners[eventName] = _this.listeners[eventName].filter(function (fn) { return fn !== callback; });
        };
    };
    EventEmitter.prototype.trigger = function (eventName, data) {
        var listeners = this.listeners[eventName];
        if (listeners) {
            listeners.forEach(function (callback) {
                callback(data);
            });
        }
    };
    return EventEmitter;
}());
exports.default = EventEmitter;
