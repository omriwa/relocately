import React, { memo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
// components
import { ITableProps } from './common/Table';
import { HomePage } from './pages/HomePage';

interface IApiData {
    name: string,
    city: string,
    lat: number,
    lng: number,
    country: string
}

const App = memo(() => {
    const [apiData, setApiData] = useState([]);
    const [isDataFetch, setIsDataFetch] = useState(false);

    useEffect(() => {
        if (!isDataFetch) {
            axios.get('http://localhost:8080/')
                .then(result => setApiData(result.data))
                .catch(e => console.log('could not fetch data from api', e))
                .finally(() => setIsDataFetch(true));
        }
    });

    const getTableData = () => {
        return apiData.map((data: IApiData) => {
            return {
                name: data.name,
                city: data.city,
                country: data.country,
                linkToMoreInformation: "moreInfo"
            }
        })
    }

    return (
        <div className="App">
            <Router>
                <Route
                    path='/'
                    exact
                    component={(routeProps: any, tableProps: ITableProps) => <HomePage
                        columns={['name', 'city', 'country', 'more information']}
                        rowsData={getTableData()} />}
                />
            </Router>
        </div>
    );
});

export default App;
