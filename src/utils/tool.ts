import _request from '@/utils/request';
import { API_PREFIX } from '@/constants'
import qs from 'qs';

interface IObjectAny {
  [propName: string]: any;
}

export type Result<T> = {
  success: true;
  data: T;
  response: any; // 原始数据
} | {
  success: false;
  err: Error;
  message: string;
  data?: any;
}

const addGetParams = (url: string, data = {}) => {
  const params = qs.stringify(data)
  return params ? `${url}?${params}` : url
}

// url 接口, data 入参, options 配置
export const request = {
  get: (url: string, data = {}) => {
    return _request(`${API_PREFIX}${addGetParams(url, data)}`, {
      method: 'GET',
    });
  },
  post: (url: string, data = {}, options?: any) => {
    return _request(`${API_PREFIX}${url}`, {
      method: 'POST',
      body: options?.stringify ? JSON.stringify(data) : data,
    });
  },
  put: (url: string, data = {}, options?: any) => {
    return _request(`${API_PREFIX}${url}`, {
      method: 'PUT',
      body: options?.stringify ? JSON.stringify(data) : data,
    });
  },
  delete: (url: string, data = {}, options?: any) => {
    return _request(`${API_PREFIX}${url}`, {
      method: 'DELETE',
      body: options?.stringify ? JSON.stringify(data) : data,
    });
  },
};

// 若传入 format='format' 则走规范
export const dateFormat = (date: (string | number | Date), format = 'yyyy-MM-dd hh:mm:ss TT'): string => {
  if (!date) {
    date = new Date();
  }
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    date = new Date(+date);
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  if (typeof date !== 'number' && !(date instanceof Date)) {
    date = date.replace(/年|月/g, '-').replace(/日/g, '');
    date = new Date(date);
  }

  const duration = Date.now() - date.getTime();
  const level1 = 60 * 1000; // 1 分钟
  const level2 = 60 * 60 * 1000; // 1 小时
  const level3 = 24 * 60 * 60 * 1000; // 1 天
  const level4 = 2 * 24 * 60 * 60 * 1000; // 2天

  if (format === 'default') {
    if (duration < level1) {
      return '刚刚';
    }
    if (duration >= level1 && duration < level2) {
      return `${Math.round(duration / level1)}分钟前`;
    }
    if (duration >= level2 && duration < level3) {
      return `${Math.round(duration / level2)}小时前`;
    }
    if (duration >= level3 && duration < level4) {
      format = '昨天 hh:mm';
    }
    // 判断是否过年了
    const _date = new Date();
    const _year = _date.getFullYear();
    if ((new Date(`${_year}-01-01`)).getTime() <= date.getTime()) {
      format = 'MM月dd日 hh:mm';
    } else {
      format = 'yyyy年MM月dd日 hh:mm';
    }
  }

  const o: IObjectAny = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时 24进制
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    'T+': date.getHours() < 12 ? 'AM' : 'PM',
    'H+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时 12进制
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? (o[k]) : `00${o[k]}`.substr(String(o[k]).length),
      );
    }
  });
  return format;
};