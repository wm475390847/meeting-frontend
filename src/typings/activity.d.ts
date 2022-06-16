interface ActivityInfo {
    duration: number
    orderId: number
    venueId: number
    venueType: string
    venueName: string
    eventCount: number
    mockStreamResponseList: StreamInfo[]
}

interface StreamInfo {
    liveGroup: string
    pullUrl: string
}