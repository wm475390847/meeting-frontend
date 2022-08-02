/**
 * 获取h5列表请求
 */
export interface IH5DataListReq {
  pageNo: number
  pageSize: number
  h5Name?: string
  meetingName?: string
  meetingStartTime?: number
  meetingEndTime?: number
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


