import { MView, PageHeader } from "@/components"
import CaseFormModal from "@/components/CaseFormModal"
import React, { useState } from "react"
import CaseTable from "./components/caseTable"

const Case: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [editInfo, setEditInfo] = useState<CaseInfo>()
  return (
    <MView resize>
      <PageHeader title="用例列表" />
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