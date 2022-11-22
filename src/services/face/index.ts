import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { ICreateFaceReq, ISearchFaceListReq, IUpdateFaceReq } from "./interface"

/**
 * 获取人脸识别任务列表
 * @param data 
 * @return
 */
export const getFaceList: (data: ISearchFaceListReq) => Promise<IPageRequest<FaceInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/faces`, data)
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
        const res = await request.post(`/api/face`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 修改人脸识别任务
 * @param data 
 * @returns 
 */
export const updateFace: (data: IUpdateFaceReq) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.put(`/api/face`, data)
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
        const res = await request.post(`/api/face/execute/${id}`)
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
        const res = await request.get(`/api/face/result/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getOssCongfig: (business: string) => Promise<RequestOpt> = (business) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/ossConfig/${business}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}