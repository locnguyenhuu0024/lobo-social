import { Layout, Row, Button, Avatar, Menu, Dropdown, Badge } from 'antd';
import { SearchOutlined, BellFilled, CompassFilled, UserOutlined  } from '@ant-design/icons'
import { Link } from 'react-router-dom';

const { Header } = Layout;

const menuUser = (
    <Menu
        items={[
            {
                label: <div>Thông tin cá nhân</div>,
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label: <div>Đăng xuất</div>,
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

function HeaderCustom(props){
    return(
        <Header className='header'>
            <Row className='container' justify='space-between' align='middle'>
                <Link to='/'><img src='/logo.svg' width={40} height={40} alt='logo'/></Link>
                
                <div className='nav-buttons'>
                    <Button type="primary" shape='circle' 
                        icon={<SearchOutlined style={{fontSize: '20px'}} />}  
                        style={{backgroundColor: 'black !important'}} 
                    />

                    <Button type="primary" shape='circle' 
                        icon={<CompassFilled style={{fontSize: '20px'}} />}  
                        style={{backgroundColor: 'black !important'}} 
                    />

                    <Dropdown overlay={menuNotify} trigger={['click']} placement='bottomRight' arrow>
                        <Badge count={items.length} size={'small'} offset={[-7, 6]} >
                            <Button type="primary" shape='circle' 
                                icon={<BellFilled style={{fontSize: '20px'}} />} color='black' 
                            />
                        </Badge>
                    </Dropdown>
                    
                    <Dropdown overlay={menuUser} trigger={['click']} placement='bottomRight' arrow>
                        <button onClick={e => e.preventDefault()} className='btn-avt'>
                            <img className='center' src='/images/user.png' alt='avatar'/>
                        </button>
                    </Dropdown>
                </div>
            </Row>
        </Header>
    );
}

export default HeaderCustom;