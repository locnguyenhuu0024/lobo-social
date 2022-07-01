import { useEffect } from 'react';
import { Layout, message, Affix,} from 'antd';
import HeaderCustom from '../components/HeaderCustom';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, useNavigate, Route } from 'react-router-dom';
import WaitingScreenCustom from '../components/WaitingScreenCustom';
import BodyHome from '../components/BodyHome';
import { getPosts } from '../redux/apiRequest';
import {
} from "react-router-dom";
import Profile from './Profile';
import Search from './Search';
import Post from './Post';
import { 
    enableBodyScroll
} from 'body-scroll-lock';
import Explore from './Explore';

const { Content } = Layout;

function Home(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    enableBodyScroll('body')
    useEffect(() => {
        document.title = props.title;
        if(currentUser == null){
            message.info('Bạn chưa đăng nhập!');
            navigate('/login');
        }else{
            getPosts('/api/post/', currentUser, dispatch, navigate);
        }
    }, [navigate, dispatch, currentUser, props.title]);

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
                            <Routes>
                                <Route path="/explore" element={<Explore />} />
                                <Route path="/search" element={<Search />} />
                                <Route path="/post/:idPost" element={<Post />} />
                                <Route path="/:id" element={<Profile />} />
                                <Route path='/' element={<BodyHome />} />
                            </Routes>
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
                    duration={1}
                />
            </div>
        );
    }    
}

export default Home;