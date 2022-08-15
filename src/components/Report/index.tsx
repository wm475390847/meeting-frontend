import { getH5Report } from "@/services/h5";
import { useEffect, useMemo, useState } from "react";
import VirtualTable from "../VirtualTable";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { text } from "stream/consumers";
import { Button } from "antd";

type ReportTableModalProps = {
    result?: boolean
}

const ReportTableModal: React.FC<ReportTableModalProps> = (prop) => {
    const { result } = prop
    const [reportList, setReportList] = useState<ReportData[]>()

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: 'h5Name',
                dataIndex: 'h5Name',
                key: 'h5Name',
                width: 250
            },
            {
                title: '错误原因',
                dataIndex: 'reason',
                key: 'reason',
                width: 200
            },
            {
                title: '基础图片路径',
                dataIndex: 'baseOssPath',
                key: 'baseOssPath',
            },
            {
                title: '结果图片路径',
                dataIndex: 'resultOssPath',
                key: 'resultOssPath',
                render: (text) =>
                    <div>{text}</div>
            },
            {
                title: '执行时间',
                dataIndex: 'executeTime',
                key: 'executeTime',
                width: 200,
                render: () => <Button>{"sss"}</Button>
            }
        ]
    }, [result])

    /**
     * 获取报告
     */
    const fetchReportList = (result: boolean) => {
        getH5Report({
            result: result
        }
        ).then(rep => {
            setReportList(rep.data)
        })
    }

    /**
     * 监听header是否有变化，有变化则进行请求
     */
    useEffect(() => {
        result != null && fetchReportList(result)
    }, [result])

    return (
        <VirtualTable columns={columns} dataSource={reportList} scroll={{ y: 300, x: '100vw' }} />
    )
};

export default ReportTableModal;