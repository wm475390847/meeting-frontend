import React from "react"
import styles from './index.module.less'

type PageOptionsProps = {
  left?: React.ReactNode
  right?: React.ReactNode
}

const PageOptions: React.FC<PageOptionsProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{props.left}</div>
      <div className={styles.right}>{props.right}</div>
    </div>
  )
}

export default PageOptions