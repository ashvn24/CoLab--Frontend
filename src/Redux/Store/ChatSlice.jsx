import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { initialstate } from "./rootStore";
import { getChat } from "../../Axios/UserServer/UserServer";


export const ChatMsg = createAsyncThunk('chatmsg/getChats', async (id) => {
    try {
        console.log(id,"here");
        const Response = getChat(id)
        return Response     
    } catch (error) {
        throw error
    }
})


const ChatSlice =  createSlice({
    name:'chat',
    initialState:initialstate.chat,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(ChatMsg.pending, (state) => {
                state.status='Loading'
            })
            .addCase(ChatMsg.fulfilled, (state,action) => {
                state.msg = action.payload
                state.status = 'succeed'
            })
            .addCase(ChatMsg.rejected, (state,action) => {
                state.status = 'Rejected'
                state.error = action.error.message || 'Something went wrong!'
            })
    }
})

export default  ChatSlice.reducer