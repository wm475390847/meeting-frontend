interface CaseInfo {
    id: number
    caseName: string
    caseOwner: string
    caseResult: boolean
    caseReason: string
    caseDesc: string
    apiJson: string
    productName: string
    productId: number
    env: string
}

interface ServiceInfo {
    id: number
    name: string
    products: ProductInfo[]
}

interface ProductInfo {
    id: number
    name: string
}