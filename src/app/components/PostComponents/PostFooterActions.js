import { useState } from 'react';
import {Button} from 'antd';
import {CommentOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { lovePost } from '../../redux/apiRequest';

function PostFooterActions(props){
    const {
        currentUser, 
        handleShowComments,
        post
    } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLove = () => {
        setLove(!love);
        const url = `/api/post/love/${post._id}`;
        lovePost(url, currentUser, dispatch, navigate);
    };
    const [love, setLove] = useState(() => {
        // Tìm xem có id của mình trong đó k
        let result = post.like.find(user => {
            return user._id == currentUser.user._id
        });
        // Nếu có thì trả về true, ko thì
        return result ? true : false;
    });
    return (
        <div className='post-footer__actions'>
            <Button 
                shape='circle' 
                key={`love-${post._id}`} 
                onClick={handleLove} 
            >
                {!love 
                    ? <img 
                        src={'/images/love.png'} 
                        alt='love' width={25} 
                    /> 
                    : <img 
                        src={'/images/loved.png'} 
                        alt='love' width={25} 
                    /> 
                }
            </Button>

            <Button 
                type="primary" 
                shape='circle' 
                icon={
                    <CommentOutlined 
                        key={`comments-${post._id}`} 
                        style={{fontSize: '25px', color: 'black'}} 
                    />
                } 
                onClick={handleShowComments}
            />
        </div>
    )
}

export default PostFooterActions;