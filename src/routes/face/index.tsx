import { FooterPage, MView, PageHeader } from "@/components"
import ToolTipModal from "@/components/ToolTip"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, Input, message, Popconfirm, Table } from 'antd'
import styles from './index.module.less'
import { executeFace, getFaceList } from "@/services"
import CreateFaceModule from "@/components/FaceCreate"
import FaceReportModule from "@/components/FaceReport"
import UpdateFaceModule from "@/components/FaceUpdate"

const FaceDataTable: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [buttonLoading, setButtongLoading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [faceList, setFaceList] = useState<FaceInfo[]>()
    const [faceInfo, setFaceInfo] = useState<FaceInfo>()
    const [status, setStatus] = useState<number>(0)
    // 控制创建face组件开启
    const [createVisible, setCreateVisible] = useState(false)

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: 'faceUrl',
                dataIndex: 'faceUrl',
                key: 'faceUrl',
                width: '20%',
                ellipsis: true,
                render: (text) => <ToolTipModal linkText={text} isWindowOpen={true} buttonText={text} />
            },
            {
                title: '备注',
                dataIndex: 'faceDesc',
                key: 'faceDesc',
                width: '10%',
            },
            {
                title: 'miceId',
                dataIndex: 'miceId',
                key: 'miceId',
                width: '20%',
                render: (text) => <ToolTipModal linkText={'https://test-metaos.shuwen.com/app/mice/welook/tabList:' + text} isWindowOpen={true} buttonText={text} />
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '15%',
                render: (_, record) => {
                    return (
                        <div className={styles.action}>
                            <Button type="primary" onClick={() => { setFaceInfo(record), setStatus(2) }} loading={buttonLoading}>编辑</Button>
                            <Popconfirm title="确定执行？" placement="top" okText="是" cancelText="否" onConfirm={() => fetchExecuteFace(record.id)}>
                                <Button loading={buttonLoading}>执行</Button>
                            </Popconfirm>
                            <Button onClick={() => { setFaceInfo(record), setStatus(3) }}> 结果</Button>
                        </div >
                    )
                }
            }
        ]
    }, [pageNo, pageSize])

    const onChangeTable = (value: any) => {
        const { current, pageSize } = value
        setPageNo(current)
        setPageSize(pageSize)
        setLoading(true)
    }

    const fetchFaceList = () => {
        getFaceList({
            pageNo: pageNo,
            pageSize: pageSize,
        }).then(data => {
            setFaceList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

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
                <PageHeader title={"WELOOK人脸检测"} />
                <Input.Group className={styles.inputGroup} >
                    <Button type='primary' onClick={() => setCreateVisible(true)} >新增识别</Button>
                </Input.Group>
                <Table
                    columns={columns}
                    dataSource={faceList}
                    rowKey='id'
                    pagination={{ total, current: pageNo, showSizeChanger: true }}
                    loading={loading}
                    onChange={onChangeTable}
                />
                {/* 创建face组件 */}
                <CreateFaceModule visible={createVisible} setLoading={setLoading} onCancel={() => setCreateVisible(false)} />
                {/* 识别报告组件 */}
                {status == 3 && <FaceReportModule faceInfo={faceInfo} onCancel={() => setFaceInfo(undefined)} />}
                {/* 修改face组件 */}
                {status == 2 && <UpdateFaceModule faceInfo={faceInfo} setLoading={setLoading} onCancel={() => setFaceInfo(undefined)} />}
                <FooterPage text={'会议线质量保障平台 ©2022 Created by 质量中台 '} link={'https://codeup.aliyun.com/xhzy/xhzy-qa/meeting-frontend/tree/dev'} />
            </div>

        </MView >
    )
}

export default FaceDataTable