import {ColumnsType} from "antd/lib/table"
import React, {useEffect, useMemo, useState} from "react"
import {Button, Image, message, Popconfirm, Table} from 'antd'
import {deleteFace, executeFace, getFaceList} from "@/services"
import FaceReportModal from "@/components/FaceReport"
import ToolTipModule from "@/components/ToolTip"
import styles from './index.module.less'
import {defaultImage} from "@/constants"
import FaceModule from "@/components/Face"

const FacePage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [faceList, setFaceList] = useState<Face[]>()
    const [face, setFace] = useState<Face>()
    const [status, setStatus] = useState<number>(0)
    const [type, setType] = useState<number>(0)
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
                        className={styles.img}
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
                render: (text) => <ToolTipModule linkText={text} isWindowOpen={true} buttonText={text.split(':')[2]} />
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '20%',
                render: (_, record) => {
                    return (
                        <div className={styles.buttonGroup}>
                            <Button type="primary" onClick={() => {
                                setFace(record);
                                setType(2)
                            }} loading={buttonLoading}>编辑</Button>
                            <Popconfirm title="确定执行？" placement="top" okText="是" cancelText="否"
                                        onConfirm={() => handleExecuteFace(record.id)} disabled={true}>
                                <Button disabled={true} loading={buttonLoading}>执行</Button>
                            </Popconfirm>
                            <Button disabled={record.newResult == null} onClick={() => {
                                setFace(record);
                                setStatus(3)
                            }} style={{marginLeft: '8px'}}> 结果</Button>
                            <Popconfirm title='确定删除？' placement="top" okText="是" cancelText="否"
                                        onConfirm={() => handleDeleteFace(record.id)}>
                                <Button loading={buttonLoading}>删除</Button>
                            </Popconfirm>
                        </div>
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

    const handleGetFaceList = () => {
        getFaceList({
            pageNo: pageNo,
            pageSize: pageSize,
        }).then(data => {
            setFaceList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const handleExecuteFace = (id: number) => {
        executeFace(id)
            .then(res => {
                message.success(res.message).then(r => r)
                setLoading(true)
            })
            .catch(err => message.error(err.message))
            .finally(() => setButtonLoading(false))
    }

    const handleDeleteFace = (id: number) => {
        deleteFace(id)
            .then(res => {
                message.success(res.message).then(r => r)
                setLoading(true)
            })
            .catch(err => message.error(err.message))
            .finally(() => setButtonLoading(false))
    }

    useEffect(() => {
        loading && handleGetFaceList()
    }, [pageNo, loading])

    return (
        <div>
            <div className={styles.action}>
                <div className={styles.buttonGroup}>
                    <Button type='primary' onClick={() => setType(1)}>新增人脸</Button>
                    <Button type='primary' disabled={true}>批量执行</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={faceList}
                rowKey='id'
                pagination={{total, current: pageNo, showSizeChanger: true}}
                loading={loading}
                onChange={onChangeTable}
                className={styles.table}
            />
            {/* Face组件 */}
            <FaceModule type={type} face={face} setLoading={setLoading} onCancel={() => {
                setType(0);
                setFace(undefined)
            }}/>
            {/* 识别报告组件 */}
            {status == 3 && <FaceReportModal faceInfo={face} onCancel={() => setFace(undefined)}/>}
        </div>
    )
}

export default FacePage