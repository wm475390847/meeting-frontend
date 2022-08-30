import { MView, PageHeader } from "@/components"
import { Button } from 'antd'

const Synthesize: React.FC = () => {

    return (
        <MView resize>
            <div>
                <PageHeader title={"其他"} />
                <Button
                    key={'weLook'}
                    type='primary'
                    onClick={() => window.open('https://bugly.qq.com/v2/crash-reporting/errors/3b09df27dc?pid=1')}
                >
                    微录客app报错
                </Button>
            </div>
        </MView >
    )
}

export default Synthesize