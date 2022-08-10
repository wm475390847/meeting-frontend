import { Button, Tooltip } from 'antd';
import React from 'react';
import styles from './index.module.less'

type ToolTipProps = {
    text: string
    isWindowOpen?: boolean
}

const ToolTipModal: React.FC<ToolTipProps> = (props) => {
    const { text, isWindowOpen } = props

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
                        {text}
                    </Button>
                    :
                    <span> {text}</span>
            }
        </Tooltip >
    );
};

export default ToolTipModal;