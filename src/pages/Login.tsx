import React, { FC, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography, Space, Form, Input, Button, Checkbox, message } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { REGISTER_PATH, HOME_PATH } from '../router'
import { loginService } from '../services/user'
import styles from './Login.module.scss'
import { setToken } from '../utils/user-token'

const { Title } = Typography

interface Iinfo {
  name: string
  password: string
  remember: boolean
}

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(name: string, password: string) {
  localStorage.setItem(USERNAME_KEY, name)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUser() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUser() {
  return {
    name: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY)
  }
}

const Login: FC = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()

  useEffect(() => {
    const { name, password } = getUser()
    form.setFieldsValue({ name, password })
  }, [])

  const { run } = useRequest(
    async (name: string, password: string) => {
      const data = await loginService(name, password)
      return data
    },
    {
      manual: true,
      onSuccess: (result) => {
        const { token = '' } = result
        setToken(token)
        message.success('登录成功')
        nav(HOME_PATH)
      }
    }
  )

  function onFinish(value: Iinfo) {
    const { name, password, remember } = value
    run(name, password)
    if (remember) {
      rememberUser(name, password)
    } else {
      deleteUser()
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          form={form}
        >
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
          <Form.Item wrapperCol={{ offset: 6, span: 16 }} name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={REGISTER_PATH}>没有账号,注册</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
