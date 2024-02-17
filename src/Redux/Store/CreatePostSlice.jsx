import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";
import { initialstate } from "./rootStore";
import axios from "axios";
import { API } from "../../Axios/Api/EndPoint";
// import { createPostInstance } from "../../Axios/UserServer/UserServer";


//--MIDDLEWARE--

export const createPost = createAsyncThunk('post/createPost', async ({post,access}) =>{
    try {
      const response = await axios.post(`${API}/create_post/`,post, {
        headers:{
          "Content-Type":  "multipart/form-data",
          Authorization: `Bearer ${access}`
        },
      });
       return response;
    } catch (error) {
        console.log(error);
      throw error.message;
    }
});




const PostSlice = createSlice({
    name:'post',
    initialState: initialstate.CreatePostData,
    reducers:{
        Post: (state, action) => {
            return{
                ...state,
                post:action.payload
            }
        }
    },
    
});
export const {Post} = PostSlice.actions;
export default PostSlice.reducer