import {DeleteOutlined, DownloadOutlined, EditOutlined} from '@ant-design/icons';
import {Avatar, Card} from 'antd';
import React from 'react';
import fileIcon from '@/assets/svg/file.svg';

type CardModuleProps = {
    title?: string
    description?: string
    onClickIcon: (value: number) => void
}

const CardModule: React.FC<CardModuleProps> = (props) => {
    const {title, description, onClickIcon} = props
    const {Meta} = Card;

    return (
        <Card
            style={{
                width: 300,
                marginTop: 15
            }}
            actions={[
                <EditOutlined key="edit" onClick={() => onClickIcon(1)}/>,
                <DownloadOutlined key="download" onClick={() => onClickIcon(2)}/>,
                <DeleteOutlined key="delete" onClick={() => onClickIcon(3)}/>,
            ]}
        >
            <Meta
                avatar={<Avatar src={fileIcon}/>}
                title={title}
                description={description}
            />
        </Card>
    );
};

export default CardModule;