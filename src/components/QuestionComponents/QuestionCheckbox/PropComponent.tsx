import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Space, Button } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { QuestionCheckboxType, OptionType } from './interface'

const PropComponent: FC<QuestionCheckboxType> = (props: QuestionCheckboxType) => {
  const { title = '', list = [], isVertical = false, onChange, disabled } = props

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, list })
  }, [title, isVertical, list])

  function handleValuesChange() {
    if (onChange) {
      const newValue = form.getFieldsValue() as QuestionCheckboxType
      if (newValue.list) {
        newValue.list = newValue.list.filter((opt) => !(opt.text == null))
      }
      const { list } = newValue
      list?.forEach((opt) => {
        if (!opt.value) {
          opt.value = nanoid()
        }
      })
      onChange(newValue)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, list, isVertical }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox></Checkbox>
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((item: OptionType) => {
                              if (item.text === text) {
                                num += 1
                              }
                            })
                            if (num === 1) {
                              return Promise.resolve()
                            } else {
                              return Promise.reject(new Error('选项不能重复'))
                            }
                          }
                        }
                      ]}
                    >
                      <Input placeholder="请输入选项"></Input>
                    </Form.Item>
                    {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ value: '', text: '', checked: false })}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="竖向排列" name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
