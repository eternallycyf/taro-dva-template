"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var taro_1 = require("@tarojs/taro");
var components_1 = require("@tarojs/components");
require("./block.less");
var storage_1 = require("../storage");
var tool_1 = require("./tool");
var LazyImage = /** @class */ (function (_super) {
    __extends(LazyImage, _super);
    function LazyImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lazyItem = {};
        _this.state = {
            scrollCur: [0]
        };
        _this.isLoad = function (current) {
            return _this.state.scrollCur.includes(current);
        };
        return _this;
    }
    LazyImage.prototype.componentWillMount = function () {
        var lazyStorage = this.props.lazyStorage;
        var lazyItem = storage_1.default.get("lazyBox_" + lazyStorage)[storage_1.default.get("lazyBox_" + lazyStorage).length - 1];
        this.lazyItem = lazyItem;
    };
    LazyImage.prototype.componentDidMount = function () {
        // console.log({ lazyItem })
        this.bindTextListener();
        // console.log('block componentDidMount')
        // console.log(`lazy-image-${this.lazyItem.key}`)
    };
    LazyImage.prototype.componentWillUnmount = function () {
        var key = this.lazyItem.key;
        taro_1.default.eventCenter.off("lazyBlock" + key);
    };
    // 绑定函数
    LazyImage.prototype.bindTextListener = function () {
        var _this = this;
        var _a = this.lazyItem, key = _a.key, viewHeight = _a.viewHeight;
        taro_1.default.eventCenter.on("lazyBlock" + key, function (scrollCur) {
            _this.setState({
                scrollCur: scrollCur
            });
        });
        // @ts-ignore
        taro_1.default[key] = taro_1.default.eventCenter.trigger.bind(taro_1.default.eventCenter, "lazyBlock" + key);
        setTimeout(function () {
            tool_1.default.lazyScroll(key, viewHeight);
        }, 0);
    };
    LazyImage.prototype.render = function () {
        var current = this.props.current;
        return (<components_1.View className={"lazy-image-" + this.lazyItem.key + " " + this.props.className}>
          {this.isLoad(current) ? (<components_1.View className='blockLoad'>
                  {this.props.children}
                </components_1.View>) : ('')}
        </components_1.View>);
    };
    LazyImage.options = {
        addGlobalClass: true,
    };
    LazyImage.externalClasses = ['img-class'];
    LazyImage.defaultProps = {
        lazyStorage: 'box'
    };
    return LazyImage;
}(react_1.Component));
exports.default = LazyImage;
