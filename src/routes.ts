import React, {
} from 'react';
import { PageTitle } from '@/config';
import TaskDataPage from './routes/task';
import H5DataPage from './routes/h5';
import FaceDataPage from './routes/face';
import CaseDataPage from './routes/case';
// import LiveListConfig from '@/routes/liveListConfig';
// import CultureGalleryConfig from '@/routes/cultureGalleryConfig';
// import SpaceConfig from '@/routes/spaceConfig';
// import BigBoardConfig from '@/routes/bigBoardConfig';
// import LiveConfig from '@/routes/liveConfig';
// import CarouselConfig from '@/routes/carouselConfig';
// import ActivityConfig from '@/routes/activityConfig';
// import MessageConfig from '@/routes/messageConfig';
// import PrizeConfig from '@/routes/prizeConfig';
// import CreateCarConfig from '@/routes/createCarConfig';
// import LanternConfig from '@/routes/lanternConfig';
// import Task from '@/routes/task';
// import TaskDetail from '@/routes/taskDetail';
// import SubTaskDetail from '@/routes/subTaskDetail';
// import SignConfig from '@/routes/signConfig';
// import LevelMange from '@/routes/levelMange';
// import ShopFourManage from '@/routes/shopFourManage';
// import Invitation from '@/routes/invitation';
// import ShareConfig from '@/routes/shareConfig';
// import SourceConfig from '@/routes/sourceConfig';
// import NpcConfig from '@/routes/npcConfig';
// import PublishHall from '@/routes/publishHall';
// import GoodsConfig from '@/routes/goodsConfig';
// import Shopkeeper from '@/routes/shopkeeper';
// import Blacklist from '@/routes/blacklist';
// import VerificationCode from '@/routes/verificationCode';
// import PanoConfig from '@/routes/panoConfig';
// import BigHouse from '@/routes/bigHouse';
// import VoteConfig from '@/routes/voteConfig';
// import FanrongFactory from '@/routes/fanrong-factory';

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
    path: '/admin/page',
    element: H5DataPage,
    children: [],
  },
  {
    name: PageTitle.task,
    path: '/admin/task',
    element: TaskDataPage,
    children: [],
  },
  {
    name: PageTitle.face,
    path: '/admin/face',
    element: FaceDataPage,
    children: [],
  },
  {
    name: PageTitle.case,
    path: '/admin/case',
    element: CaseDataPage,
    children: [],
  },

  //   {
  //     name: '展板配置',
  //     path: '/admin/board',
  //     children: [
  //       {
  //         name: PageTitle.cultureGalleryConfig,
  //         path: '/admin/board/cultureGalleryConfig',
  //         element: CultureGalleryConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.spaceConfig,
  //         path: '/admin/board/spaceConfig',
  //         element: SpaceConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.bigBoard,
  //         path: '/admin/board/bigBoard',
  //         element: BigBoardConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.liveConfig,
  //         path: '/admin/board/liveConfig',
  //         element: LiveConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.bigHouse,
  //         path: '/admin/board/bigHouse',
  //         element: BigHouse,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.fanrongFactory,
  //         path: '/admin/board/fanrongFactory',
  //         element: FanrongFactory,
  //         children: [],
  //       },
  //     ]
  //   },
  //   {
  //     name: '消息配置',
  //     path: '/admin/message',
  //     children: [
  //       {
  //         name: PageTitle.carouselConfig,
  //         path: '/admin/message/carouselConfig',
  //         element: CarouselConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.activityConfig,
  //         path: '/admin/message/activityConfig',
  //         element: ActivityConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.messageConfig,
  //         path: '/admin/message/messageConfig',
  //         element: MessageConfig,
  //         children: [],
  //       },
  //     ]
  //   },
  //   {
  //     name: '运营配置',
  //     path: '/admin/operate',
  //     children: [
  //       {
  //         name: PageTitle.prizeConfig,
  //         path: '/admin/operate/prizeConfig',
  //         element: PrizeConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.createCarConfig,
  //         path: '/admin/operate/createCarConfig',
  //         element: CreateCarConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.lanternConfig,
  //         path: '/admin/operate/lanternConfig',
  //         element: LanternConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.task,
  //         path: '/admin/operate/task',
  //         element: Task,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.task,
  //         path: '/admin/operate/task/:taskCatalogId',
  //         element: TaskDetail,
  //         children: [],
  //         hideInMenu: true,
  //       },
  //       {
  //         name: PageTitle.task,
  //         path: '/admin/operate/task/:taskCatalogId/:parentTaskId/:parentTaskName/:parentPublish',
  //         element: SubTaskDetail,
  //         children: [],
  //         hideInMenu: true,
  //       },
  //       {
  //         name: PageTitle.signConfig,
  //         path: '/admin/operate/signConfig',
  //         element: SignConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.levelMange,
  //         path: '/admin/operate/levelMange',
  //         element: LevelMange,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.panoConfig,
  //         path: '/admin/operate/panoConfig',
  //         element: PanoConfig,
  //         children: [],
  //       },
  //     ]
  //   },
  //   {
  //     name: '推广传播',
  //     path: '/admin/spread',
  //     children: [
  //       {
  //         name: PageTitle.invitation,
  //         path: '/admin/spread/invitation',
  //         element: Invitation,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.shareConfig,
  //         path: '/admin/spread/shareConfig',
  //         element: ShareConfig,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.sourceConfig,
  //         path: '/admin/spread/sourceConfig',
  //         element: SourceConfig,
  //         children: [],
  //       },
  //     ]
  //   },
  //   {
  //     name: PageTitle.npcConfig,
  //     path: '/admin/npcConfig',
  //     element: NpcConfig,
  //     children: [],
  //   },
  //   {
  //     name: PageTitle.goodsConfig,
  //     path: '/admin/goodsConfig',
  //     element: GoodsConfig,
  //     children: [],
  //   },
  //   {
  //     name: PageTitle.publishHall,
  //     path: '/admin/publishHall',
  //     element: PublishHall,
  //     children: [],
  //   },
  //   {
  //     name: PageTitle.shopFourManage,
  //     path: '/admin/shopFourManage',
  //     element: ShopFourManage,
  //     children: [],
  //   },
  //   {
  //     name: '账号',
  //     path: '/admin/account',
  //     children: [
  //       {
  //         name: PageTitle.shopkeeper,
  //         path: '/admin/account/shopkeeper',
  //         element: Shopkeeper,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.blacklist,
  //         path: '/admin/account/blacklist',
  //         element: Blacklist,
  //         children: [],
  //       },
  //       {
  //         name: PageTitle.verificationCode,
  //         path: '/admin/account/verificationCode',
  //         element: VerificationCode,
  //         children: [],
  //       },
  //     ]
  //   },

  //   // lazy demo
  //   // {
  //   //   name: PageTitle.spaceConfig,
  //   //   path: '/admin/board/spaceConfig',
  //   //   element: lazy(() => import('./routes/spaceConfig')),
  //   //   children: [],
  //   // },
  //   {
  //     name: PageTitle.voteConfig,
  //     path: '/admin/voteConfig',
  //     element: VoteConfig,
  //     children: [],
  //   },
];
export default routes;
