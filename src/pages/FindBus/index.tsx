import React, { useEffect } from 'react';

import logo from './logo.svg';
import './module.scss';
import { get_findBus, get_NearByStop } from '../API';

import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker } from 'antd';
import 'antd/dist/antd.css';

import Gmap from './components/Gmap';
import fakeData from './fakeData';
interface I_locat {
    lon?: number;
    lat?: number;
}
function FindBus() {
    const [locat, setLocat] = React.useState<I_locat>({});

    //取得目前經緯度
    const get_locat = () => {
        navigator.geolocation.getCurrentPosition((position) =>
            setLocat({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            })
        );
    };

    async function set_findBus() {
        let findBus = await get_findBus();
        console.log('set_findBus', findBus);
    }
    //尋找附近公車站牌；set進state
    async function set_NearByStop() {
        let stops = await get_NearByStop();
    }
    useEffect(() => {
        get_locat();
        set_findBus();
    }, []);

    //當位置有更動的時候就要get_NeatBy
    useEffect(() => {
        set_NearByStop();
        if (Object.keys(locat).length > 0) {
            window.gMap.setZoom(17);
            window.gMap.setCenter({ lat: locat.lat, lng: locat.lon });
            // window.gMap.setCenter(locat.lon, locat.lat, 9);
        }
    }, [locat]);

    return (
        <div className="FindBus_Page">
            <h1>尋找公車站</h1>
            <Button onClick={get_locat} type="primary" shape="circle" icon={<SearchOutlined />} />
            <Gmap urlParam="" />
        </div>
    );
}

export default FindBus;
