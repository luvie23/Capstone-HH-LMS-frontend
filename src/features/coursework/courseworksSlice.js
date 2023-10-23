import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCourseworks = createAsyncThunk(
    'courses/getCourseworks',
    async (id) => {
        return fetch(`http://localhost:8080/courseworks/topic/${id}`).then((res) => 
            res.json()
        )
    }
)




const courseworksSlice = createSlice({
    name: 'courseworks',
    initialState: {
        list: [],
        status: null,
    },
    reducers: {
        courseworksReset: (state, action) => {
            state.list = []
        },
    },
    extraReducers: {
        [getCourseworks.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getCourseworks.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getCourseworks.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export const { courseworksReset } = courseworksSlice.actions
export default courseworksSlice.reducer