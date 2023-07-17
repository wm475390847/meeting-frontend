import {Button, message, Popconfirm, Table} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import {ColumnsType} from 'antd/lib/table';
import {deleteProduct, getProductList, getServiceList} from '@/services';
import styles from './index.module.less'
import {useNavigate} from 'react-router-dom';
import ProductModule from '@/components/Product';

const ProductListPage: React.FC = () => {
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [serviceList, setServiceList] = useState<ServiceInfo[]>([])
  const [productList, setProductList] = useState<ProductInfo[]>()
  const [productInfo, setProductInfo] = useState<ProductInfo>()
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
        title: '产品Id',
        key: 'id',
        dataIndex: 'id',
        width: '15%'
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
        ellipsis: true,
        render: (caseCount) => {
          return (
              <a className={`${styles.formItem} ${styles.count}`}>
                {caseCount}
              </a>
          )
        }
      },
      {
        title: '成功率(%)',
        key: 'casePercent',
        dataIndex: 'casePercent',
        width: '15%',
        ellipsis: true,
        render: (casePercent) => {
          return (
              casePercent == 100.00 || 0 ?
                  <a className={`${styles.formItem} ${styles.success}`}>
                    {casePercent}%
                  </a> :
                  <a className={`${styles.formItem} ${styles.fail}`}>
                    {casePercent}%
                  </a>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (_, record) => {
          return (
              <div className={styles.buttonGroup}>
                <Button loading={buttonLoading} type='primary' onClick={e => {
                  e.stopPropagation()
                  setType(2)
                  setProductInfo(record)
                }}>编辑</Button>
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
                  <Button loading={buttonLoading} onClick={e => e.stopPropagation()}>删除</Button>
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

  /**
   *获取业务列表
   */
  const handleGetProductGroup = () => {
    getServiceList()
        .then(res => {
          setServiceList(res)
        })
  }

  useEffect(() => {
    if (loading) {
      handleGetProductList()
      handleGetProductGroup()
    }
  }, [pageNo, loading])

  return (
      <>
        <div className={styles.action}>
          <div className={styles.buttonGroup}>
            <Button type='primary' onClick={() => setType(1)}>创建产品</Button>
          </div>
        </div>

        <Table
            columns={columns}
            dataSource={productList}
            rowKey='id'
            onChange={onChangeTable}
            pagination={{total, current: pageNo, showSizeChanger: true}}
            loading={loading}
            className={styles.table}
            onRow={record => {
              return {
                onClick: () => {
                  navigate({
                    pathname: `/app/case/productList/productDetail/${record.productName}/${record.id}`,
                  })
                },
                style: {cursor: 'pointer'}
              }
            }
            }
        />
        <ProductModule type={type}
                       serviceList={serviceList}
                       productInfo={productInfo}
                       onCancel={() => setType(0)}
                       setLoading={setLoading}/>
      </>
  );
};

export default ProductListPage;