import {ColumnsType} from "antd/lib/table"
import React, {useEffect, useMemo, useRef, useState} from "react"
import {Button, message, Popconfirm, Table} from 'antd'
import {deletePerf, getPerfList} from "@/services"
// import {LoadingOutlined} from "@ant-design/icons"
import styles from './index.module.less'
import uploadIcon from '@/assets/svg/upload.svg';
import downloadIcon from '@/assets/svg/download.svg';
import ToolTipModule from "@/components/ToolTip";
import PerfModule from "@/components/Perf";
import Search from "antd/es/input/Search";
import {OssUtil} from "@/utils";

interface SearchPerf {
    perfName?: string
}

const PerfPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [perfList, setPerfList] = useState<PerfInfo[]>()
    const [buttonLoading, setButtonLoading] = useState(false)
    const [type, setType] = useState(0)
    const [searchPerf, setSearchPerf] = useState<SearchPerf>();
    const [perfInfo, setPerfInfo] = useState<PerfInfo>()
    // const antIcon = <LoadingOutlined style={{fontSize: 15}} spin/>;
    // const timerRef = useRef<any>(null)
    const perfListRef = useRef<PerfInfo[]>([])

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: '5%',
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '压测名称',
                dataIndex: 'perfName',
                key: 'perfName',
                width: '15%'
            },
            {
                title: '所属产品',
                dataIndex: 'productName',
                key: 'productName',
                width: '10%'
            },
            {
                title: '文件地址',
                dataIndex: 'jmxPath',
                key: 'jmxPath',
                width: '25%',
                ellipsis: true,
                render: (text) => <ToolTipModule linkText={text} isWindowOpen={true} buttonText={text}/>
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '15%',
                render: (_, record) => {
                    return (
                        <div className={styles.tableAction}>
                            <Button type='primary' onClick={() => handleDownloadFile(record)}>
                                <div className={styles.div}>
                                    <img src={downloadIcon} alt={"加载失败"} className={styles.icon}/>
                                    下载
                                </div>
                            </Button>
                            <Button onClick={() => {
                                setType(2)
                                setPerfInfo(record)
                            }}>
                                编辑
                            </Button>
                            <Popconfirm title='确定删除？' placement="top" okText="是" cancelText="否"
                                        onConfirm={() => handleDeletePerf(record.id)}>
                                <Button loading={buttonLoading}>删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
    }, [pageNo, pageSize])

    const handleDownloadFile = (perfInfo: PerfInfo) => {
        new OssUtil().download(perfInfo.jmxPath, perfInfo.perfName)
    }

    const handleProvinceChange = (key: string, value: any) => {
        const sc: { [key: string]: any } = {...searchPerf};
        sc[key] = value
        setSearchPerf(sc)
        setLoading(true)
    }

    const onChangeTable = (value: any) => {
        const {current, pageSize} = value
        setPageNo(current)
        setPageSize(pageSize)
        setLoading(true)
    }

    const handleGetPerfList = () => {
        getPerfList({
            pageNo: pageNo,
            pageSize: pageSize,
            perfName: searchPerf?.perfName,
        }).then(data => {
            setPerfList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const handleDeletePerf = (id: number) => {
        deletePerf(id)
            .then(res => {
                message.success(res.message).then(r => r)
                setLoading(true)
            })
            .catch(err => message.error(err.message))
            .finally(() => setButtonLoading(false))
    }

    // /**
    //  * 接口轮询，暂时不用
    //  */
    // useEffect(() => {
    //     timerRef.current = setInterval(() => {
    //         if (perfListRef.current && perfListRef.current.map(item => item.status).includes(2)) {
    //             handleGetPerfList()
    //         }
    //     }, 5000)
    //     return () => {
    //         clearInterval(timerRef.current)
    //     }
    // }, [])

    useEffect(() => {
        if (perfList) {
            perfListRef.current = perfList
        }
    }, [perfList])

    useEffect(() => {
        loading && handleGetPerfList()
    }, [pageNo, loading])

    return (
        <div>
            <div className={styles.action}>
                <div>
                    <Search className={styles.search}
                            placeholder="请输入性能测试名称"
                            onSearch={(e: any) => handleProvinceChange('perfName', e)}
                            enterButton
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <Button type='primary' onClick={() => setType(1)}>
                        <div className={styles.div}>
                            <img src={uploadIcon} alt={"加载失败"} className={styles.icon}/>
                            上传JMX文件
                        </div>
                    </Button>
                </div>
            </div>

            <div>
                <Table
                    columns={columns}
                    dataSource={perfList}
                    rowKey='id'
                    pagination={{total, current: pageNo, showSizeChanger: true}}
                    loading={loading}
                    onChange={onChangeTable}
                    className={styles.table}
                />
            </div>
            <PerfModule perfInfo={perfInfo} type={type} onCancel={() => setType(0)} setLoading={setLoading}/>
        </div>
    )
}

export default PerfPage