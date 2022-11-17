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
