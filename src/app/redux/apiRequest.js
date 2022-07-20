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
    registerReset, 
    registerStart, 
    registerSuccess, 
    updateCurrentUser
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

    loadCommentsFailed, 
    loadCommentsStart, 
    loadCommentsSuccess, 
    
    pushCommentFailed, 
    pushCommentStart, 
    pushCommentSuccess,
    
    clearPost,
    updateListPost,
    removePost,
    resetUploadPost
} from './postSlice';
import { 
    followFailed, 
    followStart, 
    followSuccess, 
    
    loadFollowingFailed, 
    loadFollowingStart, 
    loadFollowingSuccess, 
    
    loadUserFailed, 
    loadUserStart, 
    loadUserSuccess,

    blockStart,
    blockSuccess,
    blockFailed, } from "./userSlice";

import { loadNotifyFailed, loadNotifyStart, loadNotifySuccess } from "./notifySlice";

const host = process.env.REACT_APP_PRODUCTION ? 'https://lobosocial.me' : 'http://localhost:4000';
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

const refreshToken = async (dispatch, navigate) => {
    try {
        const res = 
            await axios.put(`${host}/api/auth/refresh-token/`, '', {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
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
                // config.headers['Access-Control-Allow-Origin'] = '*';
                // config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
            }
            return config;
        }, (err) => {return Promise.reject(err)}
    );

    return createAxios;
}

// AUTH
export const loginUser = async (path, user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(host + '' + path, user, { 
            withCredentials: true,
        });

        setTimeout(() => {
            dispatch(loginSuccess(res.data));
            navigate('/');
        }, 2000);
    } catch (error) {
        setTimeout(() => {
            dispatch(loginFailed());
            message.warning(error.response.data)
        }, 2000);
    }
}

export const loginWithGoogle = async (path, user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(host + '' + path, user, { 
            withCredentials: true,
        });

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

export const logoutUser = async (path, currentUser, dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        await axiosJWT(currentUser, dispatch, navigate).post(
            host + '' + path, {}, 
            {
                headers: {
                    'Authorization': 
                        `Bearer ${currentUser.accessToken}`,
                }
            }
        );

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

export const registerUser = async (path, user, dispatch) => {
    dispatch(registerStart());
    try {
        const registered = await axios.post(host + '' + path, user, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        });
        setTimeout(() => {
            message.error(registered.data);
            dispatch(registerSuccess());

            setTimeout(() => dispatch(registerReset()), 10000);
        }, 2000);
    } catch (error) {
        setTimeout(() => {
            message.error(error.response.data)
            dispatch(registerFailed());
            setTimeout(() => dispatch(registerReset()), 10000);
        }, 1000);
    }
}

// POST
export const getPosts = async (path, currentUser, dispatch, navigate) => {
    dispatch(getPostsStart());
    dispatch(clearPost());
    try {
        const res = await axiosJWT(currentUser, dispatch, navigate).get(
            host + '' + path, 
            {
                headers: {
                    'Authorization': 
                        `Bearer ${currentUser.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        //console.log(res.data);
        dispatch(getPostsSuccess(res.data));
    } catch (error) {
        message.error(error.response.data)
        dispatch(getPostsFailed());
    }
}

export const lovePost = async (path, currentUser, dispatch, navigate) => {
    dispatch(lovePostStart());
    try {
        const newPost = await axiosJWT(currentUser, dispatch, navigate)
        .put(
            host + '' + path
            , {}, {
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
            message.error(error.response.data)
            dispatch(lovePostFailed());
        }, 500);
    }
}

export const uploadPost = async (path, currentUser, post, dispatch, navigate) => {
    dispatch(uploadPostStart());
    try {
        const postUploaded = await axiosJWT(currentUser, dispatch, navigate)
        .post(host + '' + path, post, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": `${
                    process.env.REACT_APP_PRODUCTION 
                    ? 'https://lobo.today' 
                    : 'http://localhost:3000'
                }`,
            }
        });
        setTimeout(() => {
            dispatch(uploadPostSuccess(postUploaded.data[0]));
            dispatch(updateListPost(postUploaded.data));

            setTimeout(() => dispatch(resetUploadPost()), 5000);
        }, 2000);
    } catch (error) {
        setTimeout(() => {
            message.error(error.response.data)
            dispatch(uploadPostFailed());
            
            setTimeout(() => dispatch(resetUploadPost()), 5000);
        }, 1000);
    }
}

// COMMENT
export const pushComment = async (path, currentUser, comment, dispatch, navigate) => {
    dispatch(pushCommentStart());
    try {
        const commentPushed = await axiosJWT(currentUser, dispatch, navigate)
        .post(host + '' + path, comment, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
                'content-type': 'multipart/form-data'
            }
        });
        setTimeout(() => {
            // console.log(commentPushed.data[0]);
            dispatch(pushCommentSuccess(commentPushed.data[0]));
        }, 500);
    } catch (error) {
        setTimeout(() => {
            message.error(error.response.data)
            dispatch(pushCommentFailed());
        }, 1000);
    }
}

export const loadComments = async (path, currentUser, dispatch, navigate) => {
    dispatch(loadCommentsStart());
    try {
        const listComments = await axiosJWT(currentUser, dispatch, navigate)
        .get(host + '' + path, {
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
        }, 1000);
    }
}

// USER
export const loadFollowing = async (path, currentUser, dispatch, navigate) => {
    dispatch(loadFollowingStart());
    try {
        const list = await axiosJWT(currentUser, dispatch, navigate)
        .get(host + '' + path, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            dispatch(loadFollowingSuccess(list.data));
        }, 400);
    } catch (error) {
        setTimeout(() => {
            message.error(error.response.data)
            dispatch(loadFollowingFailed());
        }, 1000);
    }
}

export const loadUser = async (path, currentUser, dispatch, navigate) => {
    dispatch(loadUserStart());
    try {
        const user = await axiosJWT(currentUser, dispatch, navigate)
        .get(host + '' + path, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            // console.log(user.data);
            dispatch(loadUserSuccess(user.data));

            dispatch(updateCurrentUser(user.data));
        }, 800);
    } catch (error) {
        setTimeout(() => {
            message.error(error.response.data)
            dispatch(loadUserFailed());
        }, 1000);
    }
}

export const loadNotify = async (path, currentUser, dispatch, navigate) => {
    dispatch(loadNotifyStart());
    try {
        const notifies = await axiosJWT(currentUser, dispatch, navigate)
        .get(host + '' + path, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            // console.log(notifies.data);
            dispatch(loadNotifySuccess(notifies.data));
        }, 300);
    } catch (error) {
        setTimeout(() => {
            dispatch(loadNotifyFailed());
            message.error(error.response.data)
        }, 1000);
    }
}

export const follow = async (path, currentUser, dispatch, navigate) => {
    dispatch(followStart());
    try {
        await axiosJWT(currentUser, dispatch, navigate)
        .patch(host + '' + path, {}, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            dispatch(followSuccess());
        }, 300);
    } catch (error) {
        setTimeout(() => {
            dispatch(followFailed());
        }, 1000);
    }
}

export const block = async (path, currentUser, dispatch, navigate) => {
    dispatch(blockStart());
    try {
        await axiosJWT(currentUser, dispatch, navigate)
        .patch(host + '' + path, {}, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            }
        });
        setTimeout(() => {
            // console.log(notifies.data);
            dispatch(blockSuccess());
            navigate('/');
        }, 300);
    } catch (error) {
        setTimeout(() => {
            message.error(error.response.data)
            dispatch(blockFailed());
        }, 1000);
    }
}

export const removeP = (id, dispatch) => {
    dispatch(removePost(id));
}