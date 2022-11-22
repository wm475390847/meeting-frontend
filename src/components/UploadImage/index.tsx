import React, { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { randomUUID } from 'crypto';

interface UploadImageModuleProps {
    ossConfig?: OssConfig
}

const UploadImageModule: React.FC<UploadImageModuleProps> = (props) => {
    const { ossConfig } = props
    const [fileList, setFileList] = useState<UploadFile[]>([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);

    console.log(ossConfig);

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(newFileList);
        setFileList(newFileList);
    };

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

    return (
        <ImgCrop rotate>
            <Upload
                action={ossConfig?.endpoint + "/" + ossConfig?.bucketName + "/" + ossConfig?.objectPath + "/"}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 1 && '上传图片'}
            </Upload>
        </ImgCrop>
    );
};

export default UploadImageModule;