import { Button, Form, Modal } from 'antd';
import { FORMERR } from 'dns';
import React, { useState } from 'react';
import styles from './index.module.less'

type CreateTaskModalComponentsProps = {
  visible: boolean
  onCancel?: () => void
}

const CreateTaskModal: React.FC<CreateTaskModalComponentsProps> = (props) => {
  const { onCancel, visible } = props

  // 关闭弹窗，父组件传入onCancel(setVisible=false)
  const handleCancel = () => {
    onCancel && onCancel()
  }

  return (
    <>
      <Modal className={styles.modal}
        title="请选择一种方式创建"
        visible={visible}
        footer={<Button onClick={() => handleCancel()}>确定</Button>}
        onCancel={handleCancel}
      >
        <p>全场景素材执行任务</p>
        <p>自定义任务</p>
      </Modal>
    </>
  );
};

export default CreateTaskModal;