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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var taro_1 = require("@tarojs/taro");
var components_1 = require("@tarojs/components");
var skeleton_1 = require("../skeleton");
var loading_1 = require("../loading");
var tool_1 = require("./tool");
var result_page_1 = require("../result-page");
var init_1 = require("./init");
// eslint-disable-next-line no-unused-vars
var utils_1 = require("../utils");
require("./index.less");
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // eslint-disable-next-line react/sort-comp
        _this.lazyClassName = (function () {
            return typeof _this.props.lazy === "boolean"
                ? ".lazy-view"
                : _this.props.lazy;
        })();
        _this.lazyKey = (function () {
            if (_this.props.lazy) {
                var lazyStorage = _this.props.lazyStorage;
                return tool_1.default.lazyScrollInit(_this.lazyClassName, lazyStorage);
            }
            else {
                return undefined;
            }
        })();
        _this.lazyViewHeight = 0;
        _this.bodyViewId = new Date().getTime() + "-bodyViewId";
        _this.tipDampTextId = new Date().getTime() + "-tipDampTextId";
        _this.scrollView = {};
        _this.state = init_1.initialState;
        _this.startY = 0;
        _this.needPullDown = true;
        _this.touchScrollTop = 0;
        _this.loadingState = false;
        _this.touchEvent = function (e) {
            e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
            var type = e.type, touches = e.touches;
            var _a = _this.props, onPullDownRefresh = _a.onPullDownRefresh, distanceToRefresh = _a.distanceToRefresh, damping = _a.damping;
            if (!onPullDownRefresh)
                return;
            switch (type) {
                case "touchstart": {
                    _this.touchScrollTop = _this.state.scrollTop;
                    (_this.needPullDown = true), (_this.startY = touches[0].clientY);
                    break;
                }
                // 拖动方向不符合的不处理
                case "touchmove": {
                    var clientY = touches[0].clientY;
                    var touchScrollTop = _this.touchScrollTop;
                    var height = Math.floor((clientY - _this.startY) / 5);
                    if (height < 0 || touchScrollTop > 5)
                        return;
                    if (height > 0 && height < (damping || 0)) {
                        // console.log( this.loadingState, 'sss')
                        // todo 需改loading动画
                        _this.loadingState = true;
                        var needPullDown = false;
                        if (height < (distanceToRefresh || 0)) {
                            needPullDown = true;
                        }
                        _this.updateDampText(needPullDown);
                        _this.moveBox(height);
                    }
                    break;
                }
                case "touchend": {
                    console.log(_this.loadingState, 'sdsd');
                    _this.loadingState = false;
                    if (!_this.needPullDown) {
                        _this.fetchInit();
                    }
                    else {
                        _this.resetLoad(0);
                    }
                    break;
                }
                case "touchcancel": {
                    _this.resetLoad(0);
                    break;
                }
                default: {
                    // console.log('foo');
                }
            }
        };
        _this.fetchInit = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var onPullDownRefresh, reset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onPullDownRefresh = this.props.onPullDownRefresh;
                        this.resetLoad(1);
                        if (!onPullDownRefresh) return [3 /*break*/, 2];
                        reset = function () {
                            _this.setState({ isInit: true });
                            _this.resetLoad(0, function () {
                                _this.setState({ isInit: false });
                            });
                        };
                        return [4 /*yield*/, onPullDownRefresh(function () { })];
                    case 1:
                        _a.sent();
                        reset();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        _this.resetLoad = function (status, cb) {
            if (status === void 0) { status = 0; }
            // console.log(status, '11111')
            // status: 0:回复初始值 1：加载中
            // console.log({ status })
            var distanceToRefresh = _this.props.distanceToRefresh;
            var state = {};
            switch (status) {
                case 0:
                    state = {
                        canScrollY: true,
                        downLoading: false
                    };
                    _this.updateDampText(true);
                    _this.moveBox(0);
                    break;
                case 1:
                    state = {
                        canScrollY: false,
                        downLoading: true
                    };
                    _this.updateDampText(false);
                    _this.moveBox(distanceToRefresh);
                    break;
                default:
            }
            // state = Object.assign({}, state,{ blockStyle });
            // this.moveBox(0);
            _this.setState(state);
            // todo 监听真正动画结束
            setTimeout(function () {
                if (cb)
                    cb();
            }, 400);
        };
        _this.handleScrollToLower = function () {
            tool_1.default.debounce(function () {
                // this.getMore();
                utils_1.minGetMore(_this);
            })();
        };
        _this.onScroll = function (e) {
            var scrollTop = e.detail.scrollTop;
            if (_this.props.onScroll)
                _this.props.onScroll(e);
            _this.setState({ scrollTop: scrollTop });
            if (_this.props.lazy) {
                tool_1.default.lazyScroll(_this.lazyKey, _this.lazyViewHeight);
            }
        };
        _this.moveBox = function (y) {
            var transition = y ? "none" : "500ms linear";
            if (taro_1.default.getEnv() === "WEB") {
                var target = document.getElementById(_this.bodyViewId);
                target.style.transform = "translate3d(0," + y + "px,0)";
                target.style.transition = transition;
            }
            else {
                _this.setState({
                    // canScrollY: !y,
                    blockStyle: {
                        transform: "translate3d(0," + y + "px,0)",
                        transition: transition
                    }
                });
            }
        };
        _this.updateDampText = function (act) {
            _this.needPullDown = act;
            var _a = _this.state, isInit = _a.isInit, downLoading = _a.downLoading;
            var showTip = !downLoading && !isInit; // 展示下拉区域文案
            if (!showTip) {
                return '';
            }
            else {
                var _b = _this.props, _c = _b.indicator, indicator = _c === void 0 ? {} : _c, tipFreedText = _b.tipFreedText, tipText = _b.tipText;
                var _d = indicator, _e = _d.activate, activate = _e === void 0 ? "释放刷新" : _e, _f = _d.deactivate, deactivate = _f === void 0 ? "下拉刷新" : _f;
                var text = "";
                if (act) {
                    text = activate || tipText;
                }
                else {
                    text = deactivate || tipFreedText;
                }
                if (taro_1.default.getEnv() === "WEB") {
                    var target = document.getElementById(_this.tipDampTextId);
                    target.innerText = text;
                }
                else {
                    _this.setState({ dampText: text });
                }
                return undefined;
            }
        };
        return _this;
    }
    ListView.prototype.componentWillMount = function () {
    };
    ListView.prototype.componentDidMount = function () {
        var _this = this;
        this.moveBox(0);
        if (this.props.lazy) {
            requestAnimationFrame(function () {
                setTimeout(function () {
                    taro_1.default.createSelectorQuery()
                        .select(".scrollView")
                        .boundingClientRect()
                        .exec(function (res) {
                        var lazyStorage = _this.props.lazyStorage;
                        tool_1.default.updateScrollHeight(_this.lazyKey, res[0].height, lazyStorage);
                        _this.lazyViewHeight = res[0].height;
                    });
                }, 0);
            });
        }
        if (this.props.needInit)
            this.fetchInit();
    };
    ListView.prototype.componentWillUnmount = function () {
        var lazyStorage = this.props.lazyStorage;
        tool_1.default.lazyScrollRemove(lazyStorage);
    };
    ListView.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, hasMore = _a.hasMore, isEmpty = _a.isEmpty, emptyText = _a.emptyText, className = _a.className, isError = _a.isError, isLoaded = _a.isLoaded, selector = _a.selector, _b = _a.launch, launch = _b === void 0 ? {} : _b, footerLoadingText = _a.footerLoadingText, footerLoadedText = _a.footerLoadedText, damping = _a.damping, circleColor = _a.circleColor, autoHeight = _a.autoHeight;
        var _c = launch, _d = _c.launchError, launchError = _d === void 0 ? false : _d, _e = _c.launchEmpty, launchEmpty = _e === void 0 ? false : _e, _f = _c.launchFooterLoaded, launchFooterLoaded = _f === void 0 ? false : _f, _g = _c.launchFooterLoading, launchFooterLoading = _g === void 0 ? false : _g;
        var _h = this.state, canScrollY = _h.canScrollY, blockStyle = _h.blockStyle, downLoading = _h.downLoading, dampText = _h.dampText;
        var showChildren = !(isEmpty || isError); // 展示children内容
        var showFooter = !downLoading && !isEmpty && !isError; // 空、错状态不展示底部
        var footerLoaded = showFooter && !launchFooterLoaded && !hasMore;
        var customFooterLoaded = showFooter && launchFooterLoaded && !hasMore; // 渲染renderLoadedText
        var footerLoading = showFooter && !launchFooterLoading && hasMore;
        var customFooterLoading = showFooter && launchFooterLoading && hasMore; // 渲染renderNoMore
        if (autoHeight) {
            return (<components_1.ScrollView ref={function (node) {
                _this.scrollView = node;
            }} className={className + " " + (downLoading &&
                "downLoadingStyle") + " scrollView autoHeight"} style={__assign({}, style)} scrollY={canScrollY} lowerThreshold={80} onScrollToLower={this.handleScrollToLower} scrollWithAnimation onScroll={this.onScroll}>
          <components_1.View style={{ minHeight: "100%", overflowY: "hidden" }} onTouchMove={function (e) { return _this.touchEvent(e); }} onTouchEnd={function (e) { return _this.touchEvent(e); }} onTouchStart={function (e) { return _this.touchEvent(e); }} onTouchCancel={function (e) { return _this.touchEvent(e); }}>
            <components_1.View 
            // style={trStyle}
            className='bodyView' id={this.bodyViewId}>
              <components_1.View style={blockStyle}>
                <components_1.View style={{ height: damping + "px", marginTop: "-" + damping + "px" }} className='pullDownBlock'>
                  <components_1.View className='tip'>
                    {!downLoading && <components_1.View id={this.tipDampTextId}>{dampText}</components_1.View>}
                    {downLoading &&
                (this.props.customizeLoading ? (this.props.renderCustomizeLoading) : (<loading_1.default color={circleColor}/>))}
                  </components_1.View>
                </components_1.View>
                
                {showChildren && this.props.children}
                <result_page_1.default renderError={this.props.renderError} renderEmpty={this.props.renderEmpty} launchError={launchError} launchEmpty={launchEmpty} isError={isError || false} isEmpty={isEmpty || false} emptyText={emptyText || ""} fetchInit={this.fetchInit}/>
                
                {footerLoading && (<components_1.View className='loading' style={{
                marginBottom: '6px',
                width: '100%',
                textAlign: 'center',
                fontSize: '12px',
                lineHeight: '32px',
                color: '#333'
            }}>{footerLoadingText}</components_1.View>)}
                
                {customFooterLoading && this.props.renderFooterLoading}
                
                {footerLoaded && (<components_1.View className='loaded' style={{
                marginBottom: '6px',
                width: '100%',
                textAlign: 'center',
                fontSize: '12px',
                lineHeight: '32px',
                color: '#333'
            }}>{footerLoadedText || '已到底部'}</components_1.View>)}
                
                {customFooterLoaded && this.props.renderFooterLoaded}
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>);
        }
        return (<skeleton_1.default isLoaded={isLoaded || isError} selector={selector}>
        <components_1.ScrollView ref={function (node) {
            _this.scrollView = node;
        }} className={className + " scrollView"} style={style} scrollY={canScrollY} lowerThreshold={80} onScrollToLower={this.handleScrollToLower} scrollWithAnimation onScroll={this.onScroll}>
          <components_1.View style={{ minHeight: "100%", overflowY: "hidden" }} onTouchMove={function (e) { return _this.touchEvent(e); }} onTouchEnd={function (e) { return _this.touchEvent(e); }} onTouchStart={function (e) { return _this.touchEvent(e); }} onTouchCancel={function (e) { return _this.touchEvent(e); }}>
            <components_1.View className='bodyView' id={this.bodyViewId}>
              <components_1.View style={blockStyle}>
                <components_1.View style={{ height: damping + "px", marginTop: "-" + damping + "px" }} className='pullDownBlock'>
                  <components_1.View className='tip'>
                    {!downLoading && <components_1.View id={this.tipDampTextId}>{dampText}</components_1.View>}
                    {downLoading &&
            (this.props.customizeLoading ? (this.props.renderCustomizeLoading) : (<loading_1.default color={circleColor}/>))}
                  </components_1.View>
                </components_1.View>
                
                {showChildren && this.props.children}
                <result_page_1.default renderError={this.props.renderError} renderEmpty={this.props.renderEmpty} launchError={launchError} launchEmpty={launchEmpty} isError={isError || false} isEmpty={isEmpty || false} emptyText={emptyText || ""} fetchInit={this.fetchInit}/>
                
                {footerLoading && (<components_1.View className='loading'>{footerLoadingText}</components_1.View>)}
                
                {customFooterLoading && this.props.renderFooterLoading}
                
                {footerLoaded && (<components_1.View className='loaded'>{footerLoadedText}</components_1.View>)}
                
                {customFooterLoaded && this.props.renderFooterLoaded}
              </components_1.View>
            </components_1.View>
          </components_1.View>
        </components_1.ScrollView>
      </skeleton_1.default>);
    };
    ListView.options = {
        addGlobalClass: true
    };
    ListView.defaultProps = init_1.initialProps;
    return ListView;
}(react_1.Component));
exports.default = ListView;
