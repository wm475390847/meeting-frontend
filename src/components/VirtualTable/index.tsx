import { Table } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import { useRef, useState } from 'react';

const VirtualTableModule = (props: Parameters<typeof Table>[0]) => {
    const { columns, scroll } = props;
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

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
        const obj = {};
        Object.defineProperty(obj, 'scrollLeft', {
            get: () => {
                if (gridRef.current) {
                    return gridRef.current?.state?.scrollLeft;
                }
                return null;
            },
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft });
                }
            },
        });

        return obj;
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