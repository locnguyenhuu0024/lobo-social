import { useState } from 'react';
import { 
    Divider, 
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { loadComments } from '../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import PostFooterActions from './PostComponents/PostFooterActions';
import PostFooterLiked from './PostComponents/PostFooterLiked';
import PostFooterComments from './PostComponents/PostFooterComments';
import PostBody from './PostComponents/PostBody';
import PostHeader from './PostComponents/PostHeader';
import 
    FloatCarouselImages 
from './PostComponents/FloatCarouselImage';
import { 
    disableBodyScroll, 
    enableBodyScroll
} from 'body-scroll-lock';



function PostCustom(props){
    const {post} = props;
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const [showComment, setShowComment] = useState(false);
    const [showImages, setShowImages] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowComments = () => {
        setShowComment(!showComment);
        
        const url = `http://localhost:4000/api/v1/comment/${post._id}`;
        loadComments(url, currentUser, dispatch, navigate); 
    };

    const handleShowImages = () => {
        const body = document.body;
        if(showImages == false){
            setShowImages(true);
            disableBodyScroll(body);
        }else{
            setShowImages(false);
            enableBodyScroll(body);
        }
    }

    return (
        <>
            <div className='post mt-3'>
                <div className='post-header'>
                    <PostHeader post={post} />
                </div>
                <div className='container'>
                    <Divider 
                        className='m-0' 
                        style={{border: '0.5px #929292 solid'}}
                    ></Divider>
                </div>
                <div className='post-body'>
                    <PostBody
                        post={post} 
                        handleShowImages={handleShowImages}
                    />
                </div>
                <div className='post-footer'>
                    <PostFooterActions 
                        currentUser={currentUser} 
                        handleShowComments={handleShowComments} 
                        post={post}
                    />
                    <PostFooterLiked 
                        post={post} 
                        currentUser={currentUser} 
                    />
                    <PostFooterComments
                        handleShowComments={handleShowComments}
                        currentUser={currentUser}
                        showComment={showComment}
                        post={post}
                    />
                </div>

                <FloatCarouselImages 
                    handleShowImages={handleShowImages}
                    pathImages={post.pathImages} 
                    visible={showImages} 
                />
            </div>
        </>
    );
}

export default PostCustom;