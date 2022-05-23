import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.less'
import classnames from 'classnames'
import Controls from './components/controls'
import Mask from './components/mask'

type VideoProps = {
  src?: string
  autoPlay?: boolean
  controls?: boolean
  mask?: JSX.Element
  onCanplay?: (video: HTMLVideoElement) => void
  onError?: (video: HTMLVideoElement) => void
  onTimeupdate?: (video: HTMLVideoElement) => void
  onEnded?: () => void
  className?: string
  style?: React.CSSProperties
  muted?: boolean
  children?: JSX.Element
}

const Video: React.FC<VideoProps> = (props) => {
  const {
    src,
    autoPlay,
    controls,
    mask,
    onCanplay,
    onError,
    onTimeupdate,
    onEnded,
    className,
    style,
    muted,
    children,
  } = props
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapperRef = useRef<HTMLDivElement>(null)
  const mouseMoveTimer = useRef<NodeJS.Timeout | null>(null)

  const [videoState, setVideoState] = useState<'loading' | 'playing'| 'none' | 'error'>('loading')
  const [isShowControls, setIsShowControls] = useState<boolean>(false)

  // 鼠标在视频上移动时出控制栏
  const onHandleMouseMove = () => {
    setIsShowControls(true)

    if (mouseMoveTimer.current) {
      clearTimeout(mouseMoveTimer.current)
      mouseMoveTimer.current = null
    }

    mouseMoveTimer.current = setTimeout(() => {
      setIsShowControls(false)
    }, 5000);
  }

  // 鼠标离开视频的时候控制栏立刻消失
  const onHandleMouseLeave = () => {
    if (mouseMoveTimer.current) {
      clearTimeout(mouseMoveTimer.current)
      mouseMoveTimer.current = null
    }
    setIsShowControls(false)
  }

  const initVideo = () => {
    if (!src) {
      setVideoState('none')
    } else {
      autoPlay && videoRef.current!.play()
    }
  }

  const initEvent = () => {
    if (videoRef.current) {
      videoRef.current.addEventListener('canplay', () => {
        setVideoState('playing')
        onCanplay && onCanplay(videoRef.current!)
      })
      videoRef.current.addEventListener('timeupdate', () => {
        onTimeupdate && onTimeupdate(videoRef.current!)
      })
    }
  }

  useEffect(() => {
    initVideo()
    initEvent()
  }, [])

  return (
    <div
      style={Object.assign({}, { cursor: isShowControls ? undefined : 'none' }, style)}
      className={classnames(styles.video, className)}
      ref={videoWrapperRef}
      onMouseMove={onHandleMouseMove}
      onMouseLeave={onHandleMouseLeave}
    >
      <video
        // key 的作用：当 props.src 发生变化时，会 mount 新的 video 标签
        src={src}
        key={src}
        ref={videoRef}
        muted={muted}
        className={styles.video}
      />
      {videoState !== 'playing' && <Mask videoState={videoState} mask={mask}></Mask>}
      {controls && videoState === 'playing' && (
        <Controls
          style={{ display: isShowControls ? undefined : 'none' }}
          video={videoRef.current!}
          videoWrapper={videoWrapperRef.current!}
          onEnded={onEnded}
        />
      )}
      {children && (
        <div className={styles.custom}>
          {children}
        </div>
      )}
    </div>
  )
}

export default Video