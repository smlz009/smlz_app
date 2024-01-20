import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import style from './ManageLayout.module.scss'
import { Button, Space, Divider, message } from 'antd'
import { useRequest } from 'ahooks'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { MANAGE_LIST_PATH, STAR_LIST_PATH, TRASH_LIST_PATH } from '../router'
import { createQuestionService } from '../services/question'

const ManageLayout: FC = () => {
  const nav = useNavigate() //路由跳转
  const { pathname } = useLocation() //获取路由名字
  //使用 ahook发送网络请求
  const { loading, run: handleCreateClick } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    }
  })

  return (
    <div className={style.container}>
      <div className={style.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            disabled={loading}
            onClick={handleCreateClick}
          >
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
