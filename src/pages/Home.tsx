import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from 'antd'
import { MANAGE_LIST_PATH } from '../router'
import styles from './Home.module.scss'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  useEffect(() => {
    fetch('api/question/test')
      .then((res) => res.json())
      .then((data) => {
        console.log('🚀 ~ fetch ~ data:', data)
      })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>Smlz 问卷调查</Title>
        <Paragraph>已累计创建问卷 100 份,发布问卷 90份,收到问卷980份</Paragraph>
      </div>
      <div>
        <Button type="primary" onClick={() => nav(MANAGE_LIST_PATH)}>
          开始使用
        </Button>
      </div>
    </div>
  )
}

export default Home
