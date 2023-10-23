import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCourses = createAsyncThunk(
    'courses/getCourses',
    async (id) => {
        return fetch(`http://localhost:8080/courses/group/${id}`).then((res) => 
            res.json()
        )
    }
)


const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        list: [],
        status: null,
    },
    extraReducers: {
        [getCourses.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getCourses.fulfilled]: (state, {payload}) => {
            state.list = payload
            state.status = 'success'
        },
        [getCourses.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})

export default coursesSlice.reducer