import { request } from "@/utils/tool"
import { ISearchCaseListReq, ISearchPerformanceReq, ISearchProductListReq } from "./interface"
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
        const res = await request.get(`/ttp/cases`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const getCaseCount: () => Promise<RequestOpt> = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/ttp/cases/count`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const deleteCase: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/ttp/cases/${id}`)
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


export const getProductList: (data: ISearchProductListReq) => Promise<IPageRequest<ProductInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/ttp/products`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}
/**
 * 获取产品分组
 * @returns 
 */
export const getProductGroup: () => Promise<ServiceInfo[]> = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/ttp/products/group`)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

/**
 * 删除产品
 * @param data 查询数据
 * @returns 
 */
export const deleteProduct: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/ttp/products/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 查询性能测试
 * @param data 查询数据
 * @returns 
 */
export const getPerfList: (data: ISearchPerformanceReq) => Promise<IPageRequest<PerformanceInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/ttp/perf`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

/**
 * 获取性能测试报告
 * @param perfId 性能测试id
 * @returns 
 */
export const getPerfReportList: (perfId: number) => Promise<RequestOpt> = (perfId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/ttp/perf/reports/${perfId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 执行性能测试
 * @param perfId 性能测试id
 * @returns 
 */
export const startPerformance: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/ttp/perf/start/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 批量更新性能测试
 * @returns 
 */
export const batchUpdatePerformance: () => Promise<RequestOpt> = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.put(`/ttp/perf/batchUpdate`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

/**
 * 删除性能测试
 * @param perfId 性能测试id
 * @returns 
 */
export const deletePerformance: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/ttp/perf/${id}`)
        if (res.success) {
            resolve(res)
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
export const getFaceList: (data: ISearchFaceListReq) => Promise<IPageRequest<Face>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/conference/faces`, data)
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
        const res = await request.post(`/conference/face`, data)
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
        const res = await request.put(`/conference/face`, data)
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
        const res = await request.delete(`/conference/face/${id}`)
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
        const res = await request.post(`/conference/face/execute/${id}`)
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
        const res = await request.get(`/conference/face/result/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const executeTask: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/conference/task/execute/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const executeHistory: (historyId: number) => Promise<RequestOpt> = (historyId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/conference/task/executeHistory/${historyId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const deleteTask: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/conference/task/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getTaskList: (data: ISearchTaskListReq) => Promise<IPageRequest<Task>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/conference/tasks`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const getTaskReport: (data: { taskId: number, result?: boolean }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/conference/task/report`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getTaskResultPercent: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/conference/task/result/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getH5List: (data: ISearchH5Req) => Promise<IPageRequest<H5>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/conference/pages`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const createH5: (data: ICreateH5Req) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/conference/page`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const updateH5: (data: IUpdateH5Req) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.put(`/conference/page`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const batchUpdate: () => Promise<RequestOpt> = () => {
    return new Promise(async (resolve, reject) => {
        const res = await request.put(`/conference/page/batch`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const deleteH5: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.delete(`/conference/page/${id}`, id)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}


export const getOssConfig: (data: { business: string }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/conference/oss/sts`, data)
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
        const res = await request.get(`/conference/user`)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}