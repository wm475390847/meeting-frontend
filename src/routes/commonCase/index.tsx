import { Button, Popconfirm, Progress, Select, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { getCommonCases, getProdects } from '@/services/commonCase';
import { MView, PageHeader } from '@/components';
import styles from './index.module.less'
import CommonCasseReasonModal from '@/components/CommonCaseModal';
import moment from 'moment';
import ToolTipReportModal from '@/components/ToolTip';

interface caseProperty {
  product?: string
  caseResult?: boolean
}

const CommonCaseTable: React.FC = (props) => {
  const { Option, OptGroup } = Select;
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [commonCaseList, setCommonCaseList] = useState<CommonCaseInfo[]>()
  const [reason, setReason] = useState()
  const [caseProperty, setCaseProperty] = useState<caseProperty>()
  const [businessList, setBusinessList] = useState<Business[]>([])

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: "用例id",
        key: "id",
        dataIndex: "id",
        width: 10
      },
      {
        title: "Name",
        key: "caseName",
        dataIndex: "caseName",
        width: '15%',
        ellipsis: true,
        render: (text) => <ToolTipReportModal text={text} />
      },
      {
        title: "Desc",
        key: "caseDesc",
        dataIndex: "caseDesc",
        width: '15%',
        ellipsis: true,
        render: (text) => <ToolTipReportModal text={text} />
      },
      {
        title: "Result",
        key: "caseResult",
        dataIndex: "caseResult",
        width: 10,
        render: (text) => {
          return (
            text ? < Progress type="circle" percent={100} width={30} /> : < Progress status="exception" type="circle" percent={100} width={30} />
          )
        }
      },
      {
        title: "Product",
        key: "product",
        dataIndex: "product",
        width: 15
      },
      {
        title: "Env",
        key: "env",
        dataIndex: "env",
        width: 10
      },
      {
        title: "Owner",
        key: "caseOwner",
        dataIndex: "caseOwner",
        width: 10
      },
      {
        title: "ExecuteTime",
        key: "gmtModified",
        dataIndex: "gmtModified",
        width: 25,
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '15%',
        render: (_, record) => {
          return (
            <div className={styles.action}>
              {<Button disabled={record.caseResult} type="primary" onClick={() => setReason(record.caseReason)}>查看</Button>}
              <Popconfirm title="亲~不可以删除哦！" okText="是" cancelText="否">
                <Button >删除</Button>
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

  /**
   * 获取报告
   */
  const fetchCommonCaseList = () => {
    getCommonCases({
      pageNo: pageNo,
      pageSize: pageSize,
      caseResult: caseProperty?.caseResult,
      product: caseProperty?.product,
    }).then(data => {
      setCommonCaseList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  const fetchProductList = () => {
    getProdects()
      .then(data => {
        setBusinessList(data)
        setLoading(false)
      })
  }

  const setProduct = (value: string) => {
    setCaseProperty({ ...caseProperty, product: value })
    setLoading(true)
  };

  const setResult = (value: string) => {
    setCaseProperty({ ...caseProperty, caseResult: value as unknown as boolean })
    setLoading(true)
  }

  useEffect(() => {
    businessList.length === 0 && fetchProductList()
  }, [businessList])

  /**
   *  监听pageNo变化时刷新列表
   */
  useEffect(() => {
    loading && fetchCommonCaseList()
  }, [pageNo, loading])


  return (
    <MView resize>
      <PageHeader title="用例列表" />

      <div >
        <Select className={styles.select} defaultValue="全部" onChange={setResult}>
          <Option value="">全部</Option>
          <Option value="true">成功</Option>
          <Option value="false">失败</Option>
        </Select>
        <Select defaultValue="全部" className={styles.select} onChange={setProduct} >
          <OptGroup label="全部">
            <Option value="">全部</Option>
          </OptGroup>
          {
            businessList?.map((business: Business) => (
              <OptGroup label={business.desc}>
                {
                  business.products.map((product: Product) => (
                    <Option value={product.name}>{product.desc}</Option>)
                  )
                }
              </OptGroup>
            )

            )
          }
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={commonCaseList}
        onChange={onChangeTable}
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        rowKey="id"
      >
      </Table>

      <CommonCasseReasonModal reason={reason} onCancel={() => setReason(undefined)} />
    </MView >
  );
};

export default CommonCaseTable;