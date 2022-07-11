"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var taro_1 = require("@tarojs/taro");
function get(key, defaultValue) {
    var value = taro_1.default.getStorageSync(key);
    if (!value || value === ' ' || value === 'undefined' || value === 'null') {
        value = '';
    }
    // @ts-ignore
    return value ? JSON.parse(value) : defaultValue;
}
function set(key, value) {
    taro_1.default.setStorageSync(key, JSON.stringify(value));
}
function remove(key) {
    taro_1.default.removeStorageSync(key);
}
function clear() {
    taro_1.default.clearStorageSync();
}
exports.default = {
    get: get,
    set: set,
    remove: remove,
    clear: clear,
};
