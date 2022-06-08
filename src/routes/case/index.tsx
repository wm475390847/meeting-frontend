import { MView, PageHeader } from "@/components"
import CaseFormModal from "@/components/CaseFormModal"
import React, { useState } from "react"
import CaseTable from "./components/caseTable"

const Case: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [editInfo, setEditInfo] = useState<CaseInfo>()
  console.log(888)
  return (
    <MView resize>
      <PageHeader title="用例列表" />
      <CaseTable
        setEditInfo={setEditInfo}
      />

      <CaseFormModal
        isEdit
        editInfo={editInfo}
        onCancel={() => setEditInfo(undefined)}
      />
    </MView>
  )
}

export default Case