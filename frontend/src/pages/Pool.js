import React from "react";

import { Content } from "antd/lib/layout/layout";
import Poolcomp from "../components/Poolcomp";

import { Button, Select } from 'antd';
import { Input } from 'antd';

import { Card } from 'antd';

const { Option } = Select;

const gridStyle = {
  width: '75%',
  margin: '0 auto'
};

const sel = {
  textAlign: 'left',
  width: 120
};

class Pool extends React.Component {
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
            <Select 
              labelInValue
              defaultValue={{ value: 'Select' }}
              style={sel}
            >
              <Option value="ETH">ETH</Option>
              <Option value="dRupee">dRupee</Option>
            </Select>
            <Input placeholder="Enter value" />

            <Select
              labelInValue
              defaultValue={{ value: 'Select' }}
              style={sel}
            >
              <Option value="ETH">ETH</Option>
              <Option value="dRupee">dRupee</Option>
            </Select>
            <Input placeholder="Enter value" />

            <Button type="primary">SWAP</Button>
          </Card>


        </div>

      </Content>
    );
  }
}

export default Pool;