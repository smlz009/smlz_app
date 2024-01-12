import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: FC = () => {
  return (
    <>
      <div>MainLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>MainLayou footert</div>
    </>
  )
}

export default MainLayout
