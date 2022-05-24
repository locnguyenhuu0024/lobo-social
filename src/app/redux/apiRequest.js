import axios from "axios";
import jwtDecode from "jwt-decode";
import { message } from "antd";
import { 
    loginFailed, 
    loginStart, 
    loginSuccess, 

    logoutFailed, 
    logoutStart, 
    logoutSuccess, 

    registerFailed, 
    registerStart, 
    registerSuccess 
} from "./authSlice";
import {
    getPostsStart,
    getPostsSuccess,
    getPostsFailed,

    lovePostStart,
    lovePostSuccess,
    lovePostFailed,

    uploadPostStart,
    uploadPostSuccess,
    uploadPostFailed,
    clearPost,
    updateListPost,

    loadCommentsFailed, 
    loadCommentsStart, 
    loadCommentsSuccess, 
    
    pushCommentFailed, 
    pushCommentStart, 
    pushCommentSuccess
} from './postSlice';
import { loadFollowingFailed, loadFollowingStart, loadFollowingSuccess, loadUserFailed, loadUserStart, loadUserSuccess } from "./userSlice";


const refreshToken = async (dispatch, navigate) => {
    try {
        const res = 
            await axios.put('http://localhost:4000/api/v1/auth/refresh-token/', '', {
                withCredentials: true,
                
            });
            return res.data;
    } catch (error) {
        message.warning(error.response.data, 1)
        setTimeout(() => {
            dispatch(clearPost());
            dispatch(logoutSuccess());
            navigate('/login')
        }, 1200);
    }
}

const axiosJWT = (currentUser, dispatch, navigate) => {
    const createAxios = axios.create({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
    createAxios.interceptors.request.use(
        async (config) => {
            const date = new Date();
            const decodedToken = jwtDecode(currentUser.accessToken);
            if(decodedToken.exp < date.getTime()/1000){
                const data = await refreshToken(dispatch, navigate);
                const refreshUser = {
                    ...currentUser,
                    accessToken: data.accessToken
                };
                dispatch(loginSuccess(refreshUser));
                config.headers['Authorization'] = `Bearer ${data.accessToken}`;
                config.headers['content-type'] = 'multipart/form-data';
            }
            return config;
        }, (err) => {return Promise.reject(err)}
    );

    return createAxios;
}

// AUTH
export const loginUser = async (url, user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(url, user, { withCredentials: true });

        setTimeout(() => {
            dispatch(loginSuccess(res.data));
            navigate('/');
        }, 2000);
    } catch (error) {
        setTimeout(() => {
            dispatch(loginFailed());
        }, 2000);
    }
}

export const logoutUser = async (url, currentUser, dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        await axiosJWT(currentUser, dispatch, navigate).post(url, {}, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });

        setTimeout(() => {
            dispatch(clearPost());
            dispatch(logoutSuccess());
            navigate('/login')
        }, 1000);
    } catch (error) {
        setTimeout(() => {
            dispatch(logoutFailed())
        }, 1000);
    }
}

export const registerUser = async (url, user, dispatch) => {
    dispatch(registerStart());
    try {
        await axios.post(url, user);
        setTimeout(() => {
            dispatch(registerSuccess());
        }, 2000);
    } catch (error) {
        setTimeout(() => {
            dispatch(registerFailed());
        }, 2000);
    }
}

// POST
export const getPosts = async (url, currentUser, dispatch, navigate) => {
    dispatch(getPostsStart());
    dispatch(clearPost());
    try {
        const res = await axiosJWT(currentUser, dispatch, navigate).get(url, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        //console.log(res.data);
        dispatch(getPostsSuccess(res.data));
    } catch (error) {
        dispatch(getPostsFailed());
    }
}

export const lovePost = async (url, currentUser, dispatch, navigate) => {
    dispatch(lovePostStart());
    try {
        const newPost = await axiosJWT(currentUser, dispatch, navigate)
        .put(url, {}, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            dispatch(lovePostSuccess(newPost.data[0]));
        }, 500);
    } catch (error) {
        //console.log(error.response.data);
        setTimeout(() => {
            dispatch(lovePostFailed());
        }, 500);
    }
}

export const uploadPost = async (url, currentUser, post, dispatch, navigate) => {
    dispatch(uploadPostStart());
    try {
        const postUploaded = await axiosJWT(currentUser, dispatch, navigate)
        .post(url, post, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
                'content-type': 'multipart/form-data'
            }
        });
        setTimeout(() => {
            dispatch(uploadPostSuccess(postUploaded.data[0]));
            dispatch(updateListPost(postUploaded.data));
        }, 2000);
    } catch (error) {
        setTimeout(() => {
            dispatch(uploadPostFailed());
        }, 2000);
    }
}

// COMMENT
export const pushComment = async (url, currentUser, comment, dispatch, navigate) => {
    dispatch(pushCommentStart());
    try {
        const commentPushed = await axiosJWT(currentUser, dispatch, navigate)
        .post(url, comment, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
                'content-type': 'multipart/form-data'
            }
        });
        setTimeout(() => {
            //console.log(commentPushed.data[0]);
            dispatch(pushCommentSuccess(commentPushed.data[0]));
        }, 500);
    } catch (error) {
        setTimeout(() => {
            message.error(error.response.data)
            dispatch(pushCommentFailed());
        }, 1000);
    }
}

export const loadComments = async (url, currentUser, dispatch, navigate) => {
    dispatch(loadCommentsStart());
    try {
        const listComments = await axiosJWT(currentUser, dispatch, navigate)
        .get(url, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            //console.log(listComments.data);
            dispatch(loadCommentsSuccess(listComments.data));
        }, 800);
    } catch (error) {
        setTimeout(() => {
            dispatch(loadCommentsFailed());
        }, 2000);
    }
}

// USER
export const loadFollowing = async (url, currentUser, dispatch, navigate) => {
    dispatch(loadFollowingStart());
    try {
        const list = await axiosJWT(currentUser, dispatch, navigate)
        .get(url, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            dispatch(loadFollowingSuccess(list.data));
        }, 800);
    } catch (error) {
        setTimeout(() => {
            dispatch(loadFollowingFailed());
        }, 2000);
    }
}

export const loadUser = async (url, currentUser, dispatch, navigate) => {
    dispatch(loadUserStart());
    try {
        const user = await axiosJWT(currentUser, dispatch, navigate)
        .get(url, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            console.log(user.data);
            dispatch(loadUserSuccess(user.data));
        }, 800);
    } catch (error) {
        setTimeout(() => {
            dispatch(loadUserFailed());
        }, 2000);
    }
}