import React from "react";

import { Content } from "antd/lib/layout/layout";

import { Button, Select } from 'antd';
import { Input } from 'antd';

import { Row, Col } from "antd";

import { Card } from 'antd';

import { ethers } from "ethers";

const { Option } = Select;

const gridStyle = {
  width: '75%',
  height: '400px',
  margin: '0 auto',
  background: '#470030',
  border: '0',
  borderRadius: '30px'
};

const selincss = {
  marginBottom: '20px',
  marginTop: '20px'
};

const divcenter = {
  margin: '0',
  position: 'absolute',
  top: '30%'
}

class Pool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      dexcon: this.props.dexcon,
      eth_amount: undefined,
      token_amount: undefined
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  async deposit_eth_drupee(input_amount, e) {
    e.preventDefault();
    const liquidity_minted = await this.state.dexcon.deposit_eth_drupee({ value: parseInt(input_amount) });
    this.setState({ liquidity_minted });
    console.log(ethers.utils.formatEther(parseInt(liquidity_minted.data)))
  }

  async _withdraw_eth_drupee() {
    const result = await this._token.withdraw_eth_drupee();
    const { eth_amount, token_amount } = result;

    this.setState({ eth_amount, token_amount });

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

          <Row style={{ margin: '0 auto' }}>
            <Col span={10} >

              <Card style={gridStyle}>
                <h1 style={{ textAlign: 'center', color: 'white' }}>DEPOSIT</h1>
                <div style={divcenter}>
                  <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                  >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                  </Select>
                  <Input id="amount" value={this.state.amount} placeholder="Enter value" onChange={this.onChange} style={selincss} />

                  <Button type="primary" onClick={(e) => this.deposit_eth_drupee(this.state.amount, e)}>DEPOSIT</Button>

                </div>

              </Card>
            </Col>
            <Col span={10}>

              <Card style={gridStyle}>
                <h1 style={{ textAlign: 'center', color: 'white' }}>WITHDRAW</h1>
                <div style={divcenter}>
                  <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                  >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                  </Select>
                  <Input id="amount" placeholder="Enter value" style={selincss} value={this.state.amount} onChange={this.onChange} />

                  <Button type="primary" onClick={(e) => this._withdraw_eth_drupee(this.state.amount)} >WITHDRAW</Button>
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