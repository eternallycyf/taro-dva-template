import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useEffect } from 'react'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import styles from './index.less'

function page({ dispatch, count }) {

  useEffect(() => {
    dispatch({
      type: 'common/fetchDemo'
    })
  }, [])

  return (
    <View className={styles.test}>
      <AtButton type='primary' circle={true} onClick={() => { dispatch({ type: 'common/add' }) }}>+</AtButton>
      <AtButton type='primary' circle={true} onClick={() => { dispatch({ type: 'common/subsub' }) }}>-</AtButton>
      <View><Text>{count}</Text></View>
      <View><Text>Hello, World</Text></View>
      <Text className={styles.txt}>Hello world!</Text>
    </View>
  )
}

export default connect(({ common }) => ({ ...common }))(page)

