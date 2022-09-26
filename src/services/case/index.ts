import { request } from "@/utils/tool"
import { ICaseReq as ICaseReq } from "./interface"

// 获取用例列表
export const getCaseList: (data: ICaseReq) => Promise<IPageRequest<CaseInfo>> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.getTtp(`/cases`, data)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}

// 获取产品列表
export const getProdects: () => Promise<ServiceInfo[]> = () => {
  return new Promise(async (resolve, reject) => {
    const res = await request.getTtp(`/products/group`)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}
