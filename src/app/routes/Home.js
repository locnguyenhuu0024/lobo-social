import { useEffect, useState } from 'react';
import { Layout, message, Affix, Card, List, Skeleton } from 'antd';
import HeaderCustom from '../components/HeaderCustom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WaitingScreenCustom from '../components/WaitingScreenCustom';
import PostCustom from '../components/PostCustom';
import axios from 'axios';
//import { getPosts } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';

const { Sider, Content } = Layout;

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
                {
                    window.innerWidth > 890 && 
                    <Sider 
                        // style={{backgroundColor: 'transparent'}}
                        width={300}
                    >
                        Sider
                    </Sider>
                }
                <Layout>
                    <Content>
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