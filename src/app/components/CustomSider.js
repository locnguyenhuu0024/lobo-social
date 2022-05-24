import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Divider, List, Skeleton, Typography } from "antd";
import { loadFollowing } from "../redux/apiRequest";

const {Text} = Typography;
const InfoButton = ({user, sizeAvt}) => (
    <div className="mt-2">
        <Link className="info-user link-button" to={`/${user._id}`}>
            <Avatar size={sizeAvt} src={user.userImage} />
            {`${user.firstname} ${user.lastname}`}
        </Link>
    </div>
)

function CustomSider(props){
    const {} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const {list: listFollowing, isFetching: isLoadFollow} = useSelector(state => state.user.loadFollowing)
    const url = 'http://localhost:4000/api/v1/user/follow';

    useEffect(() => {
        loadFollowing(url, currentUser, dispatch, navigate);
    }, [])

    return (
        <div className='sider'>
            <InfoButton user={currentUser.user} sizeAvt={40} />
            <Divider />
            <Text strong type="secondary" >Đang theo dõi</Text>
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
                    : <div><Text type="secondary">Chưa theo dõi ai</Text></div>
                }
            </Skeleton>
        </div>
    )
}

export default CustomSider;