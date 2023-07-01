import OSS from "ali-oss";
import {message} from "antd";

export class OssUtil {

    /**
     * 初始化oss
     * @returns
     */
    private initOSSClient(ossConfig: OssConfig): OSS {
        return new OSS({
            accessKeyId: ossConfig.accessKeyId,
            accessKeySecret: ossConfig.accessKeySecret,
            stsToken: ossConfig.securityToken,
            endpoint: ossConfig.endPoint,
            bucket: ossConfig.bucketName,
        })
    };

    /**
     * 上传文件
     * @param ossConfig oss配置
     * @param fullPath 全路径
     * @param file 文件
     * @param onSuccess 成功状态
     * @param onError 失败状态
     */
    public upload(ossConfig: OssConfig, fullPath: string | undefined, file: any,
                  onSuccess: any, onError: any): Promise<boolean> {
        if (ossConfig == null || fullPath == null) {
            onError()
            return Promise.resolve(false)
        }
        return new Promise((resolve, reject) => {
            this.initOSSClient(ossConfig)
                .put(fullPath, file)
                .then(() => {
                    onSuccess()
                    resolve(true)
                })
                .catch((err: any) => {
                    onError()
                    resolve(false)
                });
        })
    }

    public download(ossPath: string, filename: string) {
        if (ossPath == null) {
            message.error("文件资源错误，下载失败").then(r => r)
        }
        const fileExtension = this.getFileExtension(ossPath); // 获取文件扩展名
        const fileName = filename + fileExtension
        const downloadUrl = `${ossPath}?filename=${fileName}`;
        fetch(downloadUrl)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName; // 使用原始文件名
                link.click();
            });
    }

    private getFileExtension = (filename: string) => {
        const lastDotIndex = filename.lastIndexOf('.');
        return lastDotIndex !== -1 ? filename.substring(lastDotIndex) : '';
    }


    /**
     * 转换为cdnUrl
     * @param ossConfig oss配置
     * @param fullPath 全路径
     */
    public transformCdnUrl(ossConfig: OssConfig, fullPath: string | undefined): string {
        const prefix = /^https:/.test(ossConfig.endPoint) ? 'https://' : 'https://';
        return prefix + ossConfig.bucketName + '.newscdn.cn' + "/" + fullPath;
    }
}