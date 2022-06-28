import API_Path from './path';

export const get_findBus = () => {
    try {
        return fetch(API_Path.findBus, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
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
            })
            .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};

export const get_NearByStop = () => {
    try {
        return fetch(API_Path.NearByStop, {
            method: 'GET', // or 'PUT'
            // body: JSON.stringify(data), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json',
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
            })
            .then((response) => console.log('Success:', response));
    } catch (e) {
        // 用於處理例外的陳述式
        console.log(e); // 將例外物件傳給 error handler
        return false;
    }
};
