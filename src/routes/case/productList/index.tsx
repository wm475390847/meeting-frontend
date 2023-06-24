import {Breadcrumb, Button, message, Popconfirm, Table} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import {ColumnsType} from 'antd/lib/table';
import {deleteProduct, getProductList} from '@/services';
import styles from './index.module.less'
import {Link, useNavigate} from 'react-router-dom';
import ProductModule from '@/components/Product';

const ProductListPage: React.FC = () => {
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [productList, setProductList] = useState<ProductInfo[]>()
  const [buttonLoading, setButtonLoading] = useState(false)
  const [type, setType] = useState(0)
  const navigate = useNavigate();
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
        title: '用例数量(条)',
        key: 'caseCount',
        dataIndex: 'caseCount',
        width: '15%',
        ellipsis: true
      },
      {
        title: '成功率(%)',
        key: 'casePercent',
        dataIndex: 'casePercent',
        width: '15%',
        ellipsis: true,
        render: (casePercent) => {
          return (`${casePercent}%`)
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (_, record) => {
          return (
            <Popconfirm
              title="确定删除？"
              placement="top"
              okText="是"
              cancelText="否"
              onConfirm={e => {
                e?.stopPropagation()
                handleDeleteProduct(record.id)
              }}
              onCancel={e => e?.stopPropagation()}
            >
              <Button
                loading={buttonLoading}
                type='primary'
                onClick={e => e.stopPropagation()}
              >
                删除
              </Button>
            </Popconfirm>
          )
        }
      }
    ]
  }, [pageNo, pageSize])

  const onChangeTable = (value: any) => {
    const { current, pageSize } = value
    setPageNo(current)
    setPageSize(pageSize)
    setLoading(false)
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

  const handleDeleteProduct = (id: number) => {
    setButtonLoading(true)
    deleteProduct(id)
      .then(res => {
        message.success(res.message).then(r => r)
        setLoading(true)
      })
      .catch(err => message.error(err.message))
      .finally(() => setButtonLoading(false))
  }

  useEffect(() => {
    loading && handleGetProductList()
  }, [pageNo, loading])

  return (
    <>
      <div className={styles.action}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/app/case/productList">产品列表</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button type='primary' onClick={() => setType(1)}>创建产品</Button>
      </div >

      <Table
        columns={columns}
        dataSource={productList}
        rowKey='id'
        onChange={onChangeTable}
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        className={styles.table}
        onRow={record => {
          return {
            onClick: () => {
              navigate({
                pathname: `/app/case/productList/productDetail/${record.productName}`,
                search: `?id=${record.id}`
              })
            },
            style: { cursor: 'pointer' }
          }
        }
        }
      />
      <ProductModule type={type} onCancel={() => setType(0)} setLoading={setLoading} />
    </>
  );
};

export default ProductListPage;