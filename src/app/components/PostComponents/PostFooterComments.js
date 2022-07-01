import { useRef, useEffect } from 'react';
import {
    Button,
    List, message, 
    Skeleton, Divider, Affix
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
        post, offsetCmt
    } = props;
    const isLoadingCmt = useSelector(
        state => state.post.loadComments.isFetching
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    
    
    const handlePushComment = (inputCmt) => {
        if(inputCmt){
            let data = new FormData();
            data.append('content', inputCmt);
            data.append('authorID', currentUser.user._id);
            data.append('postID', post._id);
            
            const url = `/api/comment/`;
            pushComment(url, currentUser, data, dispatch, navigate);
        }else{
            message.warn('Vui lòng nhập bình luận!');
        }
    }

    return (
        <div 
            className='post-footer__comments mt-2'
            key={post._id}
        >
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
                                dataSource={post.comments}
                                renderItem={comment => (
                                    <CommentCustom 
                                        comment={comment}
                                        id={post._id}
                                        handlePushComment = {handlePushComment}
                                    ></CommentCustom>
                                )}
                            />
                        }
                    </Skeleton>
                    <CmtFormCustom  
                        idPost={post._id}
                        handlePushComment = {handlePushComment}
                        showComment={showComment}
                    />
                </div>
            }
        </div>
    );
}
export default PostFooterComments;