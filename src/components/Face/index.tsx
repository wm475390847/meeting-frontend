import { createFace, updateFace } from "@/services";
import { Button, Modal, Form, Input, message, Select, InputNumber } from "antd";
import { useEffect, useState } from "react";
import UploadImgModule from "../UploadImg";
import styles from './index.module.less'

type FaceModuleProps = {
    face?: Face
    type: number
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FaceModule: React.FC<FaceModuleProps> = (props) => {
    const { Option } = Select;
    const [form] = Form.useForm()
    const { type, face, onCancel, setLoading } = (props)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [open, setOpen] = useState<boolean>(false)
    const [faceResult, setFaceResult] = useState<FaceResult>()
    const [faceUrl, setFaceUrl] = useState<string>()

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            if (type === 1) {
                setButtonLoading(true)
                if (faceUrl == null) {
                    message.error('人像不能为空')
                    setButtonLoading(false)
                    return
                }
                createFace({
                    miceId: values.miceId,
                    faceUrl: faceUrl as string,
                    faceDesc: values.faceDesc,
                    env: values.env,
                    account: values.account,
                    password: values.password
                })
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
                // 这里有异步执行，所以先存一份本地再使用
                const temp = {
                    ...faceResult,
                    imageNum: values.imageNum as number,
                    total: values.total as number,
                    videoNum: values.videoNum as number,
                }
                setFaceResult(temp)
                // 判断id为空就报错
                if (!face?.id) {
                    message.error("id为空")
                    setButtonLoading(false)
                    return
                }
                updateFace({
                    id: face.id,
                    resultData: face.resultData,
                    metaData: JSON.stringify(temp),
                    faceUrl: faceUrl,
                    faceDesc: values.faceDesc,
                    miceId: values.miceId,
                    env: values.env == null ? 0 : 1,
                    account: values.account,
                    password: values.password
                })
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

    const handkleGetValue = () => {
        const metaData = face?.metaData
        setFaceResult(metaData && JSON.parse(metaData))
    }

    useEffect(() => {
        type && setOpen(true)
        handkleGetValue()
    }, [type])

    useEffect(() => {
        if (open && type === 2 && face) {
            setTimeout(() => {
                form.setFieldsValue({
                    miceId: face?.miceUrl.split(':')[2],
                    faceUrl: face.faceUrl,
                    faceDesc: face.faceDesc,
                    account: face.account,
                    env: face.env,
                    password: face.password,
                    total: faceResult ? faceResult.total : 0,
                    videoNum: faceResult ? faceResult.videoNum : 0,
                    imageNum: faceResult ? faceResult.imageNum : 0,

                })
            }, 500);
        }
    }, [open])

    return (
        <Modal
            title={`${type === 1 ? '创建人脸信息' : type === 2 ? '修改人俩信息' : ''}`}
            open={open}
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
                <div>
                    <Form.Item name='miceId' key={'miceId'} label="miceId" rules={[{ required: true, message: 'miceId不能为空' }]}>
                        <Input placeholder='请输入miceId' />
                    </Form.Item>
                    <Form.Item name='faceUrl' key={'faceUrl'} label="人像">
                        <UploadImgModule currentImgUrl={face?.faceUrl} onUploadSuccess={faceUrl => setFaceUrl(faceUrl)} />
                    </Form.Item>
                    <Form.Item name='faceDesc' key={'faceDesc'} label='备注信息'>
                        <Input placeholder='请输入备注信息' />
                    </Form.Item>
                    <Form.Item name={'env'} key={'env'} label='环境' initialValue={0}>
                        <Select className={styles.select}>
                            <Option value={0}>测试</Option>
                            <Option value={1}>生产</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name='account' key={'account'} label="metaos账号" rules={[{ required: true, message: '账号不能为空' }]}>
                        <Input placeholder='请输入账号' />
                    </Form.Item>
                    <Form.Item name='password' key={'password'} label="metaos密码" rules={[{ required: true, message: '密码不能为空' }]}>
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                </div>

                {type === 2 &&
                    <div>
                        <Form.Item name='total' label="原始素材数" rules={[{ required: true, message: '原始素材数不能为空' }]}>
                            <InputNumber min={0} className={styles.input} />
                        </Form.Item>
                        <Form.Item name='videoNum' label="原始视频数" rules={[{ required: true, message: '原始视频数不能为空' }]}>
                            <InputNumber min={0} className={styles.input} />
                        </Form.Item>
                        <Form.Item name='imageNum' label="原始图片数" rules={[{ required: true, message: '原始图片数不能为空' }]}>
                            <InputNumber min={0} className={styles.input} />
                        </Form.Item>
                    </div>
                }
            </Form>
        </Modal >
    );
}

export default FaceModule