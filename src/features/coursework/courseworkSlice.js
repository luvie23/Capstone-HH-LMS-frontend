import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCoursework = createAsyncThunk(
    'group/getCoursework',
    async (id) => {
        return fetch(`http://localhost:8080/courseworks/${id}`).then((res) => 
            res.json()
        )
    }
)


const courseworkSlice = createSlice({
    name: 'coursework',
    initialState: {
        data: {content: ''},
        status: null,
    },
    reducers: {
        courseworkReset: (state, action) => {
            state.data = {content: ''}
        },
    },
    extraReducers: {
        [getCoursework.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getCoursework.fulfilled]: (state, {payload}) => {
            state.data = payload
            state.status = 'success'
        },
        [getCoursework.rejected]:  (state, action) => {
            state.status = 'failed'
        },
    },
})
export const { courseworkReset } = courseworkSlice.actions
export default courseworkSlice.reducer