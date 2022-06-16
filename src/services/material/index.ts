import store from "@/store"
import { setGameDictList } from "@/store/material"
import { request } from "@/utils/tool"
import { IMaterialReq } from "./interface"

// 获取素材列表
export const getMaterialList: (data: IMaterialReq) => Promise<IPageRequest<MaterialInfo>> = (data) => {
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
      store.dispatch(setGameDictList(res.data))
      resolve(res.data)
    } else {
      reject(res)
    }
  })
}