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
        role:'Editor',
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
    userData: {
        profile:[],
        status:'idle',
        error:null
    },
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
    postDetails:{
        post:[],
        status: "idle",
        error:null,
        reqdata:[]
    },
    request:{
        req:[],
        status:'idle',
        error:null,
        post:null,
    },
    mywork:{
        work:[],
        status:'idle',
        error:null
    },
    chat:{
        msg:[],
        status:'idle',
        error:null
    },
    upload:{
        vid_key:null
    }
}