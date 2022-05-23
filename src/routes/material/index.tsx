import { MView, PageHeader, PageOptions } from "@/components"
import Video from "@/components/Video"
import { getGameDict, getMaterials } from "@/services/material"
import { Button, Select, Table, Modal } from "antd"
import { ColumnsType } from "antd/lib/table"
import moment from "moment"
import React, { useEffect, useMemo, useState } from "react"
import MaterialForm from "./components/form"
import styles from './index.module.less'

const { Option } = Select

const Material: React.FC = () => {
  // const [schoolList, setSchoolList] = useState<SchoolInfo[]>([])
  // 素材列表
  const [materialList, setMaterialList] = useState<MaterialInfo[]>([])
  // 素材类型列表
  const [gameDictList, setGameDictList] = useState<GameDictInfo[]>([])
  // 表格用
  const [total, setTotal] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const [loading, setLoading] = useState(true)
  // 弹框播放video的src
  const [videoSrc, setVideoSrc] = useState<string>()
  // 加入用例的素材信息
  const [addInfo, setAddInfo] = useState<MaterialInfo>()
  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        render: (text, record, index) => `${index + 1}`
      },
      {
        title: '学校',
        dataIndex: 'schoolName',
        key: 'schoolName',
      },
      {
        title: '素材类型',
        dataIndex: 'gameDictId',
        key: 'gameDictId',
        render: (text) => {
          const gameDict = (gameDictList || []).find(item => item.id === text)

          return <div>{gameDict ? gameDict.name : ''}</div>
        }
      },
      {
        title: '录制时间',
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        width: 200,
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
                <Button
                  key={item.id}
                  type='link'
                  className={styles.button}
                  onClick={() => setVideoSrc(item.pullUrl)}>
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
        render: (_, record) => (
          <Button type="primary" onClick={() => setAddInfo(record)}>加入用例</Button>
        )
      },
    ]
  }, [gameDictList])

  const onChangeTable = ({ current }: any) => {
    setPageNo(current)
    setLoading(true)
  }

  const fetchMaterials = () => {
    getMaterials({
      pageNo,
      pageSize: 10
    }).then(data => {
      setMaterialList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  const fetchGameDict = () => {
    getGameDict().then(data => {
      setGameDictList(data)
    })
  }

  useEffect(() => {
    fetchGameDict()
  }, [])

  useEffect(() => {
    loading && fetchMaterials()
  }, [pageNo, loading])

  return (
    <MView resize>
      <PageHeader title="素材列表" />
      {/* <PageOptions
        left={
          <>
            <div className={styles.filterType}>
              <div className={styles.tag}>学校</div>
              <Select
                placeholder='请选择类型'
                allowClear
                className={styles.select}
              >
                {schoolList.map(item => {
                  return <Option value={item.type} key={item.type}>{item.type}</Option>
                })}
              </Select>
            </div>
          </>
        }
      /> */}
      <Table
        columns={columns}
        dataSource={materialList}
        className={styles.table}
        rowKey='id'
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        onChange={onChangeTable}
      />

      <Modal
        visible={!!videoSrc}
        title='视频'
        footer={null}
        destroyOnClose
        maskClosable={false}
        onCancel={() => setVideoSrc(undefined)}
      >
        <Video src={videoSrc} autoPlay />
      </Modal>

      <MaterialForm addInfo={addInfo} setAddInfo={setAddInfo} gameDictList={gameDictList} />
    </MView>
  )
}

export default Material