import API_Path from './path';
interface I_parameter {
    grant_type: string;
    client_id: string;
    client_secret: string;
}
export const get_token = () => {
    const parameter: any = {
        grant_type: 'client_credentials',
        client_id: 'paul86677889-2520bcc3-ed06-43a4',
        client_secret: 'ffd7e8d0-8476-4313-9909-88f1d9a387f7',
    };
    let formBody = [];
    for (let property in parameter) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(parameter[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    let newformBody = formBody.join('&');
    try {
        return fetch(
            'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
            {
                method: 'POST', // or 'PUT'
                mode: 'cors',
                // body: JSON.stringify(parameter), // data can be `string` or {object}!
                body: newformBody,
                headers: {
                    Accept: 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': ' application/x-www-form-urlencoded; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log('token', data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};

export const get_findBus = (token: any) => {
    console.log(token);

    try {
        return fetch(API_Path.findBus, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.access_token}`,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};
//根據經緯度取得附近公車站牌
export const get_NearByStop = (token: any, locat: any) => {
    const Url =
        'https://tdx.transportdata.tw/api/advanced/v2/Bus/Stop/NearBy?%24top=30&%24spatialFilter=nearby%28' +
        locat.lat +
        '%2C%20' +
        locat.lon +
        '%2C%20500%29&%24format=JSON';

    try {
        return fetch(Url, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `Bearer ${token.access_token}`,
            }),
            // mode: 'same-origin', // no-cors, cors, *same-origin
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};
//根據城市取得公車站位
export const get_stationsByCity = (token: any) => {
    //取得城市公車站位資料
    const Url =
        'https://tdx.transportdata.tw/api/basic/v2/Bus/Station/City/Taoyuan?%24top=150&%24format=JSON';

    //取得市區公車之站牌資料
    // const Url =
    //     'https://tdx.transportdata.tw/api/basic/v2/Bus/Stop/City/Taoyuan?%24top=500&%24format=JSON';

    try {
        return fetch(Url, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `Bearer ${token.access_token}`,
            }),
            // mode: 'same-origin', // no-cors, cors, *same-origin
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};
//取得城市公車站位資訊資料 id:公車站位ID
export const get_stationsInfo = (token: any, id: string) => {
    //取得城市公車站位資訊資料
    const Url =
        'https://tdx.transportdata.tw/api/advanced/v2/Bus/Route/City/Taoyuan/PassThrough/Station/' +
        id +
        '?%24top=30&%24format=JSON';

    try {
        return fetch(Url, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `Bearer ${token.access_token}`,
            }),
            // mode: 'same-origin', // no-cors, cors, *same-origin
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};

//取得所在縣市的停車場
export const get_carPark = (token: any, locat: any) => {
    const Url =
        'https://tdx.transportdata.tw/api/basic/v1/Parking/OffStreet/CarPark/City/Taipei?%24top=30&%24format=JSON';

    try {
        return fetch(Url, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                authorization: `Bearer ${token.access_token}`,
            }),
            // mode: 'same-origin', // no-cors, cors, *same-origin
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
        // .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};
