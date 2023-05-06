import { UserInterface } from '@/utils/globalInterfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: UserInterface = {
  userId: '',
  firstName: '',
  lastName: '',
  email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserToStore: (state, action: PayloadAction<UserInterface>) => {
      state.userId = action.payload.userId
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
    },
  },
})

export const { addUserToStore } = userSlice.actions

export default userSlice.reducer
