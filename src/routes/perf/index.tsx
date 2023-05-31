import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button, message, Popconfirm, Spin, Table } from 'antd'
import moment from "moment"
import { batchUpdatePerformance, deletePerformance, getPerfList, startPerformance } from "@/services"
import { TaskStatusEnum } from "@/constants"
import { LoadingOutlined } from "@ant-design/icons"
import styles from './index.module.less'
import PerfReportModule from "@/components/PerfReport"

interface SearchPerf {
    performanceName: string
}

const PerfPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [performanceList, setPerformanceList] = useState<PerformanceInfo[]>()
    const [buttonLoading, setButtongLoading] = useState(false)
    const [perfId, setPerfId] = useState<number>()
    const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
    const timerRef = useRef<any>(null)
    const performanceListRef = useRef<PerformanceInfo[]>([])
    const [searchPerf, setSearchPerf] = useState<SearchPerf>();

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '名称',
                dataIndex: 'performanceName',
                key: 'performanceName',
                width: '10%'
            },
            {
                title: '请求参数',
                dataIndex: 'requestData',
                key: 'requestData',
                width: '10%',
                render: (requestData) => requestData as string
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: '10%',
                render: (status) => <div>{TaskStatusEnum[status]} {status === 2 && < Spin indicator={antIcon} />}</div>
            },
            {
                title: '最新执行时间',
                dataIndex: 'executeTime',
                key: 'executeTime',
                width: '15%',
                render: (_, record) => record.executeTime && moment(record.executeTime).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '最新执行耗时(s)',
                dataIndex: 'elapsedTime',
                key: 'elapsedTime',
                width: '10%',
                render: (_, record) => record.elapsedTime && record.elapsedTime / 1000 + 's'
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '15%',
                render: (_, record) => {
                    return (
                        <div className={styles.tableAction}>
                            <Popconfirm title='确定执行？' placement="top" okText="是" cancelText="否" onConfirm={() => handleStartPerformance(record.id)}>
                                <Button type="primary" loading={buttonLoading}>执行</Button>
                            </Popconfirm>
                            <Button onClick={() => { setPerfId(record.id) }}>报告</Button>
                            <Button onClick={() => { null }}>编辑</Button>
                            <Popconfirm title='确定删除？' placement="top" okText="是" cancelText="否" onConfirm={() => handleDelectPerformence(record.id)}>
                                <Button loading={buttonLoading}>删除</Button>
                            </Popconfirm>
                        </div >
                    )
                }
            }
        ]
    }, [pageNo, pageSize])

    const onChangeTable = (value: any) => {
        const { current, pageSize } = value
        setPageNo(current)
        setPageSize(pageSize)
        setLoading(true)
    }

    const handlePerformanceList = () => {
        getPerfList({
            pageNo: pageNo,
            pageSize: pageSize,
            performanceName: searchPerf?.performanceName,
        }).then(data => {
            setPerformanceList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const handleStartPerformance = (id: number) => {
        startPerformance(id)
            .then(res => {
                message.info(res.message)
                setLoading(true)
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtongLoading(false))
    }

    const handleBathUpdatePerformance = () => {
        batchUpdatePerformance()
            .then(req => {
                message.info(req.message)
                setLoading(true)
            }).catch(err => {
                message.error(err.message)
            })
    }

    const handleDelectPerformence = (id: number) => {
        deletePerformance(id)
            .then(res => {
                message.info(res.message)
                setLoading(true)
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtongLoading(false))
    }

    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (performanceListRef.current && performanceListRef.current.map(item => item.status).includes(2)) {
                handlePerformanceList()
            }
        }, 5000)
        return () => { clearInterval(timerRef.current) }
    }, [])

    useEffect(() => {
        if (performanceList) {
            performanceListRef.current = performanceList
        }
    }, [performanceList])

    useEffect(() => {
        loading && handlePerformanceList()
    }, [pageNo, loading])

    return (
        <div>
            <div className={styles.action}>
                <div>

                </div>
                <div className={styles.buttonGroup}>
                    <Button type='primary' onClick={() => null} >新增项目</Button>
                    <Popconfirm title="确定更新？" placement="top" okText="是" cancelText="否" onConfirm={() => handleBathUpdatePerformance()}>
                        <Button type='primary' >批量更新</Button>
                    </Popconfirm>
                </div>
            </div>

            <div>
                <Table
                    columns={columns}
                    dataSource={performanceList}
                    rowKey='id'
                    pagination={{ total, current: pageNo, showSizeChanger: true }}
                    loading={loading}
                    onChange={onChangeTable}
                    className={styles.table}
                />
            </div>
            {/* 报告组件 */}
            {<PerfReportModule perfId={perfId} onCancel={() => setPerfId(undefined)} />}
            {/* 编辑组件 */}
            {/* {status == 2 && <UpdateTaskModal taskInfo={taskInfo} setLoading={setLoading} onCancel={() => setTaskInfo(undefined)} />} */}
        </div>
    )
}

export default PerfPage