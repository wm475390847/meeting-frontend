import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { ICreateH5Req, IH5DataListReq } from "./interface"

export const getH5DataList: (data: IH5DataListReq) => Promise<IPageRequest<H5Data>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/material/h5s`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}

export const createH5: (data: ICreateH5Req) => Promise<RequestOpt> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.post(`/material/h5`, data)
        if (res.success) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

