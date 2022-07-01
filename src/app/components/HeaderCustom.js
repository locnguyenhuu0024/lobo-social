import { useEffect, useState } from 'react'
import { 
    Layout, Row, 
    Button, Menu,
    Dropdown, Badge, 
    Avatar, Typography,
    Comment, List, 
    Skeleton, notification
} from 'antd';
import { 
    SearchOutlined, 
    BellFilled, 
    CompassOutlined, 
    LogoutOutlined,
    UserOutlined 
} from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { 
    loadNotify, 
    logoutUser,
    loadFollowing
} from '../redux/apiRequest';
import {io} from 'socket.io-client';
import moment from 'moment';
import { useSelector } from 'react-redux';
import CustomSider from './CustomSider';
import { GoogleLogout } from 'react-google-login';

const clientId = "680782895198-u6hsnen7096ebqu6m24jk5lvb6u7rudo.apps.googleusercontent.com";

const InfoButton = ({user, sizeAvt}) => (
    <div className="mt-2">
        <Link className="info-user link-button" to={`/${user._id}`}>
            <Avatar 
                size={sizeAvt} 
                src={user.userImage} 
                style={{
                    marginRight: 16
                }}
            />
            {`${user.firstname} ${user.lastname}`}
        </Link>
    </div>
);

const isMobileScreen = window.innerWidth < 800;

