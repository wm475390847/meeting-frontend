interface FaceInfo {
    faceUrl: string
    faceDesc: string
    miceId: string
    metaData: string
    resultData: string
    id: number
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
    imageList?: string[]
}