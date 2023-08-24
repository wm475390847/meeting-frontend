import {
    ICreateFaceReq,
    ICreateH5Req,
    ICreatePerfReq,
    ISearchCaseListReq,
    ISearchFaceListReq,
    ISearchH5Req,
    ISearchPerfReq,
    ISearchProductListReq,
    ISearchTaskListReq,
    ISearchReportListReq,
    IUpdateFaceReq,
    IUpdateH5Req
} from "./interface"
import {HttpClient} from "@/utils"


const client = new HttpClient({})

/**
 * 获取用例列表
 * @param data
 * @returns
 */
export const getCaseList: (data: ISearchCaseListReq) => Promise<IPageRequest<CaseInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/cases`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })

    })
}

export const getCaseData: () => Promise<RequestOpt> = () => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/cases/data`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })

    })
}

export const deleteCase: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.delete(`/conference/cases/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 执行用例
 * @param jobId ci的jobId
 * @param caseName 用例名称
 */
export const executeCase: (jobId: number, caseName: string) => Promise<RequestOpt> = (jobId, caseName) => {
    const data = {
        "jobId": `${jobId}`,
        "customParameters": {
            "case_names": `${caseName}`
        }
    }
    return new Promise(async (resolve, reject) => {
        await client.post(`https://cloudwings.xinhuazhiyun.com/api/ci/executeJobByParams`, data, true)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 获取产品列表
 * @param data 搜索数据
 */
export const getProductList: (data: ISearchProductListReq) => Promise<IPageRequest<ProductInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/products`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 删除产品
 * @param id 查询数据
 * @returns
 */
export const deleteProduct: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.delete(`/conference/products/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 创建产品
 * @param data 查询数据
 * @returns
 */
export const createProduct: (data: { productName: string, serviceId: number }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/conference/products`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 编辑产品
 * @param data 查询数据
 * @returns
 */
export const updateProduct: (data: {
    id: number,
    productName: string,
    serviceId: number
}) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.put(`/conference/products`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 获取业务列表
 * @returns
 */
export const getServiceList: () => Promise<ServiceInfo[]> = () => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/services`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 创建性能测试
 * @param data 查询数据
 * @returns
 */
export const createPerf: (data: ICreatePerfReq) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/conference/perf`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 修改性能测试
 * @param data 查询数据
 * @returns
 */
export const updatePerf: (data: ICreatePerfReq) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.put(`/conference/perf`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 查询性能测试
 * @param data 查询数据
 * @returns
 */
export const getPerfList: (data: ISearchPerfReq) => Promise<IPageRequest<PerfInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/perf`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 获取性能测试报告
 * @param perfId 性能测试id
 * @returns 
 */
export const getPerfReportList: (perfId: number) => Promise<RequestOpt> = (perfId) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/perf/reports/${perfId}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 删除性能测试
 * @param id 性能测试id
 * @returns
 */
export const deletePerf: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.delete(`/conference/perf/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 获取人脸识别任务列表
 * @param data 
 * @return
 */
export const getFaceList: (data: ISearchFaceListReq) => Promise<IPageRequest<Face>> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/faces`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 创建人脸识别任务
 * @param data 
 * @returns 
 */
export const createFace: (data: ICreateFaceReq) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/conference/face`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 修改人脸识别任务
 * @param data 
 * @returns 
 */
export const updateFace: (data: IUpdateFaceReq) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.put(`/conference/face`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 修改人脸识别任务
 * @param id
 * @returns
 */
export const deleteFace: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.delete(`/conference/face/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 执行人脸识别
 * @param id 
 * @returns 
 */
export const executeFace: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/conference/face/execute/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 获取人脸识别结果
 * @param id 
 * @returns 
 */
export const getFaceResult: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/face/result/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const executeTask: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/conference/task/execute/${taskId}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const getExecuteHistory: (historyId: number) => Promise<RequestOpt> = (historyId) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/conference/task/executeHistory/${historyId}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const deleteTask: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        await client.delete(`/conference/task/${taskId}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const getTaskList: (data: ISearchTaskListReq) => Promise<IPageRequest<Task>> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/tasks`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}

export const getTaskReport: (data: { taskId: number, result?: boolean }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/task/report`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const getTaskResult: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/task/result/${taskId}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const getH5List: (data: ISearchH5Req) => Promise<IPageRequest<H5>> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/pages`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}

export const createH5: (data: ICreateH5Req) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/conference/page`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const updateH5: (data: IUpdateH5Req) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.put(`/conference/page`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const batchUpdate: () => Promise<RequestOpt> = () => {
    return new Promise(async (resolve, reject) => {
        await client.put(`/conference/page/batch`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

export const deleteH5: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.delete(`/conference/page/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}


export const getOssConfig: (data: { business: string }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/oss/sts`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/conference/user`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 创建报告
 * @returns
 */
export const createReport: (data: WriterReport) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.post(`/financial/report/create`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 查询报告
 * @returns
 */
export const searchReport: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/financial/report/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 删除报告
 * @returns
 */
export const deleteReport: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        await client.delete(`/financial/report/${id}`)
            .then((res: any) => {
                if (res.success) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })
    })
}

/**
 * 查询报告列表
 * @param data
 */
export const getReportList: (data: ISearchReportListReq) => Promise<IPageRequest<WriterReport>> = (data) => {
    return new Promise(async (resolve, reject) => {
        await client.get(`/financial/reports`, data)
            .then((res: any) => {
                if (res.success) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            })
    })
}


