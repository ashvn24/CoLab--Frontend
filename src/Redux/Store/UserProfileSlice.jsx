import { createAsyncThunk, createSlice }  from '@reduxjs/toolkit'
import { initialstate } from './rootStore';
import { getProfile } from '../../Axios/UserServer/UserServer';


//--Middleware--//

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
    try {
        const Response = await getProfile();
        return Response     
    } catch (error) {
        throw error
    }
})


const UserProfileSlice = createSlice({
    name: 'profile',
    initialState:initialstate.userData,
    reducers:{},
    extraReducers: (builder) => {
        builder 
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(fetchProfile.fulfilled, (state,action) => {
                state.status = 'Succeeded'
                state.profile = action.payload
            })
            .addCase(fetchProfile.rejected, (state,action) => {
                state.status = 'Rejected'
                state.error = action.error.message
            })
    }

});

export default UserProfileSlice.reducer;