import { FooterPage, MView, PageHeader } from "@/components"
import ToolTipModal from "@/components/ToolTip"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, Input, message, Popconfirm, Table } from 'antd'
import styles from './index.module.less'
import { executeFace, getFaceList } from "@/services/face"
import FaceCreateModal from "@/components/FaceCreate"
import FaceReportModal from "@/components/FaceReport"

const FaceData: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [faceDateList, setFaceDataList] = useState<FaceData[]>()
    const [faceData, setFaceData] = useState<FaceData>()
    const [buttonLoading, setButtongLoading] = useState(false)

    // 控制创建face组件开启
    const [createVisible, setCreateVisible] = useState(false)

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: 10,
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: 'faceUrl',
                dataIndex: 'faceUrl',
                key: 'faceUrl',
                width: 50,
                ellipsis: true,
                render: (text) => <ToolTipModal linkText={text} isWindowOpen={true} buttonText={text} />
            },
            {
                title: '人脸备注',
                dataIndex: 'faceDesc',
                key: 'faceDesc',
                width: 15,
            },
            {
                title: 'miceId',
                dataIndex: 'miceId',
                key: 'miceId',
                width: 40,
                render: (text) => <ToolTipModal linkText={'https://test-metaos.shuwen.com/app/mice/welook/tabList:' + text} isWindowOpen={true} buttonText={text} />
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '20%',
                render: (_, record) => {
                    return (
                        <div className={styles.action}>
                            <Popconfirm title="未完成" placement="top" okText="是" cancelText="否">
                                <Button type="primary" loading={buttonLoading}>编辑</Button>
                            </Popconfirm>
                            <Popconfirm title="确定执行？" placement="top" okText="是" cancelText="否" onConfirm={() => fetchExecuteFace(record.id)}>
                                <Button loading={buttonLoading}>执行识别</Button>
                            </Popconfirm>
                            <Button onClick={() => setFaceData(record)}> 识别结果</Button>
                        </div >
                    )
                }
            }
        ]
    }, [pageNo, pageSize])


    /**
     * 获取当前页码
     * @param value
     */
    const onChangeTable = (value: any) => {
        const { current, pageSize } = value
        setPageNo(current)
        setPageSize(pageSize)
        setLoading(true)
    }

    /**
     * 获取h5数据列表
     */
    const fetchFaceList = () => {
        getFaceList({
            pageNo: pageNo,
            pageSize: pageSize,
        }).then(data => {
            setFaceDataList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    /**
     * 执行算法识别
     * @param id id
     */
    const fetchExecuteFace = (id: number) => {
        executeFace(id)
            .then(res => {
                message.info(res.message)
                setLoading(true)
            }).catch(err => {
                message.error(err.message)
            }).finally(() => setButtongLoading(false))
    }

    useEffect(() => {
        loading && fetchFaceList()
    }, [pageNo, loading])

    return (
        <MView resize>
            <div>
                <PageHeader title={"人脸检测"} />
                <Input.Group className={styles.inputGroup}>
                    <Button type='primary' onClick={() => setCreateVisible(true)} >新增识别</Button>
                </Input.Group>

                <Table
                    columns={columns}
                    dataSource={faceDateList}
                    rowKey='id'
                    pagination={{ total, current: pageNo, showSizeChanger: true }}
                    loading={loading}
                    onChange={onChangeTable}
                />
                {/* 创建face组件 */}
                <FaceCreateModal visible={createVisible} setLoading={setLoading} onCancel={() => setCreateVisible(false)} />
                {/* 识别报告组件 */}
                <FaceReportModal faceData={faceData} onCancel={() => setFaceData(undefined)}></FaceReportModal>
                <FooterPage text={'会议线质量保障平台 ©2022 Created by 质量中台 '} link={'https://codeup.aliyun.com/xhzy/xhzy-qa/meeting-frontend/tree/dev'} />
            </div>

        </MView >
    )
}

export default FaceData