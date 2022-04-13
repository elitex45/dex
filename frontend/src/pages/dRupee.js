import React from "react";

import { Button, Select } from 'antd';
import { Input } from 'antd';

import { Card } from 'antd';

import { Content } from "antd/lib/layout/layout";

const gridStyle = {
  width: '75%',
  margin: '0 auto'
};


class DRupee extends React.Component {
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


            <Input placeholder="Enter value" />
            <Button type="primary">Tokenize</Button>

            </Card>
        </div>

      

        </Content >
        );
  }
}

export default DRupee;