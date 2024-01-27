import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { LOGIN_PATH } from '../router'
import { useDispatch } from 'react-redux'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReduce } from '../store/userReducer'

const Logo: FC = () => {
  // const { data } = useRequest(async () => getUserInfoService('7'))
  // const { name } = data || {}
  const { username } = useGetUserInfo()
  const nav = useNavigate()
  const dispatch = useDispatch()

  function logout() {
    dispatch(logoutReduce()) //情况redux user
    removeToken() //清除token
    message.success('退出成功')
    nav(LOGIN_PATH)
  }

  const UserInfo = () => (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined></UserOutlined>
        {username}
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

  return <>{username ? <UserInfo /> : <Login />}</>
}

export default Logo
