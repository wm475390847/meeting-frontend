import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { ITaskInfoListReq } from "./interface"

export const executeTask: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/material/task/execute/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getTaskInfoList: (data: ITaskInfoListReq) => Promise<IPageRequest<TaskInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/material/tasks`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const getTaskReport: (data: { taskId: number, result?: boolean }) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/material/task/report`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const getTaskResultPercent: (taskId: number) => Promise<RequestOpt> = (taskId) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/material/task/percent/${taskId}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}