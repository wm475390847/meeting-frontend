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
