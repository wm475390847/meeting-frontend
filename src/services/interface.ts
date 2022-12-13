export interface ISearchCaseListReq {
  pageSize: number
  pageNo: number
  caseResult?: boolean
  productId?: number
  env?: string
  caseOwner?: string
  caseName?: string
}

/**
 * 获取face列表请求
 */
export interface ISearchFaceListReq {
  pageSize: number
  pageNo: number
}

/**
 * 创建人脸请求
 */
export interface ICreateFaceReq {
  miceId: string
  faceUrl: string
  faceDesc?: string
}

/**
 * 修改人脸请求
 */
export interface IUpdateFaceReq {
  id?: number
  faceDesc?: string;
  metaData?: string;
  resultData?: string;
  faceUrl?: string;
  miceId?: string;
}

/**
 * 获取h5列表请求
 */
export interface ISearchH5Req {
  pageNo: number
  pageSize: number
  h5Name?: string
  meetingName?: string
  meetingStartTime?: number
  meetingEndTime?: number
  taskId?: number
}

/**
 * 创建h5请求
 */
export interface ICreateH5Req {
  meetingName: string
  meetingId: string
  meetingStartTime: number
  meetingEndTime: number
  h5Name: string
  h5Url: string
  username: string
  password: string
}

/**
 * 修改h5请求
 */
export interface IUpdateH5Req {
  meetingName: string
  meetingId: string
  meetingStartTime: number
  meetingEndTime: number
  h5Name: string
  h5Url: string
  username: string
  password: string
  id: number
}

export interface ISearchProductListReq {
  pageNo: number
  pageSize: number
}

/**
 * 获取任务列表请求
 */
export interface ISearchTaskListReq {
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
  caseIds?: number[]
  taskName?: string
  id: number
}