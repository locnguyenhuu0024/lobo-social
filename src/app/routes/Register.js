import React, {useState, useEffect} from 'react';
import { Divider, Typography } from 'antd';
import RegisterForm from '../components/RegisterForm';
import WaitingScreenCustom from '../components/WaitingScreenCustom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/apiRequest';


const {Text} = Typography;

function Register(props){
    const [email, setEmail] = useState('');
    const [duration, setDuration] = useState(3);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title=props.title
        // if(!currentUser){
        //     message.info('Bạn chưa đăng nhập')
        //     return navigate('/login');
        // }
    });

    const isRegSuccess = useSelector(state => state.auth.register.success);
    const isError = useSelector(state => state.auth.register.error);

    function handleFinish(values){
        const url = 'http://localhost:4000/auth/register';
        registerUser(url, values, dispatch, navigate);
    }

    function handleSetEmail(value){
        setEmail(value);
    }

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
                    <WaitingScreenCustom 
                        title={`Email xác thực đã được gửi về ${email}`}
                        description={`Chuyển tới trang Đăng nhập trong ${duration}s`}
                    />
                </div>
            }
            
            <div className='wrap-form'>
                <div className='left-side'>
                    <div className='logo mb-4'>
                        <a href='/'> <img src={window.innerWidth > 890 ? '/logo512-white.png' : '/logo512.png'} alt='logo'/> </a>
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
                    <RegisterForm
                        handleFinish={handleFinish}
                        handleSetEmail={handleSetEmail}
                    />
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