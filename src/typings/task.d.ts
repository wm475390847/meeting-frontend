interface TaskInfo {
    taskName: string
    id: number
    caseIds: number[]
    cron?: string
    executeTime?: string
    elapsedTime?: string
    status: number
}

interface ExecuteResult {
    id: number
    meetingName: string
    meetingId: string
    meetingStartTime: string
    meetingEndTime: string
    h5Name: string
    h5Url: string
    baseOssPath: string
    resultOssPath: string
    username: string
    password: string
    gmtCreate: string
    executeTime: string
    resultValue: number
    status: number
    reason: string
    result: boolean
}

interface ResultPercent {
    total: number
    success: number
    percent: number
}