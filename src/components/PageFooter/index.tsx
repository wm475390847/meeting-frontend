import { Button } from "antd"
import { Footer } from "antd/lib/layout/layout"
import styles from './index.module.less';

export const PageFooter: React.FC = () => {

    return (
        < Footer className={styles.pageFooter} > 会议线质量保障平台 ©2022 - {new Date().getFullYear()} Created by 质量中台
            < Button className={styles.button}
                key='1'
                type='link'
                onClick={() => window.open('https://codeup.aliyun.com/xhzy/xhzy-qa/meeting-frontend/tree/dev')}>
                {< span > CodeUp地址</span >}
            </Button >
        </Footer >
    )
}