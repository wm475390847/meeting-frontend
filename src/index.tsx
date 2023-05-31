import './styles/index.less';
import './index.css';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import routes from './routes';
import { PageLayoutModule } from './components/PageLayout';
import moment from 'moment';
import NotFound from './components/NotFound';
import ProductDetailPage from './components/ProductDetail';
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
        />
      ))
    })
  } else {
    routeList.push((
      <Route
        key={`${item.name}-${index}`}
        path={item.path}
        element={< item.element />}
      />
    ));
  }
})

const App = () => {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(
            <PageLayoutModule routes={routes} />
          )}>
            {routeList}
          </Route>
          {/* <Route path="/app/case/productList/productDetail/:productName" element={<ProductDetailPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
);