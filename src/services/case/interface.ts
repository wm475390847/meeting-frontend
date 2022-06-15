import exp from "constants"

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

export interface ICasesReq {
  gameDictIds?: string
  startTime?: number
  endTime?: number
  pageSize: number
  pageNo: number
  schoolName?: string
  caseDesc?: string
}

export interface IDelCaseReq {
  caseIds: number[]
}

