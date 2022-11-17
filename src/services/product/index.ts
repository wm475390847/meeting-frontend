import { request } from "@/utils/tool"
import { ISearchProductListReq } from "./interface"

export const getProductList: (data: ISearchProductListReq) => Promise<IPageRequest<ProductInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.getTtp(`/products`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}