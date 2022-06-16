import { createActivity } from "@/services/activity";
import { Button, Modal, Form, Input, message } from "antd";
import { useState, ChangeEvent } from "react";
import styles from './index.module.less'

type MockActivityModalComponentsProps = {
    visible: boolean
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const MockActivityModal: React.FC<MockActivityModalComponentsProps> = (props) => {
    const { visible, onCancel, setLoading } = (props)
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [orderId, setOrderId] = useState<number>()

    /**
     * 关闭弹窗
     */
    const handleCancel = () => {
        onCancel && onCancel()
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const orderId = event.target.value
        setOrderId(orderId as unknown as number)
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
                title="获取录播流"
                onCancel={handleCancel}
                footer={<Button loading={buttonLoading} className={styles.button} type='primary' onClick={onSubmit}>确定</Button>}
                destroyOnClose
                width={300}
            >
                <Input className={styles.input} placeholder="请输入活动id" onChange={onChange} required={true} />
            </Modal >
        </>
    );
}

export default MockActivityModal