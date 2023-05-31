import { Breadcrumb, Button, Popconfirm, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { getProductList } from '@/services';
import ToolTipModule from '@/components/ToolTip';
import styles from './index.module.less'
import { Link } from 'react-router-dom';

const ProductListPage: React.FC = () => {
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [productList, setProductList] = useState<ProductInfo[]>()
  const [buttonLoading, setButtongLoading] = useState(false)

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: '10%',
        render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
      },
      {
        title: '产品名称',
        key: 'productName',
        dataIndex: 'productName',
        width: '15%',
        ellipsis: true
      },
      {
        title: '所属业务',
        key: 'serviceName',
        dataIndex: 'serviceName',
        width: '15%',
        ellipsis: true
      },
      {
        title: '用例数量',
        key: 'caseCount',
        dataIndex: 'caseCount',
        width: '15%',
        ellipsis: true
      },
      {
        title: '成功率',
        key: 'casePercent',
        dataIndex: 'casePercent',
        width: '15%',
        ellipsis: true
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (_, record) => {
          return (
            <div className={styles.tableAction}>
              <Link
                to={{
                  pathname: `/app/case/productList/productDetail/${record.productName}`,
                  search: `?id=${record.id}`
                }}
              >
                <Button type='primary'>查看用例</Button>
              </Link>
              <Popconfirm title="确定删除？" placement="top" okText="是" cancelText="否">
                <Button style={{ marginLeft: '8px' }} loading={buttonLoading}>删除</Button>
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

  const handleGetProductList = () => {
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
    loading && handleGetProductList()
  }, [pageNo, loading])

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/app/case/productList">产品列表</Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Table
        columns={columns}
        dataSource={productList}
        rowKey='id'
        onChange={onChangeTable}
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        className={styles.table}
      />
    </>
  );
};

export default ProductListPage;