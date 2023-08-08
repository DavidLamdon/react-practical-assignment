import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";
import { clearState, createPost } from "../slices/postSlice";

const Header = () => {
    const username = useSelector(state => state.loginUser.currentLogin);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(clearState());
        dispatch(logout());
    };

    const handleCreatePost = () => {
        const title = prompt('Enter your title');
        if (title) {
            const newPost = {
                title,
                username
            };
            dispatch(createPost(newPost));
        }
    };

    return (
        <header className="bg-dark text-light p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <h2 className="m-0">Current User: {username}</h2>
                <div>
                    <button className="btn btn-primary mr-2" onClick={handleCreatePost}>
                        Create A Post
                    </button>
                    <button className="btn btn-secondary" onClick={handleClick}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;