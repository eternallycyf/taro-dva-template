import React from 'react'
import * as echarts from '@/components/ec-canvas/echarts'

/**
 * <BaseCharts option={option} type={'mychart-area'} />
 * @property {Object} option 配置项
 * @property {string | number} width 画布的宽度
 * @property {string | number} height 画布的高度
 * @property {string} type 图表的类型
 * @returns 
 */
const BaseCharts = ({
  option = {},
  width = 200,
  height = 200,
  type = 'mychart-area'
}) => {

  /**
   * 
   * @param {Object} option 图表的配置项
   * @param {number} w canvas画布的宽度
   * @param {number} h canvas画布的高度
   */
  const init = (option, w, h) => {
    return {
      onInit: (canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
          width: w ? w : width,
          height: h ? h : height
        })
        canvas.setChart(chart)
        chart.setOption(option)
        return chart
      }
    }
  }

  return (
    <>
      <ec-canvas
        canvas-id={type}
        ec={init(option, width, height)}
      />
    </>
  )
}

export default BaseCharts