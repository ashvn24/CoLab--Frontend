import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { LoginResponse } from "../../Axios/UserServer/UserLogin";
import { initialstate } from "./rootStore";




// -----MIDDLEWARES---

// user
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }) => {
    const authdata = await LoginResponse(email, password);
    return authdata
});

// get access from refresh



const authSlice = createSlice({
    name: 'auth',
    initialState: initialstate.usertoken,
    reducers: {
        UserLogout: (state) => {
            return initialstate.usertoken;
        },
        Success: (state, action) => {
            return {
                ...state,
                registerSuccess: action.payload.message,
            }
        },
        Social: (state, action) => {
            return{
                ...state,
                access:action.payload.access_token,
                refresh:action.payload.refresh_token,
                email:action.payload.email,
                is_authenticated: true,
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                if (!action.payload.error) {
                    return {
                        access: action.payload.access,
                        refresh: action.payload.refresh,
                        user: action.payload.user,
                        type: 'user',
                        username:action.payload.username,
                        email:action.payload.email,
                        is_authenticated: true,
                        registerSuccess: null,
                    };
                }
            })
            
    },
});

export const { UserLogout, Success, Social } = authSlice.actions;
export default authSlice.reducer