import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTopics = createAsyncThunk(
    'topics/getTopics',
    async (id) => {
        return fetch(`http://localhost:8080/topics/course/${id}`).then((res) => 
            res.json()
        )
    }
)


const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        topicsReset: (state, action) => {
            state.list = []
        },
    },
    extraReducers: {
        [getTopics.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getTopics.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getTopics.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export const { topicsReset } = topicsSlice.actions
export default topicsSlice.reducer