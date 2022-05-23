import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import './styles/index.less'
import 'antd/dist/antd.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
