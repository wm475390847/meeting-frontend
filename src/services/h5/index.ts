import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { ICreateH5Req, ISearchH5ListReq, IUpdateH5Req } from "./interface"

export const getH5List: (data: ISearchH5ListReq) => Promise<IPageRequest<H5Info>> = (data) => {
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