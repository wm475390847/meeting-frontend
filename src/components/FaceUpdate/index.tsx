import { updateFace } from "@/services";
import { Button, Modal, Form, Input, message, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import UploadImgModal from "../ImageUpload";
import styles from './index.module.less'

type UpdateFaceModalProps = {
    faceInfo?: FaceInfo
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateFaceModal: React.FC<UpdateFaceModalProps> = (props) => {
    const { onCancel, setLoading, faceInfo } = (props)
    const { Option } = Select;
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [faceResult, setFaceResult] = useState<FaceResult>()
    const [url, setUrl] = useState<string>()

    const handleCancel = () => {
        setVisible(false)
        onCancel && onCancel()
    }

    const getValue = () => {
        const metaData = faceInfo?.metaData
        setFaceResult(metaData && JSON.parse(metaData))
    }

    /**
     * 提交
     */
    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            // 这里有异步执行，所以先存一份本地再使用
            const temp = {
                ...faceResult,
                imageNum: values.imageNum as number,
                total: values.total as number,
                videoNum: values.videoNum as number,
            }
            setFaceResult(temp)

            // 判断id为空就报错
            if (!faceInfo?.id) {
                message.error("id为空")
                setButtonLoading(false)
                return
            }
            updateFace({
                id: faceInfo.id,
                resultData: faceInfo.resultData,
                metaData: JSON.stringify(temp),
                faceUrl: url,
                faceDesc: values.faceDesc,
                miceId: values.miceId,
                env: values.env == null ? 0 : 1,
                account: values.account,
                password: values.password
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

    useEffect(() => {
        faceInfo && setVisible(true)
        getValue()
    }, [faceInfo])

    return (
        <Modal
            visible={visible}
            title="编辑信息"
            onCancel={handleCancel}
            footer={<Button loading={buttonLoading} type='primary' onClick={() => onSubmit()}>确定</Button>}
            destroyOnClose
            width={500}
        >
            <Form
                preserve={false}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 15, offset: 1 }}
                form={form}
            >
                <Form.Item name='miceId' label="miceId" initialValue={faceInfo?.miceUrl.split(':')[2]} rules={[{ required: true, message: 'miceId不能为空' }]}>
                    <Input className={styles.input} />
                </Form.Item>
                <Form.Item name={'faceUrl'} key={'faceUrl'} label="人像">
                    <UploadImgModal onUploadSuccess={url => setUrl(url)} />
                </Form.Item>
                <Form.Item name='faceDesc' label="描述" initialValue={faceInfo?.faceDesc} >
                    <Input className={styles.input} />
                </Form.Item>
                <Form.Item name={'env'} key={'env'} label='环境'>
                    <Select defaultValue='测试'>
                        <Option value={0}>测试</Option>
                        <Option value={1}>生产</Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'account'} key={'account'} initialValue={faceInfo?.account} label="metaos账号" rules={[{ required: true, message: '账号不能为空' }]}>
                    <Input placeholder='请输入账号' />
                </Form.Item>
                <Form.Item name={'password'} key={'password'} label="metaos密码">
                    <Input.Password placeholder="请输入密码，无修改可不填" />
                </Form.Item>
                <Form.Item name='total' label="原始素材数" initialValue={faceResult?.total} rules={[{ required: true, message: '原始素材数不能为空' }]}>
                    <InputNumber min={0} className={styles.input} />
                </Form.Item>
                <Form.Item name='videoNum' label="原始视频数" initialValue={faceResult?.videoNum} rules={[{ required: true, message: '原始视频数不能为空' }]}>
                    <InputNumber min={0} className={styles.input} />
                </Form.Item>
                <Form.Item name='imageNum' label="原始图片数" initialValue={faceResult?.imageNum} rules={[{ required: true, message: '原始图片数不能为空' }]}>
                    <InputNumber min={0} className={styles.input} />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default UpdateFaceModal