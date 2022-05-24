import {
    useParams
} from "react-router-dom";
import { 
    useEffect, useState, 
} 
    from 'react';
import { 
    Layout, message, 
    Affix, Avatar, 
    Typography, Button, 
    Badge, Divider,
    Image
} from 'antd';
import { 
    EditOutlined, 
    SettingOutlined, 
    CommentOutlined,
    FileImageFilled
} from '@ant-design/icons';
import HeaderCustom 
    from '../components/HeaderCustom';
import { useSelector, useDispatch } 
    from 'react-redux';
import { useNavigate } 
    from 'react-router-dom';
import WaitingScreenCustom 
    from '../components/WaitingScreenCustom';
import { loadUser } 
    from '../redux/apiRequest';
import Masonry, { ResponsiveMasonry } 
    from "react-responsive-masonry";
import { motion } 
    from "framer-motion"
import PostFooterActions 
    from "../components/PostComponents/PostFooterActions";
import { LazyLoadImage } 
    from 'react-lazy-load-image-component';

// Child of Antd component
const { Content } = Layout;
const { Paragraph, Title, Text } = Typography;

function Profile(){
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showComment, setShowComment] = useState(false);
    const [visible, setVisible] = useState(false);
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const {user} = useSelector(state => state.user.loadUser);
    
    useEffect(() => {
        user && (document.title = `${user.firstname} ${user.lastname}`);
        if(currentUser == null){
            message.info('Bạn chưa đăng nhập!');
            navigate('/login');
        }else{
            loadUser(`http://localhost:4000/api/v1/user/${id}`, currentUser, dispatch, navigate);
            
        }
    }, []);

    const onHoverInImage = (id) => {
        const floatActions = document.getElementById(id);
        const content = document.querySelector(`#content-${id}>strong>a`)
        content && (content.innerHTML = 'Thêm');

        floatActions.setAttribute(
            'style',
            `
                opacity: 1; 
                transform: translateY(10px) translateZ(0px); 
                transition: all 200ms ease-in-out;
            `
        );
    }
    const onHoverOutImage = (id) => {
        const floatActions = document.getElementById(id);
        floatActions.setAttribute(
            'style', 
            `
                opacity: 0; 
                transform: translateY(0px) translateZ(0px); 
                transition: all 200ms ease-in-out;
            `
        );
    }

    const handleShowComments = (id) => {
        setShowComment(!showComment)
        console.log(`there-${id}`);
        // Tới đây rồi
    }

    if(user){
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
                            <div className="profile">
                                <div className="profile__head">
                                    <div className="profile__avt">
                                        <Badge 
                                            count={<Button 
                                                icon={<EditOutlined size={16} />} 
                                                shape="circle"
                                            ></Button>}
                                            offset={[-16, 105]}
                                        >
                                            <Avatar src={user?.userImage} size={120} />
                                        </Badge>
                                    </div>
                                    <div>
                                        <div className="profile__name">
                                            <Title strong>
                                                {`${user?.firstname} ${user?.lastname}`}
                                            </Title>
                                        </div>
                                        <div className="profile__bio">
                                            <Text>Hận đời vô đối :)))</Text>
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
                                        <Button
                                            icon={<SettingOutlined />}
                                        >Sửa thông tin</Button>
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

                                                        onHoverStart={() => onHoverInImage(post._id)}
                                                        onHoverEnd={() => onHoverOutImage(post._id)}
                                                    >
                                                        <div
                                                            key={post._id} 
                                                            style={{ 
                                                                padding: "7px", 
                                                                position: 'relative' 
                                                            }}
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
                                                                >

                                                                </Button>
                                                            </motion.div>
                                                            {
                                                                post.pathImages.length > 1 
                                                                && 
                                                                <div className="float-count-image">
                                                                    <Button 
                                                                        type="primary" 
                                                                        shape='circle' 
                                                                        icon={
                                                                            <FileImageFilled />
                                                                        } 
                                                                        onClick={() => setVisible(true)}
                                                                    >{post.pathImages.length}</Button>
                                                                </div>
                                                            }
                                                            <motion.div 
                                                                key={post._id}
                                                                id={post._id}
                                                                className="float-actions"
                                                                initial={{opacity: 0, y: 0}}
                                                                transition={{ duration: 0.3 }}
                                                            >
                                                                {post.contents && 
                                                                    <Paragraph
                                                                        id={`content-${post._id}`}
                                                                        strong
                                                                        ellipsis={{
                                                                            rows: 1,
                                                                        }}
                                                                    >
                                                                        {post.contents}
                                                                    </Paragraph>    
                                                                }
                                                                <PostFooterActions 
                                                                    post={post} 
                                                                    currentUser={currentUser}
                                                                    handleShowComments={
                                                                        () => handleShowComments(post._id)
                                                                    }
                                                                />
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </Masonry>
                                    </ResponsiveMasonry>
                                </div>
                            </div>
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

export default Profile;