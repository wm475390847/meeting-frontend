import exp from "constants"

export interface ICaseReq {
  gameDictIds?: string
  startTime?: number
  endTime?: number
  pageSize: number
  pageNo: number
  schoolName?: string
  caseDesc?: string
}

export interface IAddCaseReq {
  minValue: string
  caseDesc: string
  maxValue: string
  materialId: string
}

export interface IEditCaseReq {
  minValue: string
  caseDesc: string
  maxValue: string
  id: number
}

export interface IDelCaseReq {
  caseIds: number[]
}

