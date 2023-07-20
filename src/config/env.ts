const testHost = 'test.qa-meeting.xinhuazhiyun.com';
const prodHost = 'prod.qa-meeting.xinhuazhiyun.com';

class Env {
  mode = import.meta.env.MODE || 'development';

  get isDevelopment() {
    return this.mode === 'development';
  }

  // 通过域名判断测试/生产环境
  get isTest() {
    return this.mode === 'test';
  }

  get isProduction() {
    return this.mode === 'production';
  }

  // 调试模式
  get isDebug() {
    return location.search.includes('__debug');
  }

  get baseURL() {
    const prefix = /^https:/.test(location.href) ? 'https' : 'http';
    if (this.isDevelopment) {
      // 本地http使用代理，避免跨域问题(测试服务器)
      return '/proxy';
    } else if (this.isProduction) {
      return prefix + `://${prodHost}`;
    } else if (this.isTest) {
      return prefix + `://${testHost}`
    }
  }
}

export const env = new Env();
