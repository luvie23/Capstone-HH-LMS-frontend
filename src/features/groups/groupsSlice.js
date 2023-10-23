import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getGroups = createAsyncThunk(
    'groups/getGroups',
    async () => {
        return fetch('http://localhost:8080/groups').then((res) => 
            res.json()
        )
    }
)


const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getGroups.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getGroups.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getGroups.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default groupsSlice.reducer