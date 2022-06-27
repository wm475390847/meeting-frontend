import { Button, Form, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
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
        <Form className={styles.formItem}>{
          reason &&
          reason.split("#").map((item: string) => <div>{item}</div>)
        }
        </Form>
      </Modal >
    </>
  );
};

export default CommonCasseReasonModal;