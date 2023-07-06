import {getTaskResultPercent} from "@/services";
import {Collapse, Divider, Form, message, Modal} from "antd";
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
            width={1200}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose
        >
            <div className={styles.form}>
                <Form.Item className={`${styles.formItem} ${styles.total}`} label="总数">
                    {resultPercent?.total}
                </Form.Item>
                <Form.Item className={`${styles.formItem} ${styles.success}`} label="成功">
                    {resultPercent?.success}
                </Form.Item>
                <Form.Item className={`${styles.formItem} ${styles.fail}`} label="失败">
                    {resultPercent ? resultPercent.total - resultPercent.success : 0}
                </Form.Item>
                <Form.Item className={`${styles.formItem} ${styles.total}`} label="成功率">
                    {resultPercent?.percent as number * 100}%
                </Form.Item>
            </div>
            <Divider/>
            < Collapse ghost destroyInactivePanel={true} onChange={onChange}
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