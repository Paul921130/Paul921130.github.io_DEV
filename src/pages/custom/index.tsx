import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <React.StrictMode>
        <h1>Custom Page</h1>
        <a href={`${process.env.PUBLIC_URL}/map.html`}> 地圖頁面</a>
    </React.StrictMode>,
    document.getElementById('root')
);
