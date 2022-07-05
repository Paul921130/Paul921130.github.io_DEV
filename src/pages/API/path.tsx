const API_Path = {
    ditto: 'https://pokeapi.co/api/v2/pokemon/ditto',
    limit: 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=200',
    //根據所在縣市尋找公車路線
    findBus:
        'https://tdx.transportdata.tw/api/basic/v2/Bus/RealTimeByFrequency/Streaming/City/Hsinchu?%24top=30&%24format=JSON',
    //桃園公車路線
    TYBusByNum:
        'https://tdx.transportdata.tw/api/basic/v2/Bus/Route/City/Taoyuan/3070?%24top=30&%24format=JSON',
    //桃園公車站牌資料
    TYBusStop:
        'https://tdx.transportdata.tw/api/basic/v2/Bus/Stop/City/Taoyuan?%24top=30&%24format=JSON',

    //取得附近站牌資料
    NearByStop:
        'https://tdx.transportdata.tw/api/advanced/v2/Bus/Stop/NearBy?%24top=30&%24spatialFilter=nearby%2825.047675%2C%20121.517055%2C%20100%29&%24format=JSON',
};
export default API_Path;
