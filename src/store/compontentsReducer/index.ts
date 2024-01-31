import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ComponentPropsType } from '../../components/QuestionComponents'
import { getSelectedNextId } from './utils'

export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentPropsType
}

export type ComponentsStateType = {
  selectedId: string
  componentList: ComponentInfoType[]
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: []
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
      const { selectedId, componentList } = state
      const index = componentList.findIndex((item) => item.fe_id === selectedId)
      if (index < 0) {
        componentList.push(action.payload)
      } else {
        componentList.splice(index + 1, 0, action.payload)
      }
      state.selectedId = action.payload.fe_id
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
    }
  }
})

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  deleteSelectedComponent
} = componentsSlice.actions

export default componentsSlice.reducer
