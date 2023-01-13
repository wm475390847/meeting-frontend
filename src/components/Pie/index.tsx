import { Pie } from "@ant-design/charts";

type PieModalProps = {
    data: PieData[]
    env: string
}

const PieModal: React.FC<PieModalProps> = (props) => {
    const { data, env } = props

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
                customHtml: env + '总计'
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
        <Pie {...config as any} />
    );
};

export default PieModal;