import { MView, PageHeader } from "@/components"
import React, { useState } from "react"
import TaskTable from "./components/taskTable"

const Task: React.FC = () => {
  const [loading, setLoading] = useState(true)
  return (
    <MView resize>
      <PageHeader title="任务列表" />
      <TaskTable
        loading={loading}
        setLoading={setLoading}
      />

      {/* <CaseFormModal
        setLoading={setLoading}
      /> */}
    </MView>
  )
}

export default Task