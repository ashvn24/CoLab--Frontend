import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { initialstate } from "./rootStore";
import { listUserslist } from "../../Axios/AdminServer/AdminServer";


//--MIDDLEWARE--

//get all users for admin

export const fetchUsers = createAsyncThunk('users/fetchUsers',async () => {
    try {
        const response = await listUserslist()
        return response
    } catch (error) {
        // throw error;
    }
})


const usersListSlice = createSlice({
    name: 'Allusers',
    initialState: initialstate.userList,
    reducers:{
        clearUsers: (state) =>{
            return initialstate
        },
        userBlock: (state, action) => {
            state.users = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return {
                        ...user,
                        is_active: !user.is_active
                    };
                }
                return user;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { clearUsers, userBlock } = usersListSlice.actions
export default usersListSlice.reducer
