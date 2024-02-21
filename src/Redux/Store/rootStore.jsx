export const initialstate = {
    // usertoken for user and admin
    usertoken: {
        access: null,
        refresh: null,
        is_authenticated: false,
        type: null,
        registerSuccess: null,
        user: null,
        username:null,
        email:null,
    },
    AdminToken:{
        access: null,
        refresh: null,
        is_authenticated: false,
        is_superuser: false,
        type: null,
        registerSuccess: null,
    },
    // logged user data
    userData: null,
    // collect and store all user data here
    userList:{
        users: [],
        status: 'idle',
        error: ''
    },

    CreatePostData:{
        post:[],
        status:'idle',
        error:null
    },

    allPostData:{
        posts:[],
        status:'idle',
        error:null
    },
    myPostData:{
        my_post:[],
        status:'idle',
        error:null
    },
}