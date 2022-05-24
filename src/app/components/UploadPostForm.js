import {Input, Upload, Modal, Dropdown, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import EmojiPickerCustom from './EmojiPickerCustom';
import { useSelector, useDispatch } from 'react-redux';
import {SmileOutlined} from '@ant-design/icons';
import { uploadPost } from '../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;


const isMobileScreen = window.innerWidth < 800;

const emojiButtonStyle = {
    position: 'absolute', 
    right: isMobileScreen ? '25px' : '20px', 
    top: isMobileScreen ? '145px' : '143px', 
    fontSize: '24px',
    borderRadius: '50% !important', 
    backgroundColor: 'transparent !important'
};


const UploadPostForm = (props) => {
    
    let {isModalVisible, handleCancel} = props;

    const [postImages, setPostImages] = useState([]);
    const [postContent, setPostContent] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const currentUser = useSelector(state => state.auth.login.currentUser);
    const isFetchingUpload = useSelector(state => state.post.uploadPost.isFetching);

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

    const handlePost = () => {
        let dataUpload = new FormData();
        dataUpload.append('postContents', postContent);
        dataUpload.append('authorID', currentUser.user._id);
        for (const key of Object.keys(postImages)) {
            dataUpload.append('postImages', postImages[key].originFileObj);
        }

        const url = 'http://localhost:4000/api/v1/post/';
        
        uploadPost(url, currentUser, dataUpload, dispatch, navigate);
        setTimeout(() => {
            setPostContent('');
            setPostImages([]);
            handleCancel()
        }, 2000);
    }

    const handlePostImages = ({ fileList: newFileList }) => {
        const filteredImages 
            = newFileList.filter(image => checkIsImage(image));
        setPostImages(filteredImages);
    };
    const handlePostContent = (value) => {
        setPostContent(value.currentTarget.value);
    };

    const onEmojiClick = (emoji) => {
        setPostContent(prev => {
            const newContents = prev + emoji.native;
            
            return newContents;
        });
    };

    const isUnFillPost = postImages.length <= 0 || !postContent;
    
    return (
        <Modal 
            title={<strong>Đăng ảnh mới</strong>} 
            visible={isModalVisible} 
            style={{zIndex: isModalVisible ? 2 : -1}}
            onCancel={handleCancel}
            footer={<Button 
                type='primary' 
                onClick={handlePost} 
                disabled={isUnFillPost}
                loading={isFetchingUpload}
                >Đăng</Button>}
        >
            <TextArea 
                name='postContents'
                style={{ width: '100%', height: '100px', resize: 'none'}} 
                placeholder='Hãy nhập gì đó...'
                value={postContent}
                onChange={handlePostContent}
            /> 

            <Dropdown
                trigger={['click']}
                overlay={<EmojiPickerCustom 
                    className='emojipicker'
                    onEmojiSelect={onEmojiClick} 
                    theme='light'
                />}
                placement='bottomRight'
            >
                <Button 
                    className='emoji-button'
                    shape='circle' 
                    style={emojiButtonStyle} 
                    icon={<SmileOutlined 
                    width={32} height={32} />} 

                /> 
            </Dropdown>   
            
            <p style={{margin: '0px', marginBottom: '8px', marginTop: '16px'}}>Chọn ảnh</p>
            <Upload
                accept='.jpg,.jpeg,.png'
                showUploadList={{showPreviewIcon: false}}
                name='postImages'
                listType="picture-card"
                fileList={postImages}
                onChange={handlePostImages}
                beforeUpload={() => false}
            >
                {postImages.length < 5 && '+ Chọn hình'}
            </Upload>
        </Modal>
            
        
    );
};

export default UploadPostForm;