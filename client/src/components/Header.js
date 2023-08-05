import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../slices/loginSlice";
import {clearState, createPost} from "../slices/postSlice";

const Header = () => {
    const username = useSelector(state => state.loginUser.currentLogin);
    const dispatch = useDispatch();
    const handleClick = () =>{
        dispatch(clearState());
        dispatch(logout());
    }
    const handleCreatePost = ()=>{
        const title = prompt('Enter your title');
        if(title){
            const newPost={
                title,
                username
            }
            dispatch(createPost(newPost));
        }
    }
    return (
        <div>
            <h2>Current User: {username}</h2>
            <button onClick={handleCreatePost}>Create A Post</button>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default Header;