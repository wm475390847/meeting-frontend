import { MView, PageHeader } from "@/components"
import MockCreateActivityModal from "@/components/MockCreateActivityModal"
import MockReplaceStreamModal from "@/components/MockReplaceStreamModal"
import MockViewStreamModal from "@/components/MockViewStreamModal"
import { getActivityList } from "@/services/activity"
import { Button, Table, Form } from "antd"
import { ColumnsType } from "antd/lib/table"
import React, { useEffect, useMemo, useState } from "react"
import styles from './index.module.less'

const MockActivityTable: React.FC = () => {

    const [activityList, setActivityList] = useState<ActivityInfo[]>([]);
    const [streamInfoList, setStreamInfoList] = useState<StreamInfo[]>()

    // 表格用
    const [total, setTotal] = useState(0)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [orderId, setOrderId] = useState<number>()

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '10%',
                render: (text, record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '活动id',
                dataIndex: 'orderId',
                key: 'orderId',
                width: '20%',
            },
            {
                title: '类型',
                dataIndex: 'venueType',
                key: 'venueType',
                width: '20%',
            },
            {
                title: '场地',
                dataIndex: 'venueName',
                key: 'venueName',
                width: '20%',
            },
            {
                title: '活动时长（h）',
                dataIndex: 'duration',
                key: 'duration',
                width: '20%',
                render: (text) => {
                    return (text / 1000 / 60 / 60).toFixed(2)
                }
            },
            {
                title: '片段数量',
                dataIndex: 'eventCount',
                key: 'eventCount',
                width: '20%',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (_, record: ActivityInfo) => (
                    <div className={styles.action} >
                        <Button type="primary" onClick={() => setStreamInfoList(record.mockStreamResponseList)}>查看录播流</Button>
                        <Button disabled={allUrlIsNull(record.mockStreamResponseList)} onClick={() => setOrderId(record.orderId)} >替换设备流</Button>
                    </div >)
            }
        ]
    }, [pageNo, pageSize])

    /**
     * 判断是url是否全为空
     * @param streamInfoList 流信息列表
     * @returns true/false
     */
    const allUrlIsNull = (streamInfoList: StreamInfo[]) => {
        const pre = streamInfoList.reduce((pre, data) => {
            data.pullUrl === null && pre++
            return pre
        }, 0)
        return pre === streamInfoList.length
    }

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

    const fetchActivityList = () => {
        getActivityList({
            pageNo,
            pageSize: pageSize
        }).then(data => {
            setActivityList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    useEffect(() => {
        loading && fetchActivityList()
    }, [pageNo, loading])

    return (
        <MView resize>
            <PageHeader title="录播活动列表" />
            <div className={styles.button}>
                <Button className={styles.button} type="primary" onClick={() => setVisible(true)} >创建录播活动</Button>
            </div>

            <Table
                columns={columns}
                dataSource={activityList}
                rowKey='id'
                pagination={{ total, current: pageNo, showSizeChanger: true }}
                loading={loading}
                onChange={onChangeTable}
            />
            <MockViewStreamModal streamInfoList={streamInfoList} onCancel={() => setStreamInfoList(undefined)} />
            <MockCreateActivityModal visible={visible} onCancel={() => setVisible(false)} setLoading={setLoading} />
            <MockReplaceStreamModal orderId={orderId} setLoading={setLoading} onCancel={() => setOrderId(undefined)} />
        </MView >
    )
}

export default MockActivityTable