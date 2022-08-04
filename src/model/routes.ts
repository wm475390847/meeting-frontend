import React from 'react';

export const menus = [
  { title: 'H5保障', name: 'h5data', page: React.lazy(() => import('../routes/h5')) },
  { title: '执行结果', name: 'result', page: React.lazy(() => import('../routes/result')) },
]