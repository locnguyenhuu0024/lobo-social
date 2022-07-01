import { useState, useEffect } from 'react';
import { List, Button, Affix, Space } from 'antd';
import PostCustom from './PostCustom';
import UploadPostForm from './UploadPostForm';
import { useSelector } from 'react-redux';
import CustomSider from './CustomSider';
import SkeletonPostCustom from './SkeletonPostCustom';
import WaitingScreenCustom from './WaitingScreenCustom';
import InfiniteScroll from 'react-infinite-scroll-component';

function BodyHome(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDoneLoading, setIsDoneLoading] = useState(true);
    const getPosts = useSelector(state => state.post.getPosts.listPosts);
    const [posts, setPosts] = useState(() => {
        return [...getPosts.slice(0, 10)];
    });
    useEffect(() => {
        let idTimeOut = setTimeout(() => {
            setIsDoneLoading(!isDoneLoading);
        }, 1500);
        
        return () => {
            clearTimeout(idTimeOut);
        }
    }, []);

    useEffect(() => {
        setPosts((prev) => {
            return [...getPosts.slice(0, 10)];
        });
    }, [getPosts]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const loadMoreData = () => {
        setPosts((prev) => {
            return [...prev, ...getPosts.slice(prev.length, (prev.length + 10))];
        });
    }

    return (
        <div className='pt-3 pb-3 wrap-home'>
            <Affix offsetTop={80}>
                <CustomSider />
            </Affix>
            <div>
                <div className='add-image-component'>
                    <p style={{width: 'fit-content'}}>Thêm ảnh mới</p>
                    <Button onClick={showModal}>
                        <img 
                            src='/images/add-image.png' 
                            alt='btn add image' 
                            width={23} height={23} 
                        />
                    </Button>
                </div>
                
                {
                    isDoneLoading === true      // Nếu đang load thì load
                    ? <SkeletonPostCustom />    // Load thì cho người ta biết mình đang load
                    : posts.length <= 0         // Load xong thì so sánh xem có post nào không
                    ? <div
                        style={{
                            width: '100%',
                            height: '500px',
                            position: 'relative'
                        }}
                    >
                        <div 
                            className='center'
                            style={{
                                width: '100%',
                                height: '500px',
                            }}
                        >
                            <WaitingScreenCustom 
                                sizeIcon='64px'
                                height='100%'
                                bgColor='none'
                            />
                        </div>
                    </div>
                    : <InfiniteScroll
                        dataLength={posts.length}
                        next={loadMoreData}
                        hasMore={true}
                    >
                        <List                     // Có post thì in ra
                            dataSource={posts}
                            renderItem={
                                post => (
                                    <PostCustom key={post._id} post={post} />
                                )
                            }
                        />
                    </InfiniteScroll>
                    
                }
                <UploadPostForm 
                    isModalVisible={isModalVisible} 
                    handleOk={handleOk} 
                    handleCancel={handleCancel} 
                />
            </div>
        </div>
    )
}

export default BodyHome;