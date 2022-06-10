interface IRouterProps {
  path: string
}

interface IPageRequest<T> {
  current: number
  pages: number
  records: T[]
  total: number
}

interface SchoolInfo {

}

interface IPage {
  pageNo: number
  pageSize: number
}