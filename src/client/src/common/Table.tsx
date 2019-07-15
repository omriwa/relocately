import React, { memo } from 'react';
import { array } from 'prop-types';
import { isArray } from 'util';

export interface ITableProps {
    columns: string[];
    rowsData: any[];
}

export const Table = memo((props: ITableProps) => {
    console.log(props.rowsData)
    return <table>
        <thead>
            <tr>
                {
                    props.columns
                        .map((col, colIndex) => <th key={col + '-' + colIndex}>
                            {
                                col
                            }
                        </th>)
                }
            </tr>
        </thead>

        <tbody>
            {
                props.rowsData.map((row: any) => <tr key={row}>
                    {
                        Object.values(row).map((rowEntry: any) => <td key={row + '-' + rowEntry} >{rowEntry}</td>)
                    }
                    </tr>)
            }
        </tbody>
    </table>
});