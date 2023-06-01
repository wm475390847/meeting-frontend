import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useRef, useState } from "react"
import { Button, message, Popconfirm, Spin, Table } from 'antd'
import moment from "moment"
import { deleteTask, executeTask, getTaskList } from "@/services"
import TaskReportModal from "@/components/TaskReport"
import { TaskStatusEnum } from "@/constants"
import { LoadingOutlined } from "@ant-design/icons"
import ToolTipModule from "@/components/ToolTip"
import styles from './index.module.less'

const TaskPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [taskList, setTaskList] = useState<Task[]>()
    const [buttonLoading, setButtongLoading] = useState(false)
    const [status, setStatus] = useState<number>(0)
    const [task, setTask] = useState<Task>()
    const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
    const timerRef = useRef<any>(null)
    const taskListRef = useRef<Task[]>([])

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
                render: (text) => <ToolTipModule linkText={text} buttonText={text} />
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
                            <Button onClick={() => { setTask(record), setStatus(3) }}>报告</Button>
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
        timerRef.current = setInterval(() => {
            if (taskListRef.current && taskListRef.current.map(item => item.status).includes(2)) {
                console.log("存在运行中的任务");
                fetchTaskList()
            }
        }, 10000)
        return () => { clearInterval(timerRef.current) }
    }, [task])

    useEffect(() => {
        if (taskList) {
            taskListRef.current = taskList
        }
    }, [taskList])

    useEffect(() => {
        loading && fetchTaskList()
    }, [pageNo, loading])

    return (
        <div className={styles.content}>
            <div className={styles.action}>
                <Button type='primary' disabled={true}>新增任务</Button>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={taskList}
                    rowKey='id'
                    pagination={{ total, current: pageNo, showSizeChanger: true }}
                    loading={loading}
                    onChange={onChangeTable}
                    className={styles.table}
                />
            </div>
            {/* 报告组件 */}
            {status == 3 && <TaskReportModal taskInfo={task} onCancel={() => setTask(undefined)} />}
        </div>
    )
}

export default TaskPage