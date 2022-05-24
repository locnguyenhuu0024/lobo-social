import { Layout, Row, Button, Menu, Dropdown, Badge } from 'antd';
import { SearchOutlined, BellFilled, CompassOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { logoutUser } from '../redux/apiRequest';

const { Header } = Layout;

function HeaderCustom(props){
    const {currentUser, dispatch, navigate} = props;

    const handleLogout = () => {
        logoutUser('http://localhost:4000/api/v1/auth/logout', currentUser, dispatch, navigate);
    };

    const menuUser = (
        <Menu
            items={[
                {
                    label: <Button type='link' >Thông tin cá nhân</Button>,
                    key: '0',
                },
                {
                    type: 'divider',
                },
                {
                    label: <Button 
                        icon={<LogoutOutlined size={32} />} 
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </Button>,
                    key: '1',
                },
            ]}
        />
    );
    
    const items = [
        {
            label: <Link to='/' className='notify-item'><span>Nguyen Loc</span> Vừa thích ảnh của bạn.</Link>,
            key: '0',
        },
        {
            label: <Link to='/login' className='notify-item'><span>Bad Girl</span> Vừa thích ảnh của bạn.</Link>,
            key: '1',
        },
        {
            label: <Link to='/' className='notify-item'><span>Nguyen Loc</span> Vừa thích ảnh của bạn.</Link>,
            key: '2',
        },
        {
            label: <Link to='/' className='notify-item'><span>Nguyen Loc</span> Vừa thích ảnh của bạn.</Link>,
            key: '3',
        },
        {
            label: <Link to='/' className='notify-item'><span>Nguyen Loc</span> Vừa thích ảnh của bạn.</Link>,
            key: '4',
        },
        {
            label: <Link to='/' className='notify-item'><span>Nguyen Loc</span> Vừa thích ảnh của bạn.</Link>,
            key: '5',
        },
        {
            label: <Link to='/' className='notify-item'><span>Nguyen Loc</span> Vừa thích ảnh của bạn.</Link>,
            key: '6',
        },
        {
            label: <Link to='/' className='notify-item'><span>Nguyen Loc</span> Vừa thích ảnh của bạn.</Link>,
            key: '7',
        },
    ]
    
    const menuNotify = (
        <Menu
            items={items}
        />
    );


    return(
        <Header className='header'>
            <Row justify='space-between' align='middle' >
                <Link to='/'><img src='/logo.svg' width={40} height={40} alt='logo'/></Link>
                
                <div className='nav-buttons'>
                    <Button type="primary" shape='circle' 
                        icon={<SearchOutlined />}  
                        style={{backgroundColor: 'transparent !important'}} 
                    />

                    <Button type="primary" shape='circle' 
                        icon={<CompassOutlined />}
                    />

                    <Dropdown overlay={menuNotify} trigger={['click']} placement='bottomRight' arrow>
                        <Badge count={items.length} size={'small'} offset={[-10, 10]} >
                            <Button type="primary" shape='circle' 
                                icon={<BellFilled />} color='black' 
                            />
                        </Badge>
                    </Dropdown>
                    
                    <Dropdown overlay={menuUser} trigger={['click']} placement='bottomRight' arrow>
                        <button onClick={e => e.preventDefault()} className='btn-avt'>
                            <img className='center' src={currentUser?.user.userImage} alt='avatar'/>
                        </button>
                    </Dropdown>
                </div>
            </Row>
        </Header>
    );
}

export default HeaderCustom;