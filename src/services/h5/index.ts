import { request } from "@/utils/tool"
import { IH5DataReq } from "./interface"

export const getH5DataList: (data: IH5DataReq) => Promise<IPageRequest<H5Data>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.get(`/material/h5s`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}