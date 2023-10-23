import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMember = createAsyncThunk(
    'member/getMember',
    async (id) => {
        return fetch(`http://localhost:8080/users/${id}`).then((res) => 
            res.json()
        )
    }
)


const memberSlice = createSlice({
    name: 'member',
    initialState: {
        data: {},
        status: null,
    },
    extraReducers: {
        [getMember.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getMember.fulfilled]: (state, {payload}) => {
            state.data = payload
            state.status = 'success'
        },
        [getMember.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default memberSlice.reducer