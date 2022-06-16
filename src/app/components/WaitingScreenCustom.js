import { Spin, Typography, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const {Text, Title} = Typography;

function WaitingScreenCustom(props){
    const loadingIcon = 
        <LoadingOutlined 
            style={{ 
                fontSize: props.sizeIcon || '0px',
                color: '#5D5D5D' 
            }} 
            spin 
        />;

    return (
        <div style={{
            width: '100%',
            height: props.height || '100vh',
            backgroundColor: props.bgColor || 'rgba(229, 229, 229, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Title 
                level={2} 
                style={{
                    fontSize: '24px', 
                    fontWeight: '900', 
                    color:'#5D5D5D'
                }} 
            >
                {props.title}
            </Title>
            <Text 
                style={{
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color:'#5D5D5D'
                }}
            >
                {props.description}
            </Text>
            <div
                className={'logo-roll-1'}
            >
                <div 
                    className={'logo-roll-1'}
                    style={{
                        zIndex: -1
                    }}
                >
                    <motion.img 
                        src='/images/lobo-bg.svg' 
                        height={200} 
                        animate={{
                            rotate: [0, -360],
                        }}
                        transition={{
                            ease: "linear", 
                            duration: props.duration || 12, 
                            repeat: Infinity
                        }}
                    />
                </div>
                <div 
                    className={'logo-roll-1'}
                    style={{
                        zIndex: -1
                    }}
                >
                    <motion.img 
                        src='/images/lobo-bg.svg' 
                        height={200} 
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            ease: "linear", 
                            duration: props.duration || 12, 
                            repeat: Infinity
                        }}
                    />
                </div>
                <Space 
                    direction='horizontal' 
                    size={'small'}
                >
                    <motion.img 
                        src='/images/lobo-l.svg' 
                        height={48} 
                    />
                    <motion.img 
                        src='/images/lobo-o1.svg' 
                        height={48} 
                        animate={{
                            rotate: [0, -360],
                        }}
                        transition={{
                            ease: "linear", 
                            duration: 8, 
                            repeat: Infinity
                        }}
                        
                    />
                    <motion.img 
                        src='/images/lobo-b.svg' 
                        height={48} 
                    />
                    <motion.img 
                        src='/images/lobo-o2.svg' 
                        height={48} 
                        animate={{
                            rotate: [0, 360],
                        }}
                        transition={{
                            ease: "linear", 
                            duration: 8, 
                            repeat: Infinity
                        }}
                    />
                </Space>
            </div>
        </div>
    );
}
export default WaitingScreenCustom;