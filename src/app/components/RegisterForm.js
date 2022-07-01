import React, {useState} from 'react';
import { Form, Input, Button, Space, Upload, message } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImgCrop from 'antd-img-crop';
import { registerUser } from '../redux/apiRequest';

function RegisterForm(props){
    const {handleFinishFailed} = props;
    const [form] = Form.useForm();
    const [userImage, setUserImage] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const isFetching = useSelector(state => state.auth.register.isFetching);

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: 'Bắt buộc nhập ${label}!',
        types: {
            email: '${label} không hợp lệ!',
            number: '${label} không hợp lệ!',
        },
    };

    function checkIsImage(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Bạn chỉ được đăng ảnh định dạng JPG/PNG!');
            return false;
        }

        // Chia 1024 2 lần để tính ra số MB
        // do file gốc được định dạng dung lượng là KB
        // 1MB = 1024KB * 1024KB
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isLt2M) {
            message.error('Dung lượng ảnh không được lớn hơn 4MB!');
            return false;
        }
        // return isJpgOrPng && isLt2M;
        return true;
    }
    
    const handlePostImages = ({ fileList: newFileList }) => {
        const filteredImages 
            = newFileList.filter(image => checkIsImage(image));
        setUserImage(filteredImages);
    };

    function handleFinish(values){
        let dataUpload = new FormData();

        dataUpload.append('firstname', values.firstname);
        dataUpload.append('lastname', values.lastname);
        dataUpload.append('email', values.email);
        dataUpload.append('password', values.password);
        for (const key of Object.keys(userImage)) {
            dataUpload.append('userImage', userImage[key].originFileObj);
        }

        // console.log(dataUpload);
        // console.log(values);
        
        const path = '/api/auth/register';
        registerUser(path, dataUpload, dispatch, navigate);
    }

    function handleAfterCrop(e){
        console.log(e);
    }


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
            <Space
                size={'small'}
                direction={'horizontal'}
                style={{width: '100%'}}
            >
                <Form.Item
                    label={'Ảnh đại diện'}
                    
                >
                    <ImgCrop
                        quality={1}
                        onModalOk={handleAfterCrop}
                    >
                        <Upload
                            accept='.jpg,.jpeg,.png'
                            showUploadList={{showPreviewIcon: false}}
                            name='userImage'
                            listType="picture-card"
                            fileList={userImage}
                            onChange={handlePostImages}
                            beforeUpload={() => false}
                        >
                            {
                                userImage.length < 1
                                &&
                                <Button 
                                    icon={<FileImageOutlined />} 
                                    shape="circle"
                                ></Button>
                            }
                        </Upload>
                    </ImgCrop>
                </Form.Item>
                <Space 
                    size={'small'}
                    direction={'vertical'}
                    style={{width: '100%'}}
                >
                    <Space 
                        size={'small'} 
                        style={{width: '100%'}}
                    >
                        <Form.Item
                            name="lastname"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            label="Họ"
                        >
                            <Input />
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
                        <Input />
                    </Form.Item>
                </Space>
            </Space>

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