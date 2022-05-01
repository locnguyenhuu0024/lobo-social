import {Input, Upload, Modal, Dropdown, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import EmojiPickerCustom from './EmojiPickerCustom';
import axios from 'axios';
import {SmileOutlined, CloseCircleOutlined} from '@ant-design/icons';
import ButtonCustom from './ButtonCustom';
const { TextArea } = Input;

const buttonStyle = {
    border: 'none', 
    borderRadius: '5px',
    fontWeight: 'bold',
    color: 'black',
    padding: '5px 10px'
}

const isMobileScreen = window.innerWidth < 800;

const emojiButtonStyle = {
    position: 'absolute', 
    right: isMobileScreen ? '25px' : '20px', 
    top: isMobileScreen ? '145px' : '143px', 
    fontSize: '24px',
    borderRadius: '50%', 
};


const UploadPostForm = (props) => {
    const [postImages, setPostImages] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [showEmojiChoose, setShowEmojiChoose] = useState(false);
    const {isModalVisible, handleOk, handleCancel} = props;
    const [ text, setText ] = useState('')
  
    function handleOnEnter (text) {
        console.log('enter', text)
    }

    const styleEmojiChoose = {
        width: '250px',
        height: showEmojiChoose ? '250px' : '0px', 
        //zIndex: showEmojiChoose ? 2 : -1
    }

    const handlePost = () => {
        let dataUpload = new FormData();
        dataUpload.append('postContents', postContent);
        for (const key of Object.keys(postImages)) {
            dataUpload.append('postImages', postImages[key].originFileObj)
        }

        const url = 'http://localhost:4000/post/';
        const config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWNkZjRkMzMzNWJmNjI4MGIxNGFmOCIsImFkbWluIjpmYWxzZSwidXNlcm5hbWUiOiJuZ3V5ZW5sb2MyNDA5IiwiaWF0IjoxNjUwNDUxMzc1LCJleHAiOjE2NTA0NTg1NzUsImF1ZCI6ImxvYm8uc29jaWFsLm9mZmljaWFsQGdtYWlsLmNvbSIsInN1YiI6InVzZXIifQ.vgA9hVRNoxjEcBU46V6LFbS56hCRMWi7y9RorV7knpQ',
                'content-type': 'multipart/form-data'
            }
        }

        axios.post(url, dataUpload, config)
        .then(respone => {})
        .catch(err => {})
        setPostContent('');
        setPostImages([]);
    }

    const handlePostImages = ({ fileList: newFileList }) => {
        setPostImages(newFileList);
    };
    const handlePostContent = (value) => {
        setPostContent(value.currentTarget.value);
    };

    const onEmojiClick = (emoji) => {
        setPostContent(prev => {
            const newContents = prev + emoji.native;
            
            return newContents;
        });
        setShowEmojiChoose(false)
    };

    const handleShowEmojiChoose = () => {
        
        setShowEmojiChoose(!showEmojiChoose);
    }

    
    return (
        <Modal 
            title={<strong>Đăng ảnh mới</strong>} 
            visible={isModalVisible} 
            onOk={handlePost} 
            okText={'Đăng'}
            cancelText={'Huỷ'}
            onCancel={handleCancel}
            style={{zIndex: isModalVisible ? 2 : -1}}
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
                {postImages.length < 5 && '+ Upload'}
            </Upload>
        </Modal>
            
        
    );
};

export default UploadPostForm;