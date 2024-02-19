import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cloneDeep from 'lodash/cloneDeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'

import type { ComponentPropsType } from '../../components/QuestionComponents'
import { getSelectedNextId, inserNewComponent } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string //组件类型
  title: string
  isHidden?: boolean //是否隐藏
  isLocked?: boolean //是否锁定
  props: ComponentPropsType //组件属性
}

export type ComponentsStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
  copiedComponent: ComponentInfoType | null
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '', //选中的ID
  componentList: [], //组件列表
  copiedComponent: null //复制的组件
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //保存componentList
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    //修改selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    //新增组件
    addComponent(state: ComponentsStateType, action: PayloadAction<ComponentInfoType>) {
      inserNewComponent(state, action.payload)
    },
    //修改组件属性
    changeComponentProps(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
    ) {
      const { fe_id, newProps } = action.payload
      const curCom = state.componentList.find((item) => item.fe_id === fe_id)
      if (curCom) {
        curCom.props = { ...curCom.props, ...newProps }
      }
    },
    //删除选中的组件
    deleteSelectedComponent(state: ComponentsStateType) {
      const { componentList } = state
      const index = componentList.findIndex((item) => item.fe_id === state.selectedId)
      if (index >= 0) {
        const nextSelectId = getSelectedNextId(state.selectedId, componentList)
        state.selectedId = nextSelectId
        componentList.splice(index, 1)
      }
    },
    //隐藏显示组件
    changeComponentHidden(
      state: ComponentsStateType,
      action: PayloadAction<{ fe_id: string; isHidden: boolean }>
    ) {
      const { componentList } = state
      const { fe_id, isHidden } = action.payload
      let nextSelectId = ''
      if (isHidden) {
        nextSelectId = getSelectedNextId(fe_id, componentList)
      } else {
        nextSelectId = fe_id
      }
      state.selectedId = nextSelectId
      const curCom = componentList.find((item) => item.fe_id === fe_id)
      if (curCom) {
        curCom.isHidden = isHidden
      }
    },
    //锁定解锁组件
    changeComponentLockd(state: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) {
      const { componentList } = state
      const { fe_id } = action.payload
      const curCom = componentList.find((item) => item.fe_id === fe_id)
      if (curCom) {
        curCom.isLocked = !curCom.isLocked
      }
    },
    //复制组件
    copySelectedComponent(state: ComponentsStateType) {
      const { componentList, selectedId } = state
      const curCom = componentList.find((item) => item.fe_id === selectedId)
      if (curCom) {
        state.copiedComponent = cloneDeep(curCom) //深拷贝
      }
    },
    //粘贴组件
    pasteCopiedComponent(state: ComponentsStateType) {
      const { copiedComponent } = state
      if (!copiedComponent) return
      copiedComponent.fe_id = nanoid()
      inserNewComponent(state, copiedComponent)
    },
    //选中上一个
    selectPrevComponent(state: ComponentsStateType) {
      const { componentList, selectedId } = state
      const selectIndex = componentList.findIndex((c) => c.fe_id === selectedId)
      if (selectIndex < 0) return //未选中组件
      if (selectIndex <= 0) return //选中第一个
      state.selectedId = componentList[selectIndex - 1].fe_id
    },
    //选中下一个
    selectNextComponent(state: ComponentsStateType) {
      const { componentList, selectedId } = state
      const selectIndex = componentList.findIndex((c) => c.fe_id === selectedId)
      if (selectIndex < 0) return //未选中组件
      if (selectIndex + 1 === componentList.length) return //选中最后一个
      state.selectedId = componentList[selectIndex + 1].fe_id
    },
    //修改组件标题
    changeComponentTitle(state: ComponentsStateType, action: PayloadAction<{ title: string }>) {
      const { componentList, selectedId } = state
      const curCom = componentList.find((c) => c.fe_id === selectedId)
      if (curCom) {
        curCom.title = action.payload.title
      }
    },
    //移动组件位置
    moveComponent(
      state: ComponentsStateType,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) {
      const { componentList } = state
      const { oldIndex, newIndex } = action.payload
      state.componentList = arrayMove(componentList, oldIndex, newIndex)
    }
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent,
  changeComponentHidden,
  changeComponentLockd,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent
} = componentsSlice.actions

export default componentsSlice.reducer
