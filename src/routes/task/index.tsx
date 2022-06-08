import { MView, PageHeader } from "@/components"
import { getTasks } from "@/services/task"
import { Button, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import { render } from "react-dom"
import styles from './index.module.less'

const Task: React.FC = () => {
  // 素材列表
  const [taskList, setTaskList] = useState<TaskInfo[]>([])
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(true)

  // 加入用例的素材信息
  const [addInfo, setAddInfo] = useState<TaskInfo>()
  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '任务名称',
        dataIndex: 'taskName',
        key: 'taskName'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '通过率',
        dataIndex: 'percentage',
        key: 'percentage'
      },
      {
        title: '执行失败（个）',
        dataIndex: 'executeFail',
        key: 'executeFail'
      },
      {
        title: '执行成功（个）',
        dataIndex: 'executeSuccess',
        key: 'executeSuccess'
      },
      {
        title: '未执行（个）',
        dataIndex: 'nonExecute',
        key: 'nonExecute'
      },
      {
        title: '执行耗时',
        dataIndex: 'elapsedTime',
        key: 'elapsedTime'
      },
      {
        title: '执行时间',
        dataIndex: 'executeTime',
        key: 'executeTime',
        width: 200,
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      }
    ]
  }, [])

  const onChangeTable = ({ current }: any) => {
    setPageNo(current)
    setLoading(true)
  }

  const fetchTasks = () => {
    getTasks({
      pageNo,
      pageSize: 10
    }).then(data => {
      setTaskList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

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
      {/* <Button type='primary'>ceshi</Button> */}
    </MView>
  )
}

export default Task