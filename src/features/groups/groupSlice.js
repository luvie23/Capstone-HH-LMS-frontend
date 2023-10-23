import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getGroup = createAsyncThunk(
    'group/getGroup',
    async (id) => {
        return fetch(`http://localhost:8080/groups/${id}`).then((res) => 
            res.json()
        )
    }
)


const groupSlice = createSlice({
    name: 'group',
    initialState: {
        data: {},
        status: null,
    },
    extraReducers: {
        [getGroup.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getGroup.fulfilled]: (state, {payload}) => {
            state.data = payload
            state.status = 'success'
        },
        [getGroup.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default groupSlice.reducer