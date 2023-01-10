import OSS from 'ali-oss';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { getOssConfig } from '@/services';
import { useEffect } from 'react';

type UploadImgModalProps = {
  onUploadSuccess: (url: string) => void;
}

const UploadImgModal: React.FC<UploadImgModalProps> = (props) => {
  const { onUploadSuccess } = props
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [ossConfig, setOssConfig] = useState<OssConfig>();

  useEffect(() => {
    fetchOssConfig()
  }, [])

  const fetchOssConfig = async () => {
    await getOssConfig({ business: 'face' })
      .then(rep => {
        setOssConfig(rep.data)
      }).catch(err => {
        message.error(err.message)
      })
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
      const fullPath = ossConfig && ossConfig.uploadPath + `/${fileName}`;
      return fullPath;
    } else {
      message.error('文件为空')
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
      message.error('只能上传 JPG/PNG 文件!');
    }
    const isLt2M = file.size as number / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('图像必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  /**
   * 上传按钮
   */
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={beforeUpload}
        showUploadList={false}
        customRequest={({ file }) => {
          if (ossConfig == null) {
            message.error('oss配置为空')
            return
          }
          setLoading(true);
          const fullPath = getFullPath(file as UploadFile, ossConfig);
          const client = assemOSSClient(ossConfig)
          fullPath && client?.client
            .put(fullPath, file)
            .then(() => {
              message.success('上传成功');
              if (ossConfig == null) {
                return
              }
              const ossPath = transformCdnUrl(ossConfig, fullPath);
              onUploadSuccess(ossPath);
              setLoading(false);
              getBase64(file as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
              });
            })
            .catch(() => {
              message.error('上传失败');
            });
        }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  );
};

export default UploadImgModal;