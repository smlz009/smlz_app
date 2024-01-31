import React, { FC } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProps from './ComponentProps'

const tabItems: TabsProps['items'] = [
  {
    key: 'prop',
    label: (
      <div>
        <FileTextOutlined />
        <span>属性</span>
      </div>
    ),
    children: <ComponentProps />
  },
  {
    key: 'setting',
    label: (
      <div>
        <SettingOutlined />
        <span>页面设置</span>
      </div>
    ),
    children: <div>页面设置</div>
  }
]

const RightPanel: FC = () => {
  return <Tabs defaultActiveKey="prop" items={tabItems} />
}

export default RightPanel
