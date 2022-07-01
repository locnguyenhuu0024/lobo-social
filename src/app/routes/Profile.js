import {
    Link,
    useParams
} from "react-router-dom";
import { 
    useEffect, useState, useRef
} 
    from 'react';
import { 
    message, Avatar, 
    Typography, Button, 
    Badge, Divider, Dropdown,
    Menu, Modal, Form, Input, Space
} from 'antd';
import { 
    EditOutlined, 
    SettingOutlined, 
    CommentOutlined,
    FileImageFilled,
    UserAddOutlined,
    UserDeleteOutlined,
    CaretDownOutlined,
    LockOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } 
    from 'react-redux';
import { useNavigate } 
    from 'react-router-dom';
import WaitingScreenCustom 
    from '../components/WaitingScreenCustom';
import { block, follow, loadUser } 
    from '../redux/apiRequest';
import Masonry, { ResponsiveMasonry } 
    from "react-responsive-masonry";
import { motion } 
    from "framer-motion";
import { LazyLoadImage } 
    from 'react-lazy-load-image-component';
import axios from 'axios';

// Child of Antd component
const { Paragraph, Title, Text } = Typography;

const validateMessages = {
    required: 'Bắt buộc nhập ${label}!',
    types: {
        email: '${label} không hợp lệ!',
    },
};

const isMobileScreen = window.innerWidth < 800;

