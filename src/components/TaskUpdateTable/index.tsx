import React, { useEffect, useMemo, useState } from 'react';
import { Table, Transfer } from 'antd';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import type { TransferItem, TransferProps } from 'antd/es/transfer';
import difference from 'lodash/difference';
import { getH5List } from '@/services';

interface RecordType {
    key: string;
    title: string;
    description: string;
    disabled: boolean;
    tag: string;

}

interface DataType {
    key: string;
    title: string;
    description: string;
    disabled: boolean;
    tag: string;
}

interface SearchH5 {
    h5Name?: string
    taskId?: number
}

interface TableTransferProps extends TransferProps<TransferItem> {
    dataSource: DataType[];
    leftColumns: ColumnsType<DataType>;
    rightColumns: ColumnsType<DataType>;
}

interface UpdateTaskTableModuleProps {
    taskId: number
}

const UpdateTaskTableModule: React.FC<UpdateTaskTableModuleProps> = (props) => {
    const { taskId } = props
    const [total, setTotal] = useState(0)

    const [h5List, setH5List] = useState<H5Info[]>()
    const [containTotal, setContainTotal] = useState(0)
    const [containH5List, setContainH5List] = useState<H5Info[]>()

    const [mockData, setMockData] = useState<RecordType[]>()

    const [disabled, setDisabled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [searchH5, setSearchH5] = useState<SearchH5>()
    const [updateH5, setUpdataH5] = useState<H5Info>()
    const [loading, setLoading] = useState(true)

    const originTargetKeys = () => {
        return mockData?.filter((item) => Number(item.key) % 3 > 1)
            .map((item) => item.key);
    }

    const [targetKeys, setTargetKeys] = useState<string[]>(originTargetKeys() as string[]);

    const leftTableColumns = useMemo<ColumnsType<DataType>>(() => {
        return [
            {
                dataIndex: 'title',
                title: '可选H5',
            }
        ]
    }, [pageNo, pageSize])

    const rightTableColumns = useMemo<ColumnsType<DataType>>(() => {
        return [
            {
                dataIndex: 'title',
                title: '已选H5',
            }
        ]
    }, [pageNo, pageSize])

    const onChangeTable = (value: any) => {
        const { current, pageSize } = value
        setPageNo(current)
        setPageSize(pageSize)
        setLoading(true)
    }

    // Customize Table Transfer
    const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: TableTransferProps) => (
        <Transfer {...restProps}>
            {({
                direction,
                filteredItems,
                onItemSelectAll,
                onItemSelect,
                selectedKeys: listSelectedKeys,
                disabled: listDisabled,
            }) => {
                const columns = direction === 'left' ? leftColumns : rightColumns;
                const rowSelection: TableRowSelection<TransferItem> = {
                    getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
                    onSelectAll(selected, selectedRows) {
                        const treeSelectedKeys = selectedRows
                            .filter((item) => !item.disabled)
                            .map(({ key }) => key);
                        const diffKeys = selected
                            ? difference(treeSelectedKeys, listSelectedKeys)
                            : difference(listSelectedKeys, treeSelectedKeys);
                        onItemSelectAll(diffKeys as string[], selected);
                    },
                    onSelect({ key }, selected) {
                        onItemSelect(key as string, selected);
                    },
                    selectedRowKeys: listSelectedKeys,
                };

                return (
                    <Table
                        pagination={{ total, current: pageNo, showSizeChanger: true }}
                        rowSelection={rowSelection}
                        onChange={onChangeTable}
                        columns={columns as RecordType[]}
                        dataSource={filteredItems}
                        size="small"
                        style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                if (itemDisabled || listDisabled) return;
                                onItemSelect(key as string, !listSelectedKeys.includes(key as string));
                            },
                        })}
                    />
                );
            }}
        </Transfer>
    );

    const onChange = (nextTargetKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };

    const triggerDisable = (checked: boolean) => {
        setDisabled(checked);
    };

    const triggerShowSearch = (checked: boolean) => {
        setShowSearch(checked);
    };

    const fetchH5List = () => {
        getH5List({
            pageNo: pageNo,
            pageSize: pageSize,
            h5Name: searchH5?.h5Name,
            taskId: searchH5?.taskId,
        }).then(data => {
            setH5List(data.records)
            setTotal(data.total)
            setLoading(false)
        })
    }

    const fetchContainH5List = () => {
        getH5List({
            pageNo: pageNo,
            pageSize: pageSize,
            h5Name: searchH5?.h5Name,
            taskId: taskId,
        }).then(data => {
            setContainH5List(data.records)
            setContainTotal(data.total)
            setLoading(false)
        })
    }

    useEffect(() => {
        loading && fetchH5List()
    }, [pageNo, loading])

    useEffect(() => {
        taskId && fetchContainH5List()
    }, [taskId])

    useEffect(() => {
        const mockData = []
        for (let i = 0; i < total; i++) {
            if (h5List) {
                const h5Info = h5List[i];
                if (h5Info) {
                    const data = {
                        title: h5Info.h5Name,
                        key: i.toString(),
                        disabled: false,
                        tag: h5Info.h5Url,
                        description: h5Info.h5Url,
                    }
                    mockData.push(data);
                }
            }
        }

        for (let i = 0; i < containTotal; i++) {
            if (containH5List) {
                const h5Info = containH5List[i];
                if (h5Info) {
                    const data = {
                        title: h5Info.h5Name,
                        key: i.toString(),
                        disabled: false,
                        tag: h5Info.h5Url,
                        description: h5Info.h5Url,
                    }
                    mockData.push(data);
                }
            }
        }
        setMockData(mockData)
    }, [h5List, containH5List])

    return (
        <>
            <TableTransfer
                dataSource={mockData as DataType[]}
                targetKeys={targetKeys}
                disabled={disabled}
                showSearch={true}
                onChange={onChange}
                filterOption={(inputValue, item) =>
                    item.title!.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                }
                leftColumns={leftTableColumns}
                rightColumns={rightTableColumns}
            />
        </>
    );
};

export default UpdateTaskTableModule;