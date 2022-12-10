import React, { useState } from 'react';
import { message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import OSS from 'ali-oss';
import { v4 as uuidv4 } from 'uuid';
import ImgCrop from 'antd-img-crop';

type UploadImgModuleProps = {
  ossConfig: OssConfig
}

const UploadImgModule: React.FC<UploadImgModuleProps> = (props) => {
  const { ossConfig } = props
  const [file, setFile] = useState<UploadFile>();

  /**
   * 初始化oss
   * @returns 
   */
  const assemOSSClient = () => {
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
  const getFullPath = () => {
    if (file != null) {
      const temSubMediaTypeArr = file.name.split('.');
      const temSubMediaType = temSubMediaTypeArr[temSubMediaTypeArr.length - 1];
      const fileName = uuidv4() + '.' + temSubMediaType;
      return ossConfig.uploadPath + `/${fileName}`;
    } else {
      message.error('文件为空')
    }
  }

  /**
   * 检测到文件变化
   * @param param0 
   */
  const onChange: UploadProps['onChange'] = ({ file: newFile }) => {
    setFile(newFile);
  };

  /**
   * 展示
   * @param file 文件
   */
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

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
    const isLt2M = file.size as number / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图像必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <ImgCrop rotate>
      <Upload
        listType="picture-card"
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={beforeUpload}
        maxCount={1}
        customRequest={({ file }) => {
          const fullPath = getFullPath()
          fullPath && assemOSSClient().client
            .multipartUpload(fullPath, file, {})
            .then(() => {
              message.info('上传成功')
            })
            .catch(() => {
              message.info('上传失败')
            });
        }}
      >
        {!file && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
};

export default UploadImgModule;