import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { ICreateFaceReq, ISearchFaceListReq } from "./interface"

/**
 * 获取人脸识别任务列表
 * @param data 
 * @returns 
 */
export const getFaceList: (data: ISearchFaceListReq) => Promise<IPageRequest<FaceData>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/face/lists`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

/**
 * 创建人脸识别任务
 * @param data 
 * @returns 
 */
export const createFace: (data: ICreateFaceReq) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/face/create`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 执行人脸识别
 * @param id 
 * @returns 
 */
export const executeFace: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/face/execute/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 获取人脸识别结果
 * @param id 
 * @returns 
 */
export const getFaceResult: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/face/compare/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}