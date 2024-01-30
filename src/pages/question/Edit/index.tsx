import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '../../../store/compontentsReducer'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import LeftPanel from './LeftPanel'
import EditCanvas from './EditCanvas'
import style from './index.module.scss'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function clearSelectId() {
    dispatch(changeSelectedId(''))
  }

  return (
    <div className={style.container}>
      <div style={{ height: '60px', backgroundColor: '#fff' }}>Header</div>
      <div className={style['content-warp']}>
        <div className={style.content}>
          <div className={style.left}>
            <LeftPanel />
          </div>
          <div className={style.main} onClick={clearSelectId}>
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
