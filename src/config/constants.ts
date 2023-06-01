import { env } from './env';

export const PageTitle = {
  page: '页面保障',
  task: '任务管理',
  face: '人脸检测',
  case: '用例管理',
  productList: '产品列表',
  caseData: '用例数据',
  caseList: '用例列表',
  interface: '接口测试',
  perf: '性能测试',
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
