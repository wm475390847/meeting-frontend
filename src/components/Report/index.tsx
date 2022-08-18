import { getH5ResultPercent } from "@/services/h5";
import { Button, Collapse, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import ReportTableModal from "../ReportTable";
import styles from './index.module.less'

type ReportModalProps = {
    visible: boolean
    onCancel?: () => void
}

const ReportModal: React.FC<ReportModalProps> = (prop) => {
    const { onCancel, visible } = prop
    const { Panel } = Collapse
    const [resultPercent, setResultPercent] = useState<ResultPercent>()

    const onChange = (key: string | string[]) => {

    };

    const handleCancel = () => {
        onCancel && onCancel()
    }

    const getPercent = () => {
        getH5ResultPercent()
            .then(rep => {
                setResultPercent(rep.data)
            })
    }

    useEffect(() => {
        visible && getPercent()
    }, [visible])

    return (
        <Modal
            visible={visible}
            className={styles.modal}
            title="执行结果"
            onCancel={handleCancel}
            footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
            destroyOnClose
        >
            <div className={styles.formItem}>
                <Form.Item name='total' className={styles.inlineFormItem} label="总数">
                    {resultPercent?.total}
                </Form.Item>
                <Form.Item name='success' className={styles.inlineFormItem} label="成功">
                    {resultPercent?.success}
                </Form.Item>
                <Form.Item name='fail' className={styles.inlineFormItem} label="失败">
                    {resultPercent ? resultPercent.total - resultPercent.success : 0}
                </Form.Item>
                <Form.Item name='percent' className={styles.inlineFormItem} label="成功率">
                    {resultPercent?.percent as number * 100}%
                </Form.Item>
            </div>


            < Collapse className={styles.collapse} ghost destroyInactivePanel={true} defaultActiveKey={['2']} onChange={onChange} bordered={true} >

                <Panel header='失败' key='2' >
                    <ReportTableModal result={false} />
                </Panel>
                <Panel header='成功' key='1'>
                    <ReportTableModal result={true} />
                </Panel>
            </Collapse >
        </Modal>
    )
};

export default ReportModal;