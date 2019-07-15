import React, { memo, useState } from 'react';
import { IApiData } from '../App';
import { RouteProps } from 'react-router';

interface IMoreInfoPageProps {
    data: IApiData;
    routerProps: RouteProps;
}

export const MoreInfoPage = memo((props: IMoreInfoPageProps) => {
    return <div>
        {
            JSON.stringify(props.data)
        }
    </div>
});