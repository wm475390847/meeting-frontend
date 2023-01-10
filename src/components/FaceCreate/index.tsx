import { createFace } from "@/services";
import { Button, Modal, Form, Input, message, Select } from "antd";
import { useState } from "react";
import UploadImgModule from "../ImageUpload";

type CreateFaceModuleProps = {
    visible: boolean
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateFaceModule: React.FC<CreateFaceModuleProps> = (props) => {
    const { Option } = Select;
    const [form] = Form.useForm()
    const { visible, onCancel, setLoading } = (props)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [url, setUrl] = useState<string>()

    const handleCancel = () => {
        onCancel && onCancel()
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            console.log(values);
            if (url == null) {
                message.error('人像不能为空')
                setButtonLoading(false)
                return
            }
            createFace({
                miceId: values.miceId,
                faceUrl: url as string,
                faceDesc: values.faceDesc,
                env: values.env == null ? 0 : 1,
                account: values.account,
                password: window.md5(values.password)
            }).then(res => {
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
                <Form.Item name={'miceId'} key={'miceId'} label="miceId" rules={[{ required: true, message: 'miceId不能为空' }]}>
                    <Input placeholder='请输入miceId' />
                </Form.Item>
                <Form.Item name={'faceUrl'} key={'faceUrl'} label="人像">
                    <UploadImgModule onUploadSuccess={url => setUrl(url)} />
                </Form.Item>
                <Form.Item name={'faceDesc'} key={'faceDesc'} label='备注信息'>
                    <Input placeholder='请输入备注信息' />
                </Form.Item>
                <Form.Item name={'env'} key={'env'} label='环境'>
                    <Select defaultValue='测试'>
                        <Option value={0}>测试</Option>
                        <Option value={1}>生产</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'account'} key={'account'} label="metaos账号" rules={[{ required: true, message: '账号不能为空' }]}>
                    <Input placeholder='请输入账号' />
                </Form.Item>
                <Form.Item name={'password'} key={'password'} label="metaos密码" rules={[{ required: true, message: '密码不能为空' }]}>
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default CreateFaceModule