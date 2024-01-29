import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import EditCanvas from './EditCanvas'
import style from './index.module.scss'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()

  return (
    <div className={style.container}>
      <div style={{ height: '60px', backgroundColor: '#fff' }}>Header</div>
      <div className={style['content-warp']}>
        <div className={style.content}>
          <div className={style.left}>left</div>
          <div className={style.main}>
            <div className={style['canvas-warp']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={style.right}>right</div>
        </div>
      </div>
    </div>
  )
}

export default Edit
