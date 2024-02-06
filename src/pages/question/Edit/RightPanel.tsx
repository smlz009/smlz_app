import React, { FC, useState, useEffect } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import ComponentProps from './ComponentProps'
import PageSetting from './PageSetting'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting'
}

const tabItems: TabsProps['items'] = [
  {
    key: TAB_KEYS.PROP_KEY,
    label: (
      <div>
        <FileTextOutlined />
        <span>属性</span>
      </div>
    ),
    children: <ComponentProps />
  },
  {
    key: TAB_KEYS.SETTING_KEY,
    label: (
      <div>
        <SettingOutlined />
        <span>页面设置</span>
      </div>
    ),
    children: <PageSetting />
  }
]

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)

  const { selectedId } = useGetComponentInfo()

  useEffect(() => {
    if (selectedId) {
      setActiveKey(TAB_KEYS.PROP_KEY)
    } else {
      setActiveKey(TAB_KEYS.SETTING_KEY)
    }
  }, [selectedId])

  return <Tabs activeKey={activeKey} items={tabItems} />
}

export default RightPanel
