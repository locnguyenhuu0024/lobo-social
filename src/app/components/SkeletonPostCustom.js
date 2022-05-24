import { Skeleton, Divider } from 'antd';
function SkeletonPostCustom() {
    return (
        <>
            <div className='post mt-3' style={{maxWidth: '580px', margin: 'auto'}}>
                <div className='post-header'>
                    <div className='post-header__left'>
                        <Skeleton.Avatar active={true} size={40} />
                        <div className='post-info'>
                            <Skeleton.Input active={true} style={{height: 22, width: 200, marginBottom: '4px'}} />
                            <Skeleton.Input active={true} style={{height: 18}} />
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <Divider className='m-0' style={{border: '0.5px #d4d4d4 solid'}}></Divider>
                </div>
                <div className='post-body'>
                    <div className='post-body__content'>
                        <Skeleton.Input active={true} style={{height: 17, width: 200}} />
                    </div>
                    <Skeleton.Image active={true} style={{height: '280px'}} />
                </div>
            </div>

            <div className='post mt-3' style={{maxWidth: '580px', margin: 'auto'}}>
                <div className='post-header'>
                    <div className='post-header__left'>
                        <Skeleton.Avatar active={true} size={40} />
                        <div className='post-info'>
                            <Skeleton.Input active={true} style={{height: 22, width: 200, marginBottom: '4px'}} />
                            <Skeleton.Input active={true} style={{height: 18}} />
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <Divider className='m-0' style={{border: '0.5px #d4d4d4 solid'}}></Divider>
                </div>
                <div className='post-body'>
                    <div className='post-body__content'>
                        <Skeleton.Input active={true} style={{height: 17, width: 200}} />
                    </div>
                    <Skeleton.Image active={true} style={{height: '280px'}} />
                </div>
            </div>

            <div className='post mt-3' style={{maxWidth: '580px', margin: 'auto'}}>
                <div className='post-header'>
                    <div className='post-header__left'>
                        <Skeleton.Avatar active={true} size={40} />
                        <div className='post-info'>
                            <Skeleton.Input active={true} style={{height: 22, width: 200, marginBottom: '4px'}} />
                            <Skeleton.Input active={true} style={{height: 18}} />
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <Divider className='m-0' style={{border: '0.5px #d4d4d4 solid'}}></Divider>
                </div>
                
                <div className='post-body'>
                    <div className='post-body__content'>
                        <Skeleton.Input active={true} style={{height: 17, width: 200}} />
                    </div>
                    <Skeleton.Image active={true} style={{height: '280px'}} />
                </div>

                <div className='post-footer'>
                    <div className='post-footer__actions'>
                        <Skeleton.Input active={true} style={{height: 40}} />
                    </div>
                    <div className='post-footer__liked mt-2'>
                        <Skeleton.Input active={true} style={{height: 24}} />
                        <div>
                            <Skeleton.Input active={true} style={{height: 18}} />
                        </div>
                    </div>
                    <div className='post-footer__comments mt-2'>
                        <Skeleton.Input active={true} style={{height: 18}} />
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default SkeletonPostCustom;