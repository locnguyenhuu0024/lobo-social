import { useEffect, useState } from 'react';
import { Layout, message, Affix,} from 'antd';
import HeaderCustom from '../components/HeaderCustom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WaitingScreenCustom from '../components/WaitingScreenCustom';
import BodyHome from '../components/BodyHome';
import { getPosts } from '../redux/apiRequest';

const { Content } = Layout;

function Home(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const posts = useSelector(state => state.post.getPosts.listPosts);

    useEffect(() => {
        document.title = props.title;
        if(currentUser == null){
            message.info('Bạn chưa đăng nhập!');
            navigate('/login');
        }else{
            getPosts('http://localhost:4000/api/v1/post/', currentUser, dispatch, navigate);
        }
    }, []);

    if(currentUser){
        return(
            <Layout>
                <Affix offsetTop={0}>
                    <HeaderCustom 
                        currentUser={currentUser} 
                        dispatch={dispatch} 
                        navigate={navigate} 
                    />
                </Affix>
                <Layout style={{ minHeight: '100vh' }}>
                    <Layout>
                        <Content>
                            {
                                <BodyHome posts={posts} />
                            }
                            
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }else{
        return (
            <div className='center' style={{zIndex: 9999}}>
                <WaitingScreenCustom 
                    sizeIcon='64px'
                />
            </div>
        );
    }    
}

export default Home;