import React from "react";

import { Content } from "antd/lib/layout/layout";

import { Button, Select } from 'antd';
import { Input } from 'antd';

import { Card } from 'antd';

const { Option } = Select;

const gridStyle = {
  width: '50%',
  height: '400px',
  margin: '0 auto',
  background: 'radial-gradient(#23001e, #13000f)',
  border: '0'
};

const sel = {
  textAlign: 'left',
  width: 100,
  margin: '20px',
  borderRadius: '50px'
};


class Pool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_amount: null,
      eth_reserve: null,
      drupee_reserve: null,
      amount: null,
      total: null
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  async get_eth_reserve() {
    const eth_reserve = await this._token.get_eth_reserve();
    this.setState({ eth_reserve });
  }

  async get_drupee_reserve() {
    const drupee_reserve = await this._token.get_drupees_reserve();
    this.setState({ drupee_reserve });
  }

  eth_drupee_price(input_amount, eth_reserve, drupee_reserve) {
    let amount = ((drupee_reserve * input_amount) / eth_reserve);
    let total = ((997 / 1000) * amount) + 1;
    this.setState({ total });
  }

  drupee_eth_price(input_amount, drupee_reserve, eth_reserve) {
    let amount = ((eth_reserve * input_amount) / drupee_reserve);
    let total = ((997 / 1000) * amount) + 1;
    this.setState({ total });
  }

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