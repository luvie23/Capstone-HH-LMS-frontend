import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCompletedworks = createAsyncThunk(
    'completedworks/getCompletedworks',
    async (id) => {
        return fetch(`http://localhost:8080/users/${id}/courseworks`).then((res) => 
            res.json()
        )
    }
)

const completedworksSlice = createSlice({
    name: 'completedworks',
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        completedworksReset: (state, action) => {
            state.list = []
        },
    },
    extraReducers: {
        [getCompletedworks.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getCompletedworks.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getCompletedworks.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export const { completedworksReset } = completedworksSlice.actions
export default completedworksSlice.reducer