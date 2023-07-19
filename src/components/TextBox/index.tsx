import {Modal} from 'antd';
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
        open && document.querySelector('.ant-modal-body')
    }, [open])

    return (
        <Modal className={styles.modal}
               title="详细信息"
               open={open}
               footer={null}
               onCancel={handleCancel}
               destroyOnClose
               width={1200}
        >
            <AceEditor
                className={styles.aceEditor}
                width='100%'
                mode={'sh'}
                theme='cloud9_night'
                name={'ace-editor'}
                readOnly={true}
                value={text}
                editorProps={{$blockScrolling: true}}
                fontSize='15px'
                showGutter={true}
                highlightActiveLine={true}
                showPrintMargin={false}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    // overflowX: 'scroll'
                }}
            />
        </Modal>
    );
};

export default TextBoxModule;