import classnames from 'classnames';
import styles from './grid.module.less';

export interface MRowTableProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const MRowTable: React.FC<MRowTableProps> = props => {
  return (
    <div className={classnames(styles.rowTable, props.className)} style={props.style}>
      {props.children}
    </div>
  );
};

export default MRowTable;
