import { Table } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

const VirtualTableModule = (props: Parameters<typeof Table>[0]) => {
    const { columns } = props;
    const [tableWidth, setTableWidth] = useState(0);
    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map(column => {
        if (column.width) {
            return column;
        }
        return {
            ...column,
            width: Math.floor(tableWidth / widthColumnCount),
        };
    });

    return (
        <ResizeObserver
            onResize={({ width }) => {
                setTableWidth(width);
            }}
        >
            <Table
                {...props}
                className="virtual-table"
                columns={mergedColumns}
                pagination={false}
                key={"id"}
            />
        </ResizeObserver>
    );
};

export default VirtualTableModule;