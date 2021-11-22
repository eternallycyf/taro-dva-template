import { useRef, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import {
  CustomizeForm,
  FormDependency,
  FormPicker,
  FormRadioGroup,
  FormTextArea,
  FormTextInput,
  FormSwitch,
  FormCheckboxGroup
} from 'form-taro3-react'
import styles from './index.less'

function Form() {
  useEffect(() => {
    formRef.current?.setFieldsValue({
      title: 'title',
      language: '0',
      date: '2021-9-18',
      subject: 'Chinese',
      content: '灰色的',
      switch: true,
      phone: ['huawei', 'realme']
    })
  }, [])
  // 表单 Ref
  const formRef = useRef()
  return (
    <View className={styles.form}>
      {/* 表单组件 */}
      <CustomizeForm
        ref={formRef}
      // defaultValue={{
      //   content: "Taro 3.x React 表单组件封装",
      // }}
      >
        {/* 单行文本输入框 */}
        <FormTextInput
          label='标题'
          fieldProps={{
            name: 'title',
            placeholder: '请输入标题'
            // password: true
          }}
          rules={[
            { required: true, message: '标题不能为空' },
            { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '标题不符合要求' }
          ]}
          hideClear
        />
        {/* 滚动选择器 */}
        <FormPicker
          label='选择语言'
          fieldProps={{
            name: 'language',
            mode: 'selector',
            range: ['中文', '英语', '法语']
            // range: [{ value: '中文' }, { value: '英语' }, { value: '法语' }],
            // rangeKey: 'value'
          }}
          rules={{ required: true, message: '请选择语言' }}
        // placeholder='123'
        />
        <FormPicker
          label='运动'
          fieldProps={{
            name: 'sport',
            mode: 'multiSelector',
            range: [
              ['重剑', '花剑', '佩剑'],
              ['蝶泳', '仰泳', '混合泳']
            ]
          }}
          separator=','
        />
        <FormPicker
          label='选择日期'
          fieldProps={{
            name: 'date',
            mode: 'date'
            // fields: 'month'
          }}
          rules={{ required: true, message: '请选择日期' }}
        />
        <FormPicker
          label='选择时间'
          fieldProps={{
            name: 'time',
            mode: 'time'
          }}
          rules={{ required: true, message: '请选择时间' }}
        />
        {/* 单选框 */}
        <FormRadioGroup
          label='学科'
          fieldProps={{
            name: 'subject'
          }}
          options={[
            { label: '语文', option: { value: 'Chinese' } },
            { label: '数学', option: { value: 'math' } }
          ]}
          rules={{ required: true, message: '请选择学科' }}
        />
        {/* 联动控件 */}
        <FormDependency
          renderer={form => {
            return form?.subject === 'Chinese' ? (
              <Text>你选择了：语文</Text>
            ) : form?.subject === 'math' ? (
              <Text>你选择了：数学</Text>
            ) : (
              <Text>你选择了：--</Text>
            )
          }}
        />
        {/* 多行文本输入框 */}
        <FormTextArea
          label='内容'
          fieldProps={{ name: 'content', placeholder: '请输入' }}
          rules={{ required: true, message: '内容不能为空' }}
        />
        {/* 开关 */}
        <FormSwitch label='开关' fieldProps={{ name: 'switch' }} />
        {/* 多选框 */}
        <FormCheckboxGroup
          label='多选框'
          fieldProps={{
            name: 'phone'
          }}
          options={[
            { label: '华为', value: 'huawei' },
            { label: '小米', value: 'xiaomi' },
            { label: '真我', value: 'realme' }
          ]}
        />
        <Button
          type='primary'
          onClick={() => {
            formRef.current
              .validate()
              .then(() => {
                console.log(formRef.current?.getFieldsValue())
              })
              .catch(() => {
                // 校验不通过
              })
            // formRef.current.validateField('title').then(() => {
            //   console.log(formRef.current?.getFieldValue('title'));
            // }).catch(()=>{
            //   // 校验不通过
            // });;
          }}
        >
          提交
        </Button>
        <Button
          style={{ marginTop: 10 }}
          onClick={() => {
            formRef.current.reset()
            // formRef.current.reset({ title: 'reset' })
          }}
        >
          重置
        </Button>
      </CustomizeForm>
    </View>
  )
}

export default Form
