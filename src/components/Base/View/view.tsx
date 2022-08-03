import classnames from 'classnames';
import MRowTable from './rowTable';
import MColTable from './colTable';
import styles from './index.module.less';
import React from 'react';

export interface MViewProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  resize?: boolean;
}

class MView extends React.Component<MViewProps, any> {
  static RowTable: typeof MRowTable;

  static ColTable: typeof MColTable;

  render() {
    const {
      children,
      className,
      style,
      resize = false,
    } = this.props;
    return (
      <div className={classnames(styles.container, resize && styles.resize, className)} style={style}>
        {children}
      </div>
    );
  }
}

export default MView;
