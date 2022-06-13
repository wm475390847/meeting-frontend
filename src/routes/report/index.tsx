import { getTaskReport } from '@/services/task';
import { Button, Collapse, Modal, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';

type TaskReportTableComponentsProps = {
  taskId: number
  caseResult: number
  onCancel?: () => void
}

const TaskReportTable: React.FC<TaskReportTableComponentsProps> = (props) => {
  const { caseResult, taskId, onCancel } = props
  const [reportList, setReportList] = useState<ReportInfo[]>([])
  const [pageNo, setPageNo] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const onChangeTable = (value: any) => {
    const { current, pageSize } = value
    setPageNo(current)
    setPageSize(pageSize)
    setLoading(true)
  }

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '用例描述',
        dataIndex: 'caseDesc',
        key: 'caseDesc',
        width: '20%'
      },
      {
        title: '用例结果',
        dataIndex: 'caseResult',
        key: 'caseResult',
        width: '20%'
      },
      {
        title: '错误原因',
        dataIndex: 'caseMessage',
        key: 'caseMessage',
        width: '20%'
      },
      {
        title: '区间值',
        dataIndex: 'minValue',
        key: 'minValue',
        width: '20%',
        render: (_, record) => <div>{record.minValue} ~ {record.maxValue}</div>
      },
      {
        title: '计算结果',
        dataIndex: 'score',
        key: 'score',
        width: '20%'
      }
    ]
  }, [pageNo, pageSize])

  /**
   * 获取报告
   */
  const fetchReportList = () => {
    getTaskReport({
      pageNo: pageNo,
      pageSize: 10,
      id: taskId,
      caseResult: caseResult
    }).then(data => {
      setReportList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  useEffect(() => {
    loading && fetchReportList()
  }, [loading])

  /**
   *  监听pageNo变化时刷新列表
   */
  useEffect(() => {
    console.log('pageNo', pageNo)
    pageNo && fetchReportList()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={reportList}
      onChange={onChangeTable}
      pagination={{ total, current: pageNo, showSizeChanger: true }}
      loading={loading}
    >
    </Table>
  );
};

export default TaskReportTable;