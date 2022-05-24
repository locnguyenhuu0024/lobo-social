import { useRef, useEffect } from 'react';
import {
    Button,
    List, message, 
    Skeleton, Divider
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { pushComment } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import CommentCustom from '../CommentCustom';
import CmtFormCustom from '../CmtFormCustom';

function PostFooterComments(props){
    const {
        handleShowComments, 
        currentUser, 
        showComment,
        post,
    } = props;
    const isLoadingCmt = useSelector(
        state => state.post.loadComments.isFetching
    );
    const inputCommentRef = useRef();
    const commentRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        // Focus vào ô nhập bình luận
        showComment && inputCommentRef.current.focus({cursor: 'start'});  

    }, [showComment]);
    
    const handlePushComment = (inputCmt) => {
        if(inputCmt){
            let data = new FormData();
            data.append('content', inputCmt);
            data.append('authorID', currentUser.user._id);
            data.append('postID', post._id);
    
            const url = 'http://localhost:4000/api/v1/comment/';
            pushComment(url, currentUser, data, dispatch, navigate);
        }else{
            message.warn('Vui lòng nhập bình luận!');
        }
    }

    const handleScrollToComment = () => {
        setTimeout(function () {
            // Cuộn tới khung nhập comment
            commentRef.current.scrollIntoView({
                behavior: 'smooth', 
                block: 'center', 
                inline: 'center'
            });
            
        }, 100);
        
        // Focus vào ô nhập bình luận
        inputCommentRef.current.focus({
            cursor: 'start'
        });
    };

    return (
        <div className='post-footer__comments mt-2'>
            {
                // khi state showComments chưa được kích hoạt
                showComment === false
                // Hiển thị nút bấm hiện comment
                ? <Button 
                    type='link' style={{color: 'grey'}}
                    onClick={handleShowComments}
                >Bấm để xem bình luận</Button>
                // Nếu showComment đƯợc kích hoạt thì hiện form và list Comment
                : <div>
                    <div className='container'>
                        <Divider 
                            className='m-0' 
                            style={{border: '0.5px #929292 solid'}}
                        ></Divider>
                    </div>
                    <Skeleton
                        active 
                        avatar 
                        round
                        className='mt-2'
                        loading={isLoadingCmt}
                    >
                        {
                            // Nếu không có bình luận thì hiển thị là chưa có
                            post.comments.length <= 0
                            ? <div 
                                className='mt-2' 
                                style={{textAlign: 'center'}}
                            >
                                Chưa có bình luận nào để hiển thị.
                            </div>
                            // Nếu có thì hiện list comment lên
                            : <List
                                itemLayout="horizontal"
                                dataSource={post.comments}
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
                    <CmtFormCustom  
                        commentRef={commentRef}
                        idPost={post._id}
                        inputCommentRef={inputCommentRef}
                        handlePushComment = {handlePushComment}
                    />
                    {/* <Button 
                        key={`comment-form-post-${post.id}`}
                        type='link' style={{color: 'grey'}}
                        onClick={handleScrollToComment}
                    >Thêm bình luận cho ảnh này.</Button> */}
                </div>
            }
        </div>
    );
}
export default PostFooterComments;