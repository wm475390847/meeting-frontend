import MView from './view';
import MRowTable from './rowTable';
import MColTable from './colTable';

export type { MViewProps } from './view';
export type { MRowTableProps } from './rowTable';
export type { MColTableProps } from './colTable';

MView.RowTable = MRowTable;
MView.ColTable = MColTable;

export default MView;
