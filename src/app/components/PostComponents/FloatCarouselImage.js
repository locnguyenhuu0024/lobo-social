import { useEffect, useRef } from "react";
import { Button } from "antd";
import {CloseCircleOutlined} from '@ant-design/icons'
import Carousel from "framer-motion-carousel";
import {motion} from 'framer-motion';

function FloatCarouselImages(props){
    const {
        visible, 
        pathImages, 
        handleShowImages
    } = props;
    const refFloat = useRef();

    useEffect(() => {
        const id = setTimeout(() => {
            refFloat.current?.scrollIntoView({
                behavior: 'smooth', 
                block: 'center', 
                inline: 'center'
            });
        }, 100);

        return () => clearTimeout(id);
    }, [visible])
    
    if(visible){
        
        return (
            <motion.div
                className='float-images center-image-carousel'
                ref={refFloat}
                initial={{opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
                transition={{ duration: 0.3 }}
            >
                <Carousel
                    autoPlay={false}
                    renderDots={false}
                >
                    {pathImages.map((path, index) => {
                        return (
                            <div 
                                key={index} 
                                className='wrap-center wrap-image'
                            >
                                <img 
                                    src={path} 
                                    width={'100%'} 
                                    alt='image-post'
                                />
                            </div>
                        )
                    })}
                </Carousel>
                
                <div className="float-exit-button">
                    <Button 
                        shape="circle" 
                        icon={
                            <CloseCircleOutlined size={32} />
                        } 
                        onClick={handleShowImages}
                    />
                </div>
            </motion.div>
        );
    }else{
        return (<></>);
    }
}

export default FloatCarouselImages;