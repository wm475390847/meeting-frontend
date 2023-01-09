import { Button, Input, Popconfirm, Progress, Select, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { getCaseList, getProdectList } from '@/services';
import styles from './index.module.less'
import CasseReasonModule from '@/components/CaseReason';
import moment from 'moment';
import ToolTipModal from '@/components/ToolTip';

interface SearchCase {
  productId?: number
  caseResult?: boolean
  env?: string
  caseOwner?: string
  caseName?: string
}

const CaseDataPage: React.FC = (props) => {
  const { Option, OptGroup } = Select;
  const { Search } = Input
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [caseList, setCaseList] = useState<CaseInfo[]>()
  const [reason, setReason] = useState()
  const [searchCase, setSearchCase] = useState<SearchCase>()
  const [serviceList, setServiceList] = useState<ServiceInfo[]>([])

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: '5%',
        render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
      },
      {
        title: 'Name',
        key: 'caseName',
        dataIndex: 'caseName',
        width: '15%',
        ellipsis: true,
        render: (text) => <ToolTipModal linkText={text} buttonText={text} />
      },
      {
        title: "Desc",
        key: "caseDesc",
        dataIndex: "caseDesc",
        width: '15%',
        ellipsis: true,
        render: (text) => <ToolTipModal linkText={text} buttonText={text} />
      },
      {
        title: "Result",
        key: "caseResult",
        dataIndex: "caseResult",
        width: '6%',
        render: (text) => {
          return (
            text ? < Progress type="circle" percent={100} width={30} /> : < Progress status="exception" type="circle" percent={100} width={30} />
          )
        }
      },
      {
        title: "Product",
        key: "productName",
        dataIndex: "productName",
        width: '6.5%'
      },
      {
        title: "Env",
        key: "env",
        dataIndex: "env",
        width: '6%'
      },
      {
        title: "Owner",
        key: "caseOwner",
        dataIndex: "caseOwner",
        width: '6%'
      },
      {
        title: "ExecuteTime",
        key: "excuteTime",
        dataIndex: "excuteTime",
        width: '10%',
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '15%',
        render: (_, record) => {
          return (
            <div className={styles.tableAction}>
              {<Button disabled={record.caseResult} type="primary" onClick={() => setReason(record.caseReason)}>查看</Button>}
              <Popconfirm title="亲~功能未完成哦！" okText="是" cancelText="否">
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
  const fetchCaseList = () => {
    getCaseList({
      pageNo: pageNo,
      pageSize: pageSize,
      caseResult: searchCase?.caseResult,
      productId: searchCase?.productId,
      env: searchCase?.env,
      caseOwner: searchCase?.caseOwner,
      caseName: searchCase?.caseName
    }).then(data => {
      setCaseList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  const fetchProductList = () => {
    getProdectList()
      .then(data => {
        setServiceList(data)
        setLoading(false)
      })
  }

  const setProductId = (value: String) => {
    setSearchCase({ ...searchCase, productId: value as unknown as number })
    setLoading(true)
  };

  const setResult = (value: string) => {
    setSearchCase({ ...searchCase, caseResult: value as unknown as boolean })
    setLoading(true)
  }

  const setEnv = (value: string) => {
    setSearchCase({ ...searchCase, env: value })
    setLoading(true)
  }

  const setCaseOwner = (value: string) => {
    setSearchCase({ ...searchCase, caseOwner: value })
    setLoading(true)
  }

  const setCaseName = (value: string) => {
    setSearchCase({ ...searchCase, caseName: value })
    setLoading(true)
  }

  useEffect(() => {
    serviceList.length === 0 && fetchProductList()
  }, [serviceList])

  /**
   *  监听pageNo变化时刷新列表
   */
  useEffect(() => {
    loading && fetchCaseList()
  }, [pageNo, loading])


  return (
    <div className={styles.content}>
      <Input.Group className={styles.action}>
        <span>结果：</span>
        <Select className={styles.select} defaultValue="全部" onChange={setResult} >
          <Option value="">全部</Option>
          <Option value="true">成功</Option>
          <Option value="false">失败</Option>
        </Select>

        <span className={styles.span}>产品：</span>
        <Select className={styles.select} defaultValue={"全部"} onChange={setProductId}>
          <OptGroup label="全部">
            <Option value="">全部</Option>
          </OptGroup>
          {serviceList?.map((service: ServiceInfo) => (
            <OptGroup label={service.serviceName} key={service.serviceName}>
              {service.products.map((product: ProductInfo) => (
                <Option value={product.id} key={product.id}>{product.productName}</Option>))}
            </OptGroup>
          ))}
        </Select>
        <span className={styles.span}>环境：</span>
        <Select className={styles.select} defaultValue="全部" onChange={setEnv}>
          <Option value="">全部</Option>
          <Option value="test">测试环境</Option>
          <Option value="prod">生产环境</Option>
        </Select>
        <span className={styles.span}>name：</span>
        <Search placeholder="name" onSearch={setCaseName} enterButton />
        <span className={styles.span}>owner：</span>
        <Search placeholder="owner" onSearch={setCaseOwner} enterButton />
      </Input.Group>
      <Table
        columns={columns}
        dataSource={caseList}
        rowKey='id'
        onChange={onChangeTable}
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        className={styles.table}
      >
      </Table>
      <CasseReasonModule reason={reason} onCancel={() => setReason(undefined)} />
    </div>
  );
};

export default CaseDataPage;