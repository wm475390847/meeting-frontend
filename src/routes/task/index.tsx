import { FooterPage, MView, PageHeader } from "@/components"
import ToolTipModal from "@/components/ToolTip"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, message, Popconfirm, Spin, Table } from 'antd'
import styles from './index.module.less'
import { executeTask, getTaskInfoList } from "@/services/task"
import ReportModal from "@/components/Report"
import { TaskStatusEnum } from "@/constants"
import { LoadingOutlined } from "@ant-design/icons"
import moment from "moment"

const TaskTable: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [taskInfoList, setTaskInfoList] = useState<TaskInfo[]>()
    const [buttonLoading, setButtongLoading] = useState(false)
    const [taskName, setTaskName] = useState()
    // 控制报告组件
    const [taskInfo, setTaskInfo] = useState<TaskInfo>()
    const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '任务id',
                dataIndex: 'id',
                key: 'id',
                width: '10%'
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
                width: '20%',
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
                        <div className={styles.action}>
                            <Popconfirm title='确定执行？' placement="top" okText="是" cancelText="否" onConfirm={() => fetchExecuteTask(record.id)}>
                                <Button type="primary" loading={buttonLoading}>执行</Button>
                            </Popconfirm>
                            <Button onClick={() => setTaskInfo(record)}>报告</Button>
                            <Popconfirm title='确定删除？' placement="top" okText="是" cancelText="否" onConfirm={() => fetchDelectTask(record.id)}>
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
     * 获取任务数据列表
     */
    const fetchTaskInfoList = () => {
        getTaskInfoList({
            pageNo: pageNo,
            pageSize: pageSize,
            taskName: taskName
        }).then(data => {
            setTaskInfoList(data.records)
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
        message.info("暂不支持删除哦")
    }

    useEffect(() => {
        loading && fetchTaskInfoList()
    }, [pageNo, loading])

    return (
        <MView resize>
            <div>
                <PageHeader title={"任务列表"} />
                <Table
                    columns={columns}
                    dataSource={taskInfoList}
                    rowKey='id'
                    pagination={{ total, current: pageNo, showSizeChanger: true }}
                    loading={loading}
                    onChange={onChangeTable}
                />

                {/* 执行报告组件 */}
                <ReportModal taskInfo={taskInfo} onCancel={() => setTaskInfo(undefined)} />
                <FooterPage text={'会议线质量保障平台 ©2022 Created by 质量中台 '} link={'https://codeup.aliyun.com/xhzy/xhzy-qa/meeting-frontend/tree/dev'} />
            </div>

        </MView >
    )
}

export default TaskTable