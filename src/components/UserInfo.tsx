import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATH } from '../router'
import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'

const Logo: FC = () => {
  const { data } = useRequest(async () => getUserInfoService('7'))
  const { name } = data || {}
  const nav = useNavigate()

  function logout() {
    //清除token
    removeToken()
    message.success('退出成功')
    nav(LOGIN_PATH)
  }

  const UserInfo = () => (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {name}
        <Button type="link" onClick={logout}>
          退出
        </Button>
      </span>
    </>
  )

  const Login = () => (
    <>
      <Link to={LOGIN_PATH}>登录</Link>
    </>
  )

  return <>{name ? <UserInfo /> : <Login />}</>
}

export default Logo
