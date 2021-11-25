import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import styles from "./index.less";
import VirtualList from '@tarojs/components/virtual-list'
import Taro, { usePullDownRefresh, useReachBottom } from "@tarojs/taro";
import { AtLoadMore } from 'taro-ui'
const page = ({
  dispatch,
  list,
  page,
  total,
  spinLoading = false
}) => {
  const [status, setStatus] = useState('more')


  // 初始化数据
  useEffect(() => {
    dispatch({
      type: 'virtualList/fetch',
      payload: {
        page: 1,
        pageSize: 10
      }
    })
  }, [])

  const Row = React.memo(({ id, index, style, data }) => {
    return (
      <View id={id} >
        Row {index} :
      </View>
    );
  })


  const PullRefreshRequest = async () => {
    Taro.startPullDownRefresh()
    setStatus('loading')
    const flag = await dispatch({
      type: "virtualList/fetch",
      payload: {
        page: page + 1,
        list,
      },
    });
    if (!flag) {
      setStatus('noMore')
    }
  }

  usePullDownRefresh(() => {
    console.log('onPullDownRefresh')
  })

  useReachBottom(() => {
    console.log('onReachBottom')
  })


  return (
    <>
      <VirtualList
        className='List'
        height={700} /* 列表的高度 */
        width='100%' /* 列表的宽度 */
        itemData={list} /* 渲染列表的数据 */
        itemCount={list.length} /*  渲染列表的长度 */
        itemSize={100} /* 列表单项的高度  */
        renderBottom={
          <AtLoadMore
            onClick={() => PullRefreshRequest()}
            status={status}
            moreText='点击加载更多'
            loadingText='加载中'
            noMoreText="没有数据了"
          />
        }
        onScroll={({ scrollDirection, scrollOffset }) => {
          // scrollOffset >= (list.length-height/itemSize)*itemSize - 滚动提前距离
          if (
            scrollDirection === 'forward' &&
            scrollOffset >= ((list.length - 7) * 100)
          ) {
            PullRefreshRequest()
          }
        }}
      >
        {Row}
      </VirtualList>
    </>
  )
}

export default connect(({ virtualList, loading }) => ({
  ...virtualList,
  spinLoading: loading.effects["virtualList/fetch"],
}))(page);