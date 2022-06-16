import React, {useEffect, useState} from 'react';
import { Divider, message } from 'antd';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../redux/apiRequest';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const clientId = "680782895198-u6hsnen7096ebqu6m24jk5lvb6u7rudo.apps.googleusercontent.com";
 
function Login(props){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const isDesktop = window.innerWidth > 790;


    useEffect(() => {
        document.title=props.title
        if(!currentUser){
            return navigate('/login');
        }else{
            return navigate('/');
        }
    }, []);

    function handleFinish(values){
        const url = '/api/auth/login';

        loginUser(url, values, dispatch, navigate);
    }

    const onLoginSuccess = (res) => {
        const data = {
            firstname: res.profileObj.givenName,
            lastname: res.profileObj.familyName,
            email: res.profileObj.email,
            userImage: res.profileObj.imageUrl,
            googleID: res.profileObj.googleId,
        };

        const path = '/api/auth/loginGoogle';
        loginUser(path, data, dispatch, navigate);
        //console.log('Login Success:', data);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const responseFacebook = (res) => {  
        
        console.log(res);
        const data = {
            firstname: res.name,
            lastname: '..',
            email: res.email,
            userImage: res.picture.data.url,
            facebookID: res.id,
        };

        const path = '/api/auth/loginFacebook';
        loginUser(path, data, dispatch, navigate);
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
                            {/* <button 
                                className='social-button icon-social'
                            >
                                <img src='/images/facebook.png' alt='facebook'/>
                                <span>Đăng nhập với Facebook</span>
                            </button> */}

                            <FacebookLogin
                                appId="695441924883650"
                                autoLoad={true}
                                fields="name,email,picture"
                                callback={responseFacebook}
                                cssClass="social-button icon-social"
                                textButton={<span>Đăng nhập với Facebook</span>}
                                icon={<img src='/images/facebook.png' alt='facebook'/>}
                            />

                            {/* <button 
                                className='social-button icon-social'
                            >
                                <img src='/images/google.png' alt='google'/>
                                <span>Đăng nhập với Google</span>
                            </button> */}

                            <GoogleLogin
                                clientId={clientId}
                                render={rProps => <button 
                                        className='social-button icon-social'
                                        onClick={rProps.onClick}
                                    >
                                        <img src='/images/google.png' alt='google'/>
                                        <span>Đăng nhập với Google</span>
                                    </button>
                                }
                                onSuccess={onLoginSuccess}
                                onFailure={onLoginFailure}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;