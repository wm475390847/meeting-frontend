import { MView, PageHeader } from "@/components"
import { Button } from "antd"
import React from "react"

const Example: React.FC = () => {
  return (
    <MView resize>
      <PageHeader title="用例列表" />
      <Button type='primary'>ceshi</Button>
    </MView>
  )
}

export default Example