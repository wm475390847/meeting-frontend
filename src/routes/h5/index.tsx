import { MView, PageHeader } from "@/components"
import ToolTipModal from "@/components/ToolTip"
import { deleteH5, getH5DataList } from "@/services/h5"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, DatePicker, Input, message, Popconfirm, Space, Table, Tooltip } from 'antd'
import styles from './index.module.less'
import moment from "moment"
import CreateH5Modal from "@/components/CreateH5"
import UpdateH5Modal from "@/components/UpdateH5"

interface SearchH5Data {
    meetingName?: string
    h5Name?: string
    meetingStartTime?: number
    meetingEndTime?: number
}

const H5DataTable: React.FC = () => {
    const RangePicker: any = DatePicker.RangePicker;
    const { Search } = Input
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [h5DataList, setH5DataList] = useState<H5Data[]>()
    const [buttonLoading, setButtongLoading] = useState(false)
    const [searchH5Data, setSearchH5Data] = useState<SearchH5Data>()
    const [updateH5Data, setUpdataH5Data] = useState<H5Data>()
    // 控制子组件开启
    const [visible, setVisible] = useState(false)

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: 20,
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '会议名称',
                dataIndex: 'meetingName',
                key: 'meetingName',
                width: 50,
                ellipsis: true,
                render: (text) => <ToolTipModal text={text} />
            },
            {
                title: '会议id',
                dataIndex: 'meetingId',
                key: 'meetingId',
                width: 50,
                ellipsis: true,
                render: (text) => <ToolTipModal text={text} />
            },
            {
                title: 'url',
                dataIndex: 'h5Url',
                key: 'h5Url',
                width: 80,
                ellipsis: true,
                render: (text) => (
                    <Tooltip title={text} color='#2db7f5' >
                        <Button className={styles.url} key={text} type='link' onClick={() => window.open(text)}>
                            <span className={styles.span}>{text}</span>
                        </Button>
                    </Tooltip>
                )
            },
            {
                title: 'H5名称',
                dataIndex: 'h5Name',
                key: 'h5Name',
                width: 50,
                ellipsis: true,
                render: (text) => <ToolTipModal text={text} />
            },
            {
                title: '会议时间',
                dataIndex: 'meetingStartTime',
                key: 'meetingStartTime',
                width: 50,
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
                        <div className={styles.action}>
                            {<Button disabled={record.caseResult} type="primary" onClick={() => setUpdataH5Data(record)}>编辑</Button>}
                            <Popconfirm title="确定删除？" okText="是" cancelText="否" onConfirm={() => fetchDelectH5(record.id)}>
                                <Button loading={buttonLoading}>删除</Button>
                            </Popconfirm>
                        </div >
                    )
                }
            }
        ]
    }, [pageNo, pageSize])


    /**
     * 获取当前页码
     * @param value
     */
    const onChangeTable = (value: any) => {
        const { current, pageSize } = value
        setPageNo(current)
        setPageSize(pageSize)
        setLoading(true)
    }

    /**
     * 删除h5
     * @param id h5的id
     */
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

    /**
     * 获取h5数据列表
     */
    const fetchH5DataList = () => {
        getH5DataList({
            pageNo: pageNo,
            pageSize: pageSize,
            h5Name: searchH5Data?.h5Name,
            meetingName: searchH5Data?.meetingName,
            meetingStartTime: searchH5Data?.meetingStartTime,
            meetingEndTime: searchH5Data?.meetingEndTime
        }).then(data => {
            setH5DataList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const setMeetingName = (value: string) => {
        setSearchH5Data({ ...searchH5Data, meetingName: value })
    }

    const setH5Name = (value: string) => {
        setSearchH5Data({ ...searchH5Data, h5Name: value })
    }

    const onChange = (value: string) => {
        if (!Array.isArray(value)) {
            setSearchH5Data({
                meetingStartTime: undefined,
                meetingEndTime: undefined
            })
            return
        }
        setSearchH5Data({
            meetingStartTime: moment(value[0]).valueOf(),
            meetingEndTime: moment(value[1]).valueOf()
        })
    }

    useEffect(() => {
        loading && fetchH5DataList()
    }, [pageNo, loading])

    /**
     * 时间搜索
     */
    useEffect(() => {
        setLoading(true)
    }, [searchH5Data])

    return (
        <MView resize>
            <PageHeader title={"H5保障"} />

            <Input.Group className={styles.inputgroup}>
                <Search className={styles.search} placeholder="H5名称" onSearch={setH5Name} enterButton />
                <Space className={styles.space} direction="vertical" size={12} ><RangePicker onChange={onChange} /> </Space>
                <Button className={styles.button} type="primary" onClick={() => setVisible(true)} >新增H5</Button>
            </Input.Group>

            <Table
                columns={columns}
                dataSource={h5DataList}
                rowKey='id'
                pagination={{ total, current: pageNo, showSizeChanger: true }}
                loading={loading}
                onChange={onChangeTable}
            />
            {/* 创建h5组件 */}
            <CreateH5Modal visible={visible} setLoading={setLoading} onCancel={() => setVisible(false)} />
            {/* 修改h5组件 */}
            <UpdateH5Modal setLoading={setLoading} onCancel={() => setUpdataH5Data(undefined)} updateH5Data={updateH5Data} />
        </MView >
    )
}

export default H5DataTable