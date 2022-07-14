import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-cloud9_night";
import "ace-builds/src-noconflict/ext-language_tools";


import styles from './index.module.less'

type CommonCaseReasonModalComponentsProps = {
  reason?: string
  onCancel?: () => void
}

const CommonCasseReasonModal: React.FC<CommonCaseReasonModalComponentsProps> = (props) => {
  const { reason, onCancel } = props
  const [visible, setVisible] = useState(false)
  const [split, setSplit] = useState<string[]>([])

  /**
   * 关闭弹窗，父组件传入onCancel(setVisible=false)
   */
  const handleCancel = () => {
    setVisible(false)
    onCancel && onCancel()
  }

  useEffect(() => {
    reason && setVisible(true)
  }, [reason])

  useEffect(() => {
    if (visible) {
      console.log(document.querySelector('.ant-modal-body'))
    }
  }, [visible])

  const onChange = () => {
  }

  return (
    <>
      <Modal className={styles.modal}
        title="详细信息"
        visible={visible}
        footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
        onCancel={handleCancel}
        destroyOnClose
        width={1000}
      >
        <AceEditor
          width={'900px'}
          height='600px'
          mode={'sh'}
          theme='cloud9_night'
          placeholder={''}
          onChange={onChange}
          name={'ace-editor'}
          readOnly={true}
          value={reason}
          editorProps={{ $blockScrolling: true }}
          fontSize='14px'
          showGutter={true}
          highlightActiveLine={true}
          showPrintMargin={false}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false
          }}
        />
      </Modal >
    </>
  );
};

export default CommonCasseReasonModal;