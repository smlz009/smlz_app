import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import { PageInfoType, resetPageInfo } from '../../../store/pageInfoReduce'

const { TextArea } = Input

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo() as PageInfoType
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()))
  }

  useEffect(() => {
    form.setFieldsValue(pageInfo)
  }, [pageInfo])

  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item name="title" label="问卷标题" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="desc" label="问卷描述">
        <TextArea placeholder="问卷描述" />
      </Form.Item>
      <Form.Item name="css" label="css">
        <TextArea placeholder="css样式代码" />
      </Form.Item>
      <Form.Item name="js" label="js">
        <TextArea placeholder="js脚本代码" />
      </Form.Item>
    </Form>
  )
}

export default PageSetting
