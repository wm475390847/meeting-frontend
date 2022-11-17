import { createFace } from "@/services/face";
import { Button, Modal, Form, DatePicker, Input, message } from "antd";
import { useState } from "react";
import styles from './index.module.less'

type FaceCreateProps = {
    visible: boolean
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FaceCreateModal: React.FC<FaceCreateProps> = (props) => {
    const [form] = Form.useForm()
    const { visible, onCancel, setLoading } = (props)
    const [buttonLoading, setButtonLoading] = useState(false)
    const RangePicker: any = DatePicker.RangePicker;

    /**
     * 关闭弹窗&清空组件所都数据
     */
    const handleCancel = () => {
        onCancel && onCancel()
    }

    /**
     * 时间框组件变化的值获取
     * @param value 值
     */
    const onChange = (value: string) => {

    }

    /**
     * 提交
     */
    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            createFace({ ...values })
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

    return (
        <Modal
            visible={visible}
            title="创建人脸识别"
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
                <Form.Item name='faceUrl' label="人脸地址" required>
                    <Input className={styles.input} placeholder='请输入人脸「OSS」地址' />
                </Form.Item>

                <Form.Item name='miceId' label="专题id" required>
                    <Input className={styles.input} placeholder='请输入专题id' />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default FaceCreateModal