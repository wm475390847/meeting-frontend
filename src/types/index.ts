/**
 * 物品类型枚举
 */
export enum GoodsTypeEnum {
  /**
   * 道具 1
   */
  prop = 1,
  /**
   * 配饰 3
   */
  accessories = 3,
  /**
   * 称号 4
   */
  name = 4,
}

/**
 * 媒资类型(视频、图片、文档、文件)
 *
 * @export
 * @enum {number}
 */
export const enum MediaTypeEnum {
  /**
   * 视频
   */
  video = 'video',
  /**
   * 图片
   */
  image = 'image',
  /**
   * 文档
   */
  doc = 'doc',
  /**
   * 文件
   */
  file = 'file',
  /**
   * 专题
   */
  topic = 'topic',
  /**
   * 专题，智能媒资改造后新的类型，和topic一样
   */
  folder = 'folder',
}

export interface MaterialListItemType {
  id: string;
  /** 媒资类型 */
  type?: 'image' | 'video';
  /** 标题 */
  title?: string | null;
  /** 封面 */
  thumbImage?: string | null;
  /** 素材url */
  url: string | null;
  /** 排序索引 */
  index?: number;
  /** 素材不同清晰度url合集 */
  urls?: {
    bitrateType: 'LD' | 'HD' | 'UD';
    url: string;
  }[];
}

export interface NpcMaterialListItemType {
  videoId: string;
  videoConfig: {
    /** 媒资类型 */
    type?: 'image' | 'video';
    /** 标题 */
    title?: string | null;
    /** 封面 */
    thumb_image?: string | null;
    /** 素材url */
    video_url: string | null;
    /** 排序索引 */
    sortValue?: number;
  }
}

export interface QaOptionType {
  type: string;
  content: string;
}

export interface QaListItemType {
  questId: string | number;
  questName: string;
  answer: string;
  option: QaOptionType[];
}

/**
 * 饰品列表项
 */
export interface DressListItemType {
  id?: string | number;
  projectId?: string;
  dressId?: string;
  des: string;
  path: string;
  thumbImage: string;
  dressName: string;
  /** 类型 1饰品 2类型 */
  dressType: number;
  gmtModified: number;
  [propName: string]: any;
}

/**
 * 道具列表项
 */
export interface PropItemType {
  id?: string | number;
  projectId?: string;
  itemId?: string;
  itemName: string;
  itemDesc: string | null;
  itemClass?: number;
  thumbImage: string;
  itemExtra?: any;
  itemType: RewardTypeEnum;
  gmtModified: number | null;
  [propName: string]: any;
}

/**
 * NFT列表项
 */
export interface NftItemType {
  id?: string | number;
  projectId?: string;
  nftId?: string;
  name: string;
  cover: string | null;
  author: string | null;
  story: string | null;
  amount: number;
  gmtModified: number | null;
  [propName: string]: any;
}

/** 房间id */
export enum RoomEnum {
  indoor = 'indoor', /** 室内 */
  outdoor = 'outdoor', /** 室外 */
  chamber = 'chamber', /** 三楼发布厅 */
  building = 'building', /** 接待大厅 */
  oilCar = 'oilCar', /** 传统燃油汽车展厅 */
  energyCar = 'energyCar', /** 新能源汽车展厅 */
}

/** 房间名称 */
export enum RoomNameEnum {
  indoor = '室内', /** 室内 */
  outdoor = '室外', /** 室外 */
  chamber = '三楼发布厅', /** 三楼发布厅 */
  building = '接待大厅', /** 接待大厅 */
  oilCar = '传统燃油汽车展厅', /** 传统燃油汽车展厅 */
  energyCar = '新能源汽车展厅', /** 新能源汽车展厅 */
  no = '无'
}

/** 奖品类型 */
export enum RewardTypeEnum {
  /** 道具 */
  prop = 1,
  /** NFT */
  nft = 2,
  /** 饰品 */
  dress = 3,
  /** 称号 */
  name = 4,
  /** 成长值 */
  integral = 5,
  /** 套装 */
  suit = 6,
}

export type RewardItemType = 'prop' | 'nft' | 'dress' | 'name' | 'integral' | 'suit';

export interface SelectDataType {
  dress?: {
    ids: string[];
    infos: any[];
  },
  name?: {
    ids: string[];
    infos: any[];
  },
  suit?: {
    ids: string[];
    infos: any[];
  },
  prop?: {
    ids: string[];
    infos: any[];
  },
  nft?: {
    ids: string[];
    infos: any[];
  },
  integral?: {
    ids: string[];
    infos: any[];
  },
}

export interface RewardListItem {
  itemId: string | 'sign_score';
  /** 数量 */
  increase: number;
  /** 名称 */
  itemName: string;
  itemType: RewardTypeEnum;
  thumbImage: string | null;
}