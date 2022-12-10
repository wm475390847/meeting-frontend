import OSS from 'ali-oss';
import { getOssConfig } from '@/services';
import { v4 as uuidv4 } from 'uuid';

const assemOSSClient = (data: { accessKeyId: any; accessKeySecret: any; securityToken: any; endPoint: any; bucketName: any; }) => {
  const client = new OSS({
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    stsToken: data.securityToken,
    endpoint: data.endPoint,
    bucket: data.bucketName,
  });
  return { client };
};

const transformCdnUrl = (ossconfig: { endPoint: string; bucketName: string | number; }, fullPath: string) => {
  const prefix = /^https:/.test(ossconfig.endPoint) ? 'https://' : 'http://';
  return prefix + ossconfig.bucketName + '.newscdn.cn' + fullPath;
}

// suffix: 'png' 'jpeg' 'jpg'
export const uploadFile = async (file: File, suffix: string, business: string) => {
  try {
    const ossconfig = await getOssConfig({ business: business });
    if (!ossconfig) return;
    const { client } = assemOSSClient((ossconfig as any).detail);
    const fileName = uuidv4() + '.' + suffix;
    const fullPath = (ossconfig as any).detail.uploadPath + fileName;
    const res = await (client as OSS).multipartUpload(fullPath, file, {}).catch(e => { throw (res) });
    if (res) {
      const url = transformCdnUrl((ossconfig as any).detail, fullPath);
      return url;
    }
    return res;
  } catch (e) {
    return;
  }
} 