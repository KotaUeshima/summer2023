import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface User {
  firstName: string
  lastName: string
  email: string
}

const initialState: User = {
  firstName: '',
  lastName: '',
  email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserToStore: (state, action: PayloadAction<User>) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
    },
  },
})

export const { addUserToStore } = userSlice.actions

export default userSlice.reducer
