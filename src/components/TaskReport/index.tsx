import {getTaskResultPercent} from "@/services";
import {Button, Collapse, Form, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import TaskReportTableModule from "../TaskReportTable";
import styles from './index.module.less'

type TaskReportModalProps = {
    taskInfo?: Task
    onCancel?: () => void
}

const TaskReportModal: React.FC<TaskReportModalProps> = (props) => {
    const {onCancel, taskInfo} = props
    const {Panel} = Collapse
    const [open, setOpen] = useState(true)
    const [resultPercent, setResultPercent] = useState<ResultPercent>()

    const onChange = (key: string | string[]) => {
        console.log(key)
    };

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const handleGetPercent = () => {
        getTaskResultPercent(taskInfo?.id as number)
            .then(rep => setResultPercent(rep.data))
            .catch(err => message.error(err.message))
    }

    useEffect(() => {
        taskInfo && setOpen(true)
    }, [taskInfo])

    useEffect(() => {
        open && handleGetPercent()
    }, [open])

    return (
        <Modal
            title="执行结果"
            open={open}
            className={styles.modal}
            onCancel={handleCancel}
            footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
            destroyOnClose
        >
            <div className={styles.formItem}>
                <Form.Item className={styles.inlineFormItem} label="总数">
                    {resultPercent?.total}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="成功">
                    {resultPercent?.success}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="失败">
                    {resultPercent ? resultPercent.total - resultPercent.success : 0}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="成功率">
                    {resultPercent?.percent as number * 100}%
                </Form.Item>
            </div>


            < Collapse className={styles.collapse} ghost destroyInactivePanel={true} onChange={onChange}
                       bordered={true}>
                {
                    resultPercent && resultPercent.total - resultPercent.success != 0 &&
                    <Panel header='失败' key='2'>
                        <TaskReportTableModule result={false} taskId={taskInfo?.id as number}/>
                    </Panel>
                }
                {
                    resultPercent && resultPercent.success != 0 &&
                    <Panel header='成功' key='1'>
                        <TaskReportTableModule result={true} taskId={taskInfo?.id as number}/>
                    </Panel>
                }
            </Collapse>

        </Modal>
    )
};

export default TaskReportModal;