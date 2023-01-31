import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { ISearchCaseListReq } from "./interface"
import { ICreateFaceReq, ISearchFaceListReq, IUpdateFaceReq } from "./interface"
import { ICreateH5Req, ISearchH5Req, IUpdateH5Req } from "./interface"
import { ISearchTaskListReq } from "./interface"

/**
 * 获取用例列表
 * @param data 
 * @returns 
 */
export const getCaseList: (data: ISearchCaseListReq) => Promise<IPageRequest<CaseInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/cases`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const getCaseCount: () => Promise<RequestOpt> = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/cases/count`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const deleteCase: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/cases/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const executeCase: (jobId: number, caseName: string) => Promise<RequestOpt> = (jobId, caseName) => {
    const data = {
        "jobId": `${jobId}`,
        "customParameters": {
            "case_names": `${caseName}`
        }
    }
    return new Promise(async (resolve, reject) => {
        const res = await request.ciPost(`http://cloudwings.xinhuazhiyun.com/api/ci/executeJobByParams`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 获取产品列表
 * @returns 
 */
export const getProdectList: () => Promise<ServiceInfo[]> = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/cases/products/group`)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

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
 * 修改人脸识别任务
 * @param data 
 * @returns 
 */
export const deleteFace: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/api/face/${id}`)
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

export const executeTask: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/api/task/execute/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const deleteTask: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/api/task/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getTaskList: (data: ISearchTaskListReq) => Promise<IPageRequest<TaskInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/tasks`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const getTaskReport: (data: { taskId: number, result?: boolean }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/task/report`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getTaskResultPercent: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/task/result/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getH5List: (data: ISearchH5Req) => Promise<IPageRequest<H5Info>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/pages`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const createH5: (data: ICreateH5Req) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/api/page`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const updateH5: (data: IUpdateH5Req) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.put(`/api/page`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const batchUpdate: () => Promise<RequestOpt> = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.put(`/api/page/batch`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const deleteH5: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/api/page/${id}`, id)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getOssConfig: (data: { business: string }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/oss/sts`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/api/user`)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}