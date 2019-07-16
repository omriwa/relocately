import React, { memo, useState } from 'react';
import { IApiData } from '../App';
import { RouteProps } from 'react-router';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Link } from 'react-router-dom';

interface IMoreInfoPageProps {
    data: IApiData
}

interface IMapTextProps {
    lat: number;
    lng: number;
    text: string;
}

export const MoreInfoPage = memo((props: IMoreInfoPageProps) => {
    const viewport = {
        width: '80%',
        height: '80%',
        latitude: props.data.lat,
        longitude: props.data.lng,
        zoom: 11
    }

    const markerStyle = {
        width: 10,
        height: 10,
        borderRadius: '100%',
        backgroundColor: 'red',
        position: 'relative' as 'relative'
    }

    const discriptionStyle = {
        backgroundColor: 'white',
        position: 'relative' as 'relative',
        top: '100%',
        left: '-45%'
    }

    return <React.Fragment>
        <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1Ijoib21yaXdhbGxhY2giLCJhIjoiY2p5NW54Nmh1MDh0NTNtcjJ0N2lkNXJudCJ9.XrkqdTjaKM1FdqpNRCGj_Q'
    >
        <Marker latitude={props.data.lat} longitude={props.data.lng}>
            <div>
                <div style={markerStyle} />
                <div style={discriptionStyle}>
                    {
                        Object.keys(props.data).map(key => {
                            return <div>
                                <div>{key}:</div>
                                <div>{(props.data as any)[key]}</div>
                            </div>
                        })
                    }
                </div>
            </div>
        </Marker>
        </ReactMapGL>
        <Link to='/'> go back </Link>
    </React.Fragment>
});