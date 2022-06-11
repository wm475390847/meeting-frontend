import { getTaskReport } from '@/services/task';
import { Avatar, Collapse, Grid, List, message, Modal } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './index.module.less'
import VirtualList from 'rc-virtual-list';

type TaskReportMoalComponentsProps = {
  taskInfo?: TaskInfo
  onCancel?: () => void
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface ICaseHistory {
  caseResult: number
  taskId: number
}

const TaskReportModal: React.FC<TaskReportMoalComponentsProps> = (props) => {
  const { taskInfo, onCancel } = props
  const { Panel } = Collapse;
  const text = 'sssssss'

  const [reportList, setReportList] = useState<ReportInfo[]>([])
  const [pageNo, setPageNo] = useState(1)
  const [visible, setVisible] = useState(false)
  const ContainerHeight = 400;

  const onChange = (key: string | string[]) => {
    console.log(taskInfo);
    console.log(key);
  };

  /**
   * 关闭弹窗
   */
  const handleCancel = () => {
    setVisible(false)
    onCancel && onCancel()
  }

  useEffect(() => {
    taskInfo && setVisible(true)
  }, [taskInfo])

  /**
   * 获取报告
   * @param data 请求体
   */
  const fetchGetReport = (data: ICaseHistory) => {
    getTaskReport({
      pageNo,
      pageSize: 10,
      id: data.taskId,
      caseResult: data.caseResult
    }).then(data => {
      setReportList(data.records)
    })
  }

  return (
    <>
      <Modal
        visible={visible}
        className={styles.modal}
        title="用例执行记录"
        onCancel={handleCancel}
        destroyOnClose
      >
        <Collapse className={styles.collapse} destroyInactivePanel={true} defaultActiveKey={['1']} onChange={onChange} >
          <Panel header="成功" key="1">
            <List >
            




              {/* <VirtualList
                data={data}
                // height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
              // onScroll={onScroll}
              > */}
              {/* {(item: UserItem) => (
                  <List.Item key={item.email}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.picture.large} />}
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description={reportList as ReactNode}
                    />
                    <div>Content</div>
                  </List.Item>
                )} */}
              {/* </VirtualList> */}
            </List>
          </Panel>
          <Panel header="失败" key="2">
          </Panel>
          <Panel header="未执行" key="3">
          </Panel>
        </Collapse>

      </Modal>
    </>
  );
};

export default TaskReportModal;