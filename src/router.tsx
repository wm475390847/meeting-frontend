import { ConfigProvider } from 'antd'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Provider } from "react-redux";
import Wrapper from './routes/app'
import App from './routes/index/index'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from './store';

moment.locale('zh-cn')

const Index: React.FC = () => {
  const routes = [
    {
      path: '/app/*',
      component: App,
    }
  ]

  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <Wrapper>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/app" replace />} />
              <Route path="/app" element={<Navigate to="/app/material" replace />} />
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
    </Provider>
  )
}

export default Index