const { Header } = Layout;
function HeaderCustom(props){
    const {currentUser, dispatch, navigate} = props;
    const [notifies, setNotifies] = useState([]);
    const [newNotify, setNewNotify] = useState(null);
    const [openNotifies, setOpenNotifies] = useState(false);
    const [openFollow, setOpenFollow] = useState(false);
    const socket = io(`${
        process.env.PRODUCTION 
        ? 'https://lobosocial.me' 
        : 'http://localhost:4000'
    }`);
    const loadedNotifies = useSelector((state) => state.notify.loadNotify.notifies);
    const isLoadingNotifies = useSelector((state) => state.notify.loadNotify.isFetching);
    const {list: listFollowing, isFetching: isLoadFollow} = useSelector(state => state.user.loadFollowing);

    socket.on(`send-notify-${currentUser.user._id}`, (notify) => {
        setNewNotify(notify);
        setOpenNotifies(false);
    });

    const handleLogout = () => {
        logoutUser(
            '/api/auth/logout', 
            currentUser, 
            dispatch, 
            navigate
        );

        setTimeout(() => {
            localStorage.removeItem('persist:root');
        }, 2000);
    };

    useEffect(() => {const 
        url = '/api/user/follow';
        openFollow
        &&
        loadFollowing(url, currentUser, dispatch, navigate);
    
      return () => {}
    }, [openFollow])
    

    useEffect(() => {
        // Nếu có thông báo mới thì
        newNotify 
        && 
        // bật thông báo :)))
        notification.open({
            message: `${newNotify.from.firstname} ${newNotify.from.lastname}`,
            description: newNotify.content,
            placement: 'bottomLeft',
            icon: <Avatar 
                src={newNotify.from.userImage} 
                alt={`${newNotify.from.firstname} ${newNotify.from.lastname}`} 
            />
        });

        const url = '/api/notify/';
        newNotify
        &&
        loadNotify(url, currentUser, dispatch, navigate);
        
        // console.log(newNotify);
    }, [newNotify]);

    useEffect(() => {
        // Bắt sự kiện mở bảng thông báo
        setNotifies(loadedNotifies);
        const idScrollTopNotify = setTimeout(() => {
            // document.querySelector('.board-notifies').scrollTop = 0;
        }, 200);
        setNewNotify(null);

        return () => clearTimeout(idScrollTopNotify);
    }, [openNotifies])


    const menuUser = (
        <Menu
            items={[
                {
                    label: <Link 
                        style={{
                            width: 'fit-content',
                            textDecoration: 'none',
                            margin: 'auto',

                        }}
                        to={`/${currentUser.user._id}`} 
                    >
                        Thông tin cá nhân
                    </Link>,
                    key: '0',
                },
                {
                    label: <Link 
                        style={{
                            width: 'fit-content',
                            textDecoration: 'none',
                            margin: 'auto',

                        }}
                        to={`setting/${currentUser.user._id}`} 
                    >
                        Cài đặt
                    </Link>,
                    key: '1',
                },
                {
                    type: 'divider',
                },
                {
                    label: !currentUser.user.googleID 
                    ? <Button 
                        icon={<LogoutOutlined size={32} />} 
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </Button>
                    : <GoogleLogout
                        clientId={clientId}
                        buttonText="Đăng xuất"
                        onLogoutSuccess={handleLogout}
                    >
                    </GoogleLogout>,
                    key: '2',
                },
            ]}
        />
    );
    
    const menuNotify = (
        loadedNotifies.length > 0
            ?<div
                className='board-notifies'
            >
                <List 
                    dataSource={loadedNotifies}
                    renderItem={item => 
                        <div
                            className='notify'
                            key={item._id}
                        >
                            <Skeleton
                                action
                                loading={isLoadingNotifies}
                                avatar
                                title
                                paragraph={{rows: 1}}
                                className='skeleton-notify'
                            >
                                <Button
                                    type='link'
                                    href={`/post/${[item.postID]}`}
                                >
                                    <Comment
                                        author={
                                            <Typography.Text strong>
                                                {`
                                                    ${item.from[0].firstname} 
                                                    ${item.from[0].lastname}
                                                `}
                                            </Typography.Text>
                                        }
                                        avatar={
                                            <Avatar 
                                                //src={item.from[0].userImage} 
                                                src={
                                                    <img 
                                                        src={item.from[0].userImage}
                                                        referrerPolicy="no-referrer"
                                                    />
                                                }
                                                alt={`
                                                    ${item.from[0].firstname} 
                                                    ${item.from[0].lastname}
                                                `} 
                                            />
                                        }
                                        content={
                                            <Typography.Paragraph
                                                ellipsis={{
                                                    rows: 1
                                                }}
                                            >
                                                {item.content}
                                            </Typography.Paragraph>
                                        }
                                        datetime={
                                            <span>
                                                {moment(item.createdAt).fromNow()}
                                            </span>
                                        }
                                    />
                                </Button>
                            </Skeleton>
                        </div>
                    }
                />
            </div>
            : <div className='board-notifies'><Typography.Text
                strong
                type='secondary'
            >Chưa có thông báo để hiển thị.</Typography.Text></div>         
    );

    const menuFollow = (
        <div
            style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: 'white',
                width: 200
            }}
        >
            <Typography.Text strong type="secondary" >Đang theo dõi</Typography.Text>
            <Skeleton 
                active 
                loading={isLoadFollow} 
                avatar={{shape: 'circle'}} 
                paragraph={false} 
            >
                {
                    listFollowing.length > 0
                    ? <List 
                        dataSource={listFollowing} 
                        renderItem={follow => 
                            <InfoButton user={follow} sizeAvt={36} 
                        />}
                    />
                    : <div><Typography.Text type="secondary">Chưa theo dõi ai</Typography.Text></div>
                }
            </Skeleton>
        </div>
    ) 

    const handleLoadNotifies = () => {
        const url = '/api/notify/';

        !openNotifies
        &&
        newNotify
        &&
        loadNotify(url, currentUser, dispatch, navigate);

        setOpenNotifies(!openNotifies);
        setNewNotify(null);
    }

    return(
        <Header className='header'>
            <Row justify='space-between' align='middle' >
                <Link to='/'>
                    <img 
                        src='/logo.svg' 
                        className='logo'
                        alt='logo'
                    />
                </Link>
                
                <div className='nav-buttons'>
                    <Link to='/search'>
                        <Button type="primary" shape='circle' 
                            icon={<SearchOutlined />}  
                            style={{backgroundColor: 'transparent !important'}} 
                        />
                    </Link>

                    {/* <Link to={'/explore'}> 
                        <Button type="primary" shape='circle' 
                            icon={<CompassOutlined />}
                            disabled
                        />
                    </Link> */}

                    {
                        isMobileScreen
                        &&
                        <Dropdown 
                            overlay={menuFollow} 
                            trigger={['click']} 
                            placement='bottomRight' 
                            arrow
                        >
                            <Button 
                                type="primary" 
                                shape='circle' 
                                icon={<UserOutlined />} 
                                color='black' 
                                onClick={() => setOpenFollow(!openFollow)}
                            />
                        </Dropdown>
                    }

                    <Dropdown 
                        overlay={menuNotify} 
                        trigger={['click']} 
                        placement='bottomRight' 
                        arrow
                    >
                        <Badge 
                            count={newNotify ? 1 : 0} 
                            size={'default'} 
                            offset={[-10, 10]} 
                            dot
                        >
                            <Button 
                                type="primary" 
                                shape='circle' 
                                icon={<BellFilled />} 
                                color='black' 
                                onClick={handleLoadNotifies}
                            />
                        </Badge>
                    </Dropdown>
                    
                    <Dropdown 
                        overlay={menuUser} 
                        trigger={['click']} 
                        placement='bottomRight' 
                        arrow
                    >
                        <Avatar 
                            style={{
                                cursor: 'pointer'
                            }}
                            alt='avatar'
                            src={currentUser?.user.userImage}
                        />
                        {/* <button 
                            onClick={e => e.preventDefault()} 
                            className='btn-avt'
                        >
                            <img 
                                className='center' 
                                src={currentUser?.user.userImage} 
                                alt='avatar'
                            />
                        </button> */}
                    </Dropdown>
                </div>
            </Row>
        </Header>
    );
}

export default HeaderCustom;