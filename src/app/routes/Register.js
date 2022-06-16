import React, {useState, useEffect} from 'react';
import { Divider, Typography } from 'antd';
import RegisterForm from '../components/RegisterForm';
import WaitingScreenCustom from '../components/WaitingScreenCustom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const {Text} = Typography;

function Register(props){
    const [duration, setDuration] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        document.title=props.title;
    });

    const isRegSuccess = useSelector(state => state.auth.register.success);
    const isError = useSelector(state => state.auth.register.error);

    if(isRegSuccess){
        setTimeout(() => {
            setDuration(prev => prev - 1);
        }, 1000);
        setTimeout(() => {
            navigate('/login');
        }, 3000);
    }

    return(
        <div className='wrap-center'>
            {
                isRegSuccess && 
                <div className='center' style={{zIndex: 9999}}>
                    <WaitingScreenCustom />
                </div>
            }
            
            <div className='wrap-form'>
                <div className='left-side'>
                    <div className='logo mb-4'>
                        <a href='/'> 
                        
                            {/* <img src={
                                window.innerWidth > 890 
                                    ? '/logo512-white.png' 
                                    : '/logo512.png'} 
                                alt='logo'
                            />  */}

                            <img src='/logo.svg' alt='lobo' />
                        </a>
                    </div>

                    <div>
                        <p>Chia sẻ hình ảnh của bạn mọi lúc mọi nơi</p>
                    </div>

                    <div className='img-selfie'>
                        <img src='/images/selfie-1.png' alt='selfie'/>
                    </div>
                </div>
                <div className='right-side'>
                    {isError && <Text type='danger'>Email đã được sử dụng, vui lòng sử dụng email khác!</Text>}
                    <h1 className='form-title'>TẠO TÀI KHOẢN</h1>
                    <RegisterForm />
                    <Divider style={{fontSize: '14px'}} orientation='center'>HOẶC</Divider>
                    <div>
                        <div className='social-buttons'>
                            <button className='social-button icon-social'>
                                <img src='/images/facebook.png' alt='facebook'/>
                                <span>Đăng ký với Facebook</span>
                            </button>
                            <button className='social-button icon-social'>
                                <img src='/images/google.png' alt='google'/>
                                <span>Đăng ký với Google</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;