import VideoModal from '@/components/VideoModal'
import { delCases, getCases } from '@/services/case'
import { getGameDict } from '@/services/material'
import IRootState from '@/store/interface'
import { Button, message, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './index.module.less'

interface CaseTableComponentsProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setEditInfo: React.Dispatch<React.SetStateAction<CaseInfo | undefined>>
}

const CaseTable: React.FC<CaseTableComponentsProps> = (props) => {
  const { loading, setLoading, setEditInfo } = props
  // 用例列表
  const [caseList, setCaseList] = useState<CaseInfo[]>([])
  // 素材类型列表
  const gameDictList = useSelector<IRootState, GameDictInfo[]>(state => state.material.gameDictList)
  // 表格用
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  // 弹框播放video的src
  const [videoSrc, setVideoSrc] = useState<string>()
  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: 60,
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '用例id',
        dataIndex: 'id',
        key: 'id',
        width: 80
      },
      // {
      //   title: '学校',
      //   dataIndex: 'schoolName',
      //   key: 'schoolName',
      // },
      {
        title: '用例描述',
        dataIndex: 'caseDesc',
        key: 'caseDesc',
        width: 100,
        ellipsis: true
      },
      {
        title: '区间值',
        dataIndex: 'minValue',
        key: 'minValue',
        width: 80,
        render: (_, record) => <div>{record.minValue} ~ {record.maxValue}</div>
      },
      {
        title: '类别',
        dataIndex: 'gameDictId',
        key: 'gameDictId',
        width: 80,
        render: (text) => {
          const gameDict = (gameDictList || []).find(item => item.id === text)

          return <div>{gameDict ? gameDict.name : ''}</div>
        }
      },
      {
        title: '更新时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: 150,
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: 'oss地址',
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
                  className={styles.button}
                  onClick={() => setVideoSrc(item.pullUrl)}
                >
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
              <Button onClick={() => setEditInfo(record)}>编辑</Button>
              <Popconfirm title="确定删除？" okText="是" cancelText="否" onConfirm={() => fetchDelCase(record.id)}>
                <Button>删除</Button>
              </Popconfirm>
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

  const fetchDelCase = (id: number) => {
    delCases(id).then(() => {
      message.success('删除成功')
      setLoading(true)
    })
  }

  const fetchCaseList = () => {
    getCases({
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
    <>
      <Table
        columns={columns}
        dataSource={caseList}
        className={styles.table}
        rowKey='id'
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        onChange={onChangeTable}
      />

      <VideoModal src={videoSrc} onCancel={() => setVideoSrc(undefined)} />
    </>
  )
}

export default CaseTable