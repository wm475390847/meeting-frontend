import ToolTipModal from "@/components/ToolTip"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, Input, message, Popconfirm, Spin, Table } from 'antd'
import styles from './index.module.less'
import { deleteTask, executeTask, getTaskList } from "@/services"
import TaskReportModule from "@/components/TaskReport"
import { TaskStatusEnum } from "@/constants"
import { LoadingOutlined } from "@ant-design/icons"
import moment from "moment"
import UpdateTaskModule from "@/components/TaskUpdate"

const TaskDataPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [taskList, setTaskList] = useState<TaskInfo[]>()
    const [buttonLoading, setButtongLoading] = useState(false)
    const [status, setStatus] = useState<number>(0)
    const [taskInfo, setTaskInfo] = useState<TaskInfo>()
    const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '定时表达式',
                dataIndex: 'cron',
                key: 'cron',
                width: '10%'
            },
            {
                title: '任务名称',
                dataIndex: 'taskName',
                key: 'taskName',
                width: '15%',
                render: (text) => <ToolTipModal linkText={text} buttonText={text} />
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: '10%',
                render: (status) => <div>{TaskStatusEnum[status]} {status === 2 && < Spin indicator={antIcon} />}</div>
            },
            {
                title: '执行时间',
                dataIndex: 'executeTime',
                key: 'executeTime',
                width: '15%',
                render: (_, record) => record.executeTime && moment(record.executeTime).format('YYYY-MM-DD HH:mm:ss')
            },
            {
                title: '执行耗时(s)',
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
                            <Popconfirm title='确定执行？' placement="top" okText="是" cancelText="否" onConfirm={() => fetchExecuteTask(record.id)}>
                                <Button type="primary" loading={buttonLoading}>执行</Button>
                            </Popconfirm>
                            {/* <Button onClick={() => { setTaskInfo(record), setStatus(2) }}>编辑</Button> */}
                            <Button onClick={() => { setTaskInfo(record), setStatus(3) }}>报告</Button>
                            <Popconfirm title='确定删除？' placement="top" okText="是" cancelText="否" onConfirm={() => fetchDelectTask(record.id)}>
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

    const fetchTaskList = () => {
        getTaskList({
            pageNo: pageNo,
            pageSize: pageSize,
        }).then(data => {
            setTaskList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const fetchExecuteTask = (taskId: number) => {
        executeTask(taskId)
            .then(res => {
                message.info(res.message)
                setLoading(true)
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtongLoading(false))
    }

    const fetchDelectTask = (taskId: number) => {
        deleteTask(taskId)
            .then(res => {
                message.info(res.message)
                setLoading(true)
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtongLoading(false))
    }

    useEffect(() => {
        loading && fetchTaskList()
    }, [pageNo, loading])

    return (
        <div className={styles.content}>
            <Button className={styles.button} type='primary'>新增任务</Button>
            <Table
                columns={columns}
                dataSource={taskList}
                rowKey='id'
                pagination={{ total, current: pageNo, showSizeChanger: true }}
                loading={loading}
                onChange={onChangeTable}
                className={styles.table}
            />
            {/* 报告组件 */}
            {status == 3 && <TaskReportModule taskInfo={taskInfo} onCancel={() => setTaskInfo(undefined)} />}
            {/* 编辑组件 */}
            {status == 2 && <UpdateTaskModule taskInfo={taskInfo} setLoading={setLoading} onCancel={() => setTaskInfo(undefined)} />}
        </div>
    )
}

export default TaskDataPage