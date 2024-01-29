import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './compontentsReducer/index'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer
    //模块
  }
})
