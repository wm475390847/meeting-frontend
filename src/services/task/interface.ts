export interface ITaskReq {
  taskName?: string
  pageSize: number
  pageNo: number
}
export interface IStopTaskReq {
  id: number
  status: number
}
export interface ICreateTaskReq {
  gameDictIds?: number[]
  caseIds?: number[]
  taskName?: string
}
export interface ITaskRepoerReq {
  pageNo: number
  pageSize: number
  id: number
  caseResult: number
}