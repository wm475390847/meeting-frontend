import { updateStream } from "@/services/activity";
import { Button, Modal, Form, Input, message } from "antd";
import { useState, ChangeEvent, useEffect } from "react";
import styles from './index.module.less'

type MoclkReplaceStreamModalComponentsProps = {
    orderId?: number
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MockReplaceStreamModal: React.FC<MoclkReplaceStreamModalComponentsProps> = (props) => {
    const { orderId, onCancel, setLoading } = (props)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [deviceName, setDeviceName] = useState<string>()
    const [visible, setVisible] = useState(false)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const deviceName = event.target.value
        setDeviceName(deviceName)
    }

    /**
     * 关闭弹窗
     */
    const handleCancel = () => {
        setVisible(false)
        setDeviceName(undefined)
        onCancel && onCancel()
    }

    const onSubmit = () => {
        setButtonLoading(true)
        if (orderId && deviceName) {
            updateStream({ orderId: orderId, deviceName: deviceName })
                .then(res => {
                    message.success(res.message)
                    setLoading(true)
                    handleCancel()
                }).catch(err => {
                    message.error(err.message)
                }).finally(() => {
                    setButtonLoading(false)
                })
        } else {
            message.error("设备组名称不能为空")
            setButtonLoading(false)
        }
    }

    useEffect(() => {
        console.log('orderId', orderId)
        orderId && setVisible(true)
    }, [orderId])

    return (
        <>
            <Modal
                visible={visible}
                title="替换后台设备组的标注和拉流地址"
                onCancel={handleCancel}
                footer={<Button loading={buttonLoading} className={styles.button} type='primary' onClick={onSubmit}>确定</Button>}
                destroyOnClose
                width={500}
            >
                <Input className={styles.input} placeholder="请输入需要替换的设备组名称" allowClear required={true} onChange={onChange} />
            </Modal >
        </>
    );
}

export default MockReplaceStreamModal