import { Button, Dropdown, Menu } from 'antd';
import React from 'react';

const DropdownC: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const options = ['台北市', '新北市', '桃園市'];
    //渲染區
    const render_menu = () => {
        return (
            <Menu>
                {options.map((child, index) => {
                    return (
                        <Menu.Item
                            onClick={(e) => {
                                console.log(e);
                                console.log(child);
                            }}
                            key={index + child}
                        >
                            {child}
                        </Menu.Item>
                    );
                })}
            </Menu>
        );
    };

    //事件區
    const click_menu = () => {};
    return (
        <Dropdown trigger={['click']} className="select" overlay={render_menu}>
            <Button>bottom</Button>
        </Dropdown>
    );
};

export default DropdownC;
