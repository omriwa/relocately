import React, { memo } from 'react';

export interface ITableProps {
    columns: string[];
    rowsData: any[];
}

export const Table = memo((props: ITableProps) => {
    return <table>
        <thead>
            <tr>
                {
                    props.columns
                        .map((col, colIndex) => <th key={'col-' + colIndex}>
                            {
                                col
                            }
                        </th>)
                }
            </tr>
        </thead>

        <tbody>
            {
                props.rowsData.map((row: any, rowIndex: number) => <tr key={'table-' + rowIndex}>
                    {
                        Object.keys(row).map((key: string, rowEntryIndex: number) => <td
                            key={'table-' + rowIndex + '-' + rowEntryIndex}
                            data-label={key}
                        >
                            {row[key]}
                        </td>)
                    }
                    </tr>)
            }
        </tbody>
    </table>
});