import { createActivity } from "@/services/activity";
import { Button, Modal, message, InputNumber } from "antd";
import { useState } from "react";
import styles from './index.module.less'

type MockCreteActivityModalComponentsProps = {
    visible: boolean
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MockCreateActivityModal: React.FC<MockCreteActivityModalComponentsProps> = (props) => {
    const { visible, onCancel, setLoading } = (props)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [orderId, setOrderId] = useState<number>()

    /**
     * 关闭弹窗
     */
    const handleCancel = () => {
        setOrderId(undefined)
        onCancel && onCancel()
    }

    const onChange = (value: number) => {
        setOrderId(value)
    }

    const onSubmit = () => {
        setButtonLoading(true)
        if (orderId) {
            createActivity(orderId).then(res => {
                message.success(res.message)
                setLoading(true)
                handleCancel()
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtonLoading(false))
        } else {
            message.error("请输入活动id")
            setButtonLoading(false)
        }
    }

    return (
        <>
            <Modal
                visible={visible}
                title="通过活动id获取录播流"
                onCancel={handleCancel}
                footer={<Button loading={buttonLoading} type='primary' onClick={onSubmit}>确定</Button>}
                destroyOnClose
                width={300}
            >
                <InputNumber className={styles.inputNumber} min={1} placeholder="请输入活动id" onChange={onChange} />
            </Modal >
        </>
    );
}

export default MockCreateActivityModal