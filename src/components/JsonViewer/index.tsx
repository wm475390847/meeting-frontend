import {Button, Modal} from "antd";
import React, {useEffect, useState} from "react";
import ReactJson from "react-json-view";

type JsonViewerModuleProps = {
    data: any
    onCancel?: () => void
}

const JsonViewerModule: React.FC<JsonViewerModuleProps> = (props) => {
    const {data, onCancel} = (props)
    const [open, setOpen] = useState<boolean>(false)

    const handleCancel = () => {
        setOpen(false)
        onCancel && onCancel()
    }

    useEffect(() => {
        data && setOpen(true)
    }, [data])

    return (
        <Modal
            open={open}
            title={`JSON详情`}
            onCancel={handleCancel}
            footer={<Button onClick={handleCancel}>确定</Button>}
            destroyOnClose
            width={600}
            style={{overflow: 'auto'}}
        >
            <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
                <ReactJson src={data}/>
            </div>

        </Modal>
    );
}

export default JsonViewerModule