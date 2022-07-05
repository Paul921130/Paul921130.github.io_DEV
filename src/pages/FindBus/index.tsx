//react
import React, { useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setTest, setNearByStops, setStationinfo, setNowStation } from '@redux/FindBus/action';

import logo from './logo.svg';
import './module.scss';
import {
    get_findBus,
    get_stationsByCity,
    get_token,
    get_carPark,
    get_NearByStop,
    get_stationsInfo,
} from '../API';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import 'antd/dist/antd.css';

//components
import Gmap from './components/Gmap';
import CustomOverlayView from './components/Gmap/CustomOverLay';
import StopList from './components/StopList';
import ExampleComment from './components/Comments';
import DropdownC from './components/DropDownC';

interface I_locat {
    lon?: number;
    lat?: number;
}
interface I_busStop {}
function FindBus() {
    //引入你要用的redux store
    const store_FindBus = useSelector((state: RootState) => state.FindBus);
    const dispatch = useDispatch();

    const { Title } = Typography;
    const [locat, setLocat] = React.useState<I_locat>({});

    //取得目前經緯度
    const get_locat = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('navigator', position.coords);
            setLocat({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        });
    };

    const click_searchBtn = () => {
        let NowCenter = window.gMap.getCenter().toJSON();
        setLocat({ lat: NowCenter.lat, lon: NowCenter.lng });
        console.log('NowCenter', NowCenter);
    };

    //call tdx的api
    async function set_findBus() {
        let token = await get_token();
        let findBus = await get_findBus(token);
        console.log('set_findBus', findBus);
    }
    //尋找附近公車站牌；set進store
    async function set_NearByStation() {
        let token = await get_token();
        let stops = await get_stationsByCity(token);
        // let car_park = await get_carPark(token, locat);
        console.log('NearByStop', stops);
        //將站牌列表存進store
        dispatch(setNearByStops(stops));
        //將第一筆站牌存進store
        dispatch(setNowStation(stops[0]?.StationID));
    }

    async function set_StationsInfo() {
        console.log('run set_StationInfo');
        let token = await get_token();
        let stopInfos = await get_stationsInfo(token, store_FindBus.nowStation);
        console.log('stopInfos', stopInfos);
        dispatch(setStationinfo(stopInfos));
    }

    //取得目前公站牌站位
    useEffect(() => {
        //取得當前位置的經緯度
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('navigator', position.coords);
            window.gMap.setZoom(17);
            window.gMap.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
        set_NearByStation();

        //set_findBus();
    }, []);

    // useEffect(() => {}, [busStops]);

    //當位置有更動的時候就要get_NeatBy
    useEffect(() => {
        if (Object.keys(locat).length > 0) {
            window.gMap.setZoom(17);
            window.gMap.setCenter({ lat: locat.lat, lng: locat.lon });
        }
    }, [locat]);

    useEffect(() => {
        console.log('store_FindBus.nearByStops', store_FindBus.nearByStops);
        store_FindBus.nearByStops &&
            store_FindBus.nearByStops.forEach((element: any) => {
                // console.log(element);
                // let marker = new window.google.maps.Marker({
                //     position: {
                //         lat: element.StopPosition.PositionLat,
                //         lng: element.StopPosition.PositionLon,
                //     },
                // });
                // // To add the marker to the map, call setMap();
                // marker.setMap(window.gMap);
                if (
                    !element.StationPosition?.PositionLat ||
                    !element.StationPosition?.PositionLon
                ) {
                    return false;
                }
                let newOverLay;
                newOverLay = new CustomOverlayView({
                    root: document.getElementById('map'),
                    position: new window.google.maps.LatLng({
                        lat: element.StationPosition?.PositionLat,
                        lng: element.StationPosition?.PositionLon,
                    }),
                    data: element,
                    onclick: (data: any) => {
                        console.log('overlay onClick', data);
                        dispatch(setNowStation(data?.StationID));
                    },
                });
                newOverLay.setMap(window.gMap);
            });
    }, [store_FindBus.nearByStops]);

    useEffect(() => {
        console.log('store_FindBus.nowStation', store_FindBus.nowStation);
        if (store_FindBus.nowStation) {
            set_StationsInfo();
        }
    }, [store_FindBus.nowStation]);

    return (
        <div className="FindBus_Page">
            <div className="stops_box">
                <Title className="stops_box_title" level={5}>
                    公車站牌:
                </Title>
                {store_FindBus.nearByStops && store_FindBus.nearByStops.length > 0 && <StopList />}
            </div>
            <div className="map_box">
                <div className="search_box">
                    <Button
                        className="button"
                        onClick={click_searchBtn}
                        type="primary"
                        shape="round"
                        icon={<SearchOutlined />}
                    >
                        搜尋目前位置
                    </Button>
                    <DropdownC />
                </div>

                <Gmap urlParam="" />
            </div>
            <div className="info_box">
                <Title className="stops_box_title" level={5}>
                    路線資訊:
                </Title>
                {store_FindBus.stationInfos &&
                    store_FindBus.stationInfos.length > 0 &&
                    store_FindBus.stationInfos.map((e: any) => {
                        return (
                            <ExampleComment
                                isAvatar={true}
                                title="路線:"
                                text={e.RouteName.Zh_tw}
                                key={e.RouteID}
                            >
                                <ExampleComment text={e?.SubRoutes[0]?.Headsign} />
                                <ExampleComment text={e?.SubRoutes[1]?.Headsign} />
                            </ExampleComment>
                        );
                    })}
            </div>
        </div>
    );
}

export default FindBus;
