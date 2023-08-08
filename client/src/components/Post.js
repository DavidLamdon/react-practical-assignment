import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addDislikeAction,
    addLikeAction,
    createComent,
    deletePost,
    updateComent,
    updatePost,
    uploadPostPicture
} from "../slices/postSlice"
import Comment from "./Comment";
const Post = ({index}) => {
    const data = useSelector(state => state.posts.data);
    const user = useSelector(state => state.loginUser.currentLogin);
    const {id, title, username, likes, dislikes, date, comments,imageSrc} = data.result[index];
    const [image, setImage] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const dispatch = useDispatch();
    const [showUploadPicture, setShowUploadPicture] = useState(false);
    const handleImageUpload = (event) => {
        const uploadedImage = event.target.files[0];
        setImage(uploadedImage);
    };
    const handleImageSubmit = () => {
        if (image&&user===username) {
            const formData = new FormData();
            formData.append('picture', image);
            dispatch(uploadPostPicture({ id, formData }));
        }else{
            alert('Put appropriate image address')
        }
    };
    const toggleComments = () => {
        setShowComments((prevShowComments) => !prevShowComments);
    };
    const toggleUploadPicture = () => {
        setShowUploadPicture(prevShowUploadPicture => !prevShowUploadPicture);
    };
    const addLike = () => {
        dispatch(addLikeAction(index));
    };

    const addDislike = () => {
        dispatch(addDislikeAction(index));
    };
    const onClickDeletePost= () =>{
        if(user===username){
            dispatch(deletePost(id));
        }else{
            alert('You cant delete this post');
        }
    }
    const onClickUpdatePost = () =>{
        const updateTitle = prompt('Enter new Title');
        if(updateTitle&&user===username){
            dispatch(updatePost(id,{title:updateTitle}));
        }else{
            alert('You cant Update this post');
        }
    }
    const onClickAddComment = () =>{
        const text = prompt('Enter your comment');
        if(text){
            dispatch(createComent({text,postId:id,username:user}))
        }else{
            alert('You can not enter empty comment')
        }
    }
    return (
        <div className="post-container">
            <h1 className="post-title">Title: {title}</h1>
            <h2 className="post-author">Author: {username}</h2>
            <h2 className="post-votes">
                Votes: {likes && dislikes ? likes.length - dislikes.length >= 0 ? likes.length - dislikes.length : 0 : 0}
            </h2>
            <h2 className="post-timestamp">TimeStamp: {date}</h2>
            <img className="post-image" src={imageSrc ? imageSrc : image} alt={title} />
            <div className="post-buttons">
                <button className="btn btn-primary" onClick={addLike}>Like</button>
                <button className="btn btn-danger" onClick={addDislike}>Dislike</button>
                <button className="btn btn-info" onClick={toggleUploadPicture}>Edit & Update</button>
                <button className="btn btn-success" onClick={onClickAddComment}>Add Comment</button>
                <button className="btn btn-danger" onClick={onClickDeletePost}>Delete Post</button>
                <button className="btn btn-secondary" onClick={toggleComments}>
                    {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
            </div>
            {showUploadPicture && (
                <div className="post-upload-section">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <button className="btn btn-success" onClick={handleImageSubmit}>Upload Picture</button>
                    <button className="btn btn-warning" onClick={onClickUpdatePost}>Edit</button>
                </div>
            )}
            {showComments && comments && (
                <div className="post-comments">
                    <h3>Comments:</h3>
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            )}
        </div>
    );
};


export default Post;