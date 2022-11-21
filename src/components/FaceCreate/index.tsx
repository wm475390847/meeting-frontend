import { createFace } from "@/services/face";
import { Button, Modal, Form, Input, message } from "antd";
import { useState } from "react";
import styles from './index.module.less'

type CreateFaceModuleProps = {
    visible: boolean
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateFaceModule: React.FC<CreateFaceModuleProps> = (props) => {
    const [form] = Form.useForm()
    const { visible, onCancel, setLoading } = (props)
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleCancel = () => {
        onCancel && onCancel()
    }

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
            title="创建人脸识别"
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
                <Form.Item name='faceUrl' label="人脸地址" rules={[{ required: true, message: 'oss地址不能为空' }]}>
                    <Input className={styles.input} placeholder='请输入人脸「OSS」地址' />
                </Form.Item>
                <Form.Item name='miceId' label="专题id" rules={[{ required: true, message: '专题id不能为空' }]}>
                    <Input className={styles.input} placeholder='请输入专题id' />
                </Form.Item>
                <Form.Item name='faceDesc' label='备注信息'>
                    <Input className={styles.input} placeholder='请输入备注信息' />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default CreateFaceModule