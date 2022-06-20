import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { IActivityReq, IUpdateStreamReq } from "./interface"

export const getActivityList: (data: IActivityReq) => Promise<IPageRequest<ActivityInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/mock/activities`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const createActivity: (id: number) => Promise<RequestOpt> = (id) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/mock/activities/${id}`)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

export const updateStream: (data: IUpdateStreamReq) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.put(`/mock/devices`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}