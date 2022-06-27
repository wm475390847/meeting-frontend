import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo, useState } from 'react';
import { VideoJS } from '../VideoJS';
import styles from './index.module.less'

type MockStreamModalComponentsProps = {
    streamInfoList?: StreamInfo[]
    onCancel?: () => void
}

const MockViewStreamModal: React.FC<MockStreamModalComponentsProps> = (props) => {
    const { streamInfoList, onCancel } = (props)
    const [visible, setVisible] = useState(false)
    const [videoSrc, setVideoSrc] = useState<string>()

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (text, record, index) => index + 1
            },
            {
                title: '拉流地址',
                width: '20%',
                dataIndex: 'pullUrl',
                key: 'pullUrl',
                render: (text) => text ?
                    <Button
                        key={text}
                        type='link'
                        className={styles.button}
                        onClick={() => setVideoSrc(text)}
                    > {text}
                    </Button > : "没有录播流地址"
            },
            {
                title: '机位',
                width: '5%',
                dataIndex: 'liveGroup',
                key: 'liveGroup',
            }
        ]
    }, [])

    /**
     * 关闭弹窗
     */
    const handleCancel = () => {
        setVideoSrc(undefined)
        setVisible(false)
        onCancel && onCancel()
    }

    useEffect(() => {
        streamInfoList && setVisible(true)
    }, [streamInfoList])

    return (
        <>
            <Modal
                visible={visible}
                className={styles.modal}
                title="录播流信息"
                onCancel={handleCancel}
                footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
                destroyOnClose
                width={1000}
            >
                <Table
                    columns={columns}
                    dataSource={streamInfoList}
                    className={styles.table}
                    rowKey='id'
                    pagination={false}
                    bordered={false}
                />

                <VideoJS
                    options={{
                        controls: true,
                        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                        autoplay: true, // 如果true,浏览器准备好时开始回放。
                        muted: false, // 默认情况下将会消除任何音频。
                        loop: true, // 导致视频一结束就重新开始。
                        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                        language: 'zh-CN',
                        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                        sources: [
                            {
                                src: videoSrc,
                                type: 'video/mp4'
                            }
                        ],
                        // poster: videoInfo.img, // 你的封面地址
                        width: document.documentElement.clientWidth,
                        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                        controlBar: {
                            timeDivider: true,
                            durationDisplay: true,
                            remainingTimeDisplay: true,
                            fullscreenToggle: true // 全屏按钮
                        }
                    }}
                />
            </Modal >
        </>
    );
};

export default MockViewStreamModal;