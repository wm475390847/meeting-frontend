import React from 'react';

export const menus = [
  { title: 'H5保障', name: 'h5data', page: React.lazy(() => import('../routes/h5')) },
  { title: '用例列表', name: 'cases', page: React.lazy(() => import('../routes/case')) },
  { title: '综合保障', name: 'synthesize', page: React.lazy(() => import('../routes/synthesize')) }
]