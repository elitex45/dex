import React from "react";

import { Content } from "antd/lib/layout/layout";

import { Button, Select } from 'antd';
import { Input } from 'antd';

import { Row, Col } from "antd";

import { Card } from 'antd';

const { Option } = Select;

const gridStyle = {
  width: '75%',
  height: '400px',
  margin: '0 auto',
  background: '#ededed',
  borderRadius:'10px'
};

const selincss = {
  marginBottom: '20px',
  marginTop: '20px',
  padding:'10px',
};

const divcenter = {
  margin: '0',
  position: 'absolute',
  top: '30%',
}

// const sel = {
//   textAlign: 'left',
//   width: 100,
//   margin: '20px',
//   borderRadius: '50px'
// };


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
          background: '#bdbdbd'
        }}>

          <Row >
            <Col span={10} >

                <Card style={gridStyle}>
                  <h1 style={{ textAlign: 'center'}}>DEPOSIT</h1>
                  <div style={divcenter}>
                    <Select
                      labelInValue
                      defaultValue={{ value: 'Select' }}
                    >
                      <Option value="ETH">ETH</Option>
                      <Option value="dRupee">dRupee</Option>
                    </Select>
                    <Input placeholder="Enter value" style={selincss} />

                    <Select
                      labelInValue
                      defaultValue={{ value: 'Select' }}
                    >
                      <Option value="ETH">ETH</Option>
                      <Option value="dRupee">dRupee</Option>
                    </Select>
                    <Input placeholder="Enter value" style={selincss} />

                    <Button type="primary">DEPOSIT</Button>

                  </div>

                </Card>
            </Col>
            <Col span={10}>

              <Card style={gridStyle}>
                <h1 style={{ textAlign: 'center'}}>WITHDRAW</h1>
                <div style={divcenter}>
                  <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                  >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                  </Select>
                  <Input placeholder="Enter value" style={selincss} />

                  <Button type="primary">WITHDRAW</Button>
                </div>

              </Card>
            </Col>
          </Row>

        </div>

      </Content>
    );
  }
}

export default Pool;