import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent
} from '../store/compontentsReducer'

//判断关标是否在Canvas
function isActiveElementValid() {
  const activeElement = document.activeElement

  if (activeElement === document.body) return true
  if (activeElement?.matches('div[role="button"]')) return true
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  //删除
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(deleteSelectedComponent())
  })

  //复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  //粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  //选中上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  //选中下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  //撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true
    }
  )

  //重做
  useKeyPress(
    ['ctrl.shift.z', 'meta.shift.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(ActionCreators.redo())
    },
    { exactMatch: true }
  )
}

export default useBindCanvasKeyPress
