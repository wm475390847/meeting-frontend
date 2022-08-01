export const API_PREFIX = '/meeting-backend'

export const DOMAIN = 'stadium.shuwen.com'; // 项目主域名
export const DOMAIN_ACCOUNT = 'account.shuwen.com'; // 账号中心主域名
export const DOMAIN_MICE = 'mice.shuwen.com'; //mice主域名
export const DOMAIN_API = 'api.shuwen.com'; //网关api

// Sentry DSN 链接 => https://sentry.xinhuazhiyun.com/
export const SENTRY_DSN = 'https://e315427b7f49425d82dd05e2c98075f2@sentry.xinhuazhiyun.com/50';

// 是否是开发模式
export const IS_DEV = [
  `dev.${DOMAIN}`,
].includes(location.hostname);

// 是否是测试模式
export const IS_TEST = [
  `test.${DOMAIN}`,
].includes(location.hostname);

// 是否是预发模式
export const IS_PRE = [
  `pre.${DOMAIN}`,
].includes(location.hostname);

// 账户中心 host
export const ACCOUNT_HOST = [
  `dev.${DOMAIN}`,
  `test.${DOMAIN}`,
].includes(location.hostname)
  ? location.protocol + `//test.${DOMAIN_ACCOUNT}`
  : `https://${DOMAIN_ACCOUNT}`; // 注意线上的账号中心地址强制https

// API网关 host
export const API_HOST = [
  `dev.${DOMAIN}`,
  `test.${DOMAIN}`,
].includes(location.hostname)
  ? location.protocol + `//test.${DOMAIN_API}`
  : (IS_PRE ? location.protocol + `//pre.${DOMAIN_API}` : `https://${DOMAIN_API}`); // 注意线上的账号中心地址强制https

// 项目 hosts
export const PROJECT_HOST = [
  `dev.${DOMAIN}`,
  `test.${DOMAIN}`,
].includes(location.hostname)
  ? location.protocol + `//${IS_DEV ? `dev.${DOMAIN}:8005`
    : `test.${DOMAIN}`}`
  : location.protocol + `//${IS_PRE ? `pre.${DOMAIN}` : `${DOMAIN}`}`;

export enum taskStatusEnum {
  "删除",
  "等待中",
  "运行中",
  "已完成"
}

export enum caseHistoryEnum {
  "删除",
  "成功",
  "失败",
  "未执行"
}