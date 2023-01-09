import './styles/index.less';
import 'antd/dist/antd.css';
import './index.css';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import store from './store';
import routes from './routes';
import { PageLayout } from './components/PageLayout';
import moment from 'moment';
moment.locale('zh-cn')

const routeList: any[] = [];
routes.map((item, index) => {
  if (item.children?.length > 0) {
    item.children.map((inItem, inIndex) => {
      routeList.push((
        <Route
          key={`${inItem.name}-${inIndex}`}
          path={inItem.path}
          element={<inItem.element />}
        ></Route>
      ))
    })
  } else {
    routeList.push((
      <Route
        key={`${item.name}-${index}`}
        path={item.path}
        element={< item.element />}
      ></Route >
    ));
  }
})

const App = () => {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(
            <PageLayout routes={routes} />
          )}>
            {routeList}
          </Route>
          <Route path="*" element={<div>NotFound</div>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </Provider>
);