import React, { FC } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { AppstoreAddOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const tabItems: TabsProps['items'] = [
  {
    key: 'componentLib',
    label: (
      <div>
        <AppstoreAddOutlined />
        <span>组件库</span>
      </div>
    ),
    children: <ComponentLib />
  },
  {
    key: 'layers',
    label: (
      <div>
        <BarsOutlined />
        <span>图层</span>
      </div>
    ),
    children: <Layers />
  }
]

const LeftPanel: FC = () => {
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />
}

export default LeftPanel
