import { ConfigProvider } from 'antd'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Wrapper from './App'
import App from './routes/index/index'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn')

const Index: React.FC = () => {
  const routes = [
    {
      path: '/app/*',
      component: App,
    }
  ]

  return (
    <ConfigProvider locale={zhCN}>
      <Wrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/app" replace />} />
            <Route path="/app" element={<Navigate to="/app/h5data" replace />} />
            {routes.map((route) => {
              const { path } = route
              return (
                <Route key={path} path={path} element={<route.component path={path} />}></Route>
              )
            })}
          </Routes>
        </Router>
      </Wrapper>
    </ConfigProvider>
  )
}

export default Index
