import { createFace, getOssConfig } from "@/services";
import { Button, Modal, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import UploadImgModule from "../ImageUpload";
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
    const [url, setUrl] = useState<string>()

    const handleCancel = () => {
        onCancel && onCancel()
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            createFace({
                faceDesc: values.faceDesc,
                miceId: values.miceId,
                faceUrl: url as string,
            })
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
        getOssConfig({ business: 'face' })
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
                <Form.Item key={'miceId'} label="专题id" rules={[{ required: true, message: '专题id不能为空' }]}>
                    <Input className={styles.input} placeholder='请输入专题id' />
                </Form.Item>
                <Form.Item key={'faceUrl'} label="人脸">
                    <UploadImgModule ossConfig={ossConfig} onUploadSuccess={url => setUrl(url)} />
                </Form.Item>
                <Form.Item key={'faceDesc'} label='备注信息'>
                    <Input className={styles.input} placeholder='请输入备注信息' />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default CreateFaceModule