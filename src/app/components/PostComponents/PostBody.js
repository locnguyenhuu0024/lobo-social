import { Image, Typography, Button } from 'antd';
import {Link} from 'react-router-dom';
import {FileImageFilled} from '@ant-design/icons';

const isMobileScreen = window.innerWidth < 800;

function PostBody(props){
    const {post} = props;
    return (
        <>
            <div className='post-body__content'>
                <p>{post.contents}</p>
            </div>    
            <div 
                className='mt-2' 
                style={{position: 'relative'}}
            >
                <div 
                    className='image'
                    style={{
                        textDecoration: 'none'
                    }}
                >
                    <Link to={`/post/${post._id}`}>
                        <Image 
                            width={'100%'}
                            src={post.pathImages[0]}
                            preview={{
                                mask: <Typography.Text strong style={{
                                        color: 'white'
                                    }}>
                                        Xem thêm
                                    </Typography.Text>,
                            }}
                        />
                    </Link>


                    {
                        isMobileScreen && post.pathImages.length > 1
                        &&
                        <div className="float-count-image">
                            <Link 
                                to={`/post/${post._id}`}
                                style={{
                                    color: 'white'
                                }}
                            >
                                Xem thêm
                            </Link>
                        </div>

                    }
                </div>
            </div>  
        </>              
    );
}

export default PostBody;