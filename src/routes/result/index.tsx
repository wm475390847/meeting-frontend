import { MView, PageHeader } from "@/components"
import { Button } from "antd"
import styles from './index.module.less'

const ExecuteResult: React.FC = () => {

    const visitHtml = () => {
        window.location.href = "http://www.baidu.com"
    }

    return (
        <MView resize>
            <PageHeader title={"执行结果"} />
            <Button className={styles.button} type="primary" onClick={() => visitHtml()} >查看执行结果</Button>
        </MView >

    )
}

export default ExecuteResult