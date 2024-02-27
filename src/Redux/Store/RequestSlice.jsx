import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootStore";
import { getRequest } from "../../Axios/UserServer/UserServer";

export const Request = createAsyncThunk('req/Request', async () => {
    try {
        const Response = await getRequest()
        return Response     
    } catch (error) {
        throw error
    }
})


const RequestSlice = createSlice({
    name: 'request',
    initialState:initialstate.request,
    reducers:{},
    extraReducers:(builder) =>{
        builder
            .addCase(Request.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(Request.fulfilled, (state,action) => {
                state.status = 'Succeeded'
                state.req = action.payload
            })
            .addCase(Request.rejected, (state,action) => {
                state.status ='Rejected'
                state.error = action.error.message
            })
    }
})

export default RequestSlice.reducer