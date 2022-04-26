import { MHeaderProps } from './index';

// 点击返回按钮
export const clickBack = (back: MHeaderProps['back']) => {
  switch (typeof back) {
    case 'function':
      back();
      break;
  }
};
