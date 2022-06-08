import React, { Component } from 'react';
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
        {/* <p>体育质量保障平台</p> */}
        <img src="https://t.newscdn.cn/physical-education-boss/logo.png" />
      </div>
    );
  }
}

export default Header;
