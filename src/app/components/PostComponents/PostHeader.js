import { 
    Avatar,
    Typography,
} from 'antd';
import { 
    ClockCircleOutlined, 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';


const { Text } = Typography;

function PostHeader({post}){
    const {lastname, firstname, userImage} = post?.author[0];
    return (
        <>
            <div className='post-header__left'>
                <Avatar src={userImage} size={36} />
                <div className='post-info'>
                    <Link className='link-button' to={`/${post.authorID}`}>
                        <span style={{fontWeight: '700'}} >
                            {`${firstname} ${lastname}`}
                        </span>
                    </Link>
                    <Text className='post-info--scale'>
                        <ClockCircleOutlined />
                        Đã đăng {moment(post.createdAt).fromNow()}
                    </Text>
                </div>
            </div>
            <div className='post-header__right'>
                <div className='three-dot'>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    );
}

export default PostHeader;