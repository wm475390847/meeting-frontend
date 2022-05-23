import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { IAddCaseReq } from "./interface"

// 获取素材类型列表
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