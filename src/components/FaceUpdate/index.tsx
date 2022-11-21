import { updateFace } from "@/services/face";
import { Button, Modal, Form, Input, message, InputNumber } from "antd";
import { useEffect, useState } from "react";
import styles from './index.module.less'

type UpdateFaceModuleProps = {
    faceInfo?: FaceInfo
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const UpdateFaceModule: React.FC<UpdateFaceModuleProps> = (props) => {
    const { onCancel, setLoading, faceInfo } = (props)
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [visible, setVisible] = useState(true)
    const [faceResult, setFaceResult] = useState<FaceResult>()

    const handleCancel = () => {
        setVisible(false)
        onCancel && onCancel()
    }

    const getValue = () => {
        const metaData = faceInfo?.metaData
        setFaceResult(metaData && JSON.parse(metaData) || {})
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
                videoNum: values.videoNum as number
            }
            setFaceResult(temp)
            const faceData = faceInfo

            // 判断id为空就报错
            if (!faceData?.id) {
                message.error("id为空")
                setButtonLoading(false)
                return
            }

            updateFace({
                id: faceData.id,
                resultData: faceData.resultData,
                metaData: JSON.stringify(temp),
                faceUrl: values.faceUrl,
                faceDesc: values.faceDesc,
                miceId: values.miceId
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
                <Form.Item name='miceId' label="专题Id" initialValue={faceInfo?.miceId} rules={[{ required: true, message: '专题id不能为空' }]}>
                    <Input className={styles.input} />
                </Form.Item>
                <Form.Item name='faceUrl' label="人脸地址" initialValue={faceInfo?.faceUrl} rules={[{ required: true, message: '人脸地址不能为空' }]}>
                    <Input className={styles.input} />
                </Form.Item>
                <Form.Item name='faceDesc' label="描述" initialValue={faceInfo?.faceDesc} >
                    <Input className={styles.input} />
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

export default UpdateFaceModule