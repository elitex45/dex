import React from "react";

import { Content } from "antd/lib/layout/layout";
import Poolcomp from "../components/Poolcomp";

import { Button, Select } from 'antd';
import { Input } from 'antd';

import { Card } from 'antd';

const { Option } = Select;

const gridStyle = {
  width: '50%',
  height:'400px',
  margin: '0 auto',
  background: 'radial-gradient(#23001e, #13000f)',
  border:'0'
};

const sel = {
  textAlign: 'left',
  width: 100,
  margin:'20px',
  borderRadius:'50px'
};


class Pool extends React.Component {
  render() {
    return (
      <Content>


        <div className="site-layout-content" style={{
          width: '100%',
          height: '500px',
          padding: '24px',
          background: 'radial-gradient(#23001e, #060004)'
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