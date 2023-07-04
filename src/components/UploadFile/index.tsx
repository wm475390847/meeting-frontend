import React, {useEffect, useState} from 'react';
import {message, Upload} from 'antd';
import {UploadFile} from "antd/es/upload/interface";
import {OssUtil} from "@/utils";
import {getOssConfig} from "@/services";
import {InboxOutlined} from "@ant-design/icons";
import {v4 as uuidv4} from "uuid";

type UploadFileModuleProps = {
    onUploadSuccess: (ossPath: string) => void;

}
const UploadFileModule: React.FC<UploadFileModuleProps> = (props) => {
    const {onUploadSuccess} = props
    const [ossConfig, setOssConfig] = useState<OssConfig>();
    const {Dragger} = Upload;

    /**
     * 获取完整的上传路径
     * @returns
     */
    const handleFullPath = (file: UploadFile, ossConfig: OssConfig) => {
        if (file != null) {
            const temSubMediaTypeArr = file.name.split('.');
            const temSubMediaType = temSubMediaTypeArr[temSubMediaTypeArr.length - 1];
            const fileName = uuidv4() + '.' + temSubMediaType;
            return ossConfig && ossConfig.uploadPath + `/${fileName}`;
        } else {
            message.error('文件为空').then(r => r)
        }
    }
    const handleOssConfig = () => {
        getOssConfig({business: 'jmx'})
            .then(rep => setOssConfig(rep.data))
            .catch(err => message.error(err.message))
    }

    const uploadFile = (file: any, onSuccess: any, onError: any) => {
        if (ossConfig != null) {
            const fullPath = handleFullPath(file as UploadFile, ossConfig);
            const uploadOss = new OssUtil();
            uploadOss.upload(ossConfig, fullPath, file, onSuccess, onError)
                .then(result => {
                    if (result) {
                        const ossPath = uploadOss.transformCdnUrl(ossConfig, fullPath);
                        // 返回的地址保存到数据库
                        onUploadSuccess(ossPath)
                    }
                })
        }
    }

    useEffect(() => {
        handleOssConfig()
    }, [])

    return (
        <Dragger
            name='file'
            multiple={false}
            customRequest={({file, onSuccess, onError}) =>
                uploadFile(file, onSuccess, onError)}
            onChange={(info: { file: { name?: any; status?: any; }; fileList: any; }) => {
                const {status} = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`文件【 ${info.file.name} 】上传成功`).then(r => r);
                } else if (status === 'error') {
                    message.error(`文件【 ${info.file.name} 】上传失败`).then(r => r);
                }
            }}
            onDrop={() => message.success("文件删除成功").then(r => r)}
            accept={".jmx"}
        >
            <p className="ant-upload-drag-icon">
                <InboxOutlined/>
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
            <p className="ant-upload-hint">
                一次只能上传一个jmx文件 上传后请选择对应的产品保存
            </p>
        </Dragger>
    )
}
export default UploadFileModule;