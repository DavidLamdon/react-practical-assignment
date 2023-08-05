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
        <div>
            <h1>Title: {title}</h1>
            <h2>Author: {username}</h2>
            <h2>Votes: {likes&&dislikes?likes.length - dislikes.length >= 0 ? likes.length - dislikes.length : 0:0}</h2>
            <h2>TimeStamp: {date}</h2>
            <img src={imageSrc?imageSrc:image} alt={title} />
            <button onClick={addLike}>Like</button>
            <button onClick={addDislike}>Dislike</button>
            <button onClick={toggleUploadPicture}>Show Edit&Update</button>
            <button onClick={onClickAddComment}>Add Comment</button>
            <button onClick={onClickDeletePost}>Delete Post</button>
            <button onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            {showUploadPicture && (
                <div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                    <button onClick={handleImageSubmit}>Upload Picture</button>
                    <button onClick={onClickUpdatePost}>Edit</button>
                </div>
                )}
            {showComments && comments && (
                <div>
                    <h3>Comments:</h3>
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                </div>
            )}
        </div>
    );
};


export default Post;