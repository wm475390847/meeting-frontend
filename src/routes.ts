import { PageTitle } from '@/config';
import TaskPage from './routes/task';
import H5Page from './routes/h5';
import FacePage from './routes/face';
import CaseListPage from './routes/case/caseList';
import CaseDataPage from './routes/case/caseData';
import PerfPage from './routes/perf';

export interface RouteBase {
  name: string;
  path: string;
  element?: any;
  children: RouteBase[];
  /** 在左侧菜单中进行隐藏 */
  hideInMenu?: boolean;
}

const routes: RouteBase[] = [
  {
    name: PageTitle.page,
    path: '/app/page',
    element: H5Page,
    children: [],
  },
  {
    name: PageTitle.task,
    path: '/app/task',
    element: TaskPage,
    children: [],
  },
  {
    name: PageTitle.face,
    path: '/app/face',
    element: FacePage,
    children: [],
  },
  {
    name: PageTitle.case,
    path: '/app/case',
    children: [
      {
        name: PageTitle.caseData,
        path: '/app/case/caseData',
        element: CaseDataPage,
        children: [],
      },
      {
        name: PageTitle.caseList,
        path: '/app/case/caseList',
        element: CaseListPage,
        children: []
      }
    ],
  },
  {
    name: PageTitle.perf,
    path: '/app/perf',
    element: PerfPage,
    children: []
  },
];
export default routes;
