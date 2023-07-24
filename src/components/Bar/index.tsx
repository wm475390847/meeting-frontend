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


    const processedData = data.reverse().map(item => {
        const {type, ...rest} = item;
        return {
            ...rest,
            type,
            color: type === 'success' ? 'blue' : 'red',
        };
    });

    return (
        <Bar
            data={data.reverse()}
            isStack={true}
            xField={xField}
            yField={yField}
            seriesField={seriesField}
            height={200}
            width={500}
            label={
                {
                    // 可手动配置 label 数据标签位置
                    position: 'middle', // 'left', 'middle', 'right'
                    // 可配置附加的布局方法
                    layout: [
                        // 柱形图数据标签位置自动调整
                        {type: 'interval-adjust-position'},
                        // 数据标签防遮挡
                        {type: 'interval-hide-overlap'},
                        // 数据标签文颜色自动调整
                        {type: 'adjust-color'},
                    ],
                }
            }
        />
    );
};

export default BarModule;