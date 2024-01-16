import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATH } from '../router'

const Logo: FC = () => {
  return (
    <>
      <Link to={LOGIN_PATH}>登录</Link>
    </>
  )
}

export default Logo
