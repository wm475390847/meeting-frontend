import { VideoCameraOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import styles from './mask.module.less'

type MaskComponentsProps = {
  mask?: JSX.Element
  videoState: 'loading' | 'playing' | 'none' | 'error'
}

const Mask: React.FC<MaskComponentsProps> = (props) => {
  const { mask, videoState } = props

  if (mask) {
    return (
      <div className={styles.mask}>{mask}</div>
    )
  }

  if (videoState === 'none') {
    return (
      <div className={styles.mask}>
        <img src='https://t.newscdn.cn/physical-education-boss/emptyBox.svg' className={styles.icon} />
        <div>暂无内容</div>
      </div>
    )
  }

  return (
    <div className={styles.mask}>
      <VideoCameraOutlined className={styles.icon} />
      {(() => {
        switch (videoState) {
          case 'loading':
            return <div>视频在加载中… 请稍后</div>
          case 'error':
            return <div>视频加载失败，请<Button type='link'>重试</Button></div>
          default:
            return null
        }
      })()}
    </div>
  )
}

export default Mask