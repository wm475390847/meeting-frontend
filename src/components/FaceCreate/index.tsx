import { createFace, getOssCongfig } from "@/services/face";
import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import UploadImageModule from "../UploadImage";
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
    const [ossConfig, setOssConfig] = useState<OssConfig>();

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

    const fetchOssConfig = () => {
        getOssCongfig('face')
            .then(rep => {
                setOssConfig(rep.data)
            }).catch(err => {
                message.error(err.message)
            })
    }

    useEffect(() => {
        visible && fetchOssConfig()
    }, [visible])

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
                <Form.Item name='miceId' label="专题id" rules={[{ required: true, message: '专题id不能为空' }]}>
                    <Input className={styles.input} placeholder='请输入专题id' />
                </Form.Item>
                <Form.Item name='faceDesc' label='备注信息'>
                    <Input className={styles.input} placeholder='请输入备注信息' />
                </Form.Item>
                <Form.Item name='faceUrl' label="人脸地址" rules={[{ required: true, message: 'oss地址不能为空' }]}>
                    <Input className={styles.input} placeholder='请输入人脸「OSS」地址' />
                    {/* <UploadImageModule ossConfig={ossConfig} /> */}
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default CreateFaceModule