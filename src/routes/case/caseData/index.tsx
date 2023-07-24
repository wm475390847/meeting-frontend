import styles from './index.module.less'
import React, {useEffect, useState} from 'react';
import PieModule from '@/components/Pie';
import {getCaseCount} from '@/services';
import BarModule from "@/components/Bar";

const CaseDataPage: React.FC = () => {
  const [prodCaseCountList, setProdCaseCountList] = useState<PieData[]>([]);
  const [testCaseCountList, setTestCaseCountList] = useState<PieData[]>([]);

  const handleGetCaseCount = () => {
    getCaseCount()
      .then(resp => {
        const data: any[] = resp.data
        data.forEach((e: any) => {
          if (e.env == 'test') {
            const a = e.caseCountList.map((item: any) => ({type: item.productName, value: item.count}));
            setTestCaseCountList(a)
          }
          if (e.env == 'prod') {
            const b = e.caseCountList.map((item: any) => ({type: item.productName, value: item.count}));
            setProdCaseCountList(b)
          }
        })
      })
  }

  const handleData = () => {
    return [
      {
        productName: "WeLook",
        count: 1200,
        type: "success"
      },
      {
        productName: "WeLook",
        count: 10,
        type: "fail"
      },
      {
        productName: "MetaOs",
        count: 1000,
        type: "success"
      },
      {
        productName: "MetaOs",
        count: 11,
        type: "fail"
      }
    ]
  }


  useEffect(() => {
    handleGetCaseCount()
  }, [])

  return (
      <div style={{position: "absolute", overflow: "auto", height: '100%', width: '100%'}}>
        <div className={styles.pieGroup}>
          <PieModule data={testCaseCountList} env='test'/>
          <PieModule data={prodCaseCountList} env='prod'/>
        </div>
        <div className={styles.BarGroup}>
          <BarModule
              xField={"count"}
              yField={"productName"}
              seriesField={"type"}
              data={handleData()}
          />
        </div>
      </div>
  );
};

export default CaseDataPage;