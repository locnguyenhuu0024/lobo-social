import { useEffect, useState } from 'react';
import { Layout, message, Affix, Card, List, Skeleton, Button } from 'antd';
import HeaderCustom from '../components/HeaderCustom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WaitingScreenCustom from '../components/WaitingScreenCustom';
import PostCustom from '../components/PostCustom';
import axios from 'axios';
//import { getPosts } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';

const { Sider, Content } = Layout;

const styleAddImageComponent = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: '',

}

function Home(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    //const posts = useSelector(state => state.post.posts.listPosts);
    const isFetchingPosts = useSelector(state => state.post.posts.isFetching);
    const [posts, setPost] = useState([]);

    const getPosts = async () => {
        try {
            const posts = await axios('https://6269e637737b438c1c3f0baf.mockapi.io/posts');
            setPost(posts.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = props.title;
        getPosts();
        //getPosts('https://6269e637737b438c1c3f0baf.mockapi.io/posts', dispatch);
    }, []);

    // if(currentUser){
    //     return(
    //         <Layout>
    //             <HeaderCustom />
    //             <Layout>
    //                 <Sider>Sider</Sider>
    //                 <Content className='container h-100'>Content</Content>
    //             </Layout>
    //         </Layout>
    //     );
    // }else{
    //     return <div className='center' style={{zIndex: 9999}}>
    //         <WaitingScreenCustom 
    //             sizeIcon='64px'
    //         />
    //     </div>
    // }

    return(
        <Layout>
            <Affix offsetTop={0}>
                <HeaderCustom />
            </Affix>
            <Layout style={{ minHeight: '100vh' }}>
                
                <Layout>
                    <Content>
                        <div className='add-image-component'>
                            <p style={{width: 'fit-content'}}>Thêm ảnh mới</p>
                            <Button>
                                <img src='/images/add-image.png' alt='btn add image' width={23} height={23} />
                            </Button>
                        </div>
                        {
                            posts.length <= 0
                                ?<WaitingScreenCustom 
                                    sizeIcon='64px'
                                />
                                :<List 
                                    dataSource={posts}
                                    renderItem={
                                        post => (
                                            <PostCustom post={post} />
                                        )
                                    }
                                />
                        }
                        
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default Home;