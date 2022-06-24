import { request } from "@/utils/tool"
import { ICommonCaseReq } from "./interface"

// 获取用例列表
export const getCommonCases: (data: ICommonCaseReq) => Promise<IPageRequest<CommonCaseInfo>> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.get(`/common-cases`, data)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}

// 获取产品列表
export const getProdects: () => Promise<Business[]> = () => {
  return new Promise(async (resolve, reject) => {
    const res = await request.get(`/common-cases/product`)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}
