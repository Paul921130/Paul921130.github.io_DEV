import React from 'react';
import ReactDOM from 'react-dom';
import Gmap from '@components/Gmap';
import fakeData from './fakeData';
import './index.css';

//TODO: API:/api/v3/light/GetHotelList
declare global {
    interface Window {
        google: any;
        gMap: any;
        historicalOverlay: any;
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Gmap locationArr={fakeData} urlParam="" />
    </React.StrictMode>,
    document.getElementById('root')
);
