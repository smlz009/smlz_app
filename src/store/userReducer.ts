import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
}

const INIT_STATE: UserStateType = {
  username: '' // 初始状态为空字符串
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReduce: (state: UserStateType, actions: PayloadAction<UserStateType>) => {
      return actions.payload
    },
    logoutReduce: () => INIT_STATE
  }
})

export const { loginReduce, logoutReduce } = userSlice.actions

export default userSlice.reducer
