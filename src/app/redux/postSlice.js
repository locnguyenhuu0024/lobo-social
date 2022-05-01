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
            state.posts.isFetching = true;
        },
        getPostsSuccess: (state, action) => {
            state.posts.listPosts = action.payload;
            state.posts.isFetching = false;
        },
        getPostsFailed: (state) => {
            state.posts.isFetching = false;
            state.posts.error = true;
        },

    }
});

export const {
    getPostsStart, 
    getPostsSuccess, 
    getPostsFailed,
} = postSlice.actions;
export default postSlice.reducer;