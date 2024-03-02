import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootStore";
import { getRequest } from "../../Axios/UserServer/UserServer";

export const Request = createAsyncThunk('request/Request', async () => {
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
    reducers:{
        AcceptReq:(state,action)=>{
            state.req = state.req.map((reqs) => {
                if(reqs.id === action.payload.id){
                    return{
                        ...reqs,
                        accepted: true
                    }
                }
                return reqs;
            });
        }
    },
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

export const {AcceptReq} = RequestSlice.actions
export default RequestSlice.reducer