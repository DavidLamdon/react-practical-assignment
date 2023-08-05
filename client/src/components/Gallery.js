import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Post from "./Post";
import {filterSearchPosts} from "../slices/postSlice";

const Gallery = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const posts = useSelector(state => state.posts.data.result);
    const dispatch = useDispatch();
    const getPostsByKeyWord = () => {
        if (searchKeyword) {
            dispatch(filterSearchPosts(searchKeyword));
        }else{
            alert('Write keyword');
        }
    }
    return (
        <div>
            <input
                type='text'
                placeholder='Search posts...'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={getPostsByKeyWord}>Get Posts</button>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post, index) => (
                    <Post key={post.id} index={index} />
                ))
            ) : (
                'No Posts Are Available'
            )}
        </div>
    );
};

export default Gallery;