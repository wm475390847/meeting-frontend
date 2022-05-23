interface IRouterProps {
  path: string
}

interface IPageRequest<T> {
  current: number
  pages: number
  records: T[]
  total: number
}