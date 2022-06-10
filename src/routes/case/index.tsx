import { MView, PageHeader } from "@/components"
import CaseFormModal from "@/components/CaseFormModal"
import CreateTaskModal from "@/components/CrtateTaskModal"
import { getGameDict } from "@/services/material"
import { Button } from "antd"
import React, { useEffect, useState } from "react"
import CaseTable from "./components/caseTable"
import styles from './index.module.less'

const Case: React.FC = () => {
  // 素材类型列表
  const [loading, setLoading] = useState(true)
  const [editInfo, setEditInfo] = useState<CaseInfo>()
  const [visible, setVisible] = useState(false)

  return (
    <MView resize>
      <PageHeader title="用例列表" />
      <div className={styles.action}><Button type="primary" onClick={() => setVisible(true)}>创建任务</Button> </div>

      <CreateTaskModal
        visible={visible}
        onCancel={() => setVisible(false)}
        setLoading={setLoading}
      />

      <CaseTable
        loading={loading}
        setLoading={setLoading}
        setEditInfo={setEditInfo}
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