import { Tooltip } from 'antd';
import React, { } from 'react';

const ToolTipModal: React.FC<{ text?: string }> = (props) => {
  const { text } = props

  return (
    <Tooltip title={text} color={'#2db7f5'}>
      <span>{text}</span>
    </Tooltip>
  );
};

export default ToolTipModal;