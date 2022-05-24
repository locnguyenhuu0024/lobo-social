import React, {useEffect} from 'react';
import { Divider, message } from 'antd';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Login(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const isDesktop = window.innerWidth > 790;

    useEffect(() => {
        document.title=props.title
        if(!currentUser){
            message.info('Bạn chưa đăng nhập')
            return navigate('/login');
        }else{
            return navigate('/');
        }
    }, []);

    function handleFinish(values){
        const url = 'http://localhost:4000/api/v1/auth/login';

        loginUser(url, values, dispatch, navigate);
    }

    return(
        <div className='wrap-center'>
            <div className='wrap-form'>
                <div className='left-side'>
                    <div className='logo mb-4'>
                        <a href='/'> 
                            {/* <img src={
                                    isDesktop 
                                    ? '/logo512-white.png' 
                                    : '/logo512.png'
                                } 
                                alt='logo'
                            />  */}
                            <img src='/logo.svg' alt='lobo' />
                        </a>
                    </div>

                    <div>
                        <p>Chia sẻ hình ảnh của bạn mọi lúc mọi nơi</p>
                    </div>

                    <div className='img-selfie'>
                        <img src='/images/selfie-3.png' alt='selfie'/>
                    </div>
                </div>
                <div className='right-side'>
                    <h1 className='form-title'>ĐĂNG NHẬP</h1>
                    <LoginForm
                        handleFinish={handleFinish}
                    />
                    <Divider style={{fontSize: '14px'}} orientation='center'>HOẶC</Divider>
                    <div>
                        <div className='social-buttons'>
                            <button className='social-button icon-social'>
                                <img src='/images/facebook.png' alt='facebook'/>
                                <span>Đăng nhập với Facebook</span>
                            </button>
                            <button className='social-button icon-social'>
                                <img src='/images/google.png' alt='google'/>
                                <span>Đăng nhập với Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;