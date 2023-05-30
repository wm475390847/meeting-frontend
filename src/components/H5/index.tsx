import { createH5, updateH5 } from "@/services";
import { Button, Modal, Form, Space, DatePicker, Input, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import styles from './index.module.less'
import { values } from "lodash";

type H5ModuleProps = {
    type: number
    h5Info?: H5
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const H5Module: React.FC<H5ModuleProps> = (props) => {
    const [form] = Form.useForm()
    const { type, h5Info, onCancel, setLoading } = (props)
    const [open, setOpen] = useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const RangePicker: any = DatePicker.RangePicker;
    const [startTime, setStartTime] = useState<number>()
    const [endTime, setEndTime] = useState<number>()

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    // const handleGetMeetingTime = (value: string) => {
    //     if (!Array.isArray(value)) {
    //         setStartTime(undefined)
    //         setEndTime(undefined)
    //         return
    //     }
    //     setStartTime(moment(value[0]).valueOf())
    //     setEndTime(moment(value[1]).valueOf())
    // }

    const handleGetMeetingTime = (value: string) => {
        console.log(value);

        const [start, end] = value || [];
        setStartTime(start ? moment(start).valueOf() : undefined);
        setEndTime(end ? moment(end).valueOf() : undefined);
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            if (type === 1) {
                setButtonLoading(true)
                createH5({ ...values, meetingStartTime: startTime, meetingEndTime: endTime })
                    .then(res => {
                        if (res.success) {
                            message.success(res.message)
                            setLoading(true)
                            handleCancel()
                        }
                    })
                    .catch(err => message.error(err.message))
                    .finally(() => setButtonLoading(false))
            }
            if (type === 2) {
                setButtonLoading(true)
                updateH5({ ...values, meetingStartTime: startTime, meetingEndTime: endTime, id: h5Info!.id })
                    .then(res => {
                        if (res.success) {
                            message.success(res.message)
                            setLoading(true)
                            handleCancel()
                        }
                    })
                    .catch(err => message.error(err.message))
                    .finally(() => setButtonLoading(false))
            }
        })
    }

    useEffect(() => {
        type && setOpen(true)
    }, [type])

    useEffect(() => {
        if (open && type === 2 && h5Info) {
            setTimeout(() => {
                form.setFieldsValue({
                    meetingName: h5Info.meetingName,
                    meetingTime: [
                        moment(h5Info.meetingStartTime).toISOString,
                        moment(h5Info.meetingEndTime).toISOString
                    ],
                    h5Name: h5Info.h5Name,
                    h5Url: h5Info.h5Url,
                })
            }, 500);
        }
    }, [open])

    return (
        <Modal
            open={open}
            title={`${type === 1 ? '创建H5' : type === 2 ? '编辑H5' : ''}`}
            onCancel={handleCancel}
            footer={<Button loading={buttonLoading} type='primary' onClick={onSubmit}>确定</Button>}
            destroyOnClose
            width={500}
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16, offset: 1 }}
                form={form}
                preserve={false}
                className={styles.form}
            >
                <Form.Item name='meetingName' label="会议名称" rules={[{ required: true, message: '会议名称不能为空' }]} >
                    <Input placeholder='请输入会议名称' />
                </Form.Item>

                <Form.Item name='meetingTime' label="会议时间" >
                    <Space
                        direction="vertical"
                        size={12}
                    >
                        <RangePicker onChange={handleGetMeetingTime} />
                    </Space>
                </Form.Item>

                <Form.Item name='h5Name' label="H5名称" rules={[{ required: true, message: 'H5名称不能为空' }]}>
                    <Input placeholder='请输入H5名称' />
                </Form.Item>

                <Form.Item name='h5Url' label="H5Url" rules={[{ required: true, message: 'H5Url不能为空' }]}>
                    <Input placeholder='请输入H5Url' />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default H5Module