import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import useLoadUserData from '../hooks/useLoadUserData'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useNavPage from '../hooks/useNavPage'
import styles from './MainLayout.module.scss'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>{!waitingUserData && <Outlet />}</Content>
      <Footer className={styles.footer}>smlz009 © 2024-01-25 20:00:00</Footer>
    </Layout>
  )
}

export default MainLayout
