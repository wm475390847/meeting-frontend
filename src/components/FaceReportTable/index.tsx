import React, {useMemo} from "react";
import VirtualTable from "../VirtualTable";
import {ColumnsType} from "antd/lib/table";

type FaceReportTableModalProps = {
    diffList?: DiffData[]
}

const FaceReportTableModal: React.FC<FaceReportTableModalProps> = (props) => {
    const { diffList } = props

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '素材id',
                dataIndex: 'businessId',
                key: 'businessId',
                width: 250
            }
        ]
    }, [diffList])

    return (
        <VirtualTable
            rowKey={"id"}
            columns={columns}
            dataSource={diffList}
            scroll={{ y: 300, x: '100vw' }}
        />
    )
};

export default FaceReportTableModal;