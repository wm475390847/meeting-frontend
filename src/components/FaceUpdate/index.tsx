import { updateFace } from "@/services/face";
import { Button, Modal, Form, Input, message, InputNumber } from "antd";
import { useEffect, useState } from "react";
import styles from './index.module.less'

type UpdateFaceProps = {
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    faceDataSwitch?: FaceDataSwitch
}

const UpdateFaceModal: React.FC<UpdateFaceProps> = (props) => {
    const { onCancel, setLoading, faceDataSwitch } = (props)
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [faceResult, setFaceResult] = useState<FaceResult>()

    /**
     * 关闭弹窗&清空组件所都数据
     */
    const handleCancel = () => {
        setVisible(false)
        onCancel && onCancel()
    }

    /**
     * 解析string的返回值为json
     * @returns 
     */
    const getValue = () => {
        const metaData = faceDataSwitch?.faceData?.metaData
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
            const faceData = faceDataSwitch?.faceData

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
        faceDataSwitch && faceDataSwitch.edit && setVisible(true)
        getValue()
    }, [faceDataSwitch])

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
                <Form.Item name='miceId' label="专题Id" initialValue={faceDataSwitch?.faceData.miceId} required={true}>
                    <Input className={styles.input} />
                </Form.Item>
                <Form.Item name='faceUrl' label="faceUrl" initialValue={faceDataSwitch?.faceData.faceUrl} required>
                    <Input className={styles.input} />
                </Form.Item>
                <Form.Item name='faceDesc' label="faceDesc" initialValue={faceDataSwitch?.faceData.faceDesc} >
                    <Input className={styles.input} />
                </Form.Item>
                <Form.Item name='total' label="原始素材数" initialValue={faceResult?.total} required>
                    <InputNumber min={0} className={styles.input} />
                </Form.Item>
                <Form.Item name='videoNum' label="原始视频数" initialValue={faceResult?.videoNum} required>
                    <InputNumber min={0} className={styles.input} />
                </Form.Item>
                <Form.Item name='imageNum' label="原始图片数" initialValue={faceResult?.imageNum} required>
                    <InputNumber min={0} className={styles.input} />
                </Form.Item>
            </Form>
        </Modal >
    );
}

export default UpdateFaceModal