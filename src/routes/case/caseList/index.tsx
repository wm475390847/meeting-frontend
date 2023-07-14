import {Button, Input, message, Popconfirm, Progress, Select, Table} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ColumnsType} from "antd/lib/table";
import moment from "moment";
import {deleteCase, executeCase, getCaseList} from "@/services";
import TextBoxModule from "@/components/TextBox"
import ToolTipModule from "@/components/ToolTip";
import styles from "./index.module.less"

interface SearchParams {
  caseResult?: boolean
  env?: string
  caseOwner?: string
  caseName?: string
}

const CaseListPage: React.FC = () => {
  const {Search} = Input
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [caseList, setCaseList] = useState<CaseInfo[]>()
  const [reason, setReason] = useState()
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null)
  const [buttonLoading, setButtonLoading] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const search = new URLSearchParams(location.search);

  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: "序号",
        width: "6%",
        render: (_text, _record, index) => (pageNo as number - 1) * (pageSize as number) + index + 1
      },
      {
        title: "用例名称",
        key: "caseName",
        dataIndex: "caseName",
        width: "15%",
        ellipsis: true,
        render: (text) => <ToolTipModule linkText={text} buttonText={text}/>
      },
      {
        title: "描述",
        key: "caseDesc",
        dataIndex: "caseDesc",
        width: "20%",
        ellipsis: true,
        render: (text) => <ToolTipModule linkText={text} buttonText={text}/>
      },
      {
        title: "结果",
        key: "caseResult",
        dataIndex: "caseResult",
        width: "6%",
        render: (text) => {
          return (
              text ? < Progress type="circle" percent={100} size={30}/> :
                  < Progress status="exception" type="circle" percent={100} size={30}/>
          )
        }
      },
      {
        title: "环境",
        key: "env",
        dataIndex: "env",
        width: "6%"
      },
      {
        title: "作者",
        key: "caseOwner",
        dataIndex: "caseOwner",
        width: "7%"
      },
      {
        title: "执行时间",
        key: "executeTime",
        dataIndex: "executeTime",
        width: "15%",
        render: (text) => <div>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</div>
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        width: "20%",
        render: (_, record) => {
          return (
              <div className={styles.buttonGroup}>
                <Button disabled={record.caseResult} type="primary"
                        onClick={() => setReason(record.caseReason)}>查看</Button>
                <Popconfirm title="确定删除？" placement="top" okText="是" cancelText="否"
                            onConfirm={() => handleDeleteCase(record.id)}>
                  <Button loading={buttonLoading}>删除</Button>
                </Popconfirm>
                <Button disabled={!record.ciJobId} onClick={() => {
                  handleExecuteCase(record.ciJobId, record.caseName)
                }}>执行</Button>
              </div>
          )
        }
      }
    ]
  }, [pageNo, pageSize])

  const onChangeTable = (value: any) => {
    const {current, pageSize} = value
    setPageNo(current)
    setPageSize(pageSize)
    setLoading(true)
  }

  const handleDeleteCase = (id: number) => {
    deleteCase(id)
        .then(res => {
          message.info(res.message).then(r => r)
          setLoading(true)
        })
        .catch(err => message.error(err.message))
        .finally(() => setButtonLoading(false))
  }

  const handleExecuteCase = (ciJobId: number, caseName: string) => {
    executeCase(ciJobId, caseName)
        .then(() => {
          message.info("执行成功").then(r => r)
          setLoading(true)
        })
        .catch(() => message.error("执行失败"))
        .finally(() => setButtonLoading(false))
  }

  const resultOptions = [
    {value: "", label: "全部"},
    {value: "true", label: "成功"},
    {value: "false", label: "失败"}
  ]

  const envOptions = [
    {value: "", label: "全部"},
    {value: "test", label: "测试环境"},
    {value: "prod", label: "生产环境"}
  ]

  const handleGetCaseList = (searchParams: SearchParams) => {
    getCaseList({
      pageNo: pageNo,
      pageSize: pageSize,
      productId: id as unknown as number,
      ...searchParams
    }).then(data => {
      setCaseList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }
  const handleProvinceChange = (key: string, value: any) => {
    const sc: { [key: string]: any } = {...searchParams};
    sc[key] = value
    // setSearchParams(sc)
    const params = Object.entries(sc as any)
        .filter(([, value]) => value !== '') // Exclude properties with empty values
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`)
        .join("&");
    console.log("向路由中放入搜索参数:", params)
    navigate({
      pathname: location.pathname,
      search: params
    })
  }

  /**
   * 监听路由搜索参数变化，如果变化了更新搜索参数
   */
  useEffect(() => {
    const searchParams: SearchParams = {};
    const env = search.get("env");
    if (env !== null) {
      searchParams.env = env;
    }
    const caseName = search.get("caseName");
    if (caseName !== null) {
      searchParams.caseName = caseName;
    }
    const caseOwner = search.get("caseOwner");
    if (caseOwner !== null) {
      searchParams.caseOwner = caseOwner;
    }
    const caseResult = search.get("caseResult");
    if (caseResult !== null) {
      searchParams.caseResult = caseResult as unknown as boolean;
    }
    setSearchParams(searchParams)
  }, [location.search])

  /**
   * 监听搜索变化
   */
  useEffect(() => {
    searchParams && handleGetCaseList(searchParams)
  }, [searchParams])

  /**
   * 监听页面刷新&页码变化
   */
  useEffect(() => {
    loading && searchParams && handleGetCaseList(searchParams)
  }, [pageNo, loading])

  return (
      <div>
        <div className={styles.action}>
          <div className={styles.container}>
            <span className={styles.span}>结果：</span>
            <Select
                className={styles.select}
                placeholder="请选择执行结果"
                value={resultOptions.find(option => option.value === searchParams?.caseResult as unknown as string)?.label}
                defaultValue={resultOptions[0].label}
                onSelect={(e: any) => handleProvinceChange("caseResult", e)}
                options={resultOptions}
            >
            </Select>
          </div>

          <div className={styles.container}>
            <span className={styles.span}>环境：</span>
            <Select
                className={styles.select}
                value={searchParams?.env}
                defaultValue={envOptions[0].label}
                onSelect={(e: any) => handleProvinceChange("env", e)}
                options={envOptions}
            >
            </Select>
          </div>

          <div className={styles.container}>
            <span className={styles.span}>用例名称：</span>
            <Search
                className={styles.search}
                placeholder="请输入用例名称"
                value={searchParams?.caseName}
                onSearch={(e: any) => handleProvinceChange("caseName", e)}
                enterButton
                allowClear
            />
          </div>

          <div className={styles.container}>
            <span className={styles.span}>用例作者：</span>
            <Search
                className={styles.search}
                placeholder="请输入作者"
                value={searchParams?.caseOwner}
                onSearch={(e: any) => handleProvinceChange("caseOwner", e)}
                enterButton
                allowClear
            />
          </div>
        </div>
        <div>
          <Table
              columns={columns}
              dataSource={caseList}
              rowKey="id"
              onChange={onChangeTable}
              pagination={{total, current: pageNo, showSizeChanger: true}}
              loading={loading}
              className={styles.table}
          />
        </div>
        <TextBoxModule text={reason} onCancel={() => setReason(undefined)}/>
      </div>
  );
};

export default CaseListPage;