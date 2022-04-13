import React from "react";

import { Content } from "antd/lib/layout/layout";

class Dashboard extends React.Component {
    render() {
        return (
            <Content style={{ padding: '10px 10px' }}>


          <div className="site-layout-content" style={{
            width: '100%',
            height: '500px',
            padding: '24px',
            background: '#fff'
          }}>DASHBOARD</div>

        </Content>
        );
    }
}

export default Dashboard;