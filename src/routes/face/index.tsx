import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Button, message, Popconfirm, Table, Image } from 'antd'
import { deleteFace, executeFace, getFaceList } from "@/services"
import CreateFaceModal from "@/components/FaceCreate"
import FaceReportModal from "@/components/FaceReport"
import UpdateFaceModal from "@/components/FaceUpdate"
import { PageFooter } from "@/components/PageFooter"
import ToolTipModal from "@/components/ToolTip"
import styles from './index.module.less'
import { defaultImage } from "@/constants"

const FacePage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [buttonLoading, setButtongLoading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [faceList, setFaceList] = useState<FaceInfo[]>()
    const [faceInfo, setFaceInfo] = useState<FaceInfo>()
    const [status, setStatus] = useState<number>(0)
    const [createVisible, setCreateVisible] = useState(false)

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '人脸截图',
                dataIndex: 'faceUrl',
                key: 'faceUrl',
                width: '10%',
                ellipsis: true,
                render: (text) =>
                    <Image
                        src={text}
                        width={100}
                        height={120}
                        fallback={defaultImage}
                        className={styles.image}
                    />
            },
            {
                title: '备注',
                dataIndex: 'faceDesc',
                key: 'faceDesc',
                width: '5%',
            },
            {
                title: '环境',
                dataIndex: 'env',
                key: 'env',
                width: '5%',
                render: (text) => {
                    return (text == 0 ? '测试' : '生产')
                }
            },
            {
                title: 'miceId',
                dataIndex: 'miceUrl',
                key: 'miceId',
                width: '20%',
                render: (text) => <ToolTipModal linkText={text} isWindowOpen={true} buttonText={text.split(':')[2]} />
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '20%',
                render: (_, record) => {
                    return (
                        <div className={styles.tableAction}>
                            <Button type="primary" onClick={() => { setFaceInfo(record), setStatus(2) }} loading={buttonLoading}>编辑</Button>
                            <Popconfirm title="确定执行？" placement="top" okText="是" cancelText="否" onConfirm={() => fetchExecuteFace(record.id)}>
                                <Button loading={buttonLoading}>执行</Button>
                            </Popconfirm>
                            <Button disabled={record.newResult == null} onClick={() => { setFaceInfo(record), setStatus(3) }}> 结果</Button>
                            <Popconfirm title='确定删除？' placement="top" okText="是" cancelText="否" onConfirm={() => fetchDeleteFace(record.id)}>
                                <Button loading={buttonLoading}>删除</Button>
                            </Popconfirm>
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

    const fetchDeleteFace = (id: number) => {
        deleteFace(id)
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
        <div className={styles.content}>
            <div className={styles.action}>
                <Button type='primary' onClick={() => setCreateVisible(true)}>新增人脸</Button>
                <Button type='primary'>批量执行</Button>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={faceList}
                    rowKey='id'
                    pagination={{ total, current: pageNo, showSizeChanger: true }}
                    loading={loading}
                    onChange={onChangeTable}
                    className={styles.table}
                />
            </div>
            <div>
                <PageFooter />
            </div>

            {/* 创建face组件 */}
            <CreateFaceModal visible={createVisible} setLoading={setLoading} onCancel={() => setCreateVisible(false)} />
            {/* 识别报告组件 */}
            {status == 3 && <FaceReportModal faceInfo={faceInfo} onCancel={() => setFaceInfo(undefined)} />}
            {/* 修改face组件 */}
            {status == 2 && <UpdateFaceModal faceInfo={faceInfo} setLoading={setLoading} onCancel={() => setFaceInfo(undefined)} />}
        </div >
    )
}

export default FacePage