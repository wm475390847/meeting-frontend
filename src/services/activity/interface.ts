export interface IActivityReq {
  pageNo: number
  pageSize: number
  venueType?: string
}

export interface IUpdateStreamReq {
  orderId: number
  deviceName: string
}

export interface IUpdateActivityReq {
  id: number
  realCount: number
}