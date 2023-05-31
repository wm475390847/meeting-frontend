interface IRouterProps {
  path: string
}

interface PieData {
  type: string
  value: number
}

interface IPageRequest<T> {
  current: number
  pages: number
  records: T[]
  total: number
}

interface CaseInfo {
  id: number
  caseName: string
  caseOwner: string
  caseResult: boolean
  caseReason: string
  caseDesc: string
  apiJson: string
  productName: string
  productId: number
  env: string
}

interface ServiceInfo {
  id: number
  serviceName: string
  products: ProductInfo[]
}

interface ProductInfo {
  id: number
  productName: string
  serviceName: string
  caseCount: string
  casePercent: string
}

interface Face {
  faceUrl: string
  faceDesc: string
  miceUrl: string
  metaData: string
  resultData: string
  id: number
  account: string
  password: string
  env: number
}

interface DiffData {
  businessId: string
}

/**
* 人脸识别结果
*/
interface FaceResult {
  /**
   * 视频数量
   */
  videoNum: number
  /**
   * 图片数量
   */
  imageNum: number
  /**
   * 总量
   */
  total: number
  /**
   * 包含哪些视频
   */
  videoIdList?: string[]
  /**
   * 包含哪些图片
   */
  imageIdList?: string[]
}

interface OssConfig {
  securityToken: string
  accessKeySecret: string
  accessKeyId: string
  expiration: string
  bucketName: string
  endPoint: string
  uploadPath: string
  fileId: string
}

interface H5 {
  h5Name: string
  h5Url: string
  id: number
  meetingId: string
  meetingName: string
  meetingStartTime: string
  meetingEndTime: string
}

interface ExecuteResult {
  id: number
  meetingName: string
  meetingId: string
  meetingStartTime: string
  meetingEndTime: string
  h5Name: string
  h5Url: string
  baseOssPath: string
  resultOssPath: string
  username: string
  password: string
  gmtCreate: string
  executeTime: string
  resultValue: number
  status: number
  reason: string
  result: boolean
}

interface ResultPercent {
  total: number
  success: number
  percent: number
}

interface ProductInfo {
  id: number
  productName: string
  serviceName: string
}

/**
 * 任务报告
 */
interface TaskReport {

  /**
   * 主键
   */
  id: number

  /**
   * 会议名称
   */
  meetingName: string

  /**
   * 会议id
   */
  meetingId: string

  /**
   * 会议开始时间
   */
  meetingStartTime: string

  /**
   * 会议结束时间
   */
  meetingEndTime: string

  /**
   * h5名称
   */
  h5Name: string

  /**
   * url地址
   */
  h5Url: string

  /**
   * 基础截图的oss路径
   */
  baseOssPath: string

  /**
   * 对比结果图的oss地址
   */
  resultOssPath: string

  /**
   * 用户名称
   */
  username: string

  /**
   * 密码
   */
  password: string

  /**
   * 创建时间
   */
  gmtCreate: string

  /**
   * 执行时间
   */
  executeTime: string

  /**
   * 结果值
   */
  resultValue: number

  /**
   * 1、已执行 2、执行中 3、未执行
   */
  status: number

  /**
   * 错误原因，如果没有错误就是PASS
   */
  reason: string

  /**
   * 执行结果
   */
  result: boolean

}

/**
* 人脸识别报告
*/
interface FaceReport {
  /**
   * 旧的结果
   */
  oldResult: FaceResult
  /**
   * 新的结果
   */
  newResult: FaceResult
  /**
   * diff图片
   */
  imageDiffList: string[]
  /**
   * diff视频
   */
  videoDiffList: string[]
}

interface Task {
  taskName: string
  id: number
  caseIds: number[]
  cron?: string
  executeTime?: string
  elapsedTime?: string
  status: number
}

interface ExecuteResult {
  id: number
  meetingName: string
  meetingId: string
  meetingStartTime: string
  meetingEndTime: string
  h5Name: string
  h5Url: string
  baseOssPath: string
  resultOssPath: string
  username: string
  password: string
  gmtCreate: string
  executeTime: string
  resultValue: number
  status: number
  reason: string
  result: boolean
}

interface PerformanceInfo {
  id: number
  performanceName: string
  requestData: JSON
  threadData: JSON
  jmxPath: string
  executeTime: string
  elapsedTime: number
  status: number
  gmtCreate: string
  gmtModified: string
}

interface PerfReportHistory {
  id: number
  perfId: number
  reportPath: string
  gmtCreate: string
  gmtModified: string
}


interface ResultPercent {
  total: number
  success: number
  percent: number
}

interface Window {
  md5: any;
  wx: any;
}

declare module "*.module.less";
declare module "*.svg";
declare module "*.png";
declare module "*.MOV";