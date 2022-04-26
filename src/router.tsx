import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Wrapper from './routes/app'
import App from './routes/index/index'

const Index: React.FC = () => {
  const routes = [
    {
      path: '/app/*',
      component: App,
    }
  ]

  return (
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
  )
}

export default Index
