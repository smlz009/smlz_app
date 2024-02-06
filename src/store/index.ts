import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './compontentsReducer/index'
import pageInfoReduce, { PageInfoType } from './pageInfoReduce'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
  pageInfo: PageInfoType
}

export default configureStore({
  reducer: {
    user: userReducer,
    components: componentsReducer,
    pageInfo: pageInfoReduce
    //模块
  }
})
