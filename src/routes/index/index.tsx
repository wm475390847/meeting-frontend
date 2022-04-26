import { Header, MView } from '@/components'
import { menus } from '@/model/routes'
import classnames from 'classnames'
import React, { Suspense } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import styles from './index.module.less'

const Index: React.FC<IRouterProps> = (props) => {
  const { path } = props
  const location = useLocation()

  return (
    <MView className={styles.container}>
      <MView.RowTable className={styles.wrap}>
        <MView.ColTable width={240} className={styles.menus}>
          <Header className={styles.header}></Header>
          {menus.map((menu: any) => (
            <Link
              to={`${menu.name}`}
              key={menu.name}
              className={classnames(styles.item, location.pathname === path.replace('*', menu.name) && styles.activeItem)}
            >
              <span className={styles.name}>{menu.title}</span>
            </Link>
          ))}
        </MView.ColTable>
        <MView.ColTable>
          <Suspense fallback={<div />}>
            <Routes>
              {menus.map(menu => {
                return (
                  <Route
                    key={`${menu.name}`}
                    path={`${menu.name}`}
                    element={<menu.page />}
                  />
                )
              })}
            </Routes>
          </Suspense>
        </MView.ColTable>
      </MView.RowTable>
    </MView>
  )
}

export default Index