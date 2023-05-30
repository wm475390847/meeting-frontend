import styles from './index.module.less'
import React, { useEffect, useState } from 'react';
import PieModal from '@/components/Pie';
import { getCaseCount } from '@/services';


const CaseDataPage: React.FC = () => {
  const [prodCaseCountList, setProdCaseCountList] = useState<PieData[]>([]);
  const [testCaseCountList, setTestCaseCountList] = useState<PieData[]>([]);

  const handleGetCaseCount = () => {
    getCaseCount()
      .then(resp => {
        const data: any[] = resp.data
        data.forEach((e: any) => {
          if (e.env == 'test') {
            const a = e.caseCountList.map((item: any) => ({ type: item.productName, value: item.count }));
            setTestCaseCountList(a)
          }
          if (e.env == 'prod') {
            const b = e.caseCountList.map((item: any) => ({ type: item.productName, value: item.count }));
            setProdCaseCountList(b)
          }
        })
      })
  }

  useEffect(() => {
    handleGetCaseCount()
  }, [])

  return (
    <div className={styles.pieGroup}>
      <PieModal data={testCaseCountList} env='test' />
      <PieModal data={prodCaseCountList} env='prod' />
    </div>
  );
};

export default CaseDataPage;