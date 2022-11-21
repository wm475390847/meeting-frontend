import { getFaceResult } from "@/services/face";
import { Button, Modal, Form, message, Collapse } from "antd";
import { useEffect, useState } from "react";
import FaceReportTableModule from "../FaceReportTable";
import styles from './index.module.less'

type FaceReportModuleProps = {
    faceInfo?: FaceInfo
    onCancel?: () => void
}

const FaceReportModule: React.FC<FaceReportModuleProps> = (props) => {
    const { onCancel, faceInfo } = props
    const [visible, setVisible] = useState(true)
    const [faceResult, setFaceResult] = useState<FaceReport>()
    const { Panel } = Collapse

    const onChange = (key: string | string[]) => {

    };

    const handleCancel = () => {
        setVisible(false)
        onCancel && onCancel()
    }

    const fetchGetResult = () => {
        getFaceResult(faceInfo?.id as number)
            .then(rep => {
                setFaceResult(rep.data)
            }).catch(err => {
                message.error(err.message)
            })
    }

    const strings2Objects: (v: string[]) => DiffData[] = (data: string[]) => {
        const res: DiffData[] = data?.map(id => {
            return {
                businessId: id
            }
        })
        return res;
    }

    useEffect(() => {
        faceInfo && setVisible(true)
    }, [faceInfo])

    useEffect(() => {
        visible && fetchGetResult()
    }, [visible])

    return (
        <Modal
            visible={visible}
            className={styles.modal}
            title="识别结果"
            onCancel={handleCancel}
            footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
            destroyOnClose
        >
            <div className={styles.formItem}>
                <Form.Item className={styles.inlineFormItem} label="原始总数">
                    {faceResult?.oldResult?.total}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="原始视频数量">
                    {faceResult?.oldResult?.videoNum}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="原始图片数量">
                    {faceResult?.oldResult?.imageNum}
                </Form.Item>
            </div>
            <div className={styles.formItem}>
                <Form.Item className={styles.inlineFormItem} label="最新总数">
                    {faceResult?.newResult?.total}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="最新视频数量">
                    {faceResult?.newResult?.videoNum}
                </Form.Item>
                <Form.Item className={styles.inlineFormItem} label="最新图片数量">
                    {faceResult?.newResult?.imageNum}
                </Form.Item>
            </div>
            < Collapse className={styles.collapse} ghost destroyInactivePanel={true} defaultActiveKey={['2']} onChange={onChange} bordered={true} >
                <Panel header='差异图片' key='2' >
                    <FaceReportTableModule diffList={strings2Objects(faceResult?.imageDiffList as string[])} />
                </Panel>
                <Panel header='差异视频' key='1'>
                    <FaceReportTableModule diffList={strings2Objects(faceResult?.videoDiffList as string[])} />
                </Panel>
            </Collapse >
        </Modal >
    )
}

export default FaceReportModule