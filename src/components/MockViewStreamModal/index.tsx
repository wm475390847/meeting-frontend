import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less'

type MockStreamModalComponentsProps = {
    streamInfoList?: StreamInfo[]
    onCancel?: () => void
}

const MockViewStreamModal: React.FC<MockStreamModalComponentsProps> = (props) => {
    const { streamInfoList, onCancel } = (props)
    const [visible, setVisible] = useState(false)

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
                render: (text) => text ? text : "没有录播流地址"
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
            </Modal >
        </>
    );
};

export default MockViewStreamModal;