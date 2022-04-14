import React from "react";

import { Card } from 'antd';

import { Content } from "antd/lib/layout/layout";

const gridStyle = {
  width: '75%',
  margin: '0 auto',
  background: '#ededed',
    borderRadius:'20px'
};


class Dashboard extends React.Component {
    render() {
        return (
          <Content>


          <div className="site-layout-content" style={{
            width: '100%',
            height: '500px',
            padding: '24px',
            background: '#bdbdbd'
          }}>
            <Card style={gridStyle}>
              <Card>
                <h3 >Hello 0x1dabb57...093</h3>
                
                
                
              </Card>
              <Card>
                <h5 style={{textAlign:'left',float:'left'}}>Total Deposits: </h5>
                <h3 style={{textAlign:'right',float:'right'}}>32,984 (dRupee+ETH)</h3>
              </Card>
              <Card>
              <h5 style={{textAlign:'left',float:'left'}}>Total Profits: </h5>
              <h3 style={{textAlign:'right',float:'right'}}>3,487 dRupee</h3>
  
  
              </Card>
  
  
            </Card>
  
          </div>
  
        </Content>
        );
    }
}

export default Dashboard;