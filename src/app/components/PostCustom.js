import { useState, useEffect, useRef } from 'react';
import { Skeleton, Avatar, Carousel, Typography, Divider, Button, List, Input, Form } from 'antd';
import { CommentOutlined, ClockCircleOutlined, SendOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';
import ScrollIntoView from 'react-scroll-into-view'

const { Text } = Typography;

function PostCustom(props){
    const [loading, setLoading] = useState(true);
    const [love, setLove] = useState(false);
    const [showComments, setShowComment] = useState(false);
    const [form] = Form.useForm();
    const inputCommentRef = useRef();

    const {post} = props;

    useEffect(() => {
        
    }, []);


    const Love = () => {
        return (
            <a key={'love'} onClick={handleLove} style={{marginRight: '12px'}}>
                <img 
                    src={love == false ? '/images/love.png' : '/images/loved.png'} 
                    alt='love' width={25} 
                />
            </a>
        )
    }

    const handleScrollToComment = () => {
        // Cuộn tới ô nhập bình luận
        form.scrollToField(`comment-form-post-${post.id}`, {
            block: 'center',
            inline: 'center'
        });
        // Focus vào ô nhập bình luận
        inputCommentRef.current.focus({
            cursor: 'start'
        })
    };

    const handleComment = values => {
        console.log(values);

    }

    const handleLove = () => {
        setLove(!love)
    };

    const handleShowComments = () => {
        setShowComment(!showComments);
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
                            showComments === false
                            ?<Button 
                                type='link' style={{color: 'grey'}}
                                onClick={handleShowComments}
                            >Bấm để xem {post.comments.length} bình luận</Button>
                            :<div>
                                <Form id={`comment-form-post-${post.id}`} className={`comment-form`} onFinish={handleComment}>
                                    <Form.Item
                                        name={'comment'}
                                    >
                                        <Input ref={inputCommentRef} id='comment' placeholder='Nhập bình luận...' />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button 
                                            htmlType='submit' 
                                            className='btn-black btn-send-comment' 
                                            icon={<SendOutlined style={{color: 'white'}} />} 
                                        />
                                    </Form.Item>
                                </Form>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={post.comments}
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
                                <Button 
                                    type='link' style={{color: 'grey'}}
                                    onClick={handleScrollToComment}
                                >Thêm bình luận cho ảnh này.</Button>
                                {/* TOI DAY ROI */}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCustom;