import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  //用户没有登陆 跳转到登陆页
  useNavPage(waitingUserData)

  return (
    <div style={{ height: '100vh' }}>
      <div>{!waitingUserData && <Outlet />}</div>
    </div>
  )
}

export default QuestionLayout
