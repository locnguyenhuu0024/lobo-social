import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RegisterForm(props){
    const {handleFinish, handleFinishFailed, handleSetEmail} = props;
    const [form] = Form.useForm();
    
    const isFetching = useSelector(state => state.auth.register.isFetching);

    function handleInputName(e){
        // e.target.value
    }

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
            form={form}
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
            <Space size={'small'} style={{width: '100%'}}>
                <Form.Item
                    name="lastname"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    label="Họ"
                >
                    <Input onChange={handleInputName} />
                </Form.Item>
                
                <Form.Item
                    name="firstname"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    label="Tên"
                >
                    <Input style={{borderBottom: 'none !important'}} />
                </Form.Item>
            </Space>

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
                <Input onChange={(e) => handleSetEmail(e.target.value)} />
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
                <Input.Password />
            </Form.Item>
            
            <Form.Item>
                <Button 
                    type="primary" htmlType="submit" 
                    style={{width: '100%'}} 
                    className='btn-black'
                    loading={isFetching}
                >
                    Đăng ký
                </Button>
            </Form.Item>

            <div className='d-flex justify-content-between'>
                <Link to='/login'>Đăng nhập ngay!</Link>
            </div>
        </Form>
    );
}

export default RegisterForm;