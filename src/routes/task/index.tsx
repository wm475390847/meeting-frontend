import { MView, PageHeader } from "@/components"
import { getTasks, rollBackTask, stopTask } from "@/services/task"
import { Button, message, Progress, Spin, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import { taskStatusEnum } from '../../constants'
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import styles from './index.module.less'
import { IStopTaskReq } from "@/services/task/interface"
import TaskReportModal from "@/components/TaskFormModel"
import { LoadingOutlined } from "@ant-design/icons"

const TaskTable: React.FC = () => {

  // 任务列表
  const [loading, setLoading] = useState(true)
  const [taskList, setTaskList] = useState<TaskInfo[]>([])
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [taskInfo, setTaskInfo] = useState<TaskInfo>()
  const [buttonLoading, setButtonLoading] = useState(false)
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;

  // 执行任务
  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      // {
      //   title: '序号',
      //   width: 50,
      //   render: (text, record, index) => (pageNo - 1) * pageSize + index + 1
      // },
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
        width: 80,
        ellipsis: true
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 50,
        render: (status) => <div>{taskStatusEnum[status]} {status === 2 && < Spin indicator={antIcon} />}</div>
      },
      {
        title: '失败',
        dataIndex: 'executeFail',
        key: 'executeFail',
        width: 45
      },
      {
        title: '成功',
        dataIndex: 'executeSuccess',
        key: 'executeSuccess',
        width: 45
      },
      {
        title: '未执行',
        dataIndex: 'nonExecute',
        key: 'nonExecute',
        width: 55
      },
      {
        title: '总数',
        dataIndex: 'total',
        key: 'total',
        width: 45
      },
      {
        title: '通过率',
        dataIndex: 'percentage',
        key: 'percentage',
        width: 55
      },
      {
        title: '进度',
        dataIndex: 'elapsedTime',
        key: 'elapsedTime',
        width: '15%',
        render: (text, record) => <div><Progress strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} percent={(record.executeSuccess + record.executeFail) / record.total * 100} /></div>
      },
      {
        title: '执行时间',
        dataIndex: 'executeTime',
        key: 'executeTime',
        width: 100,
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (_, record) => {
          return (
            <div className={styles.action}>
              {/* 运行中和等待中的任务不可以重跑 */}
              <Button loading={buttonLoading} disabled={record.status === 2 || record.status === 1} type="primary" onClick={() => fetchRollBackTask(record.id)}>重跑</Button>
              {/* 等待中的任务不可以暂停 */}
              {record.status !== 1 && <Button disabled={record.status === 3} onClick={() => fetchStopTask({ id: record.id, status: 1 })}>暂停</Button>}
              {/* 运行中和已完成的任务不能继续 */}
              {record.status === 1 && <Button onClick={() => fetchStopTask({ id: record.id, status: 2 })}>继续</Button>}
              <Button onClick={() => setTaskInfo(record)}>报告</Button>
            </div >
          )
        }
      }
    ]
    // 需要把operationCount添加到 useMemo 中，useMemo会缓存结果，如果监听的值(operationCount)没有发生变化，即使组件重新渲染，也不会重新发生计算，这个行为有助于避免在每个渲染上进行昂贵的计算 
  }, [loading, pageNo, pageSize])

  const onChangeTable = (value: any) => {
    const { current, pageSize } = value
    setPageNo(current)
    setPageSize(pageSize)
    setLoading(true)
  }

  /**
   * 查询任务列表
   */
  const fetchTasks = () => {
    getTasks({
      pageNo,
      pageSize: pageSize
    }).then(data => {
      setTaskList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  /**
   * 重跑任务
   * @param id 任务id
   */
  const fetchRollBackTask = (id: number) => {
    rollBackTask(id).then(req => {
      message.success(req.message)
      setLoading(true)
    }).catch(err => {
      message.error(err.message)
    })
  }

  /**
   * 停止/继续任务
   * @param data 请求体
   */
  const fetchStopTask = (data: IStopTaskReq) => {
    setButtonLoading(true)
    stopTask(data).then(req => {
      message.success(req.message)
      setLoading(true)
    }).catch(err => {
      message.error(err.message)
    }).finally(() => {
      setButtonLoading(false)
    })
  }

  /**
   * 当loading为true时自动刷新页面
   */
  useEffect(() => {
    loading && fetchTasks()
  }, [pageNo, loading])

  return (
    <MView resize>
      <PageHeader title="任务列表" />
      <Table
        columns={columns}
        dataSource={taskList}
        className={styles.table}
        rowKey='id'
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        onChange={onChangeTable}
      />
      <TaskReportModal taskInfo={taskInfo} onCancel={() => setTaskInfo(undefined)} />
    </MView>
  )
}

export default TaskTable
