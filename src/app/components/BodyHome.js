import { useState } from 'react';
import { List, Button } from 'antd';
import PostCustom from './PostCustom';
import UploadPostForm from './UploadPostForm';
function BodyHome(props){
    const {posts} = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div className='add-image-component'>
                <p style={{width: 'fit-content'}}>Thêm ảnh mới</p>
                <Button onClick={showModal}>
                    <img src='/images/add-image.png' alt='btn add image' width={23} height={23} />
                </Button>
            </div>
            <List 
                dataSource={posts}
                renderItem={
                    post => (
                        <PostCustom post={post} />
                    )
                }
            />
            <UploadPostForm isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
        </div>
    )
}

export default BodyHome;