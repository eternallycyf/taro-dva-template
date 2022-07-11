import React, { Component } from 'react';
import { View } from '@tarojs/components';
import styles from './index.less'

interface PagePros {
    color?: any;
}
class Page extends Component<PagePros> {
    render() {
        return (
            <View className={styles.loadingBox} data-color='red'>
              对方的身份
                <View style='width:100%;height:100%' className={styles.ldsRolling}>
                    <View className={styles.circle} style={{ borderColor: this.props.color }} />
                    {/*<View className='circle-gap'/>*/}
                </View>
            </View>
        )}
}

export default Page;
