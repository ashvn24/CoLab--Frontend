import { createSlice } from '@reduxjs/toolkit'
import { initialstate } from './rootStore'

const UploadSlice = createSlice({
    name: 'upload',
    initialState:initialstate.upload,
    reducers:{
        Videokey:(state,action) => {
            return{
                vid_key:action.payload
            }
        }
    }
})

export const {Videokey} = UploadSlice.actions;
export default UploadSlice.reducer