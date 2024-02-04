import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { QuestionRadioPropsType, OptionType } from './interface'

const PropComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options, disabled, onChange } = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options })
  }, [title, isVertical, value, options])

  function handleValuesChange() {
    if (onChange) {
      const newValue = form.getFieldsValue() as QuestionRadioPropsType
      if (newValue.options) {
        newValue.options = newValue.options.filter((opt) => !(opt.text == null))
      }
      const { options } = newValue
      options?.forEach((opt) => {
        if (!opt.value) {
          opt.value = nanoid()
        }
      })
      console.log(newValue)

      onChange(newValue)
    }
  }

  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项' },
                        {
                          validator: (_, text) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((item: OptionType) => {
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
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}
              <Form.Item>
                <Button
                  type="link"
                  icon={<PlusOutlined />}
                  onClick={() => add({ value: '', text: '' })}
                  block
                >
                  添加选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          value={value}
          options={options?.map(({ text, value }) => ({ value, label: text || '' }))}
        ></Select>
      </Form.Item>
      <Form.Item label="竖向排列" name="isVertical" valuePropName="checked">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
