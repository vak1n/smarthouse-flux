"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = (function () {
    function Store(defaultSore, reducer, dispatcher, emitter) {
        var _this = this;
        this.store = defaultSore;
        dispatcher.register(function (action) {
            _this.store = reducer(_this.store, action);
            emitter.trigger(action.type, _this.store.slice());
        });
    }
    return Store;
}());
exports.default = Store;
