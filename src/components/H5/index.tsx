import {createH5, updateH5} from "@/services";
import {Button, DatePicker, Form, Input, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import styles from './index.module.less';
import dayjs from 'dayjs';

type PopupModuleProps = {
    type: number
    h5Info?: H5
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupModule: React.FC<PopupModuleProps> = (props) => {
    const [form] = Form.useForm()
    const {type, h5Info, onCancel, setLoading} = (props)
    const [open, setOpen] = useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [startTime, setStartTime] = useState<number>()
    const [endTime, setEndTime] = useState<number>()
    const RangePicker: any = DatePicker.RangePicker;

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const onChangeMeetingTime = (value: string) => {
        const [start, end] = value || [];
        setStartTime(start ? dayjs(start).valueOf() : undefined);
        setEndTime(end ? dayjs(end).valueOf() : undefined);
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            if (type === 1) {
                createH5({...values, meetingStartTime: startTime, meetingEndTime: endTime})
                    .then(res => {
                            message.success(res.message).then(r => r)
                            setLoading(true)
                            handleCancel()
                    })
                    .catch(err => message.error(err.message))
                    .finally(() => setButtonLoading(false))
            }
            if (type === 2) {
                updateH5({ ...values, meetingStartTime: startTime, meetingEndTime: endTime, id: h5Info!.id })
                    .then(res => {
                        message.success(res.message).then(r => r)
                        setLoading(true)
                        handleCancel()
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
                const initialValue =
                    {
                        meetingName: h5Info.meetingName,
                        meetingTime: [
                            dayjs(h5Info.meetingStartTime, 'YYYY-MM-DD'),
                            dayjs(h5Info.meetingEndTime, 'YYYY-MM-DD')
                        ],
                        h5Name: h5Info.h5Name,
                        h5Url: h5Info.h5Url,
                    }
                form.setFieldsValue(initialValue)
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
                labelCol={{span: 5}}
                wrapperCol={{span: 16, offset: 1}}
                form={form}
                preserve={false}
                className={styles.form}
            >
                <Form.Item name='meetingName' label="会议名称" rules={[{required: true, message: '会议名称不能为空'}]}>
                    <Input placeholder='请输入会议名称'/>
                </Form.Item>

                <Form.Item name='meetingTime' label="会议时间">
                    <RangePicker
                        format='YYYY-MM-DD'
                        style={{width: '300px'}}
                        onChange={onChangeMeetingTime}
                    />
                </Form.Item>

                <Form.Item name='h5Name' label="H5名称" rules={[{required: true, message: 'H5名称不能为空'}]}>
                    <Input placeholder='请输入H5名称'/>
                </Form.Item>

                <Form.Item name='h5Url' label="H5Url" rules={[{required: true, message: 'H5Url不能为空'}]}>
                    <Input placeholder='请输入H5Url'/>
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default PopupModule