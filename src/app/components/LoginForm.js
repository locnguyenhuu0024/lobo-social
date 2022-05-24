import { Form, Input, Button } from 'antd';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';


function LoginForm(props){
    const {handleFinish, handleFinishFailed} = props;
    const progressLogin = useSelector(state => state.auth.login.isFetching);

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'Bắt buộc nhập ${label}!',
        types: {
            email: '${label} không hợp lệ!',
            number: '${label} không hợp lệ!',
        },
    };

    return (
        <Form
            name="basic"
            layout="vertical"
            initialValues={{
                remember: true,
            }}
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            autoComplete="off"
            validateMessages={validateMessages}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                    },
                ]}
                label="Email"
            >
                <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        min: 8,
                        max: 16,
                    },
                ]}
                label="Mật khẩu"
            >
            <Input.Password placeholder='Mật khẩu' />
            </Form.Item>
            
            <Form.Item>
                <Button 
                    loading={progressLogin}
                    type="primary" htmlType="submit" 
                    style={{width: '100%'}} className='btn-black'
                >
                    Đăng nhập
                </Button>
            </Form.Item>

            <div className='d-flex justify-content-between'>
                <Link to='/register'>Chưa có tài khoản? Đăng ký ngay!</Link>
                <Link to='/'>Quên mật khẩu?</Link>
            </div>
        </Form>
    );
}

export default LoginForm;