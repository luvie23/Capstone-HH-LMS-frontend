import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    user: {
    }
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn(state, {payload}) {
        state.status = true;
        state.user = payload;
    },
    logOut(state) {
        state.status = false;
        state.user = {}
    },
  },
})

export const { logIn, logOut } = loginSlice.actions
export default loginSlice.reducer