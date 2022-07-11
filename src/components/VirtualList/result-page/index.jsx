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
var components_1 = require("@tarojs/components");
require("./index.less");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Page.prototype.render = function () {
        var _a = this.props, isError = _a.isError, launchError = _a.launchError, launchEmpty = _a.launchEmpty, isEmpty = _a.isEmpty, emptyText = _a.emptyText, fetchInit = _a.fetchInit;
        var showError = isError; // isErrorUI权重最高
        var showErrorText = showError && !launchError; // 渲染ErrorText
        var showRenderError = showError && launchError; // 渲染renderError
        var showEmpty = !isError && isEmpty; // isErrorUI权重最高
        var showEmptyText = showEmpty && !launchEmpty; // 渲染emptyText
        var showRenderEmpty = showEmpty && launchEmpty; // 渲染renderEmpty
        return (<components_1.View>
        {showErrorText && (<components_1.View className='errorPage'>
            <components_1.View className='marginBottom30'>啊哦，网络悄悄跑到外星球去了~</components_1.View>
            <components_1.View className='button' onClick={fetchInit}>
              重新加载
            </components_1.View>
          </components_1.View>)}
        
        {showRenderError ? this.props.renderError : ''}
        
        {showEmptyText && (<components_1.View className='noContentTips'>
            {emptyText}
          </components_1.View>)}
        
        {showRenderEmpty ? this.props.renderEmpty : ''}
      </components_1.View>);
    };
    return Page;
}(react_1.Component));
exports.default = Page;
