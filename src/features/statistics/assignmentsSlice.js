import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAssignments = createAsyncThunk(
    'assignments/getAssignments',
    async (id) => {
        return fetch(`http://localhost:8080/groups/${id}/last_ass`).then((res) => 
            res.json()
        )
    }
)


const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getAssignments.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAssignments.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getAssignments.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default assignmentsSlice.reducer