import React from 'react';
import * as Styled from './styles';
interface I_Map {
    // locationArr: Array<any>;
    urlParam: any;
}

const Gmap: React.FC<I_Map> = (props) => {
    const initMap = () => {
        if (window.google) {
            window.gMap = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 25.0642254, lng: 121.5891729 },
                zoom: 19,
                mapTypeControl: false, //禁用控制地圖類型Ui
                fullscreenControl: false, //禁用全屏顯示ui
                clickableIcons: false, //禁止地圖中icon的點擊事件(就是那個醜醜的infoblock)
            });
            // add event like this
            window.google.maps.event.addListener(window.gMap, 'dragend', () => {
                // gMap_afterDrag();
            });
        }
    };

    //componentDidMount
    React.useEffect(initMap, []);
    return <Styled.MapBlock id="map" />;
};

export default Gmap;
