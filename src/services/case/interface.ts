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
  caseId: string
}

export interface ICasesReq {
  gameDictIds?: string
  startTime?: string
  endTime?: string
  pageSize: number
  pageNo: number
  schoolName?: string
}