import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { ISearchTaskListReq } from "./interface"

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