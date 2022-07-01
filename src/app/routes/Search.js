import { useEffect, useState } from 'react';
import { Typography, Button, Avatar, List, Skeleton, message, Affix } from "antd";
import { SearchOutlined, UserAddOutlined, CheckOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import metric_suffix from 'metric-suffix';
import WaitingScreenCustom from '../components/WaitingScreenCustom';
import {motion} from 'framer-motion';
import { loadFollowing } from '../redux/apiRequest';
import CustomSider from '../components/CustomSider';

const { Text } = Typography;

function BodySearch(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {accessToken, user} = useSelector(state => state.auth.login.currentUser);
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const following = useSelector(state => state.user.loadFollowing);
    const [searching, setSearching] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);
    const [followed, setFollowed] = useState([]);
    const [loadings, setLoadings] = useState([]);
    const [found, setFound] = useState([]);
    const isFollowed = (id) => {
        // Tìm xem có id của mình trong đó k
        let result = following.list.find(user => {
            return user._id === id
        });
        console.log(result);
        // Nếu có thì trả về true, ko thì
        return result ? true : false;
    };

    useEffect(() => {
      document.title = 'Tìm kiếm | Lobo'
    
      return () => {}
    });

    useEffect(() => {


        // Làm chức năng search tại đây
        const idSearching = setTimeout(() => {
            const query = queryString.stringify({name: searching});
            const url = `${
                process.env.PRODUCTION 
                ? 'https://lobosocial.me' 
                : 'http://localhost:4000'
            }/api/user/find/?${query}`;

            searching
            &&
            setSearchLoading(true);

            searching 
            && 
            axios.get(url, {
                headers: {
                    'Authorization': 
                        `Bearer ${accessToken}`,
                }
            }).then(res => {
                res.data.sort((a, b) => {
                    return a._id === user._id ? -1 : b._id === user._id ? 1 : 0;
                })
                setFound(res.data)
                setSearchLoading(false);
                // TỚI ĐÂY RỒI :____))))
            }).catch(err => {
                console.log(err);
                setSearchLoading(false);
            })
        }, 500);
        
        return () => clearTimeout(idSearching)
    }, [searching]);

    useEffect(() => {
        const newFollowed = [];
        // for(let i = 0; i < following.list.length; i++){
        // for(let j = 0; j < res.data.length; j++){

        for (const u of found) {
            if(u.followers){
                if(u.followers.includes(user._id)){
                    newFollowed[u._id] = true;
                }else{
                    newFollowed[u._id] = false;
                }
            }else{
                console.log(0);
            }
        }

        //console.log(matchedFollows);
        setFollowed(newFollowed);
    }, [found])
    
    const handleFollow = (id) => {
        setLoadings(prevLoadings => {
            const newLoadings = [...prevLoadings];
            newLoadings[id] = true;
            return newLoadings;
        });

        const url = `${
            process.env.PRODUCTION 
            ? 'https://lobosocial.me' 
            : 'http://localhost:4000'
        }/api/user/follow/${id}`;
        axios.patch(url, {}, {
            headers: {
                'Authorization': 
                    `Bearer ${accessToken}`,
            }
        }).then(() => {
            setTimeout(() => {
                setLoadings(prevLoadings => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[id] = false;
                    return newLoadings;
                });

                setFollowed(prevFollowed => {
                    prevFollowed[id] === true
                    ? prevFollowed[id] = false
                    : prevFollowed[id] = true

                    return prevFollowed;
                });
                const path = '/api/user/follow';
                loadFollowing(path, currentUser, dispatch, navigate);
            }, 500);
        })
        .catch(err => {
            setTimeout(() => {
                setLoadings(prevLoadings => {
                    const newLoadings = [...prevLoadings];
                    newLoadings[id] = false;
                    return newLoadings;
                });
                message.error('Đã có lỗi xảy ra')
            }, 500);
        });
    }
    
    return (
        <div className='pt-3 pb-3 wrap-home'>
            <Affix offsetTop={80}>
                <CustomSider />
            </Affix>
            <div>
                <div
                    className='search'
                >
                    <input 
                        onChange={(e) => setSearching(e.target.value)}
                        placeholder='Nhập tên cần tìm...'
                        value={searching}
                    />

                    <div 
                        className='float-search'
                    >
                        <Button 
                            shape='circle'
                            icon={
                                <SearchOutlined />
                            } 
                            loading={found.length < 1 && (searching || searchLoading)}
                        />
                    </div>
                </div>
                <div className='list-search'>
                    {
                        !searching
                        ? <div
                            style={{
                                height: 400
                            }}
                        >
                            <WaitingScreenCustom
                                bgColor={'transparent'}
                            />
                        </div>
                        : <Skeleton
                            avatar
                            title
                            paragraph={{rows: 1}}
                            // Chỗ này: nếu danh sách tìm được là rỗng thì xét xem
                            // có nhập ký tự nào trong ô tìm kiếm hay chưa hoặc là
                            // searchLoading có đang load hay không. 
                            // Nói chung: Nếu có ký tự 
                            // được nhập mà không có dữ liệu trong found thì vẫn 
                            // load tiếp.
                            loading={found.length < 1 && (searching || searchLoading)}
                            active
                            style={{
                                backgroundColor: 'white',
                                padding: '8px 16px',
                                borderRadius: '10px',
                            }}
                        >
                            <List 
                                dataSource={found}
                                renderItem={(item) => (
                                    <motion.div
                                        initial={{y: 20, opacity: 0}}
                                        animate={{y: 0, opacity: 1}}
                                        transition={{
                                            ease: "linear", 
                                            duration: 0.2
                                        }}
                                    >
                                        <List.Item 
                                            key={item._id}
                                            className='item-search'
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.userImage} />}
                                                title={
                                                    <Link to={`/${item._id}`}>
                                                        <Text strong>
                                                            {`${item.firstname} ${item.lastname}`}
                                                        </Text>
                                                    </Link>
                                                }
                                                description={
                                                    
                                                <Text 
                                                    type='secondary'
                                                >
                                                    {
                                                        user._id === item._id
                                                        ? 'Bạn'
                                                        :(item.followers > 0
                                                            &&
                                                            `${metric_suffix(item.followers, 4)} người theo dõi`
                                                        )
                                                    }
                                                    
                                                </Text>
                                            }
                                        />
                                        {
                                            user._id !== item._id
                                            && 
                                            <Button
                                                key={`btn-${item._id}`}
                                                icon={
                                                    // followed[item._id] && isFollowed(item._id)
                                                    // isFollowed(item._id)
                                                    followed[item._id]
                                                    ? <CheckOutlined />
                                                    : <UserAddOutlined />
                                                }
                                                onClick={() => handleFollow(item._id)}
                                                loading={loadings[item._id]}
                                            >
                                                {
                                                    // followed[item._id] && isFollowed(item._id)
                                                    // isFollowed(item._id)
                                                    followed[item._id]
                                                    ? 'Đã theo dõi'
                                                    : 'Theo dõi'
                                                }
                                            </Button>
                                        }
                                    </List.Item>
                                </motion.div>
                            )}
                        />
                        </Skeleton>
                    }
                </div>
            </div>
        </div>
    )
}

export default BodySearch;