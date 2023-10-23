import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMembers = createAsyncThunk(
    'members/getMembers',
    async (id) => {
        return fetch(`http://localhost:8080/groups/${id}/members`).then((res) => 
            res.json()
        )
    }
)


const membersSlice = createSlice({
    name: 'members',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getMembers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getMembers.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getMembers.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default membersSlice.reducer