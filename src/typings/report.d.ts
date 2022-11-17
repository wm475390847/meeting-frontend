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
    imageList?: string[]
}