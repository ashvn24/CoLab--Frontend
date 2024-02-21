import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPost, getMyPost } from "../../Axios/UserServer/UserServer";
import { initialstate } from "./rootStore";


export const allPost = createAsyncThunk('post/getpost', async () => {
    try {
        const response = await getAllPost()
        return response
    } catch (error) {
     console.log(error);   
     throw error;
    }
})

export const myPost = createAsyncThunk('post/mypost', async () => {
    try {
        const Response = await getMyPost()
        return Response 
    } catch (error) {
        throw error
    }
})


const postList = createSlice({
    name:'post',
    initialState:initialstate.allPostData,
    reducers: {},
    extraReducers: (builder) => {
        builder
                .addCase(allPost.pending, (state) => {
                    state.status = 'Loading'
                })
                .addCase(allPost.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.posts = action.payload;
                })
                .addCase(allPost.rejected, (state, action) => {
                    state.status = 'failed';
                    state.error = action.error.message;
                })
    },
    }
)

const myPostSlice = createSlice({
    name: 'myPost',
    initialState: initialstate.myPostData,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(myPost.pending, (state) => {
          state.status = 'Loading';
        })
        .addCase(myPost.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.my_post = action.payload;
        })
        .addCase(myPost.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });

export const allPostReducer = postList.reducer;
export const myPostReducer = myPostSlice.reducer;