import React from 'react'
import {initialState} from "components/list-view/init";

export interface Props extends React.Props<any> {
  lazy?: boolean | string;
  circleColor?: string;
  style?: any;
  className?: string;
  emptyText?: string;
  footerLoadedText?: string;
  footerLoadingText?: string;
  noMore?: string;
  tipText?: string;
  tipFreedText?: string;
  onScrollToLower: (any?) => void;
  onPullDownRefresh?: (any?) => void;
  hasMore: boolean;
  needInit?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  launch?: Launch;
  renderEmpty?: JSX.Element;
  renderError?: JSX.Element;
  renderFooterLoading?: any;
  renderFooterLoaded?: any;
  renderCustomizeLoading?:JSX.Element;
  customizeLoading?: boolean;
  damping?: number;
  distanceToRefresh?: number;
  indicator?: Indicator;
  isLoaded?: boolean;
  selector?: string;
  onScroll?: (e) => void;
  showIndicator?: boolean;
  lazyStorage?: string;
  autoHeight?: boolean;
}

export interface Indicator {
  activate?: any,
  deactivate?: any,
  release?: any,
  tipFreedText?: any;
}

export interface Launch {
  launchEmpty?: boolean;
  launchError?: boolean;
  launchFooterLoading?: boolean;
  launchFooterLoaded?: boolean;
}

export type State = Readonly<typeof initialState>
