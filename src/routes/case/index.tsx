import { MView, PageHeader } from "@/components"
import { getCaseList } from "@/services/case"
import IRootState from "@/store/interface"
import { Button, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import styles from './index.module.less'
import { useSelector } from 'react-redux'
import { getGameDict } from "@/services/material"

const Case: React.FC = () => {
  // 用例列表
  const [caseList, setCaseList] = useState<CaseInfo[]>([])
  // 素材类型列表
  const gameDictList = useSelector<IRootState, GameDictInfo[]>(state => state.material.gameDictList)
  // 表格用
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(true)
  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '用例id',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '学校',
        dataIndex: 'schoolName',
        key: 'schoolName',
      },
      {
        title: '用例描述',
        dataIndex: 'caseDesc',
        key: 'caseDesc',
      },
      {
        title: '返回区间值',
        dataIndex: 'minValue',
        key: 'minValue',
        width: 120,
        render: (_, record) => <div>{record.minValue} ~ {record.maxValue}</div>
      },
      {
        title: '用例类别',
        dataIndex: 'gameDictId',
        key: 'gameDictId',
        width: 90,
        render: (text) => {
          const gameDict = (gameDictList || []).find(item => item.id === text)

          return <div>{gameDict ? gameDict.name : ''}</div>
        }
      },
      {
        title: '更新时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: 200,
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '素材oss地址',
        dataIndex: 'material',
        key: 'material',
        width: '15%',
        ellipsis: true,
        render: (text) => {
          const devices = text ? JSON.parse(text).devices : []
          return (
            <div className={styles.buttonGroup}>
              {devices.map((item: any) => (
                <Button
                  key={item.id}
                  type='link'
                  className={styles.button}>
                  {item.pullUrl}
                </Button>
              ))}
            </div>
          )
        }
      },
      {
        title: '操作项',
        dataIndex: 'action',
        key: 'action',
        width: 250,
        render: (_, record) => {
          return (
            <div className={styles.action}>
              <Button type='primary'>创建任务</Button>
              <Button>编辑</Button>
              <Button>删除</Button>
            </div>
          )
        }
      },
    ]
  }, [gameDictList])

  const onChangeTable = ({ current }: any) => {
    setPageNo(current)
    setLoading(true)
  }

  const fetchCaseList = () => {
    getCaseList({
      pageNo,
      pageSize: 10
    }).then(data => {
      setCaseList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  useEffect(() => {
    !gameDictList.length && getGameDict()
  }, [])

  useEffect(() => {
    loading && fetchCaseList()
  }, [pageNo, loading])

  return (
    <MView resize>
      <PageHeader title="用例列表" />
      <Table
        columns={columns}
        dataSource={caseList}
        className={styles.table}
        rowKey='id'
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        onChange={onChangeTable}
      />
    </MView>
  )
}

export default Case