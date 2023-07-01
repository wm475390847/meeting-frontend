import {Button, Modal} from 'antd';
import React, {useEffect, useState} from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python"
import "ace-builds/src-noconflict/theme-cloud9_night";
import "ace-builds/src-noconflict/ext-language_tools";
import styles from './index.module.less'

type TextBoxModuleProps = {
  text?: string
  onCancel?: () => void
}

const TextBoxModule: React.FC<TextBoxModuleProps> = (props) => {
  const {text, onCancel} = props
  const [open, setOpen] = useState(false)

  const handleCancel = () => {
    setOpen(false)
    onCancel && onCancel()
  }

  useEffect(() => {
    text && setOpen(true)
  }, [text])

  useEffect(() => {
    if (open) {
      console.log(document.querySelector('.ant-modal-body'))
    }
  }, [open])

  const onChange = () => {
  }

  return (
    <Modal className={styles.modal}
      title="详细信息"
      open={open}
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
          value={text}
          editorProps={{$blockScrolling: true}}
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
  );
};

export default TextBoxModule;