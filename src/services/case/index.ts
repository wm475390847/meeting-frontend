import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { IAddCaseReq, ICasesReq } from "./interface"

// 添加用例
export const addCases: (data: IAddCaseReq) => Promise<RequestOpt> = () => {
  return new Promise(async (resolve, reject) => {
    const res = await request.post(`/cases`)
    if (res.success) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}

// 获取用例列表
export const getCaseList: (data: ICasesReq) => Promise<IPageRequest<CaseInfo>> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.get(`/cases`, data)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}