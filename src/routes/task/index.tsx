import { MView, PageHeader } from "@/components"
import { getTaskReport, getTasks, rollBackTask, stopTask } from "@/services/task"
import { Button, message, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import { render } from "react-dom"
import { taskStatusEnum } from '../../constants'
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import styles from './index.module.less'
import { ITaskRepoerReq, IStopTaskReq } from "@/services/task/interface"

const Task: React.FC = () => {
  // 操作数量
  const [operationCount, setOperationCount] = useState(0)
  // 素材列表
  const [taskList, setTaskList] = useState<TaskInfo[]>([])
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)

  interface ICaseHistoryRecord {
    caseResult: number
    id: number
  }

  // 执行任务
  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: 60,
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName',
        width: 100,
        ellipsis: true
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status) => <div>{taskStatusEnum[status]}</div>
      },
      {
        title: '通过率',
        dataIndex: 'percentage',
        key: 'percentage',
        width: 100
      },
      {
        title: '失败',
        dataIndex: 'executeFail',
        key: 'executeFail',
        width: 80
      },
      {
        title: '成功',
        dataIndex: 'executeSuccess',
        key: 'executeSuccess',
        width: 80
      },
      {
        title: '未执行',
        dataIndex: 'nonExecute',
        key: 'nonExecute',
        width: 80
      },
      {
        title: '耗时(ms)',
        dataIndex: 'elapsedTime',
        key: 'elapsedTime',
        width: 100
      },
      {
        title: '执行时间',
        dataIndex: 'executeTime',
        key: 'executeTime',
        width: 180,
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
          return (
            <div className={styles.action}>
              <Button disabled={record.status === 3} onClick={() => fetchGetReport(record)}>报告</Button>
              {/* 运行中和等待中的任务不可以重跑 */}
              <Button disabled={record.status === 2 || record.status === 1} type='primary' onClick={() => fetchRollBackTask(record.id)}>重跑</Button>
              {/* 等待中的任务不可以暂停 */}
              {record.status !== 1 && <Button disabled={record.status === 3} onClick={() => fetchStopTask({ id: record.id, status: 1 })}>暂停</Button>}
              {/* 运行中和已完成的任务不能继续 */}
              {record.status === 1 && <Button onClick={() => fetchStopTask({ id: record.id, status: 2 })}>继续</Button>}
            </div >
          )
        }
      }
    ]
    // 需要把operationCount添加到 useMemo 中，useMemo会缓存结果，如果监听的值(operationCount)没有发生变化，即使组件重新渲染，也不会重新发生计算，这个行为有助于避免在每个渲染上进行昂贵的计算 
  }, [operationCount])

  const onChangeTable = ({ current }: any) => {
    setPageNo(current)
  }

  /**
   * 查询任务列表
   */
  const fetchFetchTasks = () => {
    setLoading(true)
    getTasks({
      pageNo,
      pageSize: 10
    }).then(data => {
      setTaskList(data.records)
      setTotal(data.total)
    }).finally(() => {
      setLoading(false)
    })
  }

  /**
   * 重新执行任务
   * @param id 任务id
   */
  const fetchRollBackTask = (id: number) => {
    rollBackTask(id).then(req => {
      message.success(req.data)
      setOperationCount(operationCount + 1)
    }).catch(err => {
      message.error(err.message)
    })
  }

  /**
   * 停止/继续任务
   * @param data 请求体
   */
  const fetchStopTask = (data: IStopTaskReq) => {
    stopTask(data).then(req => {
      message.success(req.data)
      setOperationCount(operationCount + 1)
    }).catch(err => {
      message.error(err.message)
    })
  }

  /**
   * 获取报告
   * @param data 请求体
   */
  const fetchGetReport = (data: ICaseHistoryRecord) => {
    getTaskReport({
      pageNo,
      pageSize: 10,
      id: data.id,
      caseResult: data.caseResult
    }).then(req => {
      message.success(req.data)
    }).catch(err => {
      message.error(err.message)
    })
  }

  /**
   * 当页码、操作数据有变化时刷新列表
   */
  useEffect(() => {
    console.log(99)
    fetchFetchTasks()
  }, [pageNo, operationCount])

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
    </MView>
  )
}

export default Task