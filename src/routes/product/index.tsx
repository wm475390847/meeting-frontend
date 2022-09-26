import { MView, PageHeader } from "@/components"
import ToolTipModal from "@/components/ToolTip"
import { ColumnsType } from "antd/lib/table"
import { useEffect, useMemo, useState } from "react"
import { Table } from 'antd'
import { getProductList } from "@/services/product"

const ProductTable: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [productList, setProductList] = useState<ProductInfo[]>()
    const [buttonLoading, setButtongLoading] = useState(false)

    const columns = useMemo<ColumnsType<any>>(() => {
        return [
            {
                title: '序号',
                width: 13,
                render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
            },
            {
                title: '产品名称',
                dataIndex: 'productName',
                key: 'productName',
                width: 45,
                render: (text) => <ToolTipModal linkText={text} buttonText={text} />
            },
            {
                title: '业务线',
                dataIndex: 'serviceName',
                key: 'serviceName',
                width: 45,
                render: (text) => <ToolTipModal linkText={text} buttonText={text} />
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: '15%'
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

    const fetchProductList = () => {
        getProductList({
            pageNo: pageNo,
            pageSize: pageSize
        }).then(data => {
            setProductList(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    useEffect(() => {
        loading && fetchProductList()
    }, [pageNo, loading])

    return (
        <MView resize>
            <div>
                <PageHeader title={"产品列表"} />

                <Table
                    columns={columns}
                    dataSource={productList}
                    rowKey='id'
                    pagination={{ total, current: pageNo, showSizeChanger: true }}
                    loading={loading}
                    onChange={onChangeTable}
                />
            </div>

        </MView >
    )
}

export default ProductTable