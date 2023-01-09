import { env } from './env';
import { RoomEnum } from '@/types';

export const PageTitle = {
  page: '页面保障',
  task: '任务管理',
  face: '人脸检测',
  case: '用例列表',
};
export const Doc = [
  'doc',
  'docs',
  'docx',
  'pdf',
  'ppt',
  'pptx',
  'txt',
  'xls',
  'xlsx',
];
export const File = ['ai', 'psd', 'rar', 'zip', 'war'];
export const Video = ['mp4', 'MP4'];
export const Image = ['png', 'PNG', 'jpeg', 'JPEG', 'jpg', 'JPG', 'gif', 'GIF'];
export const ImageNoGif = ['png', 'PNG', 'jpeg', 'JPEG', 'jpg', 'JPG'];
// 素材默认封面
export const DefaultCover =
  'https://s.newscdn.cn/file/2019/10/3b15ecd2-7f6d-48d1-ab16-0b3b9ba87d41.png';
// 获取封面服务
export const COVER_HOST = env.isProduction
  ? `${location.protocol}//thumb-image.shuwen.com/video/v1/thumb`
  : `${location.protocol}//test.thumb-image.shuwen.com/video/v1/thumb`;
// 房间和地点列表
export const RoomAddressList = [
  {
    roomId: RoomEnum.indoor,
    roomName: '室内',
    addressList: [
      {
        addressId: 'first_floor_entry',
        addressName: '一层入口',
      },
      {
        addressId: 'first_floor_show_car',
        addressName: '展车区',
      },
      {
        addressId: 'second_floor_work',
        addressName: '作品展',
      },
      {
        addressId: 'second_floor_achievement',
        addressName: '成就展',
      },
      {
        addressId: 'second_floor_report',
        addressName: '汇报展厅',
      },
      {
        addressId: 'second_floor_entry',
        addressName: '二层入口',
      },
      {
        addressId: 'second_floor_entry_side',
        addressName: '电梯旁边',
      },
    ],
  },
  {
    roomId: RoomEnum.chamber,
    roomName: '三楼发布厅',
    addressList: [
      {
        addressId: 'chamber_backcourt',
        addressName: '发布厅后场',
      },
      {
        addressId: 'chamber_center',
        addressName: '发布厅中央',
      },
      {
        addressId: 'chamber_entry',
        addressName: '发布厅入口',
      },
    ],
  },
];
