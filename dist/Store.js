"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = (function () {
    function Store() {
        this.subscribers = [];
        this.reducers = {};
        this.state = {};
    }
    Store.prototype.addReducer = function (key, reducer) {
        this.reducers[key] = reducer;
        this.state = this.reduce({}, { type: '' });
    };
    Object.defineProperty(Store.prototype, "value", {
        get: function () {
            return this.state;
        },
        enumerable: true,
        configurable: true
    });
    Store.prototype.subscribe = function (fn) {
        var _this = this;
        this.subscribers = this.subscribers.concat([fn]);
        this.notify();
        return function () {
            _this.unsubscribe(fn);
        };
    };
    Store.prototype.unsubscribe = function (fn) {
        this.subscribers = this.subscribers.filter(function (sub) { return sub !== fn; });
    };
    Store.prototype.dispatch = function (action) {
        this.state = this.reduce(this.state, action);
        this.notify();
    };
    Store.prototype.notify = function () {
        var _this = this;
        this.subscribers.forEach(function (fn) { return fn(_this.value); });
    };
    Store.prototype.reduce = function (state, action) {
        var _this = this;
        var newState = {};
        Object.keys(this.reducers).forEach(function (key) {
            newState[key] = _this.reducers[key](state[key], action);
        });
        return newState;
    };
    return Store;
}());
exports.default = Store;
