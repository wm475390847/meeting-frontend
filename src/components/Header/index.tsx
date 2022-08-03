import { Component } from 'react';
import styles from './index.module.less';

interface IHeaderProps {
}

interface IHeaderOwnProps {
  className: string;
}

interface IHeaderState {
}

class Header extends Component<IHeaderProps & IHeaderOwnProps, IHeaderState> {
  constructor(props: IHeaderProps & IHeaderOwnProps) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.header + ` ${this.props.className}`}>
        {/* <p>会议质量保障平台</p> */}
        <img src="https://s.newscdn.cn/file/2022/08/a15acd85-ed19-4e86-97f1-ef7c6cc3d02a.svg" />
      </div>
    );
  }
}

export default Header;
