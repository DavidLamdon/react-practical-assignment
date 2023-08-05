import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {MAIN_URL} from "../constants/constants";
import {useSelector} from "react-redux";

export const createPost = createAsyncThunk(
    'posts/createPost',
    async function (postCreateData) {
        const response = await fetch(`${MAIN_URL}post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postCreateData),
        });
        const data = await response.json();
        return data.result;
    }
)
export const updatePost = createAsyncThunk(
    //{requestId: "-1D-QXn3U6c7VLz2Lem6B", signal: {}} I see that in this request variabls like id and body did not pass
    // and there is no changes in post or comment from server in responce
    // requestId
    // :
    // "-1D-QXn3U6c7VLz2Lem6B"
    // signal
    // :
    // {}
    'posts/updatePost',
    async function (id, postUpdateData) {
        const responce = await fetch(`${MAIN_URL}post/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postUpdateData),
        });
        const data = await responce.json();
        return data;
    }
)
export const filterSearchPosts = createAsyncThunk(
    'posts/search',
    async function (keyWord) {
        const responce = await fetch(`${MAIN_URL}post/search/${keyWord}`, {
            method: 'GET',
        })
        const data = await responce.json();
        return data;
    }
);
export const getPostsByPage = createAsyncThunk(
    'posts/getByPage',
    async function (pageNumber) {
        if (pageNumber > 0) {
            const responce = await fetch(`${MAIN_URL}post/page/${pageNumber}`, {
                method: 'GET',
            });
            const data = await responce.json();
            return data;
        }
    }
)
export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async function (id) {
        const responce = await fetch(`${MAIN_URL}post/${id}`, {
            method: 'DELETE',
        })
        const data = await responce.json();
        return data.result.id;
    }
)
export const uploadPostPicture = createAsyncThunk(
    'posts/uploadPicture',
    async function ({id, formData}) {
        const response = await fetch(`${MAIN_URL}post/${id}/picture`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return data;
    }
)
export const createComent = createAsyncThunk(
    'coment/createComent',
    async function (comentCreateData) {
        const responce = await fetch(`${MAIN_URL}comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentCreateData)
        })
        const data = await responce.json();
        return data;
    }
)
export const updateComent = createAsyncThunk(
    'coment/updateComent',
    async function (id, comentUpdateDate) {
        const responce = await fetch(`${MAIN_URL}comment/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentUpdateDate)
        })
        const data = await responce.json();
        return data;
    }
)
export const deleteComent = createAsyncThunk(
    'coment/deleteComent',
    async function (id) {
        const responce = await fetch(`${MAIN_URL}comment/${id}`, {
            method: 'DELETE'
        });
        const data = await responce.json();
        return data;
    }
)
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: {
            result: []
        }
    },
    reducers: {
        clearState(state){
            state.data.result = [];
        },
        addLikeAction(state, action) {
            state.data.result[action.payload].likes.unshift(1);
        },
        addDislikeAction(state, action) {
            state.data.result[action.payload].dislikes.unshift(1);
        },
        addLikeCommentAction(state, action) {
            const {postId, commentId} = action.payload;
            const postIndex = state.data.result.findIndex((post) => post.id === postId);
            if (postIndex !== -1) {
                const postComments = state.data.result[postIndex].comments;
                const commentIndex = postComments.findIndex((comment) => comment.id === commentId);
                if (commentIndex !== -1) {
                    postComments[commentIndex].likes.unshift(1);
                }
            }
        },
        addDisLikeCommentAction(state, action) {
            const {postId, commentId} = action.payload;
            const postIndex = state.data.result.findIndex((post) => post.id === postId);
            if (postIndex !== -1) {
                const postComments = state.data.result[postIndex].comments;
                const commentIndex = postComments.findIndex((comment) => comment.id === commentId);
                if (commentIndex !== -1) {
                    postComments[commentIndex].dislikes.unshift(1);
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data.result.unshift(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                const {id} = action.payload.result;
                const existingPostIndex = state.data.result.findIndex((post) => post.id === id);
                if (existingPostIndex !== -1) {
                    state.data.result[existingPostIndex] = action.payload.result;
                }
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.data.result = state.data.result.filter((post) => post.id !== action.payload);
            })
            .addCase(filterSearchPosts.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(getPostsByPage.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(uploadPostPicture.fulfilled, (state, action) => {
                const updatedPost = action.payload.result;
                const updatedPostIndex = state.data.result.findIndex(
                    (post) => post.id === updatedPost.id);
                if (updatedPostIndex !== -1) {
                    state.data.result[updatedPostIndex] = updatedPost;
                }
            })
            .addCase(createComent.fulfilled, (state, action) => {
                const comment = action.payload.result;
                const postId = comment.postId;
                const post = state.data.result.find((post) => post.id === postId);
                if (post) {
                    if (!post.comments) {
                        post.comments = [];
                    }
                    post.comments.unshift(comment);
                }
            })
            .addCase(updateComent.fulfilled, (state, action) => {
                const updatedComment = action.payload.result;
                const {postId, id} = updatedComment;
                const existingPostIndex = state.data.result.findIndex((post) => post.id === postId);
                if (existingPostIndex !== -1) {
                    const existingCommentIndex = state.data.result[existingPostIndex].comments.findIndex((comment) => comment.id === id);
                    if (existingCommentIndex !== -1) {
                        state.data.result[existingPostIndex].comments[existingCommentIndex] = updatedComment;
                    }
                }
            })
            .addCase(deleteComent.fulfilled, (state, action) => {
                const deletedComment = action.payload.result;
                const {postId, id} = deletedComment;
                const existingPostIndex = state.data.result.findIndex((post) => post.id === postId);
                if (existingPostIndex !== -1) {
                    state.data.result[existingPostIndex].comments = state.data.result[existingPostIndex].comments.filter((comment) => comment.id !== id);
                }
            });
    },
});
export const {clearState,addLikeAction, addDislikeAction, addLikeCommentAction, addDisLikeCommentAction} = postsSlice.actions
export default postsSlice.reducer;