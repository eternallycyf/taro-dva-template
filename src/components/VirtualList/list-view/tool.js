"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var taro_1 = require("@tarojs/taro");
var storage_1 = require("../storage");
function debounce(method, time) {
    if (time === void 0) { time = 500; }
    var timer = null;
    return function () {
        // @ts-ignore
        var context = this;
        // 在函数执行的时候先清除timer定时器;
        // @ts-ignore
        clearTimeout(timer);
        // @ts-ignore
        timer = setTimeout(function () {
            method.call(context);
        }, time);
    };
}
exports.debounce = debounce;
var timer = null;
var startTime = Date.now();
var throttle = function (func, delay) {
    return function () {
        var curTime = Date.now();
        var remaining = delay - (curTime - startTime);
        // @ts-ignore
        var context = this;
        var args = arguments;
        // @ts-ignore
        clearTimeout(timer);
        if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.now();
        }
        else {
            // @ts-ignore
            timer = setTimeout(func, remaining);
        }
    };
};
var wait = function (time) {
    if (time === void 0) { time = 500; }
    return new Promise(function (res) {
        setTimeout(function () {
            res();
        }, time);
    });
};
function lazyScrollInit(className, storagekey) {
    var lazyKey = "lazy" + new Date().getTime();
    var lazyBox = storage_1.default.get("lazyBox_" + storagekey, []);
    if (lazyBox.length) {
        var length_1 = lazyBox.length;
        var lastKey = lazyBox[length_1 - 1];
        // console.log({lastKey})
        if (new Date().getTime() - Number(lastKey.key ? lastKey.key.replace('lazy', '') : 0) > 86400000) {
            lazyBox.splice(0, length_1);
        }
    }
    lazyBox.push({ key: lazyKey, className: className, viewHeight: 0 });
    storage_1.default.set("lazyBox_" + storagekey, lazyBox);
    // console.log('lazyScrollInit``````',)
    return lazyKey;
}
function lazyScrollRemove(storagekey) {
    var lazyBox = storage_1.default.get("lazyBox_" + storagekey, []);
    lazyBox.pop();
    storage_1.default.set("lazyBox_" + storagekey, lazyBox);
}
function updateScrollHeight(key, viewHeight, storagekey) {
    var lazyBox = storage_1.default.get("lazyBox_" + storagekey, []);
    var index = lazyBox.findIndex(function (i) { return i.key === key; });
    var targetLazy = lazyBox[index];
    lazyBox.splice(index, 1, __assign({}, targetLazy, { viewHeight: viewHeight }));
    storage_1.default.set("lazyBox_" + storagekey, lazyBox);
}
function lazyScroll(key, height) {
    // console.log({ selector, key })
    var query = taro_1.default.getEnv() === 'WEB' ? ".lazy-image-" + key : ".lazy-image-" + key;
    throttle(function () {
        setTimeout(function () {
            taro_1.default.createSelectorQuery()
                .selectAll(query)
                .boundingClientRect()
                .exec(function (res) {
                var list = res[0];
                var indexs = [];
                list.forEach(function (i, index) {
                    if (i.top > -height * 1.5 && i.top < height * 1.5) {
                        // @ts-ignore
                        indexs.push(index);
                    }
                });
                // @ts-ignore
                if (taro_1.default[key] && typeof taro_1.default[key] === 'function')
                    taro_1.default[key](indexs);
            });
        }, 0);
    }, 500)();
}
exports.default = { lazyScroll: lazyScroll, wait: wait, debounce: debounce, updateScrollHeight: updateScrollHeight, lazyScrollInit: lazyScrollInit, lazyScrollRemove: lazyScrollRemove };
