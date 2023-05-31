import { Breadcrumb, Button, Input, message, Popconfirm, Progress, Select, Table } from 'antd';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { deleteCase, executeCase, getCaseList, getProductGroup } from '@/services';
import CasseReasonModule from '@/components/CaseReason'
import ToolTipModule from '@/components/ToolTip';
import styles from './index.module.less'
import { Link, useLocation, useParams } from 'react-router-dom';

interface SearchCase {
  caseResult?: boolean
  env?: string
  caseOwner?: string
  caseName?: string
}

const ProductDetailPage: React.FC = () => {
  const { Option } = Select;
  const { Search } = Input
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [caseList, setCaseList] = useState<CaseInfo[]>()
  const [reason, setReason] = useState()
  const [searchCase, setSearchCase] = useState<SearchCase>()
  const [buttonLoading, setButtongLoading] = useState(false)
  const { productName } = useParams<{ productName: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("id");

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: '序号',
        width: '10%',
        render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
      },
      {
        title: '用例名称',
        key: 'caseName',
        dataIndex: 'caseName',
        width: '20%',
        ellipsis: true,
        render: (text) => <ToolTipModule linkText={text} buttonText={text} />
      },
      {
        title: "描述",
        key: "caseDesc",
        dataIndex: "caseDesc",
        width: '20%',
        ellipsis: true,
        render: (text) => <ToolTipModule linkText={text} buttonText={text} />
      },
      {
        title: "结果",
        key: "caseResult",
        dataIndex: "caseResult",
        width: '5%',
        render: (text) => {
          return (
            text ? < Progress type="circle" percent={100} width={30} /> : < Progress status="exception" type="circle" percent={100} width={30} />
          )
        }
      },
      {
        title: "环境",
        key: "env",
        dataIndex: "env",
        width: '5%'
      },
      {
        title: "作者",
        key: "caseOwner",
        dataIndex: "caseOwner",
        width: '5%'
      },
      {
        title: "执行时间",
        key: "excuteTime",
        dataIndex: "executeTime",
        width: '15%',
        render: (text) => <div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: '25%',
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

  const handleGetCaseList = () => {
    getCaseList({
      pageNo: pageNo,
      pageSize: pageSize,
      productId: productId as unknown as number,
      caseResult: searchCase?.caseResult,
      env: searchCase?.env,
      caseOwner: searchCase?.caseOwner,
      caseName: searchCase?.caseName
    }).then(data => {
      setCaseList(data.records)
      setTotal(data.total)
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
    loading && handleGetCaseList()
  }, [pageNo, loading])

  return (
    <div >
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/app/case/productList">产品列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{productName}</Breadcrumb.Item>
      </Breadcrumb>

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

export default ProductDetailPage;