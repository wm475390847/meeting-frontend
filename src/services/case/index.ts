import { request } from "@/utils/tool"
import { ISearchCaseListReq as ISearchCaseListReq } from "./interface"

/**
 * 获取用例列表
 * @param data 
 * @returns 
 */
export const getCaseList: (data: ISearchCaseListReq) => Promise<IPageRequest<CaseInfo>> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.getTtp(`/cases`, data)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}

/**
 * 获取产品列表
 * @returns 
 */
export const getProdectList: () => Promise<ServiceInfo[]> = () => {
  return new Promise(async (resolve, reject) => {
    const res = await request.getTtp(`/products/group`)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}
