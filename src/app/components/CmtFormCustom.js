import { useState, useEffect, useRef } from 'react';
import { Input,Button, Dropdown, Form, } from 'antd';
import { SmileOutlined } from '@ant-design/icons'
import EmojiPickerCustom from './EmojiPickerCustom';



function CmtFormCustom(props){
    const {
        idPost, 
        handlePushComment, showComment
    } = props;
    const [form] = Form.useForm();
    const [inputCmt, setInputCmt] = useState(null);
    const [currentCmtPost, setCurrentCmtPost] = useState(null)
    const cmtFormRef = useRef();

    useEffect(() => {
        currentCmtPost == null || currentCmtPost == idPost
        ? setCurrentCmtPost(idPost)
        : setCurrentCmtPost(null)
    }, [])

    useEffect(() => {
        //Focus vào ô nhập bình luận
        document.getElementById(`comment-${idPost}`).focus({cursor: 'start'});

        // Cuộn tới khung nhập comment
        document.getElementById(`comment-form-post-${idPost}`).scrollIntoView({
            behavior: 'smooth', 
            block: 'center', 
            inline: 'center'
        });
    }, []);
    const handlePressEnter = (e) => {
        handlePushComment(inputCmt);
        //setInputCmt(null);
        form.resetFields(['comment']);
    }

    const onchange = (e) => setInputCmt(e.target.value)

    const onEmojiClick = (emoji) => {
        setInputCmt(prev => {
            const newContents = prev + emoji.native;
            
            return newContents;
        });
    };

    return (
        <div 
            id={`comment-form-post-${idPost}`} 
            className={`comment-form`}
        >
            <Dropdown
                trigger={['click']}
                overlay={<EmojiPickerCustom 
                    className='emojipicker'
                    onEmojiSelect={onEmojiClick} 
                    theme='light'
                    showPreview={false}
                />}
                placement='bottom'
            >
                <Button 
                    className='emoji-button emoji-button-style'
                    shape='circle' 
                    icon={<SmileOutlined />} 

                /> 
            </Dropdown>

            <Form 
                form={form} 
                style={{
                    width: '100%', 
                    height: 'fit-content !important'
                }}
            >
                <Form.Item 
                    style={{margin: '0px !important', }}
                    name="comment"
                >
                    <Input.TextArea 
                        id={`comment-${idPost}`} 
                        ref={cmtFormRef}
                        placeholder='Nhập bình luận...'
                        onChange={onchange}
                        value={inputCmt}
                        autoSize={{minRows: 1, maxRows: 2}}
                        onPressEnter={handlePressEnter}
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default CmtFormCustom;