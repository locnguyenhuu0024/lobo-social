import { useState, useRef } from 'react';
import { Comment, Avatar, Input, Button } from 'antd';
import {SendOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { pushComment } from '../redux/apiRequest';
import CmtFormCustom from './CmtFormCustom';

function CommentCustom(props){
  const { 
    children,
    comment
  } = props;
  const {firstname, lastname, userImage} 
    = comment.author[0];

  const [cmtForm, setCmtForm] = useState(false);
  const [inputCmt, setInputCmt] = useState('');
  const [showReply, setShowReply] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.auth.login.currentUser);
  const inputCommentRef = useRef();
  const commentRef = useRef(null);

  const handlePushReplyComment = (inCmt) => {
    let dataReply = new FormData();
    // dataReply.append('content', inputCmt);
    dataReply.append('content', inCmt);
    dataReply.append('authorID', currentUser.user._id);
    dataReply.append('postID', props.comment.postID);

    const path = `/api/comment/${props.comment._id}`;
    pushComment(path, currentUser, dataReply, dispatch, navigate);

    setInputCmt('')
    setCmtForm(!cmtForm);
  }

  const handleReplyTo = () => {
    setCmtForm(!cmtForm);
  }

  const CmtForm = () => (
    <div
      key={`comment-${comment._id}`}
      className={`comment-form`}
    >
      <Input.TextArea 
        key={`comment-input-${comment._id}`}
        placeholder='Nhập bình luận...'
        onChange={(e) => setInputCmt(e.target.value)}
        value={inputCmt}
        autoSize={{minRows: 1, maxRows: 4}}
        onPressEnter={handlePushReplyComment}
      />

      <Button 
        className='btn-black btn-send-comment' 
        key={`comment-btn-${comment._id}`}
        icon={<SendOutlined 
          style={{color: 'white'}} 
        />} 
        onClick={handlePushReplyComment}
      />
    </div>
  )

  return (
    <div key={`comment-${comment._id}`}>
      <Comment
        actions={[
          cmtForm == false
          ? <span 
            key="comment-nested-reply-to" 
            onClick={handleReplyTo}
          >Trả lời</span>
          : <CmtFormCustom 
            handlePushComment={handlePushReplyComment}
          />
        ]}

        author={
          <Link to={`/${comment.authorID}`}>
            {`${firstname} ${lastname}`}
          </Link>
        }
        avatar={
          <Avatar 
            src={userImage} 
            alt={`${firstname} ${lastname}`} 
          />
        }
        content={<p>{comment.content}</p>}
      >
        {
          showReply ? 
            comment.replies?.length > 0 
            &&
            comment.replies?.map(rep => {  
                return <Comment 
                  key={rep?._id} 
                  content={<p>{rep?.content}</p>} 
                  author={
                    <Link to={`/${rep?.authorID}`}>
                      {`${rep.author[0]?.firstname} ${rep.author[0]?.lastname}`}
                    </Link>
                  }
                  avatar={
                    <Avatar 
                      src={rep.author[0]?.userImage} 
                      alt={`${rep.author[0]?.firstname} ${rep.author[0]?.lastname}`} 
                    />
                  }
                />
                // return <CommentCustom comment={rep} />
            }) 
          : comment.replies.length > 0
              &&
            <Button 
              type='link' 
              onClick={() => setShowReply(!showReply)}
              className={'link-button'}
            >
              Hiển thị {comment.replies.length} bình luận
            </Button>
            
          }
      </Comment>
    </div>
  );
}

export default CommentCustom;