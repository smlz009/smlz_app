import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import style from './ManageLayout.module.scss'

const ManageLayout: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.left}>
        ManageLayout left
        <button>创建问券</button>
        <a>我的问卷</a>
        <a>星标问卷</a>
        <a>回收站</a>
      </div>
      <div className={style.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
