import {createProduct, getProductGroup} from "@/services";
import {Button, Form, Input, message, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import styles from './index.module.less'

type ProductModuleProps = {
    type: number
    productInfo?: ProductInfo
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductModule: React.FC<ProductModuleProps> = (props) => {
    const [form] = Form.useForm()
    const { type, productInfo, onCancel, setLoading } = (props)
    const [open, setOpen] = useState<boolean>(false)
    const [serviceList, setServiceList] = useState<ServiceInfo[]>([])
    const [buttonLoading, setButtonLoading] = useState(false)

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const options = () => {
        return serviceList.map((item, index) => ({
            value: item.id,
            label: item.serviceName
        }))
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            if (type === 1) {
                setButtonLoading(true)
                createProduct({ ...values })
                    .then(res => {
                        message.info(res.message)
                        setLoading(true)
                        handleCancel()
                    })
                    .catch(err => message.error(err.message))
                    .finally(() => setButtonLoading(false))
            }
            if (type === 2) {

            }
        })
    }

    /**
     *获取业务列表
     */
    const handleGetProductGroup = () => {
        getProductGroup()
            .then(res => {
                setServiceList(res)
            })
    }

    useEffect(() => {
        if (type) {
            setOpen(true)
            handleGetProductGroup()
        }
    }, [type])

    useEffect(() => {
        if (open && type === 2 && productInfo) {
            setTimeout(() => {
                form.setFieldsValue({
                })
            }, 500);
        }
    }, [open])

    return (
        <Modal
            open={open}
            title={`${type === 1 ? '创建产品' : type === 2 ? '编辑产品' : ''}`}
            onCancel={handleCancel}
            footer={<Button loading={buttonLoading} type='primary' onClick={onSubmit}>确定</Button>}
            destroyOnClose
            width={500}
        >
            <Form
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16, offset: 1 }}
                form={form}
                preserve={false}
                className={styles.form}
            >
                <Form.Item name='productName' label="产品名称" rules={[{ required: true, message: '产品名称不能为空' }]} >
                    <Input placeholder='请输入会议名称' />
                </Form.Item>
                {
                    serviceList && serviceList.length > 0 &&
                    <Form.Item name='serviceId' label="所属业务" initialValue={serviceList[0].id} required={true}>
                        <Select className={styles.select} options={options()} />
                    </Form.Item>
                }
            </Form>
        </Modal >
    );
}

export default ProductModule