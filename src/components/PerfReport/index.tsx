import {getPerfReportList} from "@/services";
import {Button, message, Modal} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import styles from './index.module.less'
import VirtualTable from "../VirtualTable";
import moment from "moment";
import {ColumnsType} from "antd/lib/table";

type PerfReportModuleProps = {
    perfId?: number
    onCancel?: () => void
}

const PerfReportModule: React.FC<PerfReportModuleProps> = (props) => {
    const { onCancel, perfId } = props
    const [open, setOpen] = useState(false)
    const [perfReportHistoryList, setPerfReportHistoryList] = useState<PerfReportHistory[]>()
    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (text, record, index) => `${index + 1}`
            },
            {
                title: '报告地址',
                dataIndex: 'reportPath',
                key: 'reportPath',
                width: '10%',
                ellipsis: true,
                render: (text) => <Button style={{ padding: '0' }} type="link" key={"link"} onClick={() => window.open(text)}> {"点我查看报告"}</ Button>
            },
            {
                title: '执行时间',
                dataIndex: 'gmtCreate',
                key: 'gmtCreate',
                width: '10%',
                render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
            },
            {
                title: '执行耗时(s)',
                dataIndex: 'elapsedTime',
                key: 'elapsedTime',
                width: '10%',
                render: (_, record) => record.elapsedTime && record.elapsedTime / 1000 + 's'
            },
        ]
    }, [perfId])

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    const handleGetPerfReportList = () => {
        getPerfReportList(perfId as number)
            .then(rep => setPerfReportHistoryList(rep.data))
            .catch(err => message.error(err.message))
    }

    useEffect(() => {
        perfId && setOpen(true)
    }, [perfId])

    useEffect(() => {
        open && handleGetPerfReportList()
    }, [open])

    return (
        <Modal
            title="压测结果"
            open={open}
            className={styles.modal}
            onCancel={handleCancel}
            footer={<Button type='primary' onClick={() => handleCancel()}>确定</Button>}
            destroyOnClose
        >
            <VirtualTable
                rowKey={"id"}
                columns={columns}
                dataSource={perfReportHistoryList}
                scroll={{ y: 300, x: '100vw' }}
            />
        </Modal>
    )
};

export default PerfReportModule;