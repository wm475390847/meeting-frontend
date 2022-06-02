import { Modal } from "antd"
import React from "react"
import Video from "../Video"

interface VideoModalProps {
  src?: string
  onCancel?: () => void
}

const VideoModal: React.FC<VideoModalProps> = (props) => {
  const { src, onCancel } = props

  return (
    <Modal
      visible={!!src}
      title='视频'
      footer={null}
      destroyOnClose
      maskClosable={false}
      onCancel={onCancel}
    >
      <Video src={src} autoPlay />
    </Modal>
  )
}

export default VideoModal