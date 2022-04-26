import React from 'react';

export const menus = [
  { title: '素材列表', name: 'material', page: React.lazy(() => import('../routes/material')) },
]