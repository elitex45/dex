import React from "react";

import {
    Link
} from "react-router-dom";

import { Menu } from 'antd';


class Topnavmenu extends React.Component {
    render() {
        return (
            <div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['swap']}>
                    <Menu.Item key='swap'>
                        <Link to="/">SWAP</Link>
                    </Menu.Item>
                    <Menu.Item key='pool'>
                        <Link to="/pool">POOL</Link>
                    </Menu.Item>
                    <Menu.Item key='dRupee'>
                        <Link to="/drupee">dRUPEE</Link>
                    </Menu.Item>
                    <Menu.Item key='dashboard'>
                        <Link to="/dashboard">DASHBOARD</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default Topnavmenu;