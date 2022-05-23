import { request } from "@/utils/tool"
import { IMaterialsReq } from "./interface"

// 获取素材列表
export const getMaterials: (data: IMaterialsReq) => Promise<IPageRequest<MaterialInfo>> = (data) => {
  return new Promise(async (resolve, reject) => {
    const res = await request.get(`/materials`, data)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}

// 获取素材类型列表
export const getGameDict: () => Promise<GameDictInfo[]> = () => {
  return new Promise(async (resolve, reject) => {
    const res = await request.get(`/gameDict`)
    if (res.success) {
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}