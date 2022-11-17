interface FaceData {
    faceUrl: string
    faceDesc: string
    miceId: string
    metaData: string
    resultData: string
    id: number
}

interface DiffData {
    businessId: string
}

interface FaceDataSwitch {
    edit: boolean
    faceData: FaceData
}