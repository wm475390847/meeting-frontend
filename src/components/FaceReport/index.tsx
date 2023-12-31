import {getFaceResult} from "@/services";
import {Button, Collapse, Form, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import styles from './index.module.less'

type FaceReportModuleProps = {
    faceInfo?: Face
    onCancel?: () => void
}

const FaceReportModule: React.FC<FaceReportModuleProps> = (props) => {
    const {onCancel, faceInfo} = props
    const [open, setOpen] = useState(true)
    const [faceResult, setFaceResult] = useState<FaceReport>()
    const {Panel} = Collapse

    const onChange = (key: string | string[]) => {
        console.log(key)
    };

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const handleResult = () => {
        getFaceResult(faceInfo?.id as number)
            .then(rep => setFaceResult(rep.data))
            .catch(err => message.error(err.message))
    }

    const handleArrayParse = (array1: string[], array2: string[]) => {
        let a = array1?.join(', ')
        let b = array2?.join(', ')
        return a && b ? a + ", " + b : a ? a : b ? b : null
    }

    useEffect(() => {
        faceInfo && setOpen(true)
    }, [faceInfo])

    useEffect(() => {
        open && handleResult()
    }, [open])

    return (
        <Modal
            open={open}
            className={styles.modal}
            title="识别结果"
            onCancel={handleCancel}
            footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
            destroyOnClose
        >
            <div className={styles.formItem}>
                <Form.Item className={styles.inlineFormItem} label="基准总数">
                    {faceResult?.oldResult?.total}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="基准视频数量">
                    {faceResult?.oldResult?.videoNum}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="基准图片数量">
                    {faceResult?.oldResult?.imageNum}
                </Form.Item>
            </div>
            <div className={styles.formItem}>
                <Form.Item className={styles.inlineFormItem} label="实际总数">
                    {faceResult?.newResult?.total}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="实际视频数量">
                    {faceResult?.newResult?.videoNum}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="实际图片数量">
                    {faceResult?.newResult?.imageNum}
                </Form.Item>
            </div>
            < Collapse className={styles.collapse} ghost destroyInactivePanel={true} defaultActiveKey={['1']} onChange={onChange} bordered={true} >
                <Panel header='素材' key='1' >
                    <Form.Item label={'基础媒资id'}>
                        {handleArrayParse(faceResult?.oldResult?.imageIdList as string[], faceResult?.oldResult?.videoIdList as string[])}
                    </Form.Item>

                    <Form.Item label={'实际媒资id'}>
                        {handleArrayParse(faceResult?.newResult?.imageIdList as string[], faceResult?.newResult?.videoIdList as string[])}
                    </Form.Item>
                    <Form.Item label={'diff媒资id'}>
                        {handleArrayParse(faceResult?.imageDiffList as string[], faceResult?.videoDiffList as string[])}
                    </Form.Item>
                </Panel>
                <Panel header='合成时长' key='2'>
                    {'请等二期'}
                </Panel>
            </Collapse >
        </Modal >
    )
}

export default FaceReportModule