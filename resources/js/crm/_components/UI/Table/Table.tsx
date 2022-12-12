import React, { FunctionComponent } from "react";
import './index.css'
import { useTable, usePagination, useSortBy, useGlobalFilter, useAsyncDebounce } from 'react-table';
import { Button, Select, TextInput } from '../';
import 'regenerator-runtime';

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
    children?:
    | React.ReactElement
    | React.ReactNode[];
    className?: string;

    disablePagination?: boolean;
    columns: Array<object>;
    data: Array<object>;
}

export const Table: FunctionComponent<TableProps> = ({ children, className, disablePagination, columns, data, ...other }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({ columns, data, autoResetPage: false }, useGlobalFilter, useSortBy, usePagination,)


    const onChangeGlobalFilter = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <React.Fragment>
            <TextInput
                className={`table-input`}
                onChange={e => onChangeGlobalFilter(e.target.value)}
                placeholder={"Поиск..."}
            />
            <table className={`table${className ? ` ${className}` : ''}`} {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' ▲'
                                                : ' ▼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>

                    {!disablePagination ?
                        page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })
                        :
                        rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })
                    }

                </tbody>

            </table>
            {!disablePagination &&
                <div className={`table-pagination`}>
                    <div className={`table-pagination-item`}>
                        <span>
                            Страница{' '}
                            <strong>
                                {state.pageIndex + 1} из {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span>
                            | Перейти к странице:{' '}
                            <TextInput
                                className={`table-input`}
                                type="number"
                                defaultValue={state.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '100px' }}
                            />
                        </span>{' '}
                        <Select
                            className={`table-select`}
                            value={state.pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}>
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Показать {pageSize}
                                </option>
                            ))}
                        </Select>

                    </div>


                    <div className={`table-pagination-item`}>
                        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</Button>
                        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</Button>
                        <Button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</Button>
                        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</Button>
                    </div>

                </div>
            }
        </React.Fragment>
    )

} 