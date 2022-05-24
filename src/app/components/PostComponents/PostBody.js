import { useState } from 'react';
import { 
//     Carousel, 
    Button
} from 'antd';
import Carousel from "framer-motion-carousel";
import { 
    LazyLoadImage 
} from 'react-lazy-load-image-component';
import { 
    FileImageFilled
} from '@ant-design/icons';


function PostBody(props){
    const {post, handleShowImages} = props;
    return (
        <>
            <div className='post-body__content'>
                <p>{post.contents}</p>
            </div>    
            <div 
                className='mt-2' 
                style={{position: 'relative'}}
            >
                {/* <Carousel 
                    className='mt-2' 
                    dotPosition={'bottom'} 
                    effect='fade'
                >
                    {post.pathImages.map((path, index) => {
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
                </Carousel> */}
                

                <div className='show-for-desktop center-image-carousel'>
                    {
                        post.pathImages.length > 1 
                        ? <Carousel
                            autoPlay={false}
                        >
                            {post.pathImages.map((path, index) => {
                                return (
                                    <div 
                                        key={index} 
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
                        : <LazyLoadImage
                            src={post.pathImages[0]}
                            style={{
                                width: "100%",
                                display: "block",
                                marginBottom: "0px"
                            }}
                            alt=""
                            effect="black-and-white"
                            onClick={handleShowImages}
                        />
                    }
                </div>

                <div className='show-for-mobile'>
                    {
                        post.pathImages.length > 1 
                        && 
                        <div className="float-count-image">
                            <Button  
                                shape='circle' 
                                icon={
                                    <FileImageFilled />
                                } 
                                onClick={handleShowImages}
                            >{post.pathImages.length}</Button>
                        </div>
                    }

                    <LazyLoadImage
                        src={post.pathImages[0]}
                        style={{
                            width: "100%",
                            display: "block",
                            marginBottom: "0px"
                        }}
                        alt=""
                        effect="black-and-white"
                        onClick={handleShowImages}
                    />
                </div> 
            </div>                
        </>
    );
}

export default PostBody;