import {Card, Input, Upload} from 'antd';
import React, { useState } from 'react';
import ButtonCustom from './ButtonCustom';
import Picker from 'emoji-picker-react';
import axios from 'axios';
import {SmileOutlined, CloseCircleOutlined} from '@ant-design/icons'
const { TextArea } = Input;

    
const cardStyle = { 
    width: 400,
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
};

const wrapCardStyle = {
    position: 'absolute', 
    top: '45%', left: '50%', 
    transform: 'translate(-50%, -50%)', 
}

const buttonStyle = {
    border: 'none', 
    borderRadius: '5px',
    fontWeight: 'bold',
    color: 'black',
    padding: '5px 10px'
}

const emojiButtonStyle = {
    position: 'absolute', 
    right: '20px', top: '128px', 
    fontSize: '24px',
    borderRadius: '50%', 
};


const wrapEmojiChooseStyle = {
    position: 'absolute',
    right: '-228px',
    top: '150px',
}


const UploadPostForm = () => {
    const [postImages, setPostImages] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [showEmojiChoose, setShowEmojiChoose] = useState(false);


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

    const onEmojiClick = (event, emojiObject) => {
        setPostContent(prev => {
            const newContents = prev + emojiObject.emoji;
            
            return newContents;
        });
    };

    const handleShowEmojiChoose = () => {
        
        setShowEmojiChoose(!showEmojiChoose);
    }

    return (
        <div style={wrapCardStyle}>
            <Card size="small" 
                title="Đăng ảnh mới" 
                extra={
                    <ButtonCustom 
                        // Kiểm tra xem dữ liệu đã được điền vào thì mới mở nút đăng
                        idDisabled={postImages.length !== 0 ? false : true}
                        buttonStyle={buttonStyle} 
                        handlePost={handlePost}
                    />
                } 
                style={cardStyle}
            >
                <TextArea 
                    name='postContents'
                    style={{ width: '100%', height: '100px', resize: 'none'}} 
                    placeholder='Hãy nhập gì đó...'
                    value={postContent}
                    onChange={handlePostContent}
                />
                <SmileOutlined style={emojiButtonStyle} onClick={handleShowEmojiChoose} />
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
            </Card>
            {
                showEmojiChoose 
                    && 
                <div style={wrapEmojiChooseStyle}>
                    <CloseCircleOutlined style={{position: 'inherit', right: '-5px', top: '-5px', zIndex: '1', fontSize: '16px'}} onClick={handleShowEmojiChoose} />
                    <Picker pickerStyle={{width: '240px', height: '300px'}} disableSearchBar={true} onEmojiClick={onEmojiClick}/>
                </div>
            }
        </div>
        
    );
};

export default UploadPostForm;