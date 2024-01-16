import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'
import { HOME_PATH } from '../router'

const { Title } = Typography

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to={HOME_PATH}>
        <Space>
          <Title>
            <SmileOutlined />
          </Title>
          <Title>Smlz App</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
