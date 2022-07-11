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
var index_less_1 = require("./index.less");
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Page.prototype.render = function () {
        return (<components_1.View className={index_less_1.default.loadingBox} data-color='red'>
              对方的身份
                <components_1.View style='width:100%;height:100%' className={index_less_1.default.ldsRolling}>
                    <components_1.View className={index_less_1.default.circle} style={{ borderColor: this.props.color }}/>
                    
                </components_1.View>
            </components_1.View>);
    };
    return Page;
}(react_1.Component));
exports.default = Page;
