import { getFaceResult } from "@/services/face";
import { Button, Modal, Form, message, Collapse } from "antd";
import { useEffect, useState } from "react";
import FaceReportTableModal from "../FaceReportTable";
import styles from './index.module.less'

type FaceReportProps = {
    faceDataSwitch?: FaceDataSwitch
    onCancel?: () => void
}

const FaceReportModal: React.FC<FaceReportProps> = (props) => {
    const { onCancel, faceDataSwitch } = props
    const [visible, setVisible] = useState(false)
    const [faceResult, setFaceResult] = useState<FaceReport>()
    const { Panel } = Collapse

    const onChange = (key: string | string[]) => {

    };

    const handleCancel = () => {
        setVisible(false)
        onCancel && onCancel()
    }

    const fetchGetResult = () => {
        getFaceResult(faceDataSwitch?.faceData?.id as number)
            .then(rep => {
                setFaceResult(rep.data)
            }).catch(err => {
                message.error(err.message)
            })
    }

    const stringList2ObjectList: (v: string[]) => DiffData[] = (data: string[]) => {
        const res: DiffData[] = data?.map(id => {
            return {
                businessId: id
            }
        })
        return res;
    }

    useEffect(() => {
        if (!faceDataSwitch?.faceData) {
            return
        }
        if (faceDataSwitch.edit) {
            return
        }
        setVisible(true)
    }, [faceDataSwitch])

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
                    <FaceReportTableModal diffList={stringList2ObjectList(faceResult?.imageDiffList as string[])} />
                </Panel>
                <Panel header='差异视频' key='1'>
                    <FaceReportTableModal diffList={stringList2ObjectList(faceResult?.videoDiffList as string[])} />
                </Panel>
            </Collapse >
        </Modal >
    )
}

export default FaceReportModal