import * as actionTypes from './actionTypes';

export const setTest = (payload: any) => ({
    type: actionTypes.SET_TEST,
    payload,
});

export const setNearByStops = (payload: any) => ({
    type: actionTypes.SET_NEARBYSTOPS,
    payload,
});

export const setStationinfo = (payload: any) => ({
    type: actionTypes.SET_STATIONINFO,
    payload,
});

export const setNowStation = (payload: any) => ({
    type: actionTypes.SET_NOWSTATION,
    payload,
});
