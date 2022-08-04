import { Button } from "antd";
import { Footer } from "antd/lib/layout/layout";

type FooterPageProps = {
    text: string
    link: string
}

const FooterPage: React.FC<FooterPageProps> = props => {
    const { text, link } = props

    return (
        <Footer style={{ textAlign: 'center', background: '#fff' }}>
            {text}
            <Button
                style={{ padding: '0' }}
                key={link}
                type='link'
                onClick={() => link && window.open(link)}
            >
                {
                    link && <span>Codeup地址</span>
                }
            </Button>
        </Footer>
    )
}

export default FooterPage