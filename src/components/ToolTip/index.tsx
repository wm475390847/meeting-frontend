import { Button, Tooltip } from 'antd';
import React from 'react';
import styles from './index.module.less'

type ToolTipProps = {
    buttonText?: string
    linkText: string
    isWindowOpen?: boolean
}

const ToolTipModal: React.FC<ToolTipProps> = (props) => {
    const { linkText: text, isWindowOpen, buttonText: buttonContent } = props

    return (
        <Tooltip overlayClassName={styles.tooltip}
            title={text}
            color={'#2db7f5'}
            placement={"topLeft"}
        >
            {
                isWindowOpen === true ?
                    <Button
                        style={{ padding: '0' }}
                        key={text}
                        type='link'
                        onClick={() => window.open(text)}
                    >
                        {buttonContent}
                    </Button>
                    :
                    <span> {buttonContent}</span>
            }
        </Tooltip >
    );
};

export default ToolTipModal;