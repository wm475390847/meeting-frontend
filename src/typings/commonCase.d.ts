interface CommonCaseInfo {
    id: number
    caseName: string
    caseOwner: string
    caseResult: boolean
    caseReason: string
    caseDesc: string
    apiJson: string
    product: string
    env: string
}

interface Business {
    desc: string
    products: Product[]
}

interface Product {
    desc: string
    name: string
}