import { updateH5 } from "@/services";
import { Button, Modal, Form, Space, DatePicker, Input, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from './index.module.less'

type UpdateH5ModuleProps = {
    h5Info?: H5Info
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateH5Module: React.FC<UpdateH5ModuleProps> = (props) => {
    const { onCancel, setLoading, h5Info } = (props)
    const RangePicker: any = DatePicker.RangePicker;
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [startTime, setStartTime] = useState<number>()
    const [endTime, setEndTime] = useState<number>()
    const [visible, setVisible] = useState(false)

    const handleCancel = () => {
        setVisible(false)
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
            updateH5({ ...values, meetingStartTime: startTime, meetingEndTime: endTime, id: h5Info!.id })
                .then(res => {
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

    useEffect(() => {
        h5Info && setVisible(true)
    }, [h5Info])

    return (
        <Modal
            title="编辑H5"
            visible={visible}
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
                <Form.Item name='meetingName' label="会议名称" initialValue={h5Info?.meetingName}>
                    <Input className={styles.input} />
                </Form.Item>

                <Form.Item name='meetingStartTime' label="会议时间">
                    <Space className={styles.space} direction="vertical" size={12}>
                        <RangePicker onChange={onChange} />
                    </Space>
                </Form.Item>

                <Form.Item name='h5Name' label="H5名称" initialValue={h5Info?.h5Name} required>
                    <Input className={styles.input} />
                </Form.Item>

                <Form.Item name='h5Url' label="H5Url" initialValue={h5Info?.h5Url} required>
                    <Input className={styles.input} />
                </Form.Item>

            </Form>
        </Modal >
    );
}

export default UpdateH5Module