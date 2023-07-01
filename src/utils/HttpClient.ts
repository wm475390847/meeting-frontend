import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {BASE_PATH, DOMAIN} from "@/constants";
import qs from 'qs';
import {message} from "antd";
import Cookies from "js-cookie";

export class HttpClient {
    /**
     * 请求工具
     */
    public request!: AxiosInstance;

    /**
     * 构造函数
     * @param options 参数
     */
    constructor(options: { http?: string }) {
        // 不传入的话使用默认的url
        options.http = DOMAIN;
        this.createAxios(options.http)
    }

    /**
     * 创建一个请求
     * @param baseURL 基础url
     * @returns 请求工具
     */
    protected createAxios(baseURL: string) {
        // 创建一个 Axios 实例
        const request = axios.create({
            headers: {
                // 设置请求头中默认的 Content-Type 和 Accept
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            // 允许发送跨域请求时携带cookie
            withCredentials: true
        });

        // 全局响应拦截器保证最后执行
        request.interceptors.response.use(
            // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
            (res: AxiosResponse) => {
                return res.data
            },
            err => {
                // 当响应异常时做一些处理
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400: err.message = '请求错误(400)'; break;
                        case 401:
                            err.message = '未授权，请重新登录(401)';
                            this.logout();
                            break;
                        case 403: err.message = '拒绝访问(403)'; break;
                        case 404: err.message = '请求出错(404)'; break;
                        case 408: err.message = '请求超时(408)'; break;
                        case 500: err.message = '服务器错误(500)'; break;
                        case 501: err.message = '服务未实现(501)'; break;
                        case 502: err.message = '网络错误(502)'; break;
                        case 503: err.message = '服务不可用(503)'; break;
                        case 504: err.message = '网络超时(504)'; break;
                        case 505: err.message = 'HTTP版本不受支持(505)'; break;
                        default: err.message = `连接出错(${err.response.status})!`;
                    }
                } else {
                    err.message = '连接服务器失败!'
                }
                message.error(err.message).then(r => r)
                return Promise.reject(err);
            },
        );
        this.request = request;
    }

    public async get(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        const queryString = qs.stringify(data);
        const fullUrl = `${BASE_PATH}${url}${queryString ? `?${queryString}` : ''}`;
        return this.request.get(this.addTimestamp(fullUrl), config);
    }

    public async post(url: string, data?: any, otherBasePath?: boolean, contentType?: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        const newConfig = contentType && this.getConfig(contentType)
        const fullUrl = otherBasePath ? this.addTimestamp(`${url}`) : this.addTimestamp(`${BASE_PATH}${url}`)
        return this.request.post(fullUrl, data, newConfig ? newConfig : config);
    }

    public async put(url: string, data?: any, contentType?: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        const newConfig = contentType && this.getConfig(contentType)
        return this.request.put(this.addTimestamp(`${BASE_PATH}${url}`), data, newConfig ? newConfig : config);
    }

    public async patch(url: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        return this.request.patch(this.addTimestamp(`${BASE_PATH}${url}`), data, config);
    }

    public async delete(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> {
        return this.request.delete(this.addTimestamp(`${BASE_PATH}${url}`), config);
    }

    public logout() {
        Cookies.remove('dingtalk_sso_jwt', { path: '/', domain: '.xinhuazhiyun.com' });
        let url = location.href;
        window.location.href = `http://sso.xinhuazhiyun.com/login.html?redirectUri=${encodeURIComponent(url)}`;
    }

    /**
     * 给 URL 加上 _t=时间戳
     * @param {string} url 完整 url 或者 path
    */
    private addTimestamp(url: string): string {
        const t = `_t=${Date.now()}`;
        const sep = url.includes('?') ? '&' : '?';
        return url + sep + t;
    }

    private getConfig(contentType: string): AxiosRequestConfig {
        return {
            headers: {
                'Content-Type': contentType == null ? "application/json" : contentType
            }
        }
    }
}