import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from "./Post";
import { filterSearchPosts } from "../slices/postSlice";

const Gallery = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const posts = useSelector(state => state.posts.data.result);
    const dispatch = useDispatch();

    const getPostsByKeyWord = () => {
        if (searchKeyword) {
            dispatch(filterSearchPosts(searchKeyword));
        } else {
            alert('Write keyword');
        }
    };

    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="input-group mb-3">
                        <input
                            type='text'
                            className="form-control"
                            placeholder='Search posts...'
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={getPostsByKeyWord}>
                                Get Posts
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post, index) => (
                            <Post key={post.id} index={index} />
                        ))
                    ) : (
                        <p className="text-center">No Posts Are Available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gallery;