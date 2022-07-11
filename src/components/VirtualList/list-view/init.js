"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialState = {
    hideInd: false,
    touchScrollTop: 0,
    scrollTop: 0,
    startY: 0,
    downLoading: false,
    lowerLoading: false,
    // needPullDown: true,
    canScrollY: true,
    isInit: false,
    blockStyle: {
        transform: 'translate3d(0,0,0)',
        transition: 'none',
    },
    dampText: '',
};
exports.initialProps = {
    selector: 'skeleton',
    circleColor: '',
    lazy: false,
    distanceToRefresh: 50,
    damping: 100,
    isLoaded: true,
    isEmpty: false,
    emptyText: '',
    noMore: '',
    footerLoadingText: '加载中',
    footerLoadedText: '',
    scrollTop: 0,
    touchScrollTop: 0,
    onScrollToLower: function () {
    },
    showIndicator: true,
    className: '',
    onPullDownRefresh: function () { },
    hasMore: false,
    needInit: false,
    isError: false,
    launch: {},
    renderEmpty: null,
    renderError: null,
    autoHeight: false,
    indicator: {
        activate: '下拉刷新',
        deactivate: '释放刷新'
    },
    lazyStorage: 'box'
};
