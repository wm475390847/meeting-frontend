import { Card, Col, Row } from 'antd';

const App = () => (
  <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={10}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={10}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div >
);

export default App;