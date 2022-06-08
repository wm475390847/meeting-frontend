import { MView, PageHeader } from "@/components"
import { getTasks, rollBackTask, stopTask } from "@/services/task"
import { Button, message, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import { render } from "react-dom"
import { taskStatusEnum } from '../../constants'
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import styles from './index.module.less'
import { IStopTaskReq } from "@/services/task/interface"

const Task: React.FC = () => {
  // 操作数量
  const [operationCount, setOperationCount] = useState(0)
  // 素材列表
  const [taskList, setTaskList] = useState<TaskInfo[]>([])
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(false)

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
        width: 100
      },
      {
        title: '成功',
        dataIndex: 'executeSuccess',
        key: 'executeSuccess',
        width: 100
      },
      {
        title: '未执行',
        dataIndex: 'nonExecute',
        key: 'nonExecute',
        width: 100
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
        width: 200,
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '操作项',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => {
          return (
            <div className={styles.action}>
              {/* 如果状态是2则不可以执行 */}
              <Button disabled={record.status === 2} type='primary' onClick={() => actionRollBackTask(record.id)}>重跑</Button>
              <Button disabled={record.status === 3} onClick={() => actionStopTask({ id: record.id, status: 1 })}>暂停</Button>
            </div >
          )
        }
      }
    ]
  }, [])

  const onChangeTable = ({ current }: any) => {
    setPageNo(current)
  }

  /**
   * 查询任务列表
   */
  const actionFetchTasks = () => {
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
  const actionRollBackTask = (id: number) => {
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
  const actionStopTask = (data: IStopTaskReq) => {
    stopTask(data).then(req => {
      message.success(req.data)
      setOperationCount(operationCount + 1)
    }).catch(err => {
      message.error(err.message)
    })
  }

  /**
   * 当页码、操作数据有变化时刷新列表
   */
  useEffect(() => {
    actionFetchTasks()
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