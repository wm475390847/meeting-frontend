import {Bar} from "@ant-design/charts";
import React from "react";

type DarModuleProps = {
    xField: string
    yField: string
    seriesField: string
    data: any[]
    env?: string
}

const BarModule: React.FC<DarModuleProps> = (props) => {
    const {data, xField, yField, seriesField, env} = props

    const sortedData =
        data.sort((a, b) => {
            if (a.type === "success" && b.type === "fail") {
                return -1; // a排在b前面
            } else if (a.type === "fail" && b.type === "success") {
                return 1; // a排在b后面
            } else {
                return 0; // 保持原有顺序
            }
        });

    return (
        <div>
            <span style={{fontWeight: 'bold'}}>{env}</span>
            <Bar
                data={sortedData}
                isStack={true}
                xField={xField}
                yField={yField}
                seriesField={seriesField}
                label={{
                    position: 'middle',
                    layout: [
                        {type: 'interval-adjust-position'}, // 柱形图数据标签位置自动调整
                        {type: 'interval-hide-overlap'}, // 数据标签防遮挡
                        {type: 'adjust-color'},  // 数据标签文颜色自动调整
                    ],
                }}
                color={(val) => {
                    if (val.type == "success") {
                        return 'rgba(0, 0, 255, 0.5)'; // seriesField为"success"时，柱状图显示淡蓝色
                    } else if (val.type === "fail") {
                        return 'red'; // seriesField为"fail"时，柱状图显示红色
                    } else {
                        return 'gray'; // 其他情况下显示灰色
                    }
                }}
                minBarWidth={30}
                maxBarWidth={30}
            />
        </div>
    );
};

export default BarModule;