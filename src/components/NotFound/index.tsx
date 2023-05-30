/**
* @author 门神
*/
import { Component } from 'react';
import { Result } from 'antd';
// import store from '@/store';
import styles from './index.module.less';

interface ComProps {

}

interface ComState {

}

class Com extends Component<ComProps, ComState> {
  constructor(props: ComProps) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(): void {
  }

  componentWillUnmount(): void {
  }

  render() {
    return (
      <div className={styles.pageWrapper}>
        <Result
          status="404"
          title="404"
          subTitle="页面找不到了"
        />
      </div>
    );
  }
}

export default Com;