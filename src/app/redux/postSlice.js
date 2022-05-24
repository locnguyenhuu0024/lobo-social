import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState:{
        getPost: {
            post: null,
            isFetching: false,
            error: false
        },
        getPosts: {
            listPosts: [],
            isFetching: false,
            error: false
        },
        uploadPost: {
            isFetching: false,
            error: false,
            uploadedPost: null,
            success: false
        },
        lovePost: {
            isFetching: false,
            error: false,
            loved: false
        },
        pushComment: {
            isFetching: false,
            error: false,
            success: false
        },
        loadComments: {
            isFetching: false,
            error: false
        }
    },
    reducers:{
        // Khi lấy dữ liệu posts
        getPostsStart: (state) => {
            state.getPosts.isFetching = true;
        },
        getPostsSuccess: (state, action) => {
            state.getPosts.listPosts = action.payload;
            state.getPosts.isFetching = false;
        },
        getPostsFailed: (state) => {
            state.getPosts.isFetching = false;
            state.getPosts.error = true;
        },


        // Upload post
        uploadPostStart: state => {
            state.uploadPost.isFetching = true;
        },
        uploadPostSuccess: (state, action) => {
            state.uploadPost.isFetching = false;
            state.uploadPost.error = false;
            state.uploadPost.success = true;
            state.uploadPost.uploadedPost = action.payload;
        },
        uploadPostFailed: (state) => {
            state.uploadPost.isFetching = false;
            state.uploadPost.error = true;
            state.uploadPost.success = false;
        },

        // Love post
        lovePostStart: (state) => {
            state.lovePost.isFetching = true;
            state.lovePost.error = false;
            state.lovePost.loved = false;
        },
        lovePostSuccess: (state, action) => {
            state.lovePost.isFetching = false;
            state.lovePost.error = false;
            state.lovePost.loved = true;
            // Tìm index của post vừa được tương tác
            const idPost 
                = state.getPosts.listPosts.findIndex(
                    post => post._id === action.payload._id
                );
            // Sau đó gắn post mới trả về vào vị trí đó
            state.getPosts.listPosts[idPost].like = action.payload.like;
        },
        lovePostFailed: (state) => {
            state.lovePost.isFetching = false;
            state.lovePost.error = true;
            state.lovePost.loved = false;
        },

        // Load comment khi đăng nhập
        loadCommentsStart: (state) => {
            state.loadComments.isFetching = true;
            state.loadComments.error = false;
        },
        loadCommentsSuccess: (state, action) => {
            state.loadComments.isFetching = false;
            state.loadComments.error = false;
            const idPost 
                = state.getPosts.listPosts.findIndex(
                    post => post._id === action.payload[0]?.postID
                );
            if(idPost > -1){
                state.getPosts.listPosts[idPost].comments = action.payload;
            }
        },
        loadCommentsFailed: (state) => {
            state.loadComments.isFetching = false;
            state.loadComments.error = true;
        },

        // Đăng bình luận
        pushCommentStart: (state) => {
            state.pushComment.isFetching = true;
            state.pushComment.error = false;
            state.pushComment.success = false;
        },
        pushCommentSuccess: (state, action) => {
            state.pushComment.isFetching = false;
            state.pushComment.error = false;
            state.pushComment.success = true;
            const idPost 
                = state.getPosts.listPosts.findIndex(
                    post => post._id === action.payload?.postID
                );
            if(idPost > -1){
                const idComment 
                    = state.getPosts.listPosts[idPost].comments.findIndex(
                        comment => comment._id === action.payload?._id
                    );
                console.log(idComment);
                if(idComment > -1){
                    state.getPosts.listPosts[idPost].comments[idComment] = action.payload;
                }else{
                    state.getPosts.listPosts[idPost].comments.push(action.payload);
                }
            }
        },
        pushCommentFailed: (state) => {
            state.pushComment.isFetching = false;
            state.pushComment.error = true;
            state.pushComment.success = false;
        },

        // Dọn sạch post sau khi đăng xuất
        clearPost: (state) => {
            state.getPost.post = null;
            state.getPosts.listPosts = [];
            state.lovePost.loved = false;
        },

        // Cập nhật post trong listposts sau khi đăng bài
        updateListPost: (state, action) => {
            //console.log(action.payload);
            state.getPosts.listPosts.push(action.payload[0]);
            state.getPosts.listPosts = state.getPosts.listPosts.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
        }
    }
});

export const {
    getPostsStart, 
    getPostsSuccess, 
    getPostsFailed,

    uploadPostStart,
    uploadPostSuccess,
    uploadPostFailed,

    lovePostStart,
    lovePostSuccess,
    lovePostFailed,

    loadCommentsStart,
    loadCommentsSuccess,
    loadCommentsFailed,

    pushCommentStart,
    pushCommentSuccess,
    pushCommentFailed,

    clearPost,
    updateListPost,
} = postSlice.actions;
export default postSlice.reducer;