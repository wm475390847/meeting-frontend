import { Table } from 'antd';
import classNames from 'classnames';
import { Console } from 'console';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useRef, useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';

const VirtualTableModal = (props: Parameters<typeof Table>[0]) => {
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

    // const resetVirtualGrid = () => {
    //     gridRef.current.resetAfterIndices({
    //         columnIndex: 0,
    //         shouldForceUpdate: true,
    //     });
    // };

    // useEffect(() => resetVirtualGrid, [tableWidth]);

    // const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    //     ref.current = connectObject;
    //     const totalHeight = rawData.length * 55;

    //     return (
    //         <Grid
    //             ref={gridRef}
    //             style={{
    //                 marginLeft: 10,
    //             }}
    //             columnCount={mergedColumns.length}
    //             columnWidth={(index: number) => {
    //                 const { width } = mergedColumns[index];
    //                 return totalHeight > scroll!.y! && index === mergedColumns.length - 1
    //                     ? (width as number) - scrollbarSize - 1
    //                     : (width as number);
    //             }}
    //             height={scroll!.y as number}
    //             rowCount={rawData.length}
    //             rowHeight={() => 55}
    //             width={tableWidth}
    //             onScroll={({ scrollLeft }: { scrollLeft: number }) => {
    //                 onScroll({ scrollLeft });
    //             }}
    //         >
    //             {({
    //                 columnIndex,
    //                 rowIndex,
    //                 style,
    //             }: {
    //                 columnIndex: number;
    //                 rowIndex: number;
    //                 style: React.CSSProperties;
    //             }) => (
    //                 <div
    //                     className={classNames('virtual-table-cell', {
    //                         'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
    //                     })}
    //                     style={style}
    //                 >
    //                     {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
    //                 </div>
    //             )}
    //         </Grid>
    //     );
    // };

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
            // components={{
            //     body: renderVirtualList as any,
            // }}
            />
        </ResizeObserver>
    );
};

export default VirtualTableModal;