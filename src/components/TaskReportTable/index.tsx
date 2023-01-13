import { useEffect, useMemo, useState } from "react";
import VirtualTable from "../VirtualTable";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { Button, message, Image, Popover } from "antd";
import { getTaskReport as getTaskReportList } from "@/services";
import styles from './index.module.less'
import { QuestionCircleOutlined } from "@ant-design/icons";
import { defaultImage } from "@/constants";

type TaskReportTableModalProps = {
    result?: boolean
    taskId: number
}

const TaskReportTableModal: React.FC<TaskReportTableModalProps> = (prop) => {
    const { result, taskId } = prop
    const [reportList, setReportList] = useState<TaskReport[]>()

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
                width: 150
            },
            {
                title: 'url',
                dataIndex: 'h5Url',
                key: 'h5Url',
                width: 200,
                ellipsis: true,
                render: (text) => <Button style={{ padding: '0' }} type="link" key={"link"} onClick={() => window.open(text)}> {"点我查看h5"}</ Button>
            },
            {
                title: '基础图片',
                dataIndex: 'baseOssPath',
                key: 'baseOssPath',
                width: 200,
                render: (text) =>
                    <Image
                        src={text}
                        width={150}
                        height={120}
                        fallback={defaultImage}
                        className={styles.image}
                    />
            },
            {
                title: (
                    <div>结果图片
                        <Popover className={styles.popover}
                            content='左侧为最新图片，中间为基础图，右侧为对比结果图'
                            title='图片解释'
                        >
                            <QuestionCircleOutlined className={styles.iconHover} />
                        </Popover>
                    </div>
                ),
                dataIndex: 'resultOssPath',
                key: 'resultOssPath',
                width: 400,
                render: (text) =>
                    <Image
                        src={text}
                        width={300}
                        height={120}
                        fallback={defaultImage}
                        className={styles.image}
                    />
            },
            {
                title: '执行耗时(s)',
                dataIndex: 'elapsedTime',
                key: 'elapsedTime',
                width: 150,
                render: (_, record) => record.elapsedTime && record.elapsedTime / 1000 + 's'
            },
            {
                title: '执行时间',
                dataIndex: 'executeTime',
                key: 'executeTime',
                width: 200,
                render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
            }
        ]
    }, [result])

    const fetchReportList = (result: boolean, taskId: number) => {
        getTaskReportList({
            result: result,
            taskId: taskId
        }).then(rep => {
            setReportList(rep.data)
        }).catch(err => {
            message.error(err.message)
        })
    }

    useEffect(() => {
        result != null && fetchReportList(result, taskId)
    }, [result])

    return (
        <VirtualTable
            rowKey={"id"}
            columns={columns}
            dataSource={reportList}
            scroll={{ y: 300, x: '100vw' }}
        />
    )
};

export default TaskReportTableModal;