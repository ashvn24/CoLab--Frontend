import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootStore";
import { getRequest } from "../../Axios/UserServer/UserServer";

export const Request = createAsyncThunk('request/Request', async (user_id) => {
    try {
        const Response = await getRequest(user_id)
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
        },
        StorePost:(state,action)=> {
            state.post=action.payload
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

export const {AcceptReq,StorePost} = RequestSlice.actions
export default RequestSlice.reducer