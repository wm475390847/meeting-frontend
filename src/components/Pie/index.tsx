import React from "react";
import {Pie} from "@ant-design/charts";

type PieModuleProps = {
    data: PieData[]
    env: string
}

const PieModule: React.FC<PieModuleProps> = (props) => {
    const {data, env} = props

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 15,
            },
        },

        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],

        statistic: {
            title: {
                customHtml: '总计'
            },
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: data.reduce((a, b) => {
                    a = a + b.value
                    return a
                }, 0)
            },
        },
    };

    return (

        <div style={{width: '35%', display: 'flex', flexDirection: 'column'}}>
            <span style={{fontWeight: 'bold'}}> {env}</span>
            <Pie {...config as any}/>
        </div>
    );
};

export default PieModule;