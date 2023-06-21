import OSS from 'ali-oss';
import {v4 as uuidv4} from 'uuid';
import React, {useEffect, useState} from 'react';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import type {RcFile, UploadFile} from 'antd/es/upload/interface';
import {getOssConfig} from '@/services';

type UploadImgModuleProps = {
  currentImgUrl?: string
  onUploadSuccess: (url: string) => void;
}

const UploadImgModule: React.FC<UploadImgModuleProps> = (props) => {
  const {currentImgUrl, onUploadSuccess} = props
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [ossConfig, setOssConfig] = useState<OssConfig>();

  useEffect(() => {
    handleOssConfig().then(r => r)
  }, [])

  const handleOssConfig = async () => {
    await getOssConfig({business: 'face'})
        .then(rep => setOssConfig(rep.data))
        .catch(err => message.error(err.message))
  }

  /**
   * 初始化oss
   * @returns 
   */
  const assemOSSClient = (ossConfig: OssConfig) => {
    if (ossConfig == null) {
      return null
    }
    const client = new OSS({
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      stsToken: ossConfig.securityToken,
      endpoint: ossConfig.endPoint,
      bucket: ossConfig.bucketName,
    });
    return { client };
  };

  /**
   * 获取完整的上传路径
   * @returns 
   */
  const getFullPath = (file: UploadFile, ossConfig: OssConfig) => {
    if (file != null) {
      const temSubMediaTypeArr = file.name.split('.');
      const temSubMediaType = temSubMediaTypeArr[temSubMediaTypeArr.length - 1];
      const fileName = uuidv4() + '.' + temSubMediaType;
      return ossConfig && ossConfig.uploadPath + `/${fileName}`;
    } else {
      message.error('文件为空').then(r => r)
    }
  }

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  /**
   * 获取图片oss地址
   * @param ossConfig  oss配置
   * @param fullPath  全路径
   * @returns 
   */
  const transformCdnUrl = (ossConfig: OssConfig, fullPath: string) => {
    const prefix = /^https:/.test(ossConfig.endPoint) ? 'https://' : 'http://';
    return prefix + ossConfig.bucketName + '.newscdn.cn' + "/" + fullPath;
  }

  /**
   * 上传之前的逻辑
   * @param file 文件
   * @returns 
   */
  const beforeUpload = (file: UploadFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 文件!').then(r => r);
    }
    const isLt2M = file.size as number / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('图像必须小于2MB!').then(r => r);
    }
    return isJpgOrPng && isLt2M;
  };

  /**
   * 上传图片
   * @param file 文件
   * @returns 
   */
  const uploadPhoto = (file: any) => {
    if (ossConfig == null) {
      message.error('OSS配置为空').then(r => r)
      return
    }
    setLoading(true);
    const fullPath = getFullPath(file as UploadFile, ossConfig);
    const client = assemOSSClient(ossConfig)

    if (!fullPath || !client) {
      message.error('OSS客户端无效').then(r => r);
      setLoading(false);
      return;
    }

    client.client
      .put(fullPath, file)
      .then(() => {
        setLoading(false);
        const ossPath = transformCdnUrl(ossConfig, fullPath);
        onUploadSuccess(ossPath);
        getBase64(file as RcFile, (url) => {
          setImageUrl(url);
        });
        message.success('上传成功').then(r => r);
      })
      .catch((err) => {
        setLoading(false);
        message.error(`上传失败: ${err}`).then(r => r);
      });
  }

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        beforeUpload={beforeUpload}
        showUploadList={false}
        customRequest={({ file }) => uploadPhoto(file)}
      >
        {/* 如果存在图片就将图片显示在上传框上 */}

        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
          : currentImgUrl ?
            <img src={currentImgUrl} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '8px' }} />
            :
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>上传</div>
            </div>}
      </Upload>
    </>
  );
};

export default UploadImgModule;