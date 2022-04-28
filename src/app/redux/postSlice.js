import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState:{
        post: {
            post: null,
            isFetching: false,
            error: false
        },
        posts: {
            listPosts: null,
            isFetching: false,
            error: false
        }
    },
    reducers:{
        // Khi lấy dữ liệu posts
        getPostsStart: (state) => {
            state.post.isFetching = true;
        },
        getPostsSuccess: (state, action) => {
            state.posts.listPosts = action.payload;
            state.post.isFetching = false;
        },
        getPostsFailed: (state) => {
            state.post.isFetching = false;
            state.post.error = true;
        },

    }
});

export const {
    getPostsStart, 
    getPostsSuccess, 
    getPostsFailed,
} = postSlice.actions;
export default postSlice.reducer;