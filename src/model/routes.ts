import React from 'react';

export const menus = [
  { title: '素材列表', name: 'material', page: React.lazy(() => import('../routes/material')) },
  { title: '算法用例', name: 'case', page: React.lazy(() => import('../routes/case')) },
  { title: '任务列表', name: 'task', page: React.lazy(() => import('../routes/task')) },
  { title: '活动列表', name: 'mockActivity', page: React.lazy(() => import('../routes/activity')) },
  { title: '自动化用例', name: 'commonCases', page: React.lazy(() => import('../routes/commonCase')) },
  { title: '设备监控', name: 'monitor', page: React.lazy(() => import('../routes/monitor')) }
]