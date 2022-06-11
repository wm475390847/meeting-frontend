interface TaskInfo {
  id: number
  taskName: string
  status: number
  executeTime: string
  elapsedTime: string
  percentage: string
  gmtCreate: string
  executeFail: number
  executeSuccess: number
  nonExecute: number
}

interface ReportInfo {
  minValue: string
  maxValue: string
  caseDesc: string
  caseMessage: string
  score: string
}