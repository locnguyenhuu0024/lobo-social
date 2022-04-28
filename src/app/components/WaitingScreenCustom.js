import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const {Text, Title} = Typography;

function WaitingScreenCustom(props){
    const loadingIcon = 
        <LoadingOutlined style={{ fontSize: props.sizeIcon || '0px', color: '#5D5D5D' }} spin />;

    return (
        <div style={{
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(229, 229, 229, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Title level={2} style={{fontSize: '24px', fontWeight: '900', color:'#5D5D5D'}} >{props.title}</Title>
            <Text style={{fontSize: '20px', fontWeight: '600', color:'#5D5D5D'}}>{props.description}</Text>
            <Spin indicator={loadingIcon}/>
        </div>
    );
}
export default WaitingScreenCustom;