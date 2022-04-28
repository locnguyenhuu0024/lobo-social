import {Button} from 'antd';

function ButtonCustom(props){
    const {buttonStyle, handlePost, htmlType, idDisabled} = props;


    return (
        <Button type='default' style={buttonStyle} onClick={handlePost} htmlType={htmlType} disabled={idDisabled}>
            Đăng
        </Button>
    )
}

export default ButtonCustom;