import { 
    Avatar
} from 'antd';

import { Link } from 'react-router-dom';

function PostFooterLiked(props){
    const {post, currentUser} = props;    
    const isThatYou = () => {
        // Tìm xem có id của mình trong đó k
        let result = post.like.find(user => user._id === currentUser.user._id);
        // Nếu có thì trả về true, ko thì
        return result ? true : false;
    }

    return (
        <div className='post-footer__liked mt-2'>
            <Avatar.Group size={20} maxCount={2} style={{margin: '4px'}}>
                {
                    post.like.map(user => 
                        <Avatar 
                            key={`avt-${user._id}`} 
                            size={20} 
                            src={`${user.userImage}`} 
                        />
                    )
                }
            </Avatar.Group>
            <div>
                {
                    // Nếu không có lượt thích
                    post.like.length <= 0 
                    ? 'Hãy là người đầu tiên thích ảnh này.' 
                    // Nếu có lượt thích và có bản thân mình trong đó thì 
                    // hiểu thì chữ Bạn kèm theo link tới trang cá nhân
                    : isThatYou() 
                    ? <div>
                        <Link to={`/${post.authorID}`} >Bạn</Link>
                        
                        {
                            post.like.length > 1 
                            ? ` và ${post.like.length - 1} người khác đã thích ảnh này.` 
                            : ` đã thích ảnh này.`
                        }
                    </div>
                    // Còn nếu mình k có thích ảnh này thì chỉ hiện
                    // người đầu tiên trong danh sách thích và
                    // lượng người thích ảnh này.
                    : <div>
                        
                        <Link to={`/${post.like[0]._id}`} >
                            {`${post.like[0].firstname} ${post.like[0].lastname}`}
                        </Link>
                        {
                            post.like.length > 1 
                            ? ` và ${post.like.length - 1} người đã thích ảnh này.` 
                            : ` đã thích ảnh này.`
                        }
                    </div>
                }
            </div>
        </div>
    )
}
export default PostFooterLiked;