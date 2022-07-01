import React, { useState } from 'react'
import { 
    Avatar,
    Typography,
    Dropdown,
    Menu, Button,
    Modal,
    Form,
    Input,
    Upload,
    message
} from 'antd';
import { 
    ClockCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    SmileOutlined 
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { removeP } from '../../redux/apiRequest';


const { Text } = Typography;


function PostHeader({post}){
    const {currentUser} = useSelector(state => state.auth.login)
    const {lastname, firstname, userImage} = post?.author[0];
    const [showEditForm, setShowEditForm] = useState();   
    const [images, setImages] = useState(() => {
        let arr = [];
        post.pathImages.map((path, index) => {
            arr.push({
                uid: index,
                name: 'image.jpg',
                status: 'done',
                url: path
            })
        });
        return arr;
    });
    const dispatch = useDispatch();
    const [form] = Form.useForm(); 

    const handleDeletePost = () => {
        const url = `${
            process.env.PRODUCTION 
            ? 'https://lobosocial.me' 
            : 'http://localhost:4000'
        }/api/post/delete/${post._id}`;
        axios.delete(url, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            },
            withCredentials: true
        }).then((s) => {
            removeP(post._id, dispatch);
            setShowEditForm(false);
            message.success(s.data);
        }).catch((e) => {
            setShowEditForm(false);
            message.error(e.response.data);
        })
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Button 
                            icon={<EditOutlined />}
                            type={'link'}
                            onClick={() => setShowEditForm(true)}
                        >Sửa bài đăng</Button>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Button 
                            icon={<DeleteOutlined />}
                            type={'link'} 
                            danger
                            onClick={handleDeletePost}
                        >Xoá bài đăng</Button>
                    ),
                },
            ]}
        />
    );


    const handleEditPost = (e) => {
        let pathImages = [];
        images.map(image => pathImages.push(image.url));
        const data = {
            pathImages,
            contents: e.contents
        };
        const url = `${
            process.env.PRODUCTION 
            ? 'https://lobosocial.me' 
            : 'http://localhost:4000'
        }/api/post/update/${post._id}`;
        axios.patch(url, data, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            },
            withCredentials: true
        }).then((s) => {
            setShowEditForm(false);
            message.success(s.data);
        }).catch((e) => {
            setShowEditForm(false);
            message.error(e.response.dâta);
        })
    }
    
    const handleChangeImages = ({fileList}) => {
        setImages(fileList);
    }

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
                {
                    post.authorID === currentUser.user._id
                    &&
                    <Dropdown
                        overlay={menu}
                        placement={'bottomRight'}
                    >
                        <div 
                            className='three-dot'
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </Dropdown>
                }
            </div>

            <Modal
                title={'SỬA BÀI ĐĂNG'}
                visible={showEditForm}
                onCancel={() => {setShowEditForm(false); form.resetFields();}}
                cancelText={'Huỷ'}
                onOk={() => form.submit()}
                okText={'Sửa'}
            >
                <Form
                    layout='vertical'
                    form={form}
                    onFinish={handleEditPost}
                >
                    <Form.Item
                        name={'contents'}
                        label={'Nội dung'}
                        initialValue={post.contents}
                    >
                        <Input.TextArea  
                            autoSize={{ minRows: 1, maxRows: 3 }}
                            showCount
                            maxLength={150}
                            placeholder={!post.contents ? '' : 'Hãy nhập nội dung bạn muốn chia sẻ!'}
                        />
                    </Form.Item>
                    <Form.Item
                        name={'images'}
                        label={'Hình ảnh'}
                    >
                        <Upload
                            accept='.jpg,.jpeg,.png'
                            showUploadList={{showPreviewIcon: false}}
                            name='postImages'
                            listType="picture-card"
                            fileList={images}
                            beforeUpload={() => false}
                            onChange={handleChangeImages}
                        >
                            {post.pathImages.length < 5 && '+ Chọn hình'}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default PostHeader;