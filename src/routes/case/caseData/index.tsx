import React, {useEffect, useState} from 'react';
import PieModule from '@/components/Pie';
import {getCaseData} from '@/services';
import {Tabs} from "antd";
import BarModule from "@/components/Bar";

const CaseDataPage: React.FC = () => {
    const [prodPieDataList, setProdPieDataList] = useState<PieData[]>([]);
    const [testPieDataList, setTestPieDataList] = useState<PieData[]>([]);
    const [tabKey, setTabKey] = useState('A')

    const [prodBarDataList, setProdBarDataList] = useState<BarData[]>([]);
    const [testBarDataList, setTestBarDataList] = useState<BarData[]>([]);

    const handleGetCaseCount = () => {
        getCaseData()
            .then(resp => {
                const data: any[] = resp.data
                data.forEach((e: any) => {
                    if (e.env == 'test') {
                        const a = e.caseDataList.map((item: any) => ({type: item.productName, value: item.count}));
                        setTestPieDataList(a)
                        const result = getBarDataList(e)
                        setTestBarDataList(result)
                    }
                    if (e.env == 'prod') {
                        const b = e.caseDataList.map((item: any) => ({type: item.productName, value: item.count}));
                        setProdPieDataList(b)
                        const result = getBarDataList(e)
                        setProdBarDataList(result)
                    }
                })
            })
    }

    const getBarDataList = (item: any) => {
        const result: BarData[] = [];
        item.caseDataList.forEach((caseData: any) => {
            caseData.fail != 0 && result.push(
                {
                    productName: caseData.productName,
                    type: 'fail',
                    count: caseData.fail
                }
            )
            caseData.success != 0 && result.push(
                {
                    productName: caseData.productName,
                    type: 'success',
                    count: caseData.success
                }
            )
        })
        return result;
    }

    const barList =
        [
            {
                data: testBarDataList,
                env: "TEST环境"
            },
            {
                data: prodBarDataList,
                env: "PROD环境"
            }
        ]

    const pieList =
        [
            {
                data: testPieDataList,
                env: "TEST环境"
            },
            {
                data: prodPieDataList,
                env: "PROD环境"
            }
        ]

    const tabItems = [
        {label: '用例数量', key: 'A',},
        {label: '执行结果', key: 'B',}
    ];

    const onChange = (key: string) => {
        setTabKey(key)
    };

    useEffect(() => {
        handleGetCaseCount()
    }, [])

    return (
        <>
            <Tabs onChange={onChange} type="card" items={tabItems}/>
            {tabKey === 'A' &&
                <div
                    style={{
                        position: "absolute",
                        overflow: "auto",
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: "space-around",
                    }}
                >
                    {
                        pieList.map((item) => (
                            <PieModule data={item.data} env={item.env}/>
                        ))
                    }
                </div>
            }
            {tabKey === 'B' &&
                <div style={{
                    position: "absolute",
                    overflow: "auto",
                    height: '90%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '50px'
                }}>
                    {barList.map((item) => (
                        <BarModule
                            key={item.env}
                            xField={"count"}
                            yField={"productName"}
                            seriesField={"type"}
                            data={item.data}
                            env={item.env}
                        />
                    ))}
                </div>
            }
        </>
    );
}

export default CaseDataPage;