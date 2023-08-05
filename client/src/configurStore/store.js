import {configureStore} from "@reduxjs/toolkit";
import loginUser from "../slices/loginSlice"
import posts from "../slices/postSlice"

export const store = configureStore({
    reducer:{
        loginUser,posts
    }
})