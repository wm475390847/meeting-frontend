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
}