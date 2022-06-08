import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { IAddCaseReq, ICasesReq, IEditCaseReq } from "./interface"

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
export const addCases: (data: IAddCaseReq) => Promise<RequestOpt> = (data) => {
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
export const editCases: (data: IEditCaseReq) => Promise<RequestOpt> = (data) => {
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
export const delCases: (id: number) => Promise<RequestOpt> = (id) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.delete(`/cases`, { caseIds: [id] })
    if (res.success) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}