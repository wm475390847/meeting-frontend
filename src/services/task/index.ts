import { request } from "@/utils/tool"
import { ITaskReq } from "./interface"

// 获取任务列表
export const getTasks: (data: ITaskReq) => Promise<IPageRequest<TaskInfo>> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.get(`/tasks`, data)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}