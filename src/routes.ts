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
  icon: string
}

const routes: RouteBase[] = [
  {
    name: PageTitle.page,
    path: '/app/page',
    element: H5Page,
    children: [],
    icon: "CalendarOutlined"
  },
  {
    name: PageTitle.task,
    path: '/app/task',
    element: TaskPage,
    children: [],
    icon: "ControlOutlined"
  },
  {
    name: PageTitle.face,
    path: '/app/face',
    element: FacePage,
    children: [],
    icon: "TeamOutlined"
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
        icon: "PieChartOutlined"
      },
      {
        name: PageTitle.caseList,
        path: '/app/case/caseList',
        element: CaseListPage,
        children: [],
        icon: "UnorderedListOutlined"
      }
    ],
    icon: "DashboardOutlined"
  },
  {
    name: PageTitle.perf,
    path: '/app/perf',
    element: PerfPage,
    children: [],
    icon: "SisternodeOutlined"
  },
];
export default routes;
