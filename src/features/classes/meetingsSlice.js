import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMeetings = createAsyncThunk(
    'meetings/getMeetings',
    async (id) => {
        return fetch(`http://localhost:8080/groups/${id}/meetings`).then((res) => 
            res.json()
        )
    }
)


const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getMeetings.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getMeetings.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getMeetings.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default meetingsSlice.reducer