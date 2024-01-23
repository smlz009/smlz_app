import React, { FC } from 'react'
import { Typography, Space, Form, Input, Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { registerService } from '../services/user'
import { LOGIN_PATH } from '../router'
import styles from './Register.module.scss'

const { Title } = Typography

interface Iinfo {
  name: string
  password: string
  confirm: string
}

const Register: FC = () => {
  const nav = useNavigate()

  const { run } = useRequest(
    async (info) => {
      const { name, password } = info
      await registerService(name, password)
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('注册成功')
        nav(LOGIN_PATH)
      }
    }
  )

  function onFinish(value: Iinfo) {
    run(value)
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="name"
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', max: 20, message: '长度最多20' },
              { pattern: /^\w+$/, message: '只能字母数字下划线' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请输入确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  } else {
                    return Promise.reject(new Error('两次密码不一致'))
                  }
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Link to={LOGIN_PATH}>已有账号,去登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
