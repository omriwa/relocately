import React, { memo, useState, ChangeEvent } from 'react';
import { Table, ITableProps } from '../common/Table';
import { RouteProps } from "react-router-dom";

interface IHomePageProps extends ITableProps, RouteProps {

}

export const HomePage = memo((props: ITableProps) => {
    const [searchInput, setSearchInput] = useState('');
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

    const filterRowsData: () => any[] = () => {
        return props.rowsData
            .filter((data: any) => (data.name ? data.name.includes(searchInput) : false)
                ||
                (data.city ? data.city.includes(searchInput) : false)
                ||
                (data.country ? data.country.includes(searchInput) : false)
            );
    }

    return <div>
        <div>
            <label> search:</label>
            <input
                value={searchInput}
                onChange={onChange}
                type='text'
            />
        </div>
        <Table
            columns={props.columns}
            rowsData={filterRowsData()}
        />
    </div>
});