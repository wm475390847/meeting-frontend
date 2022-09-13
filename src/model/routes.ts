import React from 'react';

export const menus = [
  { title: '页面保障', name: 'h5data', page: React.lazy(() => import('../routes/h5')) },
  { title: "任务列表", name: "taskInfo", page: React.lazy(() => import('../routes/task')) },
  { title: '用例列表', name: 'cases', page: React.lazy(() => import('../routes/case')) },
  { title: '其他', name: 'synthesize', page: React.lazy(() => import('../routes/synthesize')) }
]