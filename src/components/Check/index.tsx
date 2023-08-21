import {createWriter} from "@/services";
import {Button, Form, Input, message, Modal} from "antd";
import React, {useEffect, useState} from "react";
import styles from './index.module.less'

type CheckModuleProps = {
    type: number
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const CheckModule: React.FC<CheckModuleProps> = (props) => {
    const [form] = Form.useForm()
    const {type, onCancel, setLoading} = (props)
    const [open, setOpen] = useState<boolean>(false)
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            createWriter({...values})
                .then(res => {
                    if (res.success) {
                        message.success(res.message).then(r => r)
                        setLoading(true)
                        handleCancel()
                    }
                })
                .catch(err => message.error(err.message))
                .finally(() => setButtonLoading(false))
        })
    }

    useEffect(() => {
        type && setOpen(true)
    }, [type])

    return (
        <Modal
            open={open}
            title={`创建查询`}
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
                <Form.Item name='companyCode' label="公司编码" rules={[{required: true, message: '公司编码不能为空'}]}>
                    <Input placeholder='请输入公司编码'/>
                </Form.Item>

                <Form.Item name='companyName' label="公司名称">
                    <Input placeholder='请输入公司名称'/>
                </Form.Item>

                <Form.Item name='stockCode' label="股票代码">
                    <Input placeholder='请输入股票代码'/>
                </Form.Item>

                <Form.Item name='year' label="年份" rules={[{required: true, message: '年份不能为空'}]}>
                    <Input placeholder='请输入年份'/>
                </Form.Item>

                <Form.Item name='type' label="类型" rules={[{required: true, message: '类型不能为空'}]}>
                    <Input placeholder='请输入类型'/>
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default CheckModule