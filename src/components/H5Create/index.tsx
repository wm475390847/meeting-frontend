import { createH5 } from "@/services";
import { Button, Modal, Form, Space, DatePicker, Input, message } from "antd";
import moment from "moment";
import { useState } from "react";
import styles from './index.module.less'

type CreateH5ModalProps = {
    visible: boolean
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateH5Modal: React.FC<CreateH5ModalProps> = (props) => {
    const [form] = Form.useForm()
    const { visible, onCancel, setLoading } = (props)
    const [buttonLoading, setButtonLoading] = useState(false)
    const RangePicker: any = DatePicker.RangePicker;
    const [startTime, setStartTime] = useState<number>()
    const [endTime, setEndTime] = useState<number>()

    const handleCancel = () => {
        onCancel && onCancel()
    }

    const onChange = (value: string) => {
        if (!Array.isArray(value)) {
            setStartTime(undefined)
            setEndTime(undefined)
            return
        }
        setStartTime(moment(value[0]).valueOf())
        setEndTime(moment(value[1]).valueOf())
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            createH5({ ...values, meetingStartTime: startTime, meetingEndTime: endTime }).then(res => {
                if (res.success) {
                    message.success(res.message)
                    setLoading(true)
                    handleCancel()
                }
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtonLoading(false))
        })
    }

    return (
        <Modal
            visible={visible}
            title="创建H5"
            onCancel={handleCancel}
            footer={<Button loading={buttonLoading} type='primary' onClick={onSubmit}>确定</Button>}
            destroyOnClose
            width={500}
        >
            <Form
                preserve={false}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15, offset: 1 }}
                form={form}
            >
                <Form.Item name='meetingName' label="会议名称" >
                    <Input className={styles.input} placeholder='请输入会议名称' />
                </Form.Item>

                <Form.Item name='meetingStartTime' label="会议时间">
                    <Space
                        className={styles.space}
                        direction="vertical"
                        size={12}
                    >
                        <RangePicker onChange={onChange} />
                    </Space>
                </Form.Item>

                <Form.Item name='h5Name' label="H5名称" rules={[{ required: true, message: 'H5名称不能为空' }]}>
                    <Input className={styles.input} placeholder='请输入H5名称' />
                </Form.Item>

                <Form.Item name='h5Url' label="H5Url" rules={[{ required: true, message: 'H5Url不能为空' }]}>
                    <Input className={styles.input} placeholder='请输入H5Url' />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default CreateH5Modal