/**
 * 获取任务列表请求
 */
export interface ITaskInfoListReq {
  pageNo: number
  pageSize: number
  taskName?: string
}

/**
 * 创建任务请求
 */
export interface ICreateTaskReq {
  caseIds: number[]
  taskName: string
}

/**
 * 修改任务请求
 */
export interface IUpdateTaskReq {
  caseIds: number[]
  taskName: string
}


