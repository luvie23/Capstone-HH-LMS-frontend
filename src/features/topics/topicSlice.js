import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTopic = createAsyncThunk(
    'topic/getTopic',
    async (id) => {
        return fetch(`http://localhost:8080/topics/${id}`).then((res) => 
            res.json()
        )
    }
)


const topicSlice = createSlice({
    name: 'topic',
    initialState: {
        data: {},
        status: null,
    },
    extraReducers: {
        [getTopic.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getTopic.fulfilled]: (state, {payload}) => {
            state.data = payload
            state.status = 'success'
        },
        [getTopic.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default topicSlice.reducer