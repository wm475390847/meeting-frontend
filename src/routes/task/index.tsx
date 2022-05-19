import { MView, PageHeader } from "@/components"
import { Button } from "antd"
import React from "react"

const Task: React.FC = () => {
  return (
    <MView resize>
      <PageHeader title="任务列表" />
      <Button type='primary'>ceshi</Button>
    </MView>
  )
}

export default Task