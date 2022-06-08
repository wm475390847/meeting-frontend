export interface ITaskReq {
  taskName?: string
  pageSize: number
  pageNo: number
}

export interface IStopTaskReq {
  id: number
  status: number
}