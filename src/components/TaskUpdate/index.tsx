import { Button, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import UpdateTaskTableModal from "../TaskUpdateTable";
import styles from './index.module.less'

type UpdateTaskModalProps = {
    taskInfo?: TaskInfo
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = (props) => {
    const { onCancel, taskInfo } = (props)
    const [visible, setVisible] = useState(true)
    const [searchInfo, setSearchInfo] = useState<string>()
    const [buttonLoading, setButtongLoading] = useState(false)

    const onChange = (value: any) => {
        console.log(value);
    };

    const handleCancel = () => {
        setVisible(false)
        setSearchInfo(undefined)
        onCancel && onCancel()
    }

    // const onSubmit = () => {
    //     form.validateFields().then(values => {
    //         setButtonLoading(true)
    //         updateH5({ ...values, meetingStartTime: startTime, meetingEndTime: endTime, id: updateH5Data!.id })
    //             .then(res => {
    //                 if (res.success) {
    //                     message.success(res.message)
    //                     setLoading(true)
    //                     handleCancel()
    //                 }
    //             }).catch(err => {
    //                 message.error(err.message)
    //             }).finally(() => setButtonLoading(false))
    //     })
    // }

    useEffect(() => {
        taskInfo && setVisible(true)
    }, [taskInfo])

    return (
        <Modal
            title="编辑任务"
            visible={visible}
            className={styles.modal}
            onCancel={handleCancel}
            footer={<Button loading={buttonLoading} type='primary' onClick={undefined}>确定</Button>}
            destroyOnClose
            width={500}
        >
            <Form.Item name='taskName' label="任务名称" initialValue={taskInfo?.taskName} rules={[{ required: true, message: '任务名称不能为空' }]}>
                <Input className={styles.input} />
            </Form.Item>
            <Form.Item name='cron' label="定时时间" initialValue={taskInfo?.cron} rules={[{ required: true, message: '定时不能为空' }]}>
                <Input className={styles.input} />
            </Form.Item>
            {/* <Form.Item name='h5Ids' label='包含页面' rules={[{ required: true, message: '任务不能为空' }]}>
                {taskInfo?.id && <UpdateTaskTableModule taskId={taskInfo.id} />}
            </Form.Item> */}
        </Modal>
    );
}

export default UpdateTaskModal