import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addDisLikeCommentAction, addLikeCommentAction, deleteComent, updateComent} from "../slices/postSlice";

const Comment = ({ comment }) => {
    const {id, text,postId,username, likes, dislikes, date } = comment;//{ id: , text: , postId: , username: , likes: <Array>, dislikes: <Array>, date: }
    const dispatch = useDispatch();
    const user = useSelector(state => state.loginUser.currentLogin);
    const addLike = () => {
        dispatch(addLikeCommentAction({postId:postId,commentId:id}));
    };

    const addDislike = () => {
        dispatch(addDisLikeCommentAction({ postId: postId, commentId: id }));
    };
    const onClickDelete = () =>{
        if(user===username){
            dispatch(deleteComent(id));
        }else{
            alert('You cant delete this post');
        }
    }
    const onClickUpdateComment = () =>{
        const updateText = prompt('Enter new Text');
        if(updateText&&user===username){
            dispatch(updateComent(id,{text:updateText,likes,dislikes}));
        }else{
            alert('You cant update this post');
        }
    }
    return (
        <div>
            <p>Author: {username}</p>
            <p>Title: {text}</p>
            <p>Votes: {likes.length - dislikes.length >= 0 ? likes.length - dislikes.length : 0}</p>
            <p>Date: {date}</p>
            <button onClick={addLike}>Like</button>
            <button onClick={addDislike}>Dislike</button>
            <button onClick={onClickUpdateComment}>Edit</button>
            <button onClick={onClickDelete}>Delete</button>
        </div>
    );
};

export default Comment;
