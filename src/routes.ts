import {PageTitle} from '@/config';
import TaskPage from './routes/task';
import H5Page from './routes/h5';
import FacePage from './routes/face';
import CaseDataPage from './routes/case/caseData';
import PerfPage from './routes/perf';
import ProductListPage from './routes/case/productList';
import CaseListPage from './routes/case/caseList';
import WriterPage from "@/routes/check";
import perfIcon from '@/assets/svg/perf.svg';
import productIcon from '@/assets/svg/product.svg';
import faceIcon from '@/assets/svg/face.svg';
import caseIcon from '@/assets/svg/case.svg';
import taskIcon from '@/assets/svg/task.svg';
import dataIcon from '@/assets/svg/data.svg';
import pageIcon from '@/assets/svg/page.svg';
import checkIcon from '@/assets/svg/check.svg';


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
    icon: pageIcon
  },
  {
    name: PageTitle.task,
    path: '/app/task',
    element: TaskPage,
    children: [],
    icon: taskIcon
  },
  {
    name: PageTitle.face,
    path: '/app/face',
    element: FacePage,
    children: [],
    icon: faceIcon
  },
  {
    name: PageTitle.case,
    path: '/app/case',
    icon: caseIcon,
    children: [
      {
        name: PageTitle.productList,
        path: '/app/case/productList',
        element: ProductListPage,
        children: [],
        icon: productIcon
      },
      {
        name: PageTitle.caseData,
        path: '/app/case/caseData',
        element: CaseDataPage,
        children: [],
        icon: dataIcon
      },
      {
        name: PageTitle.caseList,
        path: '/app/case/productList/productDetail/:productName/:id',
        element: CaseListPage,
        children: [],
        icon: "UnorderedListOutlined",
        hideInMenu: true
      },
    ]
  },
  {
    name: PageTitle.perf,
    path: '/app/perf',
    element: PerfPage,
    children: [],
    icon: perfIcon
  },
  {
    name: PageTitle.check,
    path: '/app/check',
    element: WriterPage,
    children: [],
    icon: checkIcon
  },
];
export default routes;
