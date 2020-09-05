import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  isAuthenticated: false,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    ...initialUserState,
  },
  reducers: {
    login: (state, action) => {
      state = {...initialUserState, ...action.payload, isAuthenticated: true};
    },
    logout: state => {
      state = {...initialUserState}
    }
  }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer