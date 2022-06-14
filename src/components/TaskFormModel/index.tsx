import { Button, Collapse, Modal, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less'
import TaskReportTable from '../../routes/report';

type TaskReportMoalComponentsProps = {
  taskInfo?: TaskInfo
  onCancel?: () => void
}

const TaskReportModal: React.FC<TaskReportMoalComponentsProps> = (props) => {
  const { taskInfo, onCancel } = props
  const { Panel } = Collapse;
  const [visible, setVisible] = useState(false)

  const onChange = (key: string | string[]) => {

  };

  /**
   * 关闭弹窗
   */
  const handleCancel = () => {
    setVisible(false)
    onCancel && onCancel()
  }

  useEffect(() => {
    if (!taskInfo) {
      return
    }
    setVisible(true)
  }, [taskInfo])

  return (
    <>
      <Modal
        visible={visible}
        className={styles.modal}
        title="用例执行记录"
        onCancel={handleCancel}
        footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
        destroyOnClose
      >
        <Collapse className={styles.collapse} destroyInactivePanel={true} defaultActiveKey={['1']} onChange={onChange} bordered={true}>
          {/* <div > */}
            <Panel header="成功" key="1">
              <TaskReportTable
                taskId={taskInfo?.id as number}
                caseResult={1}
              />

            </Panel>
            <Panel header="失败" key="2">
              <TaskReportTable
                taskId={taskInfo?.id as number}
                caseResult={2}
              />
            </Panel>

            <Panel header="未执行" key="3">
              <TaskReportTable
                taskId={taskInfo?.id as number}
                caseResult={3}
              />
            </Panel>
          {/* </div> */}

        </Collapse>
      </Modal >
    </>
  );
};

export default TaskReportModal;