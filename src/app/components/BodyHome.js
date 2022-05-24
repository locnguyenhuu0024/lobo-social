import { useState, useEffect } from 'react';
import { List, Button, Affix } from 'antd';
import PostCustom from './PostCustom';
import UploadPostForm from './UploadPostForm';
import { useSelector } from 'react-redux';
import CustomSider from './CustomSider';
import SkeletonPostCustom from './SkeletonPostCustom';

function BodyHome(props){
    const {posts} = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDoneLoading, setIsDoneLoading] = useState(true);
    

    useEffect(() => {
        let idTimeOut = setTimeout(() => {
            setIsDoneLoading(!isDoneLoading);
        }, 1500);
        
        return () => {
            clearTimeout(idTimeOut);
        }
    }, [])

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
        <div className='pt-3 pb-3 wrap-home'>
            <Affix offsetTop={80}>
                <CustomSider />
            </Affix>
            <div>
                <div className='add-image-component'>
                    <p style={{width: 'fit-content'}}>Thêm ảnh mới</p>
                    <Button onClick={showModal}>
                        <img src='/images/add-image.png' alt='btn add image' width={23} height={23} />
                    </Button>
                </div>
                
                {
                    isDoneLoading === true      // Nếu đang load thì load
                    ? <SkeletonPostCustom />    // Load thì cho người ta biết mình đang load
                    : posts.length <= 0         // Load xong thì so sánh xem có post nào không
                    ? <h2>Hãy đăng gì đó</h2>   // Không thì ....
                    : <List                     // Có post thì in ra
                        dataSource={posts}
                        renderItem={
                            post => (
                                <PostCustom key={post._id} post={post} />
                            )
                        }
                    />
                }
                <UploadPostForm isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />
            </div>
        </div>
    )
}

export default BodyHome;