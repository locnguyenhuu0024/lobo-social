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
import { manualUpdatePost } from '../../redux/postSlice';


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
                name: `${path.split('/').pop()}`,
                status: 'done',
                url: path,
                size: 399999,
                type: `image/${path.split('.').pop()}`,
                lobo: 'lobo'
            })
        });
        return arr;
    });
    const [originImages, setOriginImages] = useState(post.pathImages);
    const [countImages, setCountImages] = useState(post.pathImages.length);
    const dispatch = useDispatch();
    const [form] = Form.useForm(); 

    function checkIsImage(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ được đăng ảnh định dạng JPG/PNG!');
            return false;
        }

        // Chia 1024 2 lần để tính ra số MB
        // do file gốc được định dạng dung lượng là KB
        // 1MB = 1024KB * 1024KB
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
            message.error('Dung lượng ảnh không được lớn hơn 4MB!');
            return false;
        }
        // return isJpgOrPng && isLt2M;
        return true;
    }

    const handleDeletePost = () => {
        const url = `${
            process.env.REACT_APP_PRODUCTION 
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
            message.success(s.data.msg);
        }).catch((e) => {
            setShowEditForm(false);
            message.error(e.response.data);
        })
    }

    const handleEditPost = (e) => {
        // Cat mang tu vi tri countImages
        const newImage = images.slice(countImages);

        let dataUpdate = new FormData();
        dataUpdate.append('postContents', e.contents);
        for (const key of Object.keys(newImage)) {
            dataUpdate.append('postImages', newImage[key].originFileObj);
        }
        dataUpdate.append('updatedPath', originImages);

        const url = `${
            process.env.REACT_APP_PRODUCTION 
            ? 'https://lobosocial.me' 
            : 'http://localhost:4000'
        }/api/post/update/${post._id}`;
        axios.patch(url, dataUpdate, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
            withCredentials: true
        }).then((s) => {
            setShowEditForm(false);
            message.success(s.data.msg);
            dispatch(manualUpdatePost(s.data.data));
        }).catch((e) => {
            setShowEditForm(false);
            message.error(e.response.data);
        })
    }
    
    const handleChangeImages = ({fileList}) => {
        const filteredImages 
            = fileList.filter(image => checkIsImage(image));
        setImages(filteredImages);
    }

    const handleRemove = (file) => {
        // Khi ma xoa file thi no kiem tra xem co phai file goc hay khong
        // Neu la file goc thi cap nhat lai countImages
        // Khong thi thoi
        if(file.lobo){
            setCountImages(countImages - 1);
            setOriginImages(prev => {
                const arr = prev.filter(image => image !== file.url)
                return [...arr];
            });
        }
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
                            onRemove={handleRemove}
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