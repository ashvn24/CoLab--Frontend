import { createAsyncThunk,createSlice  } from "@reduxjs/toolkit";
import { initialstate } from "./rootStore";
import { getWorkList } from "../../Axios/UserServer/UserServer";

export const myWork = createAsyncThunk('work,myWork' , async() => {
    try {
        const Res = await getWorkList()
        return Res
    } catch (error) {
        throw error
    }
})


const myWorkSlice = createSlice({
    name:'work',
    initialState:initialstate.mywork,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(myWork.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(myWork.fulfilled, (state,action) => {
                state.status = 'Succeeded'
                state.work = action.payload
            })
            .addCase(myWork.rejected, (state,action) => {
                state.status = 'Rejected'
                state.error = action.error.message
            })
    }
})

export default myWorkSlice.reducer