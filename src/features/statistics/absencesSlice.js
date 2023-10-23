import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAbsences = createAsyncThunk(
    'assignments/getAssignments',
    async (id) => {
        return fetch(`http://localhost:8080/groups/${id}/absences`).then((res) => 
            res.json()
        )
    }
)


const absencesSlice = createSlice({
    name: 'absences',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getAbsences.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAbsences.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getAbsences.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default absencesSlice.reducer