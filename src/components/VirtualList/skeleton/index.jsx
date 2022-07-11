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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var taro_1 = require("@tarojs/taro");
var components_1 = require("@tarojs/components");
require("./index.less");
var Skeleton = /** @class */ (function (_super) {
    __extends(Skeleton, _super);
    function Skeleton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            parentRect: {},
            bg: [],
            list: [],
            listRadius: [],
        };
        return _this;
    }
    Skeleton.prototype.componentDidMount = function () {
        if (taro_1.default.getEnv() === 'WEAPP') {
            this.weappSkl();
        }
        else {
            this.h5Skl();
        }
    };
    Skeleton.prototype.h5Skl = function () {
        var _this = this;
        var selObj = {
            bg: '.skeleton-bg',
            list: '.skeleton-rect',
            listRadius: '.skeleton-radius',
        };
        var selAll = function (selector) {
            var list = [];
            document.querySelectorAll(selObj[selector]).forEach(function (i) {
                // @ts-ignore
                list.push(i.getBoundingClientRect());
            });
            // @ts-ignore
            _this.setState((_a = {},
                _a[selector] = list,
                _a));
            var _a;
        };
        requestAnimationFrame(function () {
            var _a = _this.props.selector, selector = _a === void 0 ? '.skeleton' : _a;
            var dom = document.querySelector(selector);
            if (dom) {
                var rect_1 = dom.getBoundingClientRect();
                var parentStyle_1 = {};
                Object.keys(rect_1).forEach(function (i) {
                    parentStyle_1[i] = rect_1[i] + "px";
                });
                _this.setState({
                    parentRect: parentStyle_1
                });
                selAll('bg');
                selAll('list');
                selAll('listRadius');
            }
        });
    };
    Skeleton.prototype.weappSkl = function () {
        var _this = this;
        // @ts-ignore
        taro_1.default.Current.page && taro_1.default.createSelectorQuery()
            .in(taro_1.default.Current.page)
            .selectAll(".skeleton-bg")
            .boundingClientRect()
            .exec(function (res) {
            _this.setState({ bg: res[0] });
        });
        taro_1.default.createSelectorQuery()
            .selectAll(".skeleton-rect")
            .boundingClientRect()
            .exec(function (res) {
            _this.setState({ list: res[0] });
        });
        taro_1.default.createSelectorQuery()
            .selectAll(".skeleton-radius")
            .boundingClientRect()
            .exec(function (res) {
            _this.setState({ listRadius: res[0] });
        });
    };
    Skeleton.prototype.render = function () {
        var _a = this.state, list = _a.list, bg = _a.bg, listRadius = _a.listRadius, parentRect = _a.parentRect;
        var isLoaded = this.props.isLoaded; // 是否加载完成
        return (<components_1.View>
        <components_1.View style={{ opacity: isLoaded ? 1 : 0 }}>{this.props.children}</components_1.View>
        {isLoaded ? ('') : (<components_1.View style={__assign({}, parentRect, { backgroundColor: 'white', position: 'fixed', overflow: 'hidden' })}>
            {bg.map(function (item, index) {
            var _a = item, width = _a.width, height = _a.height, top = _a.top, left = _a.left;
            return (<components_1.View key={"" + item.height + index} style={{
                background: 'white',
                width: width + "px",
                height: height + "px",
                top: top + "px",
                left: left + "px",
                position: 'fixed',
            }}/>);
        })}
            {list.map(function (item, index) {
            var _a = item, width = _a.width, height = _a.height, top = _a.top, left = _a.left;
            return (<components_1.View key={"" + item.height + index} className='skeletonBg' style={{
                width: width + "px",
                height: height + "px",
                top: top + "px",
                left: left + "px",
                position: 'fixed',
            }}/>);
        })}
            {listRadius.map(function (item, index) {
            var _a = item, width = _a.width, height = _a.height, top = _a.top, left = _a.left;
            return (<components_1.View key={"" + item.height + index} className='skeletonBg' style={{
                borderRadius: '50%',
                width: width + "px",
                height: height + "px",
                top: top + "px",
                left: left + "px",
                position: 'fixed',
            }}/>);
        })}
          </components_1.View>)}
      </components_1.View>);
    };
    Skeleton.defaultProps = {
        isLoaded: false,
        selector: '.skeleton',
    };
    return Skeleton;
}(react_1.Component));
exports.default = Skeleton;
