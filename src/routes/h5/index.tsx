import ToolTipModal from "@/components/ToolTip"
import { batchUpdate, deleteH5, getH5List } from "@/services"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, DatePicker, Input, message, Popconfirm, Space, Table } from 'antd'
import styles from './index.module.less'
import moment from "moment"
import CreateH5Module from "@/components/H5Create"
import UpdateH5Module from "@/components/H5Update"

console.log("大丈夫生于天地之间，岂能郁郁久居人下！")

interface SearchH5 {
    meetingName?: string
    h5Name?: string
    meetingStartTime?: number
    meetingEndTime?: number
}

const H5DataPage: React.FC = () => {
    const RangePicker: any = DatePicker.RangePicker;
    const { Search } = Input
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [h5DataList, setH5DataList] = useState<H5Info[]>()
    const [buttonLoading, setButtongLoading] = useState(false)
    const [searchH5, setSearchH5] = useState<SearchH5>()
    const [updateH5, setUpdataH5] = useState<H5Info>()
    const [visible, setVisible] = useState(false)

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
                render: (text) => <ToolTipModal linkText={text} buttonText={text} />
            },
            {
                title: 'url',
                dataIndex: 'h5Url',
                key: 'h5Url',
                width: '20%',
                ellipsis: true,
                render: (text) => <ToolTipModal linkText={text} isWindowOpen={true} buttonText={text} />
            },
            {
                title: 'H5名称',
                dataIndex: 'h5Name',
                key: 'h5Name',
                width: '20%',
                render: (text) => <ToolTipModal linkText={text} buttonText={text} />
            },
            {
                title: '会议时间',
                dataIndex: 'meetingStartTime',
                key: 'meetingStartTime',
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
                            <Button disabled={record.caseResult} type="primary" onClick={() => setUpdataH5(record)}>编辑</Button>
                            <Popconfirm title="确定删除？" placement="top" okText="是" cancelText="否" onConfirm={() => fetchDelectH5(record.id)}>
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

    const fetchDelectH5 = (id: number) => {
        setButtongLoading(true)
        deleteH5(id)
            .then(res => {
                message.info(res.message)
                setLoading(true)
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtongLoading(false))
    }

    const fetchH5List = () => {
        getH5List({
            pageNo: pageNo,
            pageSize: pageSize,
            h5Name: searchH5?.h5Name,
            meetingName: searchH5?.meetingName,
            meetingStartTime: searchH5?.meetingStartTime,
            meetingEndTime: searchH5?.meetingEndTime
        }).then(data => {
            setH5DataList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const setH5Name = (value: string) => {
        setSearchH5({ ...searchH5, h5Name: value })
    }

    const onChange = (value: string) => {
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

    const fetchBatchUpdate = () => {
        batchUpdate()
            .then(res => {
                message.success(res.message)
            }).catch(err => {
                message.error(err.message)
            })
    }

    useEffect(() => {
        loading && fetchH5List()
    }, [pageNo, loading])

    useEffect(() => {
        setLoading(true)
    }, [searchH5])

    return (
        <div className={styles.content}>
            <Input.Group className={styles.action}>
                <div>
                    <Space className={styles.space} direction="vertical">
                        <RangePicker onChange={onChange} />
                    </Space>
                    <Search className={styles.search} placeholder="H5名称" onSearch={setH5Name} enterButton />
                </div>
                <div className={styles.buttonGroup}>
                    <Popconfirm title="确定更新？" placement="top" okText="是" cancelText="否" onConfirm={() => fetchBatchUpdate()}>
                        <Button type='primary'>批量更新</Button>
                    </Popconfirm>
                    <Button type='primary' onClick={() => setVisible(true)} >新增页面</Button>
                </div>
            </Input.Group>

            <Table
                columns={columns}
                dataSource={h5DataList}
                rowKey='id'
                pagination={{ total, current: pageNo, showSizeChanger: true }}
                loading={loading}
                onChange={onChangeTable}
                className={styles.table}
            />
            {/* 创建h5组件 */}
            <CreateH5Module visible={visible} setLoading={setLoading} onCancel={() => setVisible(false)} />
            {/* 修改h5组件 */}
            <UpdateH5Module h5Info={updateH5} setLoading={setLoading} onCancel={() => setUpdataH5(undefined)} />
        </div>
    )
}

export default H5DataPage