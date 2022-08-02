import { MView, PageHeader } from "@/components"
import ToolTipModal from "@/components/ToolTip"
import { getH5DataList } from "@/services/h5"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, Popconfirm, Table, Tooltip } from 'antd'
import styles from './index.module.less'
import moment from "moment"
import CreateH5Modal from "@/components/CreateH5"

const H5DataTable: React.FC = () => {

    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [h5Name, setH5Name] = useState()
    const [h5DataList, setH5DataList] = useState<H5Data[]>()

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
                title: '会议id',
                dataIndex: 'meetingId',
                key: 'meetingId',
                width: 50,
                ellipsis: true,
                render: (text) => <ToolTipModal text={text} />
            },
            {
                title: '会议名称',
                dataIndex: 'meetingName',
                key: 'meetingName',
                width: 50,
                ellipsis: true
            },
            {
                title: '会议时间',
                dataIndex: 'meetingStartTime',
                key: 'meetingStartTime',
                width: 50,
                render: (_, record) =>
                    moment(record.meetingStartTime).format('YYYY-MM-DD') ===
                        moment(record.meetingEndTime).format('YYYY-MM-DD') ?
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
                            {<Button disabled={record.caseResult} type="primary" onClick={() => undefined}>查看</Button>}
                            <Popconfirm title="亲~不可以删除哦！" okText="是" cancelText="否">
                                <Button >删除</Button>
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
     * 获取h5数据列表
     */
    const fetchH5DataList = () => {
        getH5DataList({
            pageNo: pageNo,
            pageSize: pageSize,
            h5Name: h5Name
        }).then(data => {
            setH5DataList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    useEffect(() => {
        loading && fetchH5DataList()
    }, [pageNo, loading])

    return (
        <MView resize>
            <PageHeader title={"H5保障"} />
            <Button className={styles.button} type="primary" onClick={() => setVisible(true)} >新增H5</Button>
            <Table
                columns={columns}
                dataSource={h5DataList}
                rowKey='id'
                pagination={{ total, current: pageNo, showSizeChanger: true }}
                loading={loading}
                onChange={onChangeTable}
            />
            <CreateH5Modal visible={visible} setLoading={setLoading} onCancel={() => setVisible(false)} />
        </MView>
    )
}

export default H5DataTable