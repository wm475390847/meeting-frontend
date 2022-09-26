import { request } from "@/utils/tool"
import { IProductListReq } from "./interface"

export const getProductList: (data: IProductListReq) => Promise<IPageRequest<ProductInfo>> = (data) => {
    return new Promise(async (resolve, reject) => {
        const res = await request.getTtp(`/products`, data)
        if (res.success) {
            resolve(res.data)
        } else {
            reject(res)
        }
    })
}