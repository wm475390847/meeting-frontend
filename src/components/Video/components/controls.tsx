import React, { useState } from 'react'
import styles from './controls.module.less'
import classnames from 'classnames'
import { CaretRightOutlined, PauseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

type ControlsComponentsProps = {
  video: HTMLVideoElement
  videoWrapper: HTMLDivElement
  className?: string
  style?: React.CSSProperties
  onEnded?: () => void
}

// 格式化时间
const formatTime = (time: number) => {
  const minute = `${Math.floor(time / 60)}`
  const second = `${Math.round(time % 60)}`
  return `${minute.length < 2 ? `0${minute}` : minute}:${second.length < 2 ? `0${second}` : second}`
}

const Controls: React.FC<ControlsComponentsProps> = (props) => {
  const { video, videoWrapper, className, style, onEnded } = props
  const [paused, setPaused] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [duration, setDuration] = useState('')
  const [progressScale, setProgressScale] = useState(0)
  const [isMouseDown, setIsMouseDown] = useState(false)

  // 视频开始暂停
  const onSwitchState = () => {
    if (paused) {
      video.play()
    } else {
      video.pause()
    }
    setPaused(video.paused)
  }

  // 切换全屏
  const onSwitchFullscreen = async () => {
    if (fullscreen) {
      await document.exitFullscreen()
    } else {
      await videoWrapper.requestFullscreen()
    }

    setFullscreen(!!document.fullscreenElement)
  }

  // 点击跳转
  const onProgressMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMouseDown(true)
    onChangeProgress(event)
  }

  const onProgressMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    isMouseDown && onChangeProgress(event)
  }

  const onProgressMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsMouseDown(false)
    onChangeProgress(event)
  }

  const onChangeProgress = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const offset = event.clientX - (event.target as HTMLDivElement).getBoundingClientRect().left
    let percentage = (offset / event.currentTarget.clientWidth) * 100
    if (percentage < 0) percentage = 0
    if (percentage > 100) percentage = 100
    video.currentTime = video.duration * (percentage / 100)
    setProgressScale(percentage)
    setCurrentTime(formatTime(video.currentTime))
  }

  return (
    <div className={classnames(styles.controls, className)} style={style}>
      <div className={styles.content}>
        {paused ?
          <CaretRightOutlined className={styles.icon} onClick={onSwitchState} /> :
          <PauseOutlined className={styles.icon} onClick={onSwitchState} />
        }
        <div className={styles.center}>
          <div className={styles.progress}>
            <div className={styles.position} style={{ width: `${progressScale}%` }}></div>
            <div className={styles.positionCircle} style={{ left: `calc(${progressScale}% - 0.3125em)` }}></div>
            <div
              className={styles.progressEvent}
              onMouseDown={onProgressMouseDown}
              onMouseMove={onProgressMouseMove}
              onMouseUp={onProgressMouseUp}
            />
          </div>
          <div className={styles.time}>
            <div>{currentTime}</div>
            <div>/</div>
            <div>{duration}</div>
          </div>
        </div>
        {fullscreen ?
          <FullscreenExitOutlined className={styles.icon} onClick={onSwitchFullscreen} /> :
          <FullscreenOutlined className={styles.icon} onClick={onSwitchFullscreen} />
        }
      </div>
    </div>
  )
}

export default Controls