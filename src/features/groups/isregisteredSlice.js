import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const isRegistered = createAsyncThunk(
    'registered/isRegistered',
    async (ids) => {
        return fetch(`http://localhost:8080/groups/${ids.group_id}/registered/${ids.user_id}`).then((res) => 
            res.json()
        )
    }
)

const registeredSlice = createSlice({
    name: 'registered',
    initialState: {
        status: null,
        registration: {}
    },
    extraReducers: {
        [isRegistered.pending]: (state, action) => {
            state.status = 'loading'
        },
        [isRegistered.fulfilled]: (state, {payload}) => {
            state.registration = payload;
            state.status = 'success'
        },
        [isRegistered.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default registeredSlice.reducer