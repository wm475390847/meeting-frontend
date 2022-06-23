import { MView, PageHeader } from "@/components"
import CaseFormModal from "@/components/CaseFormModal"
import CreateTaskModal from "@/components/CrtateTaskModal"
import { Button, DatePicker, Input, Space } from "antd"
import moment from "moment"
import React, { useState } from "react"
import CaseTable from "./components/caseTable"
import styles from './index.module.less'

const Case: React.FC = () => {
  const { Search } = Input
  // 素材类型列表
  const [loading, setLoading] = useState(true)
  const [editInfo, setEditInfo] = useState<CaseInfo>()
  const [visible, setVisible] = useState(false)
  const [caseDesc, setCaseDesc] = useState<string>()
  const [startTime, setStartTime] = useState<number>()
  const [endTime, setEndTime] = useState<number>()
  const RangePicker: any = DatePicker.RangePicker;

  const onSearch = (value: string) => {
    setCaseDesc(value)
  }

  const onChange = (value: string) => {
    if (!Array.isArray(value)) {
      setStartTime(undefined)
      setEndTime(undefined)
      return
    }
    setStartTime(moment(value[0]).valueOf())
    setEndTime(moment(value[1]).valueOf())
  }

  return (
    <MView resize>
      <PageHeader title="用例列表" />
      <div className={styles.action}>
        <Search className={styles.search} placeholder="用例名称" onSearch={onSearch} enterButton />
        <Space className={styles.space} direction="vertical" size={12}><RangePicker onChange={onChange} /></Space>
        <Button className={styles.button} type="primary" onClick={() => setVisible(true)}>创建任务</Button>
      </div>

      <CreateTaskModal
        visible={visible}
        onCancel={() => setVisible(false)}
        setLoading={setLoading}
      />

      <CaseTable
        loading={loading}
        setLoading={setLoading}
        setEditInfo={setEditInfo}
        searchCaseInfo={{ startTime: startTime, endTime: endTime, caseDesc: caseDesc }}
      />

      <CaseFormModal
        isEdit
        editInfo={editInfo}
        setLoading={setLoading}
        onCancel={() => setEditInfo(undefined)}
      />

    </MView>
  )
}

export default Case