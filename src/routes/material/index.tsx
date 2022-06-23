import { MView, PageHeader } from "@/components"
import { getGameDict, getMaterialList } from "@/services/material"
import { Button, DatePicker, Input, Radio, RadioChangeEvent, Space, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import styles from './index.module.less'
import { useSelector } from 'react-redux'
import IRootState from "@/store/interface"
import VideoModal from "@/components/VideoModal"
import CaseFormModal from "@/components/CaseFormModal"

const MaterialTable: React.FC = () => {

  // 素材列表
  const [materialList, setMaterialList] = useState<MaterialInfo[]>([])
  // 素材类型列表
  const gameDictList = useSelector<IRootState, GameDictInfo[]>(state => state.material.gameDictList)
  const RangePicker: any = DatePicker.RangePicker;

  // 表格用
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  // 弹框播放video的src
  const [videoSrc, setVideoSrc] = useState<string>()
  // 加入用例的素材信息
  const [addInfo, setAddInfo] = useState<TaskInfo>()

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: '10%',
        render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
      },
      {
        title: '类别',
        dataIndex: 'gameDictId',
        key: 'gameDictId',
        width: '10%',
        render: (text) => {
          const gameDict = (gameDictList || []).find(item => item.id === text)
          return <div>{gameDict ? gameDict.name : ''}</div>
        }
      },
      {
        title: '录制时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: '20%',
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: 'oss地址',
        dataIndex: 'material',
        key: 'material',
        width: '40%',
        ellipsis: true,
        render: (text) => {
          const devices = text ? JSON.parse(text).devices : []
          return (
            <div className={styles.buttonGroup}>
              {devices.map((item: any) => (
                <Tooltip title={item.pullUrl}>
                  <Button key={item.id} type='link' className={styles.button} onClick={() => setVideoSrc(item.pullUrl)}>{item.pullUrl}</Button>
                </Tooltip>
              ))}
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (_, record) => (<Button type="primary" onClick={() => setAddInfo(record)}>加入用例</Button>)
      },
    ]
  }, [gameDictList, pageNo, pageSize])

  /**
   * 获取当前页码
   * @param param0 
   */
  const onChangeTable = (value: any) => {
    const { current, pageSize } = value
    setPageNo(current)
    setPageSize(pageSize)
    setLoading(true)
  }

  /**
   * 查询素材列表
   */
  const fetchMaterials = () => {
    getMaterialList({
      pageNo,
      pageSize: pageSize
    }).then(data => {
      setMaterialList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  useEffect(() => {
    !gameDictList.length && getGameDict()
  }, [])

  useEffect(() => {
    loading && fetchMaterials()
  }, [pageNo, loading])

  return (
    <MView resize>
      <PageHeader title="素材列表" />
      <Table
        columns={columns}
        dataSource={materialList}
        className={styles.table}
        rowKey='id'
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        onChange={onChangeTable}
      />

      <VideoModal src={videoSrc} onCancel={() => setVideoSrc(undefined)} />
      <CaseFormModal editInfo={addInfo} onCancel={() => setAddInfo(undefined)} setLoading={setLoading} />
    </MView>
  )
}

export default MaterialTable