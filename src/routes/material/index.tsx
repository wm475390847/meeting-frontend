import { MView, PageHeader } from "@/components"
import { Button } from "antd"
import React from "react"

const Material: React.FC = () => {
  return (
    <MView resize>
      <PageHeader title="素材列表" />
      <Button type='primary'>ceshi</Button>
    </MView>
  )
}

export default Material