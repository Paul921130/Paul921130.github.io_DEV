import { IFindBus } from './interfaces';
import * as actionTypes from './actionTypes';
// import { initTicketNum } from '@libs/core';
// import { isMobile } from '@libs/globalVariables';
// import { scrollToRef } from '@redux/common';

const initialState = {
    test: 'false',
    nearByStops: null,
    stationInfos: null,
    nowStation: null,
};

const reducer = (state: IFindBus = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_TEST:
            return { ...state, test: action.payload };
        case actionTypes.SET_NEARBYSTOPS:
            return { ...state, nearByStops: action.payload };
        case actionTypes.SET_STATIONINFO:
            return { ...state, stationInfos: action.payload };
        case actionTypes.SET_NOWSTATION:
            return { ...state, nowStation: action.payload };
        default:
            return state;
    }
};

export default reducer;
