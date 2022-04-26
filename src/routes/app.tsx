import React, { ReactNode } from 'react'
import { Layout } from 'antd'
import {
  MScrollView, MView,
} from '@/components'
import styles from './app.module.less'

interface IAppProps {
  children: ReactNode
}

const { Content } = Layout

const Wrapper: React.FC<IAppProps> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content} id="content">
        <MScrollView>
          <MView className={styles.main}>
            {children}
          </MView>
        </MScrollView>
      </Content>
    </Layout>
  )
}

export default Wrapper
