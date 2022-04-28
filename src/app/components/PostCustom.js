import { useState, useEffect } from 'react';
import { Skeleton, Avatar, Carousel, Typography, Divider, Button, List, Input, Space } from 'antd';
import { CommentOutlined, ClockCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/vi';

const { Text } = Typography;

const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];

function PostCustom(props){
    const [loading, setLoading] = useState(true);
    const [love, setLove] = useState(false);
    const [showComments, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);

    const {post} = props;

    
    const getComments = async () => {
        try {
            const loadedComments = await axios.get(`https://6269e637737b438c1c3f0baf.mockapi.io/posts/${post.id}/comments`);
            setComments(loadedComments.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        // if(showComments){
        //     getComments()
        // }
    }, []);


    const Love = () => {
        return (
            <a key={'love'} onClick={() => setLove(!love)} style={{marginRight: '12px'}}>
                <img 
                    src={love == false ? '/images/love.png' : '/images/loved.png'} 
                    alt='love' width={25} 
                />
            </a>
        )
    }

    const onChange = checked => {
        setLoading(!checked);
    };

    const handleLove = () => {

    };

    const handleShowComments = () => {
        setShowComment(!showComments);
        getComments();
    };

    return (
        <>
            <div className='post mt-3'>
                <div className='post-header'>
                    <div className='post-header__left'>
                        <Avatar src='/images/user.png' size={36} />
                        <div className='post-info'>
                            <Link to='/'>
                                <span style={{fontWeight: '700'}} >{post.name}</span>
                            </Link>
                            <Text className='post-info--scale'>
                                <ClockCircleOutlined />
                                Đã đăng {moment(post.createAt).toNow()}
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
                </div>
                <div className='container'>
                    <Divider className='m-0' style={{border: '0.5px #929292 solid'}}></Divider>
                </div>
                <div className='post-body'>
                    <div className='post-body__content'>
                        <p>{post.contents}</p>
                    </div>
                    <Carousel className='mt-2' dotPosition={'bottom'} effect='fade'>
                        {post.images.map((image, index) => {
                            return (<div key={index}>
                                <img src={image.path} width={'100%'}/>
                            </div>)
                        })}
                    </Carousel>
                </div>
                <div className='post-footer'>
                    <div className='post-footer__actions'>
                        <Love />
                        <CommentOutlined key={'comment'} style={{fontSize: '25px', color: 'black'}} />
                    </div>
                    <div className='post-footer__liked mt-2'>
                        <Avatar.Group size={20} maxCount={2} style={{margin: '4px'}}>
                            <Avatar size={20} src="https://joeschmoe.io/api/v1/random" />
                            <Avatar size={20} src="https://joeschmoe.io/api/v1/random" />
                            <Avatar size={20} src="https://joeschmoe.io/api/v1/random" />
                            <Avatar size={20} src="https://joeschmoe.io/api/v1/random" />
                        </Avatar.Group>
                        <div>
                            <Link to={'/'} >Bad Girl </Link>
                            và 2156 người khác đã thích ảnh này.
                        </div>
                    </div>
                    <div className='post-footer__comments mt-2'>
                        {
                            showComments == false
                            ?<Button 
                                type='link' style={{color: 'grey'}}
                                onClick={handleShowComments}
                            >Bấm để xem {post.comments.length} bình luận</Button>
                            :<div>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={comments}
                                    renderItem={comment => (
                                        <List.Item
                                            actions={[]}
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                                                title={<Link to="/" >{comment.name}</Link>}
                                                description={comment.content}
                                            />
                                        </List.Item>
                                    )}
                                />
                                <div className='comment-form'>
                                    <Input className='abc' />
                                    <Button className='btn-black btn-send-comment' icon={<SendOutlined style={{color: 'white'}} />} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCustom;