import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import style from './ManageLayout.module.scss'
import { Button, Space, Divider } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { MANAGE_LIST_PATH, STAR_LIST_PATH, TRASH_LIST_PATH } from '../router'

const ManageLayout: FC = () => {
  const nav = useNavigate() //路由跳转
  const { pathname } = useLocation() //获取路由名字
  return (
    <div className={style.container}>
      <div className={style.left}>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            新建问券
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith(MANAGE_LIST_PATH) ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav(MANAGE_LIST_PATH)}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith(STAR_LIST_PATH) ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav(STAR_LIST_PATH)}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith(TRASH_LIST_PATH) ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav(TRASH_LIST_PATH)}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={style.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
