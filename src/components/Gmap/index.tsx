import React from 'react';
import CustomOverLay from './CustomOverLay';
import * as Styled from './styles';
interface I_Map {
    locationArr: Array<any>;
    urlParam: any;
}

const Gmap: React.FC<I_Map> = (props) => {
    //標記列表
    const [overlays, setOverlays] = React.useState<Array<any>>([]);
    //飯店列表, 網址參數
    const { locationArr, urlParam } = { ...props };

    const initMap = () => {
        if (window.google && !window.gMap) {
            window.gMap = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 25.0642254, lng: 121.5891729 },
                zoom: 19,
                mapTypeControl: false, //禁用控制地圖類型Ui
                fullscreenControl: false, //禁用全屏顯示ui
                clickableIcons: false, //禁止地圖中icon的點擊事件(就是那個醜醜的infoblock)
            });
            // add event like this
            window.google.maps.event.addListener(window.gMap, 'dragend', () => {
                gMap_afterDrag();
            });
        }
    };
    //地圖拖拉監聽
    const gMap_afterDrag = () => {
        console.log('lat:' + window.gMap.getCenter().lat(), 'lng:' + window.gMap.getCenter().lng());
    };

    const m_setBounds = () => {
        let bounds = new window.google.maps.LatLngBounds();
        for (let i = 0; i < locationArr.length; i++) {
            bounds.extend({
                lat: locationArr[i].Latitude,
                lng: locationArr[i].Longitude,
            });
        }
        window.gMap.fitBounds(bounds, 100);
    };

    //設置客制化的Marker
    const m_setOverLay = () => {
        if (locationArr.length > 0) {
            for (let i = 0; i < locationArr.length; i++) {
                let newOverLay;
                newOverLay = new CustomOverLay({
                    root: document.getElementById('map'),
                    position: new window.google.maps.LatLng({
                        lat: locationArr[i].Latitude,
                        lng: locationArr[i].Longitude,
                    }),
                    data: locationArr[i],
                    nowIndex: i,
                    CheckIn: urlParam.CheckIn || '',
                    CheckOut: urlParam.CheckOut || '',
                    Rooms: urlParam.Rooms || [],
                    hotelCode: locationArr[i].HotelCode,
                });
                newOverLay.setMap(window.gMap);
                let overlayArr: Array<any> = overlays;
                overlayArr.push(newOverLay);
                setOverlays(overlayArr);
            }
        } else {
            for (let i = 0; i < overlays.length; i++) {
                overlays[i].setMap(null);
            }
            setOverlays([]);
        }
    };
    //建立客製化路徑線（就交給你秀一波了）
    const m_setPolyline = () => {
        const flightPath = new window.google.maps.Polyline({
            path: locationArr.map((child, i) => {
                return {
                    lat: child.Latitude,
                    lng: child.Longitude,
                };
            }),
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        flightPath.setMap(window.gMap);
    };

    // 設置googleMap的原本Marker
    // const m_setMarkers = () => {
    //     let latLngArr: Array<any> = [];
    //     for (let i = 0; i < locationArr.length; i++) {
    //         new google.maps.Marker({
    //             position: { lat: locationArr[i].lat, lng: locationArr[i].lng },
    //             map: window.gMap,
    //         });
    //     }
    // };

    //componentDidMount
    React.useEffect(initMap, []);

    React.useEffect(() => {
        m_setOverLay();
        if (locationArr.length > 0) {
            m_setBounds();
            // m_setPolyline();
        }
    }, [locationArr]);

    // React.useEffect(() => {
    //     // console.log('overlays', overlays);
    // }, [overlays]);

    // React.useEffect(m_setMarkers, [locationArr]);

    return <Styled.MapBlock id="map" />;
};

export default Gmap;
