import React from "react";
import MHeader from "../Base/Header";

type PageHeaderProps = {
  title: string
}

const PageHeader: React.FC<PageHeaderProps> = props => {
  const { title } = props

  return (
    <MHeader
      title={title}
    />
  )
}

export default PageHeader