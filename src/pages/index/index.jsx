import { connect } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { useEffect } from 'react'
import Form from '../form'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import styles from './index.less'

const page = ({ dispatch, count, addLoading }) => {

  useEffect(() => {
    dispatch({
      type: 'common/fetchDemo'
    })
  }, [])

  return (
    <View className={styles.test}>
      <AtButton loading={addLoading} type='primary' circle={true} onClick={() => { dispatch({ type: 'common/add' }) }}>+</AtButton>
      <AtButton type='primary' circle={true} onClick={() => { dispatch({ type: 'common/subsub' }) }}>-</AtButton>
      <View><Text>{count}</Text></View>
      <View><Text>Hello, World</Text></View>
      <Text className={styles.txt}>Hello world!</Text>

      <Form />
    </View>
  )
}

export default connect(({ common, loading }) => ({
  ...common,
  addLoading: loading.effects['common/add'],
}))(page)

