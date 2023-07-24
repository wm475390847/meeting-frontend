import React, {useEffect, useState} from "react"
import {Button, message, Pagination, Select} from 'antd'
import {deletePerf, getPerfList, getProductList} from "@/services"
import styles from './index.module.less'
import uploadIcon from '@/assets/svg/upload.svg';
import Search from "antd/es/input/Search";
import {OssUtil} from "@/utils";
import CardModule from "@/components/Card";
import PerfModule from "@/components/Perf";

interface SearchPerf {
    perfName?: string
}

const PerfPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [type, setType] = useState(0)
    const [searchPerf, setSearchPerf] = useState<SearchPerf>();
    const [perfList, setPerfList] = useState<PerfInfo[]>()
    const [perfInfo, setPerfInfo] = useState<PerfInfo>()
    const [clickIcon, setClickIcon] = useState<number>(0)
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0)
    const [productList, setProductList] = useState<ProductInfo[]>([])

    // const perfListRef = useRef<PerfInfo[]>([])
    const handlePageChange = (page: number) => {
        setPageNo(page);
        setLoading(true)
    };

    const handlePageSizeChange = (value: string) => {
        setPageSize(parseInt(value));
        setPageNo(1); // 回到第一页
        setLoading(true)
    };

    const options = [
        {value: "10 条/页"},
        {value: "20 条/页"},
        {value: "50 条/页"},
        {value: "100 条/页"}
    ]

    const handleDownloadFile = (perfInfo: PerfInfo) => {
        new OssUtil().download(perfInfo.jmxPath, perfInfo.perfName)
    }

    const handleProvinceChange = (key: string, value: any) => {
        const sc: { [key: string]: any } = {...searchPerf};
        sc[key] = value
        setSearchPerf(sc)
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
    }

    const handleGetProductList = () => {
        getProductList({})
            .then(data => {
                setProductList(data.records)
            })
    }

    useEffect(() => {
        if (loading) {
            handleGetPerfList()
            handleGetProductList()
        }
    }, [pageNo, loading])

    useEffect(() => {
        if (clickIcon === 1) {
            setType(2)
        }
        if (clickIcon === 2 && perfInfo) {
            handleDownloadFile(perfInfo)
            setClickIcon(0)
            message.success("下载成功").then(r => r)
        }
        if (clickIcon === 3 && perfInfo) {
            handleDeletePerf(perfInfo.id)
            setClickIcon(0)
        }
    }, [clickIcon])

    return (
        <div>
            <div className={styles.action}>
                <Search className={styles.search}
                        placeholder="请输入性能测试名称"
                        onSearch={(e: any) => handleProvinceChange('perfName', e)}
                        enterButton
                />
                <div className={styles.buttonGroup}>
                    <Button type='primary' onClick={() => setType(1)}>
                        <div className={styles.div}><img src={uploadIcon} alt={"加载失败"}/>上传JMX文件</div>
                    </Button>
                </div>
            </div>

            <div style={{position: "absolute", overflow: "auto", height: '100%', width: '100%'}}>
                <div className={styles.cardList}>
                    {perfList?.map((e, index) => (
                        <CardModule key={index}
                                    title={e?.perfName}
                                    description={e?.jmxPath}
                                    onClickIcon={(value) => {
                                        setClickIcon(value)
                                        setPerfInfo(e)
                                    }}/>
                    ))}
                </div>

                {perfList &&
                    <div className={styles.pagination}>
                        <Pagination total={total} current={pageNo} pageSize={pageSize} onChange={handlePageChange}/>
                        <Select defaultValue={`${pageSize} 条/页`} onChange={handlePageSizeChange} options={options}/>
                    </div>
                }
            </div>


            <PerfModule productList={productList}
                        perfInfo={perfInfo}
                        type={type}
                        onCancel={() => {
                            setType(0); // 关闭弹窗
                            setClickIcon(0) // 复位
                        }}
                        setLoading={setLoading}/>
        </div>
    )
}

export default PerfPage