import { delCase, getCases } from '@/services/case'
import { getGameDict } from '@/services/material'
import { createTask } from '@/services/task'
import { Button, message, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useSelector } from 'react-redux'
import VideoModal from '@/components/VideoModal'
import IRootState from '@/store/interface'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { IDelCaseReq } from '@/services/case/interface'

interface CaseTableComponentsProps {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setEditInfo: React.Dispatch<React.SetStateAction<CaseInfo | undefined>>
}
interface ICaseRecord {
  id: number;
  caseDesc: string
}

const CaseTable: React.FC<CaseTableComponentsProps> = (props) => {
  // 为父类的传参
  const { loading, setLoading, setEditInfo } = props
  // 用例列表
  const [caseList, setCaseList] = useState<CaseInfo[]>([])
  // 弹框播放video的src
  const [videoSrc, setVideoSrc] = useState<string>()
  // 表格用
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // 素材类型列表
  const gameDictList = useSelector<IRootState, GameDictInfo[]>(state => state.material.gameDictList)

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: 80,
        render: (text, record, index) => (pageNo - 1) * pageSize + index + 1
      },
      {
        title: '用例id',
        dataIndex: 'id',
        key: 'id',
        width: 80
      },
      {
        title: '用例描述',
        dataIndex: 'caseDesc',
        key: 'caseDesc',
        width: 120,
        ellipsis: true
      },
      {
        title: '区间值',
        dataIndex: 'minValue',
        key: 'minValue',
        width: 90,
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
        width: 180,
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
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 250,
        render: (_, record) => {
          return (
            <div className={styles.action}>
              <Popconfirm title="创建后任务只含一个case" okText="是" cancelText="否" onConfirm={() => fetchCaseCreateTask(record)}>
                <Button type='primary'>创建任务</Button>
              </Popconfirm>
              <Button onClick={() => setEditInfo(record)}>编辑</Button>
              <Popconfirm title="确定删除？" okText="是" cancelText="否" onConfirm={() => fetchDelCase({ caseIds: [record.id] })}>
                <Button>删除</Button>
              </Popconfirm>
            </div>
          )
        }
      },
    ]
  }, [gameDictList, pageNo, pageSize])

  const onChangeTable = (value: any) => {
    const { current, pageSize } = value
    setPageNo(current)
    setPageSize(pageSize)
    setLoading(true)
  }

  /**
   * 删除用例
   * @param data 用例id集合
   */
  const fetchDelCase = (data: IDelCaseReq) => {
    delCase(data).then(req => {
      message.success(req.message)
      setLoading(true)
    }).catch(err => {
      message.error(err.message)
    })
  }

  /**
   * 单个用例创建任务
   * @param data 请求体
   */
  const fetchCaseCreateTask = (data: ICaseRecord) => {
    createTask({
      caseIds: [data.id],
      taskName: data.caseDesc
    }).then(req => {
      message.success(req.message)
      setLoading(true)
    }).catch(err => {
      message.error(err.message)
    })
  }

  /**
   * 获取用例列表
   */
  const fetchCases = () => {
    getCases({
      pageNo,
      pageSize: pageSize
    }).then(data => {
      setCaseList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  useEffect(() => {
    !gameDictList.length && getGameDict()
  }, [])

  /**
   * 此处判断loading是否为true是的话就调用访问列表方法，因此需要刷新的操作都需要setLoading(true)
   */
  useEffect(() => {
    loading && fetchCases()
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