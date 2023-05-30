import { Button, Input, message, Popconfirm, Progress, Select, Table } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { deleteCase, executeCase, getCaseList, getProdectList } from '@/services';
import CasseReasonModule from '@/components/CaseReason'
import ToolTipModule from '@/components/ToolTip';
import styles from './index.module.less'

interface SearchCase {
  productId?: number
  caseResult?: boolean
  env?: string
  caseOwner?: string
  caseName?: string
}

const CaseListPage: React.FC = (props) => {
  const { Option, OptGroup } = Select;
  const { Search } = Input
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [caseList, setCaseList] = useState<CaseInfo[]>()
  const [reason, setReason] = useState()
  const [searchCase, setSearchCase] = useState<SearchCase>()
  const [productList, setProductList] = useState<ServiceInfo[]>([])
  const [buttonLoading, setButtongLoading] = useState(false)

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: '6%',
        render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
      },
      {
        title: '用例名称',
        key: 'caseName',
        dataIndex: 'caseName',
        width: '15%',
        ellipsis: true,
        render: (text) => <ToolTipModule linkText={text} buttonText={text} />
      },
      {
        title: "描述",
        key: "caseDesc",
        dataIndex: "caseDesc",
        width: '15%',
        ellipsis: true,
        render: (text) => <ToolTipModule linkText={text} buttonText={text} />
      },
      {
        title: "结果",
        key: "caseResult",
        dataIndex: "caseResult",
        width: '7%',
        render: (text) => {
          return (
            text ? < Progress type="circle" percent={100} width={30} /> : < Progress status="exception" type="circle" percent={100} width={30} />
          )
        }
      },
      {
        title: "产品",
        key: "productName",
        dataIndex: "productName",
        width: '9%'
      },
      {
        title: "环境",
        key: "env",
        dataIndex: "env",
        width: '6%'
      },
      {
        title: "作者",
        key: "caseOwner",
        dataIndex: "caseOwner",
        width: '10%'
      },
      {
        title: "执行时间",
        key: "excuteTime",
        dataIndex: "executeTime",
        width: '10%',
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '20%',
        render: (_, record) => {
          return (
            <div className={styles.tableAction}>
              <Button disabled={record.caseResult} type="primary" onClick={() => setReason(record.caseReason)}>查看</Button>
              <Popconfirm title="确定删除？" placement="top" okText="是" cancelText="否" onConfirm={() => handleDeleteCase(record.id)}>
                <Button loading={buttonLoading}>删除</Button>
              </Popconfirm>
              <Button disabled={!record.ciJobId} onClick={() => { handleExecuteCase(record.ciJobId, record.caseName) }}>执行</Button>
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

  const handleDeleteCase = (id: number) => {
    deleteCase(id)
      .then(res => {
        message.info(res.message)
        setLoading(true)
      }).catch(err => {
        message.error(err.message)
      }).finally(() => setButtongLoading(false))
  }

  const handleExecuteCase = (ciJobId: number, caseName: string) => {
    executeCase(ciJobId, caseName)
      .then(data => {
        message.info('执行成功')
        setLoading(true)
      }).catch(err => {
        message.error('执行失败')
      }).finally(() => setButtongLoading(false))
  }

  const handleCaseList = () => {
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

  const handleProductList = () => {
    getProdectList()
      .then(data => {
        setProductList(data)
        setLoading(false)
      })
  }

  const handleProvinceChange = (key: string, value: any) => {
    const sc: { [key: string]: any } = { ...searchCase };
    sc[key] = value
    setSearchCase(sc)
    setLoading(true)
  }

  useEffect(() => {
    productList.length === 0 && handleProductList()
  }, [productList])

  useEffect(() => {
    loading && handleCaseList()
  }, [pageNo, loading])

  return (
    <div >
      <div className={styles.action}>

        <div className={styles.container}>
          <span className={styles.span}>结果：</span>
          <Select
            className={styles.select}
            placeholder='请选择执行结果'
            defaultValue="全部"
            onSelect={(e: any) => { handleProvinceChange('caseResult', e) }} >
            <Option value="">全部</Option>
            <Option value="true">成功</Option>
            <Option value="false">失败</Option>
          </Select>
        </div>

        <div className={styles.container}>
          <span className={styles.span}>产品：</span>
          <Select
            className={styles.select}
            defaultValue={"全部"}
            onSelect={(e: any) => { handleProvinceChange('productId', e) }}
          >
            <OptGroup label="全部">
              <Option value="">全部</Option>
            </OptGroup>
            {productList?.map((service: ServiceInfo) => (
              <OptGroup label={service.serviceName} key={service.serviceName}>
                {service.products.map((product: ProductInfo) => (
                  <Option value={product.id} key={product.id}>{product.productName}</Option>))}
              </OptGroup>
            ))}
          </Select>
        </div>


        <div className={styles.container}>
          <span className={styles.span}>环境：</span>
          <Select
            className={styles.select}
            defaultValue="全部"
            onSelect={(e: any) => { handleProvinceChange('env', e) }} >
            <Option value="">全部</Option>
            <Option value="test">测试环境</Option>
            <Option value="prod">生产环境</Option>
          </Select>
        </div>


        <div className={styles.container} >
          <span className={styles.span}>用例名称：</span>
          <Search
            className={styles.search}
            placeholder="请输入用例名称"
            onSearch={(e: any) => { handleProvinceChange('caseName', e) }}
            enterButton
            allowClear
          />
        </div>

        <div className={styles.container}>
          <span className={styles.span}>用例作者：</span>
          <Search
            className={styles.search}
            placeholder="请输入作者"
            onSearch={(e: any) => { handleProvinceChange('owner', e) }}
            enterButton
            allowClear
          />
        </div>
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={caseList}
          rowKey='id'
          onChange={onChangeTable}
          pagination={{ total, current: pageNo, showSizeChanger: true }}
          loading={loading}
          className={styles.table}
        />
      </div>
      <CasseReasonModule reason={reason} onCancel={() => setReason(undefined)} />
    </div >
  );
};

export default CaseListPage;