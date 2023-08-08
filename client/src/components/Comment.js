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
        <div className="comment-container">
            <div className="comment-author">{username}</div>
            <div className="comment-text">{text}</div>
            <div className="comment-info">
                <span className="comment-votes">
                    Votes: {likes.length - dislikes.length >= 0 ? likes.length - dislikes.length : 0}
                </span>
                <span className="comment-date">{date}</span>
            </div>
            <div className="comment-buttons">
                <button className="btn btn-sm btn-primary" onClick={addLike}>
                    Like
                </button>
                <button className="btn btn-sm btn-danger" onClick={addDislike}>
                    Dislike
                </button>
                {user === username && (
                    <React.Fragment>
                        <button className="btn btn-sm btn-warning" onClick={onClickUpdateComment}>
                            Edit
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={onClickDelete}>
                            Delete
                        </button>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};


export default Comment;
