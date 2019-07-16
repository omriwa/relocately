import React, { memo, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, RouteProps } from "react-router-dom";
import axios from 'axios';
// components
import { ITableProps } from './common/Table';
import { HomePage } from './pages/HomePage';
import { MoreInfoPage } from './pages/MoreInfoPage';

export interface IApiData {
    name: string,
    city: string,
    lat: number,
    lng: number,
    country: string
}

const App = memo(() => {
    const [apiData, setApiData] = useState([]);
    const [isDataFetch, setIsDataFetch] = useState(false);
    const [moreInfoPageData, setMoreInfoPageData] = useState({
        name: '',
        city: '',
        lat: 0,
        lng: 0,
        country: ''});

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
                linkToMoreInformation: <Link
                    to='/info'
                    onClick={() => setMoreInfoPageData(data)}
                >
                    More Info!
                    </Link>
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
                <Route
                    path='/info'
                    component={() => <MoreInfoPage data={moreInfoPageData}/>}
                    />
            </Router>
        </div>
    );
});

export default App;
