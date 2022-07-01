import {
    useState, useEffect, 
    useRef
} from 'react';
import { 
    useParams 
} from 'react-router-dom';
import {
    PageHeader, Skeleton, 
    Divider, Typography, 
    List, message, Carousel, Button
} from 'antd';
import {
    useSelector, useDispatch
} from 'react-redux';
import { 
    LazyLoadImage 
} from 'react-lazy-load-image-component';
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom';
import PostFooterActions from '../components/PostComponents/PostFooterActions';
import PostFooterLiked from '../components/PostComponents/PostFooterLiked';
import PostHeader from '../components/PostComponents/PostHeader';
import {
    pushComment
} from '../redux/apiRequest';
import { 
    disableBodyScroll
} from 'body-scroll-lock';
import CmtFormCustom from '../components/CmtFormCustom';
import CommentCustom from '../components/CommentCustom';
import axios from 'axios';

const {Text} = Typography;
const isMobileScreen = window.innerWidth < 800;

function Post(){
    const {idPost} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const posts = useSelector(state => state.post.getPosts.listPosts);
    const isLoadingCmt = useSelector(
        state => state.post.loadComments.isFetching
    );
    const commentRef = useRef();
    const inputCommentRef = useRef();
    const carouselRef = useRef();
    
    !isMobileScreen && disableBodyScroll('body');
    useEffect(() => {
        for(let i = 0; i < posts.length; i++){
            if(posts[i]._id === idPost){
                setTimeout(() => {
                    setPost(posts[i]);
                }, 1000);
            }else{
                continue;
            }
        }
    }, [posts]);

    useEffect(() => {
        if(post){
            const url = `${
                process.env.REACT_APP_PRODUCTION 
                ? 'https://lobosocial.me' 
                : 'http://localhost:4000'
            }/api/comment/${post._id}`;
            axios.get(url, {
                headers: {
                    'Authorization': 
                        `Bearer ${currentUser.accessToken}`,
                }
            }).then(res => {
                setComments(res.data);
                const cmtlog = document.getElementById('comments-log');
                cmtlog.scrollTop = cmtlog.scrollHeight;
            }).catch(err => console.log(err))
            //loadComments(url, currentUser, dispatch, navigate); 
        }
    
        return () => {}
    }, [post])
    

    const handleShowComments = () => {

    }

    const handlePushComment = (inputCmt) => {
        if(inputCmt){
            let data = new FormData();
            data.append('content', inputCmt);
            data.append('authorID', currentUser.user._id);
            data.append('postID', post._id);
    
            const path = '/api/comment/';
            pushComment(path, currentUser, data, dispatch, navigate);
            const cmtlog = document.getElementById('comments-log');
            cmtlog.scrollTop = cmtlog.scrollHeight;
        }else{
            message.warn('Vui lòng nhập bình luận!');
        }
    }

    const prevImage = () => {
        carouselRef.current.prev();
    }

    const nextImage = () => {
        carouselRef.current.next();
    }

    return (
        <div 
            className={!isMobileScreen ? 'container' : 'hehe'}
            style={{
                marginTop: 16
            }}
        >
            <PageHeader
                className="site-page-header"
                onBack={() => window.history.back()}
                subTitle='quay lại trang trước'
            />
            {
                !post
                ? <div className='post mt-3' style={{maxWidth: '580px', margin: 'auto'}}>
                    <div className='post-header'>
                        <div className='post-header__left'>
                            <Skeleton.Avatar active={true} size={40} />
                            <div className='post-info'>
                                <Skeleton.Input active={true} style={{height: 22, width: 200, marginBottom: '4px'}} />
                                <Skeleton.Input active={true} style={{height: 18}} />
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <Divider className='m-0' style={{border: '0.5px #d4d4d4 solid'}}></Divider>
                    </div>
                    <div className='post-body'>
                        <div className='post-body__content'>
                            <Skeleton.Input active={true} style={{height: 17, width: 200}} />
                        </div>
                        <Skeleton.Image active={true} style={{height: '280px'}} />
                    </div>
                </div>
                : <div className='detail-post'>
                    <div className='right'>
                        <div className='post-header'>
                            <PostHeader post={post} />
                        </div>
                        <div className='container'>
                            <Divider 
                                className='m-0' 
                                style={{border: '0.5px #929292 solid'}}
                            ></Divider>
                        </div>
                        <div className='content'>
                            <div className='text'>
                                <Text>{post.contents}</Text>
                            </div>
                            {
                                isMobileScreen
                                &&
                                <div className='images'>
                                    <Carousel>
                                        {
                                            post.pathImages.map(path => 
                                                <div 
                                                    key={path}
                                                    className='image'
                                                >
                                                    <LazyLoadImage
                                                        src={path}
                                                        style={{
                                                            marginBottom: "0px"
                                                        }}
                                                        alt=""
                                                        effect="black-and-white"
                                                    />
                                                </div>
                                            )
                                        }
                                    </Carousel>
                                </div>
                            }
                        </div>
                        <PostFooterActions 
                            post={post} 
                            currentUser={currentUser}
                            handleShowComments={handleShowComments}
                        />
                        <PostFooterLiked 
                            post={post} 
                            currentUser={currentUser} 
                        />
                        <div
                            className='comments-log'
                            id='comments-log'
                        >
                            <Skeleton
                                active 
                                avatar 
                                round
                                className='mt-2'
                                loading={isLoadingCmt}
                            >
                                {
                                    // Nếu không có bình luận thì hiển thị là chưa có
                                    comments.length <= 0
                                    ? <div 
                                        className='mt-2' 
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 12
                                        }}
                                    >
                                        Chưa có bình luận nào để hiển thị.
                                    </div>
                                    // Nếu có thì hiện list comment lên
                                    : <List
                                        itemLayout="horizontal"
                                        dataSource={comments}
                                        renderItem={comment => (
                                            <CommentCustom 
                                                comment={comment}
                                                commentRef={commentRef}
                                                id={post._id}
                                                inputCommentRef={inputCommentRef}
                                                handlePushComment = {handlePushComment}
                                            ></CommentCustom>
                                        )}
                                    />
                                }
                            </Skeleton>
                        </div>
                        <CmtFormCustom
                            idPost={post._id}
                            handlePushComment = {handlePushComment}
                        />
                    </div>
                    <div className='left'>
                        <div className='images'>
                            {      
                                !isMobileScreen
                                && <Carousel
                                    ref={carouselRef}
                                >
                                    {
                                        post.pathImages.map(path => 
                                            <div 
                                                key={path}
                                                className='image'
                                            >
                                                <LazyLoadImage
                                                    src={path}
                                                    style={{
                                                        marginBottom: "0px"
                                                    }}
                                                    alt=""
                                                    effect="black-and-white"
                                                />
                                            </div>
                                        )
                                    }
                                </Carousel>
                            }

                            {
                                !isMobileScreen
                                &&
                                <div
                                    className='prev'
                                    onClick={prevImage}
                                >
                                    <Button 
                                        icon={<LeftOutlined />} 
                                        shape={'circle'}
                                    />
                                </div>
                            }

                            {
                                !isMobileScreen
                                &&
                                <div
                                    className='next'
                                    onClick={nextImage}
                                >
                                    <Button 
                                        icon={<RightOutlined />} 
                                        shape={'circle'}
                                    />
                                </div>
                            }
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}

export default Post;