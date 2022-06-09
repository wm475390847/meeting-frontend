import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { IAddCaseReq, ICasesReq, IDelCaseReq, IEditCaseReq } from "./interface"

// 获取用例列表
export const getCases: (data: ICasesReq) => Promise<IPageRequest<CaseInfo>> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.get(`/cases`, data)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}

// 添加用例
export const addCase: (data: IAddCaseReq) => Promise<RequestOpt> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.post(`/cases`, data)
    if (res.success) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}

// 编辑用例
export const editCase: (data: IEditCaseReq) => Promise<RequestOpt> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.put(`/cases`, data)
    if (res.success) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}

// 删除用例
export const delCase: (data: IDelCaseReq) => Promise<RequestOpt> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.delete(`/cases`, data)
    if (res.success) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}
