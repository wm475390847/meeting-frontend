import {Button, DatePicker, DatePickerProps, Form, Input, message, Modal, Select} from "antd";
import React, {useEffect, useState} from "react";
import styles from './index.module.less'
import {createReport, updateReport} from "@/services";
import dayjs from "dayjs";

type PopupModuleProps = {
    type: number
    writerReport?: WriterReport
    onCancel?: () => void
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupModule: React.FC<PopupModuleProps> = (props) => {
    const [form] = Form.useForm()
    const {type, writerReport, onCancel, setLoading} = (props)
    const [open, setOpen] = useState<boolean>(false)
    const [year, setYear] = useState<string>()
    const [buttonLoading, setButtonLoading] = useState(false)

    const options = [
        {value: 'H1', label: '半年报'},
        {value: 'Q1', label: '一季度报'},
        {value: 'Q3', label: '三季度报'}
    ]
    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const handleDisableDate = (current: { year: () => number; }) => {
        const currentYear = new Date().getFullYear();
        // 禁用当前年份之后的所有年份
        return current && current.year() > currentYear;
    }
    const onChangeYear: DatePickerProps['onChange'] = (date, dateString) => {
        setYear(dateString)
    };

    const onSubmit = () => {
        form.validateFields().then(values => {
            setButtonLoading(true)
            if (type == 1) {
                createReport({...values, year: year})
                    .then(res => {
                        message.success(res.message).then(r => r)
                        setLoading(true)
                        handleCancel()
                    })
                    .catch(err => message.error(err.message))
                    .finally(() => setButtonLoading(false))

            }
            if (type == 2) {
                updateReport({...values, year: year, id: writerReport?.id})
                    .then(res => {
                        message.success(res.message).then(r => r)
                        setLoading(true)
                        handleCancel()
                    })
                    .catch(err => message.error(err.message))
                    .finally(() => setButtonLoading(false))
            }
        })
    }

    useEffect(() => {
        if (open && type === 2 && writerReport) {
            setTimeout(() => {
                const date = new Date(writerReport.year, 0, 1)
                const year = dayjs(date)
                const initialValue =
                    {
                        year: year,
                        type: writerReport.type,
                        companyCode: writerReport.companyCode,
                        companyName: writerReport.companyName,
                        stockCode: writerReport.stockCode
                    }
                form.setFieldsValue(initialValue)
            }, 500);
        }
    }, [open])

    useEffect(() => {
        type && setOpen(true)
    }, [type])

    return (
        <Modal
            open={open}
            title={`${type === 1 ? '创建查询' : '编辑查询'}`}
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
                    <Input placeholder='请输入CompanyCode'/>
                </Form.Item>

                <Form.Item name='companyName' label="公司名称" rules={[{required: true, message: '公司名称不能为空'}]}>
                    <Input placeholder='请输入公司名称'/>
                </Form.Item>

                <Form.Item name='stockCode' label="股票代码" rules={[{required: true, message: '股票代码不能为空'}]}>
                    <Input placeholder='请输入股票代码'/>
                </Form.Item>

                <Form.Item name='year' label="财年" rules={[{required: true, message: '年份不能为空'}]}>
                    <DatePicker style={{width: '150px'}} picker="year" onChange={onChangeYear}
                                disabledDate={handleDisableDate}/>
                </Form.Item>

                <Form.Item name='type' label="类型" rules={[{required: true, message: '类型不能为空'}]}
                           initialValue={options[0].label}>
                    <Select style={{width: '150px'}} className={styles.select} options={options}/>
                </Form.Item>

            </Form>
        </Modal>
    );
}

export default PopupModule