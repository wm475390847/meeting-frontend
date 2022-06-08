import { RequestOpt } from "@/utils/request"
import { request } from "@/utils/tool"
import { IStopTaskReq, ITaskReq } from "./interface"

/**
 * 获取任务列表
 * @param data 请求体
 * @returns 响应体
 */
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

/**
 * 重跑任务
 * 使用reject时，调用方法需要使用.catch抛出异常
 * @param id 任务id
 * @returns 响应体
 */
export const rollBackTask: (id: number) => Promise<RequestOpt> = (id) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.post(`/tasks/${id}`)
    if (res.success) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}

/**
 * 停止任务
 * @param data 任务id
 */
export const stopTask: (data: IStopTaskReq) => Promise<RequestOpt> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.put(`/tasks`, data)
    if (res.success) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}