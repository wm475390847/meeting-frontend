import React, {useEffect, useMemo, useState} from "react"
import {Button, message, Popconfirm, Table} from 'antd'
import styles from './index.module.less'
import {deleteReport, getReportList, searchReport} from "@/services";
import JsonViewerModule from "@/components/JsonViewer";
import {ColumnsType} from "antd/lib/table";
import moment from "moment/moment";
import PopupModule from "@/components/Check";

const WriterPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [reportData, setReportData] = useState<any>()
    const [writerList, setWriterList] = useState<WriterReport[]>()
    const [writerReport, setWriterReport] = useState<WriterReport>()
    const [type, setType] = useState(0)

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '公司编码',
                dataIndex: 'companyCode',
                key: 'companyCode',
                width: '6%',
            },
            {
                title: '公司名称',
                dataIndex: 'companyName',
                key: 'companyCode',
                width: '10%',
            },
            {
                title: '股票代码',
                dataIndex: 'stockCode',
                key: 'stockCode',
                width: '6%',
            },
            {
                title: '年份',
                dataIndex: 'year',
                key: 'year',
                width: '6%',
            },
            {
                title: '报告类型',
                dataIndex: 'type',
                key: 'type',
                width: '6%',
            },
            {
                title: '执行时间',
                dataIndex: 'executeTime',
                key: 'executeTime',
                width: '15%',
                render: (_, record) => record.executeTime && moment(record.executeTime).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '20%',
                render: (_, record) => {
                    return (
                        <div className={styles.buttonGroup}>
                            <Button type="primary" onClick={() => handleReport(record.id)}
                                    loading={buttonLoading}>查询</Button>
                            <Button onClick={() => {
                                setType(2);
                                setWriterReport(record)
                            }}
                                    loading={buttonLoading}>编辑</Button>
                            <Button onClick={() => setReportData(record.reportData)}
                                    loading={buttonLoading}>查看数据</Button>
                            <Popconfirm title='确定删除？' placement="top" okText="是" cancelText="否"
                                        onConfirm={() => handleDeleteReport(record.id)}>
                                <Button loading={buttonLoading}>删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }, [pageNo, pageSize])

    const onChangeTable = (value: any) => {
        const {current, pageSize} = value
        setPageNo(current)
        setPageSize(pageSize)
        setLoading(true)
    }

    const handleDeleteReport = (id: number) => {
        deleteReport(id)
            .then(res => {
                message.success(res.message).then(r => r)
                setLoading(true)
            })
            .catch(err => message.error(err.message))
    }

    const handleReport = (id: number) => {
        setButtonLoading(true)
        searchReport(id)
            .then(res => {
                message.success(res.message).then(r => r)
                setLoading(true)
            })
            .catch(err => message.error(err.message))
            .finally(() => setButtonLoading(false))
    }

    const handleReportList = () => {
        getReportList({
            pageNo: pageNo,
            pageSize: pageSize,
        }).then(data => {
            setWriterList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    useEffect(() => {
        loading && handleReportList()
    }, [pageNo, loading])

    return (
        <div>
            <div className={styles.action}>
                <div className={styles.buttonGroup}>
                    <Button type='primary' onClick={() => setType(1)}>创建查询</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={writerList}
                rowKey='id'
                pagination={{total, current: pageNo, showSizeChanger: true}}
                loading={loading}
                onChange={onChangeTable}
                className={styles.table}
            />
            <JsonViewerModule data={reportData} onCancel={() => setReportData(undefined)}/>
            <PopupModule type={type}
                         writerReport={writerReport}
                         setLoading={setLoading}
                         onCancel={() => {
                             setType(0)
                             setWriterReport(undefined)
                         }}
            />
        </div>
    )
}

export default WriterPage