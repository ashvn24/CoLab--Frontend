import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AdminauthSlice from "./AdminauthSlice";
import UsersListSlice from "./UsersListSlice";
import PostSlice from "./CreatePostSlice";
import { allPostReducer, myPostReducer, postDetailReducer } from "./postSlice";




const persistConfig = {
    key: 'root',
    storage,
};

// root reducer
const rootReducer = combineReducers({
    usertoken: authSlice,
    AdminToken: AdminauthSlice,
    userList:UsersListSlice,
    CreatePostData:PostSlice,
    allPostData:allPostReducer,
    myPostData:myPostReducer,
    postDetails:postDetailReducer
    
})

const persistRootReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,
                    REGISTER],
            },
        }),

});

// persist all data to local storage
const persistor = persistStore(store)

export { store, persistor };

