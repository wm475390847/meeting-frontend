import { Button, Collapse, Modal } from "antd";
import ReportTableModal from "../ReportTable";
import styles from './index.module.less'

type ReportModalProps = {
    visible: boolean
    onCancel?: () => void
}

const ReportModal: React.FC<ReportModalProps> = (prop) => {
    const { onCancel, visible } = prop
    const { Panel } = Collapse

    const onChange = (key: string | string[]) => {

    };

    const handleCancel = () => {
        onCancel && onCancel()
    }

    return (
        <Modal
            visible={visible}
            className={styles.modal}
            title="执行结果"
            onCancel={handleCancel}
            footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
            destroyOnClose
        >
            < Collapse className={styles.collapse} ghost destroyInactivePanel={true} defaultActiveKey={['1']} onChange={onChange} bordered={true} >
                <Panel header='成功' key='1'>
                    <ReportTableModal result={true} />
                </Panel>
                <Panel header='失败' key='2' >
                    <ReportTableModal result={false} />
                </Panel>
            </Collapse >
        </Modal>
    )
};

export default ReportModal;