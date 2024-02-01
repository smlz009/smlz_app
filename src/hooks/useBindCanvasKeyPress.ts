import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  deleteSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent
} from '../store/compontentsReducer'

//判断关标是否在Canvas
function isActiveElementValid(): boolean {
  const activeElement = document.activeElement
  return activeElement === document.body
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
  //   useKeyPress(['uparrow'], () => {
  //     if (!isActiveElementValid()) return
  //     dispatch(pasteCopiedComponent())
  //   })

  //选中下一个
  //   useKeyPress(['ctrl.v', 'meta.v'], () => {
  //     if (!isActiveElementValid()) return
  //     dispatch(pasteCopiedComponent())
  //   })
}

export default useBindCanvasKeyPress
