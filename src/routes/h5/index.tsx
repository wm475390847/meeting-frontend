import {ColumnsType} from "antd/lib/table"
import React, {useEffect, useMemo, useState} from "react"
import {Button, DatePicker, Input, message, Popconfirm, Space, Table} from 'antd'
import moment from "moment"
import ToolTipModule from "@/components/ToolTip"
import {batchUpdate, deleteH5, getH5List} from "@/services"
import H5Module from "@/components/H5"
import styles from './index.module.less'

console.log("大丈夫生于天地之间，岂能郁郁久居人下！")

interface SearchH5 {
    meetingName?: string
    h5Name?: string
    meetingStartTime?: number
    meetingEndTime?: number
}

const H5Page: React.FC = () => {
    const RangePicker: any = DatePicker.RangePicker;
    const { Search } = Input
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [h5List, setH5List] = useState<H5[]>()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [searchH5, setSearchH5] = useState<SearchH5>()
    const [h5, setH5] = useState<H5>()
    const [type, setType] = useState<number>(0)
    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '会议名称',
                dataIndex: 'meetingName',
                key: 'meetingName',
                width: '15%',
                render: (text) => <ToolTipModule linkText={text} buttonText={text}/>
            },
            {
                title: 'url',
                dataIndex: 'h5Url',
                key: 'h5Url',
                width: '20%',
                ellipsis: true,
                render: (text) => <ToolTipModule linkText={text} isWindowOpen={true} buttonText={text} />
            },
            {
                title: 'H5名称',
                dataIndex: 'h5Name',
                key: 'h5Name',
                width: '20%',
                render: (text) => <ToolTipModule linkText={text} buttonText={text} />
            },
            {
                title: '会议时间',
                dataIndex: 'meetingTime',
                key: 'meetingTime',
                width: '10%',
                sorter: (a, b) => moment(a.meetingStartTime).unix() - moment(b.meetingStartTime).unix(),
                render: (_, record) =>
                    moment(record.meetingStartTime).format('YYYY-MM-DD') === moment(record.meetingEndTime).format('YYYY-MM-DD')
                        ?
                        <div >
                            {moment(record.meetingStartTime).format('YYYY-MM-DD')}
                        </div>
                        :
                        <div>
                            {moment(record.meetingStartTime).format('YYYY-MM-DD')}~{moment(record.meetingEndTime).format('YYYY-MM-DD')}
                        </div>
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '15%',
                render: (_, record) => {
                    return (
                        <div className={styles.tableAction}>
                            <Button disabled={record.caseResult} type="primary" onClick={() => {
                                setH5(record);
                                setType(2)
                            }}>编辑</Button>
                            <Popconfirm title="确定删除？" placement="top" okText="是" cancelText="否"
                                        onConfirm={() => handleDeleteH5(record.id)}>
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

    const handleDeleteH5 = (id: number) => {
        setButtonLoading(true)
        deleteH5(id)
            .then(res => {
                message.info(res.message).then(r => r)
                setLoading(true)
            })
            .catch(err => message.error(err.message))
            .finally(() => setButtonLoading(false))
    }

    const handleGetH5List = () => {
        getH5List({
            pageNo: pageNo,
            pageSize: pageSize,
            h5Name: searchH5?.h5Name,
            meetingName: searchH5?.meetingName,
            meetingStartTime: searchH5?.meetingStartTime,
            meetingEndTime: searchH5?.meetingEndTime
        }).then(data => {
            setH5List(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const setH5Name = (value: string) => {
        setSearchH5({ ...searchH5, h5Name: value })
    }

    const handleSearchH5 = (value: string) => {
        if (!Array.isArray(value)) {
            setSearchH5({
                meetingStartTime: undefined,
                meetingEndTime: undefined
            })
            return
        }
        setSearchH5({
            meetingStartTime: moment(value[0]).valueOf(),
            meetingEndTime: moment(value[1]).valueOf()
        })
    }

    const handleBatchUpdate = () => {
        batchUpdate()
            .then(res => {
                message.success(res.message)
            }).catch(err => {
                message.error(err.message)
            })
    }

    useEffect(() => {
        loading && handleGetH5List()
    }, [pageNo, loading])

    useEffect(() => {
        setLoading(true)
    }, [searchH5])

    return (
        <>
            <div className={styles.action}>
                <div>
                    <Space className={styles.space} direction="vertical">
                        <RangePicker onChange={handleSearchH5}/>
                    </Space>
                    <Search className={styles.search} placeholder="请输入H5名称" onSearch={setH5Name} enterButton />
                </div>
                <div className={styles.buttonGroup}>
                    <Button type='primary' onClick={() => setType(1)}>新增H5</Button>
                    <Popconfirm title="确定批量更新？" placement="top" okText="是" cancelText="否" onConfirm={() => handleBatchUpdate()}>
                        <Button >更新H5</Button>
                    </Popconfirm>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={h5List}
                rowKey='id'
                pagination={{ total, current: pageNo, showSizeChanger: true }}
                loading={loading}
                onChange={onChangeTable}
                className={styles.table}
            />

            {/*H5组件 */}
            <H5Module type={type} h5Info={h5} setLoading={setLoading} onCancel={() => setType(0)} />
        </>
    )
}

export default H5Page