function Profile(){
    const {id} = useParams();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const {user} = useSelector(state => state.user.loadUser);
    const following = useSelector(state => state.user.loadFollowing);
    const blocking = useSelector(state => state.user.block);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showComment, setShowComment] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showBlock, setShowBlock] = useState(false);
    const [isFollowed, setIsFollowed] = useState(() => {
        // Tìm xem có id của mình trong đó k
        let result = following.list.find(user => {
            return user._id === id
        });
        
        // Nếu có thì trả về true, ko thì
        return result ? true : false;
    });
    const [form] = Form.useForm();
    
    useEffect(() => {
        if(currentUser == null){
            message.info('Bạn chưa đăng nhập!');
            navigate('/login');
        }else{
            loadUser(`/api/user/${id}`, currentUser, dispatch, navigate);
            
        }
    }, []);

    useEffect(() => {
        user && (document.title = `${user.firstname} ${user.lastname}`);
    }, [user])

    const handleShowComments = (id) => {
        setShowComment(!showComment)
        navigate(`/post/${id}`)
    }

    const handleFollow = () => {
        const path = `/api/user/follow/${id}`;
        follow(path, currentUser, dispatch, navigate);
        setIsFollowed(!isFollowed);
    }

    const handleBlockUser = () => {
        setShowBlock(true);
    }

    const acceptBlock = () => {
        setShowBlock(false);

        // TỚI ĐÂY RỒI :)))
        const path = `/api/user/block/${id}`;
        block(path, currentUser, dispatch, navigate);
    }

    const cancelBlock = () => {
        setShowBlock(false);
    }

    const handleEditInfo = (values) => {
        // TỚI ĐÂY RỒI
        console.log(values);
        const url = `${
            process.env.REACT_APP_PRODUCTION 
            ? 'https://lobosocial.me' 
            : 'http://localhost:4000'
        }/api/user/update`;
        axios.patch(url, values, {
            headers: {
                'Authorization': 
                    `Bearer ${currentUser.accessToken}`,
            },
            withCredentials: true
        }).then((res) => {
            setShowEdit(false);
            message.success(res.data);
            loadUser(`/api/user/${id}`, currentUser, dispatch, navigate);
        }).catch((err) => {
            setShowEdit(false);
            message.error(err.response.data);
        });
    }

    if(user){
        return(
            <div className="profile">
                <div className="profile__head">
                    <div className="profile__avt">
                        {/* <Badge 
                            count={<Button 
                                icon={<EditOutlined size={16} />} 
                                shape="circle"
                            ></Button>}
                            offset={[-16, 105]}
                        >
                            <Avatar src={user?.userImage} size={120} />
                        </Badge> */}
                        <Avatar 
                            //src={user?.userImage} 
                            src={
                                <img 
                                    src={user?.userImage}
                                    referrerPolicy="no-referrer"
                                />
                            }
                            size={120} 
                        />
                    </div>
                    <div>
                        <div className="profile__name">
                            <Title strong>
                                {`${user?.firstname} ${user?.lastname}`}
                            </Title>
                        </div>
                        <div className="profile__bio">
                            <Text>{user?.bio}</Text>
                        </div>
                        <div className="profile__static">
                            <div className="profile__static--content">
                                <Text strong>{user.posts.length}</Text>
                                <Text>bài đăng</Text>
                            </div>
                            <Divider style={{height: '30px'}} type="vertical" />
                            <div className="profile__static--content">
                                <Text strong>{user.followers.length}</Text>
                                <Text>người theo dõi</Text>
                            </div>
                            <Divider style={{height: '30px'}} type="vertical" />
                            <div className="profile__static--content">
                                <Text strong>{user.following.length}</Text>
                                <Text>đang theo dõi</Text>
                            </div>
                        </div>

                    </div>
                    
                    <div className="edit-info-button">
                        {
                            currentUser.user._id === id
                            &&
                            <Button
                                icon={<SettingOutlined />}
                                onClick={() => setShowEdit(true)}
                                shape={'circle'}
                                style={{
                                    padding: !isMobileScreen && '0 24px'
                                }}
                            >
                                {!isMobileScreen && 'Sửa thông tin'}
                            </Button>
                        }

                        {
                            currentUser.user._id !== id
                            &&
                            <Dropdown
                                overlay={
                                    <Menu
                                        items={[
                                            {
                                                key: '1',
                                                label: (
                                                    isFollowed 
                                                    ? <Button
                                                    
                                                        type={'link'} 
                                                        icon={<UserDeleteOutlined />}
                                                        danger
                                                        loading={following.isFetching}
                                                        onClick={handleFollow}
                                                    >Huỷ theo dõi</Button>
                                                    : <Button
                                                        type={'link'} 
                                                        icon={<UserAddOutlined />}
                                                        onClick={handleFollow}
                                                        loading={following.isFetching}
                                                    >Theo dõi</Button>
                                                )
                                            },
                                            {
                                                key: '2',
                                                label: (
                                                    <Button 
                                                        type={'link'} 
                                                        icon={<LockOutlined />}
                                                        onClick={handleBlockUser}
                                                    >
                                                        <Text
                                                            style={{fontSize: 14}}
                                                            type={'danger'}
                                                        >Chặn người này</Text>
                                                    </Button>
                                                ),
                                            },
                                        ]}
                                    />
                                }
                                trigger={'click'}
                                arrow
                                placement="bottomRight"
                            >
                                <Button
                                    shape="circle"
                                    icon={<CaretDownOutlined />}
                                ></Button>
                            </Dropdown>
                        }
                        <Modal 
                            title={
                                <Text strong type="danger">
                                    Chặn {`${user?.firstname} ${user?.lastname}`}
                                </Text>
                            }
                            visible={showBlock} 
                            onOk={acceptBlock} 
                            okText={'Chặn'}
                            confirmLoading={blocking?.isFetching}
                            onCancel={cancelBlock}
                            cancelText={'Huỷ'}
                        >
                            <Text>
                                Bạn có thể sẽ không nhìn thấy các bài đăng của 
                                <Text strong type="danger">
                                    {` ${user?.firstname} ${user?.lastname} `}
                                </Text> 
                                trong tương lai. Bạn chắc chắn muốn chặn?
                            </Text>
                        </Modal>
                    </div>
                </div>
                <div className="profile__divider container">
                    <Divider ></Divider>
                </div>
                <div className="profile__body">
                    <ResponsiveMasonry 
                        columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
                    >
                        <Masonry gutter="16" >
                            <></>
                            {user.posts.map(post => {
                                return (
                                    <motion.div
                                        key={post._id}
                                        animate={{ opacity: 1, y: 0 }}
                                        initial={{ opacity: 0, y: 10 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ scale: 1.025 }}

                                        // onHoverStart={() => onHoverInImage(post._id)}
                                        // onHoverEnd={() => onHoverOutImage(post._id)}
                                    >
                                        <div
                                            key={post._id} 
                                            style={{ 
                                                padding: "7px", 
                                                position: 'relative' 
                                            }}
                                            onClick={() => navigate(`/post/${post._id}`)}
                                        >
                                            <LazyLoadImage
                                                src={post.pathImages[0]}
                                                style={{
                                                    width: "100%",
                                                    display: "block",
                                                    marginBottom: "0px",
                                                    borderRadius: "16px"
                                                }}
                                                alt=""
                                                effect="black-and-white"
                                            /> 
                                            <div className="float-option">

                                            </div>
                                            <div className="float-comment">
                                                <Button 
                                                    type="primary" 
                                                    shape='circle' 
                                                    icon={
                                                        <CommentOutlined 
                                                            key={`comments-${post._id}`} 
                                                        />
                                                    } 
                                                    onClick={() => handleShowComments(post._id)}
                                                />
                                            </div>
                                            <motion.div
                                                className="float-option"
                                            >
                                                <Button
                                                    shape="circle"
                                                    icon={
                                                        <div className="three-dot">
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                    }
                                                ></Button>
                                            </motion.div>
                                            {
                                                post.pathImages.length > 1 
                                                && 
                                                <div className="float-count-image">
                                                    <Link to={`/post/${post._id}`}>
                                                        <Button 
                                                            type="primary" 
                                                            shape='circle' 
                                                            icon={
                                                                <FileImageFilled />
                                                            } 
                                                        >{post.pathImages.length}</Button>
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>

                <Modal
                    visible={showEdit}
                    title={<Text strong>SỬA THÔNG TIN</Text>}
                    onOk={() => form.submit()}
                    okText={
                        <Text 
                            strong style={{color: 'white'}}
                        >Chỉnh sửa</Text>
                    }
                    onCancel={() => {
                        setShowEdit(false); 
                        form.resetFields();
                    }}
                    cancelText={<Text>Huỷ bỏ</Text>}
                >
                    <div
                        className="edit-form"
                    >
                        <Form
                            layout="vertical"
                            initialValues={{
                                ['firstname']: user.firstname,
                                ['lastname']: user.lastname,
                                ['email']: user.email,
                                ['bio']: user.bio || '',
                            }}
                            onFinish={handleEditInfo}
                            form={form}
                            autoComplete="off"
                            validateMessages={validateMessages}
                        >
                            <Space 
                                direction="vertical"
                                size={'small'}
                            >
                                <Space
                                    size={'middle'}
                                    direction={
                                        isMobileScreen
                                        ? 'vertical'
                                        : 'horizontal'
                                    }
                                    align={'center'}
                                >
                                    {/* <Badge 
                                        count={<Button 
                                            icon={<EditOutlined size={16} />} 
                                            shape="circle"
                                        ></Button>}
                                        offset={[-16, 105]}
                                    >
                                        <Avatar src={user.userImage} size={120} />
                                    </Badge> */}
                                    <Avatar src={user.userImage} size={120} />
                                    <Space 
                                        direction="vertical"
                                        size={'middle'}
                                    >
                                        <Space size={'small'}>
                                            <Form.Item
                                                name={'lastname'}
                                                label='Họ'
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                name={'firstname'}
                                                label='Tên'
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Space>
                                        <Form.Item
                                            name={'email'}
                                            label='Email'
                                            rules={[
                                                {
                                                    type: 'email',
                                                },
                                            ]}
                                            
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                    </Space>
                                </Space>
                                <Form.Item
                                    name={'bio'}
                                    label='Mô tả'
                                >
                                    <Input.TextArea  
                                        autoSize={{ minRows: 1, maxRows: 3 }}
                                        showCount
                                        maxLength={150}
                                        placeholder={user.bio ? '' : 'Hãy mô tả sương sương về bạn!'}
                                    />
                                </Form.Item>
                            </Space>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }else{
        return (
            <WaitingScreenCustom 
                sizeIcon='64px'
            />
        );
    }    
}

export default Profile;