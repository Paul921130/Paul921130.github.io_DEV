import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setNowStation } from '@redux/FindBus/action';

interface UserItem {
    StopName: {
        Zh_tw: string;
        En: string;
    };
    StationName: {
        Zh_tw: string;
        En: string;
    };
    AuthorityID: string;
    StationID: string;
}

const StopList: React.FC = () => {
    //引入你要用的redux store
    const store_FindBus = useSelector((state: RootState) => state.FindBus);
    const dispatch = useDispatch();

    const focusMap = (data: any) => {
        if (!data.StationPosition.PositionLat || !data.StationPosition.PositionLon) {
            return false;
        }
        window.gMap.setZoom(19);
        window.gMap.setCenter({
            lat: data.StationPosition.PositionLat,
            lng: data.StationPosition.PositionLon,
        });
    };

    // const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //         appendData();
    //     }
    // };

    return (
        <List>
            <VirtualList
                data={store_FindBus.nearByStops}
                // height={ContainerHeight}
                itemHeight={47}
                itemKey="StationID"
                // onScroll={onScroll}
            >
                {(item: UserItem) => (
                    <List.Item
                        onClick={() => {
                            console.log(item);
                            focusMap(item);
                            dispatch(setNowStation(item.StationID));
                        }}
                        className={item?.StationID === store_FindBus?.nowStation ? 'active' : ''}
                        key={item.StationID}
                    >
                        <List.Item.Meta
                            // avatar={<Avatar src={item.picture.large} />}
                            title={
                                <Link to="/findbus?id=222">
                                    {item.StopName?.Zh_tw || item.StationName?.Zh_tw}
                                </Link>
                            }
                        />
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};

export default StopList;
