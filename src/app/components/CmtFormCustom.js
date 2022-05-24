import { useState } from 'react';
import { Input,Button, Dropdown, Form, } from 'antd';
import { SmileOutlined } from '@ant-design/icons'
import EmojiPickerCustom from './EmojiPickerCustom';



function CmtFormCustom(props){
    const {
        commentRef, idPost, 
        inputCommentRef, 
        handlePushComment,
    } = props;

    const [form] = Form.useForm();

    const [inputCmt, setInputCmt] = useState(null);
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
            ref={commentRef}
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
                        ref={inputCommentRef} 
                        id='comment' 
                        placeholder='Nhập bình luận...'
                        onChange={onchange}
                        value={inputCmt}
                        autoSize={{minRows: 1, maxRows: 4}}
                        onPressEnter={handlePressEnter}
                    />
                </Form.Item>
            </Form>

            {/* <Button 
                key={`comment-button-${idPost}`}
                className='btn-black btn-send-comment' 
                onClick={handleInputCmt}
                icon={<SendOutlined 
                    style={{color: 'white'}} 
                />} 
            /> */}
        </div>
    );
}

export default CmtFormCustom;