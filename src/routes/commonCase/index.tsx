import { Button, PageHeader, Popconfirm, Progress, Table } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { ColumnsType } from 'antd/lib/table';
import { getCommonCases } from '@/services/commonCase';
import { MView } from '@/components';
import styles from './index.module.less'
import CommonCasseReasonModal from '@/components/CommonCaseModal';
import moment from 'moment';

const CommonCaseTable: React.FC = (props) => {
  const [pageNo, setPageNo] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [commonCaseList, setCommonCaseList] = useState<CommonCaseInfo[]>()
  const [reason, setReason] = useState()

  const onChangeTable = (value: any) => {
    const { current, pageSize } = value
    setPageNo(current)
    setPageSize(pageSize)
    setLoading(true)
  }

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
        ellipsis: true
      },
      {
        title: "Desc",
        key: "caseDesc",
        dataIndex: "caseDesc",
        width: '15%',
        ellipsis: true
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

  /**
   * 获取报告
   */
  const fetchCommonCaseList = () => {
    getCommonCases({
      pageNo: pageNo,
      pageSize: pageSize
    }).then(data => {
      setCommonCaseList(data.records)
      setTotal(data.total)
      setLoading(false)
    })
  }

  /**
   *  监听pageNo变化时刷新列表
   */
  useEffect(() => {
    pageNo && fetchCommonCaseList()
  }, [pageNo])


  return (
    <MView resize>
      <PageHeader title="用例列表" />
      <Table
        className={styles.table}
        columns={columns}
        dataSource={commonCaseList}
        onChange={onChangeTable}
        pagination={{ total, current: pageNo, showSizeChanger: true }}
        loading={loading}
        rowKey="id"
      >
      </Table>
      <CommonCasseReasonModal reason={reason} onCancel={() => setReason(undefined)} />
    </MView>
  );
};

export default CommonCaseTable;