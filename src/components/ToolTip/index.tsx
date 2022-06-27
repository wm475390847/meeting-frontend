import { Tooltip } from 'antd';
import React, { } from 'react';

type ToolTipModalComponentsProps = {
  text?: string
}

const ToolTipModal: React.FC<ToolTipModalComponentsProps> = (props) => {
  const { text } = props

  return (
    <>
      <Tooltip title={text} color={'#2db7f5'}>
        <span>{text}</span>
      </Tooltip>
    </>
  );
};

export default ToolTipModal;