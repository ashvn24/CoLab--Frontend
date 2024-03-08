import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPost, getMyPost, getPostDetail } from "../../Axios/UserServer/UserServer";
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

export const PostDetail = createAsyncThunk('postdetail/postDetail', async (id) => {
    try {
        const Response = await getPostDetail(id)
        return Response
    } catch (error) {
        throw error
    }
})


const postList = createSlice({
    name:'post',
    initialState:initialstate.allPostData,
    reducers: {
        resetPostState: (state, action) => {
            return initialstate.allPostData;
        },
        
    },
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

  const postDetail = createSlice({
    name: 'postdetail',
    initialState: initialstate.postDetails,
    reducers:{
        resetPostData:(state) => {
            return  initialstate.postDetails;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(PostDetail.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(PostDetail.fulfilled, (state, action) => {
                state.status = 'Succeeded';
                state.post = action.payload;
            })
            .addCase(PostDetail.rejected, (state, action) => {
                state.status = 'Failed';
                state.error = action.error.message;
            });
    }
})

export const { resetPostState } = postList.actions;
export const {resetPostData} = postDetail.actions;
export const allPostReducer = postList.reducer;
export const myPostReducer = myPostSlice.reducer;
export const postDetailReducer = postDetail.reducer;