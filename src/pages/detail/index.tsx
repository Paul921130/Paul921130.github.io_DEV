import React from 'react';
import ReactDOM from 'react-dom';
import { Button, DatePicker, version, Progress, Layout, Slider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import 'antd/dist/antd.css';
import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <Header>Header</Header>
        <h1 className="ss">sss</h1>
        <Layout>
            <Sider>
                <div>
                    <Slider defaultValue={30} disabled={false} />
                    <Slider range defaultValue={[20, 50]} disabled={false} />
                    <Slider range defaultValue={[20, 50]} disabled={false} />
                    <Slider range defaultValue={[20, 50]} disabled={false} />
                    <Slider range defaultValue={[20, 50]} disabled={false} />
                    <Slider range defaultValue={[20, 50]} disabled={false} />
                </div>
            </Sider>
            <Content />
        </Layout>
        <Footer>Footer</Footer>
    </React.StrictMode>,
    document.getElementById('root')
);
