import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getJoinrequests = createAsyncThunk(
    'joinrequests/getJoinrequests',
    async (id) => {
        return fetch(`http://localhost:8080/groups/${id}/join_requests`).then((res) => 
            res.json()
        )
    }
)


const joinrequestsSlice = createSlice({
    name: 'joinrequests',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getJoinrequests.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getJoinrequests.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getJoinrequests.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default joinrequestsSlice.reducer
