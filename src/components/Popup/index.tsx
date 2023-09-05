import {Button, Form, Input, Modal} from "antd";
import React, {useState} from "react";
import styles from './index.module.less';
import {PopupData} from "@/services/interface";

type PopupModuleProps = {
    open: boolean
    popupData: PopupData
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupModule: React.FC<PopupModuleProps> = (props) => {
    const [form] = Form.useForm()
    const {open, popupData, onCancel, setLoading} = (props)
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleCancel = () => {
        onCancel && onCancel()
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            console.log(...values)
        })
    }

    return (
        <Modal
            open={open}
            title={popupData.title}
            onCancel={handleCancel}
            footer={<Button loading={buttonLoading} type='primary' onClick={onSubmit}>确定</Button>}
            destroyOnClose
            width={500}
        >
            <Form
                labelCol={{span: 5}}
                wrapperCol={{span: 16, offset: 1}}
                form={form}
                preserve={false}
                className={styles.form}
            >
                {popupData.content && popupData.content
                    .map(item => (
                        <Form.Item
                            key={item.name}
                            label={item.label}
                            name={item.name}
                            rules={item.rule}
                        >
                            {item.module ? React.createElement(item.module.type as any, item.module.props) : <Input/>}
                        </Form.Item>
                    ))}
            </Form>
        </Modal>
    );
}

export default PopupModule