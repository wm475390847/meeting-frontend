interface ActivityInfo {
    id: number
    duration: number
    orderId: number
    venueId: number
    venueType: string
    venueName: string
    eventCount: number
    realCount: number
    mockStreamResponseList: StreamInfo[]
}

interface StreamInfo {
    liveGroup: string
    pullUrl: string
}