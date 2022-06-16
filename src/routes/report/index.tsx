import { getTaskReport } from '@/services/task';
import { Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { caseHistoryEnum } from '@/constants';
import { useSelector } from 'react-redux';
import IRootState from '@/store/interface';
import { getGameDict } from '@/services/material';

type ReportTableComponentsProps = {
  taskId: number
  caseResult: number
  onCancel?: () => void
}

const ReportTable: React.FC<ReportTableComponentsProps> = (props) => {
  const { caseResult, taskId, onCancel } = props
  const [reportList, setReportList] = useState<ReportInfo[]>([])
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const gameDictList = useSelector<IRootState, GameDictInfo[]>(state => state.material.gameDictList)

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
        title: '类型',
        dataIndex: 'gameDictId',
        key: 'gameDictId',
        width: '20%',
        render: (text) => {
          const gameDict = (gameDictList || []).find(item => item.id === text)
          return <div>{gameDict ? gameDict.name : '未知'}</div>
        }
      },
      {
        title: '用例结果',
        dataIndex: 'caseResult',
        key: 'caseResult',
        width: '20%',
        render: (status) => <div>{caseHistoryEnum[status]}</div>
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
      pageSize: pageSize,
      id: taskId,
      caseResult: caseResult
    }).then(data => {
      setReportList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  /**
   *  监听pageNo变化时刷新列表
   */
  useEffect(() => {
    pageNo && fetchReportList()
  }, [pageNo])

  useEffect(() => {
    !gameDictList.length && getGameDict()
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={reportList}
      onChange={onChangeTable}
      pagination={{ total, current: pageNo, showSizeChanger: true }}
      loading={loading}
      rowKey="id"
    >
    </Table>
  );
};

export default ReportTable;