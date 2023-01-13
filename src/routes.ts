import React, {
} from 'react';
import { PageTitle } from '@/config';
import TaskPage from './routes/task';
import H5Page from './routes/h5';
import FacePage from './routes/face';
import CaseListPage from './routes/case/caseList';
import CaseDataPage from './routes/case/caseData';

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
      // {
      //   name: PageTitle.caseData,
      //   path: '/app/case/caseData',
      //   element: CaseDataPage,
      //   children: [],
      // },
      {
        name: PageTitle.caseList,
        path: '/app/case/caseList',
        element: CaseListPage,
        children: []
      }
    ],
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
