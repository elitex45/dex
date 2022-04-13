import React from "react";

import { Card } from 'antd';

import { Content } from "antd/lib/layout/layout";

const gridStyle = {
  width: '75%',
  margin: '0 auto'
};


class Dashboard extends React.Component {
    render() {
        return (
            <Content style={{ padding: '10px 10px' }}>


          <div className="site-layout-content" style={{
            width: '100%',
            height: '500px',
            padding: '24px',
            background: '#fff'
          }}>
            <Card style={gridStyle}>
            <h3>Hello 0x1dabb57...093</h3>
            <h4>Total Deposits: 32,984 (dRupee+ETH)</h4>
            <h4>Total Profits: 3,487 dRupee</h4>
            </Card>
            


            </div>

        </Content>
        );
    }
}

export default Dashboard;