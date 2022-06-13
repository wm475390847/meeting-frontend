import React from 'react'
import ReactDOM from 'react-dom'
import Router from './router'
import './styles/index.less'
import 'antd/dist/antd.css'

ReactDOM.render((
  <React.StrictMode>
    <Router />
  </React.StrictMode>
), document.getElementById('root')!)
