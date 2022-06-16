import { Divider, Typography } from 'antd';
import {motion} from 'framer-motion';

function Explore(){
    return (
        <div className="container mt-3"
            style={{
                width: 'fit-content',
                margin: 'auto'
            }}
        >
            
            <motion.img 
                src='/images/lobo-o1.svg' 
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
            <Divider type='vertical' />
            <Typography.Text strong>
                Chức năng đang được cập nhật, hãy chờ đón nó trong tương lai nhé!
            </Typography.Text>
            <Divider type='vertical' />
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
        </div>
    )
}

export default Explore;