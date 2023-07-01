import {createPerf, getProductList} from "@/services";
import {Button, Form, Input, message, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import styles from './index.module.less'
import UploadFileModule from "@/components/UploadFile";

type PerfModuleProps = {
    perfInfo?: PerfInfo
    type: number
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const PerfModule: React.FC<PerfModuleProps> = (props) => {
    const {perfInfo, type, onCancel, setLoading} = (props)
    const [form] = Form.useForm()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [open, setOpen] = useState<boolean>(false)
    const [productList, setProductList] = useState<ProductInfo[]>([])
    const [ossPath, setOssPath] = useState<string>()

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const handleGetProductList = () => {
        getProductList({})
            .then(data => {
                setProductList(data.records)
            })
    }

    const options = () => {
        return productList.map((item) => ({
            value: item.id,
            label: item.productName
        }))
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            const requestData = {
                ...values,
                jmxPath: ossPath
            };

            if (type === 2) {
                requestData.id = perfInfo?.id;
            }
            createPerf(requestData)
                .then(res => {
                    message.success(res.message).then(r => r)
                    setLoading(true)
                    handleCancel()
                })
                .catch(err => message.error(err.message).then(r => r))
                .finally(() => setButtonLoading(false))
        })
    }

    useEffect(() => {
        if (open && type === 2 && perfInfo) {
            setTimeout(() => {
                form.setFieldsValue({
                    perfName: perfInfo.perfName,
                    productId: perfInfo.productId
                })
            }, 500);
        }
    }, [open])

    useEffect(() => {
        if (type) {
            setOpen(true)
            handleGetProductList()
        }
    }, [type])

    return (
        <Modal
            title={`${type == 1 ? '上传' : '编辑'}文件`}
            open={open}
            onCancel={handleCancel}
            width={500}
            destroyOnClose
            footer={<Button loading={buttonLoading} type='primary' onClick={onSubmit}>确定</Button>}
        >
            <Form
                labelCol={{span: 5}}
                wrapperCol={{span: 16, offset: 1}}
                form={form}
                preserve={false}
                className={styles.form}
            >
                <Form.Item name='perfName' label="压测名称"
                           rules={[{required: true, message: '压测名称不能为空'}]}>
                    <Input placeholder='请输入压测名称' maxLength={20}/>
                </Form.Item>
                {productList && productList.length > 0 &&
                    <Form.Item name='productId' label="所属产品" initialValue={productList[0].id} required={true}>
                        <Select options={options()}/>
                    </Form.Item>
                }
                <UploadFileModule onUploadSuccess={(ossPath) => setOssPath(ossPath)}/>
            </Form>
        </Modal>
    );
}

export default PerfModule