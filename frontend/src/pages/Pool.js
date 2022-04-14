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
  background: '#ededed',
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
      token_amount: undefined,
      with_amount: undefined,
      deposited: 0,
      selectedAddress: this.props.addr

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
    alert("Successfully Deposited " + input_amount)
    let deposited = await this.state.dexcon.totaldeposit_eth_drupee(this.state.selectedAddress);
    this.setState({
      deposited: deposited
    });
  }

  async withdraw_eth_drupee(with_amount) {
    const result = await this.state.dexcon.withdraw_eth_drupee(with_amount);
    console.log(result)
    let deposited = await this.state.dexcon.totaldeposit_eth_drupee(this.state.selectedAddress);
    this.setState({
      deposited: deposited
    });
    //this.setState({ eth_amount, token_amount });

  }

  render() {
    return (
      <Content>
        <div className="site-layout-content" style={{
          width: '100%',
          height: '82vh',
          padding: '24px',
          paddingLeft: '12rem',
          paddingTop: '8rem',
          background: '#bdbdbd'
        }}>

          <Row style={{ margin: '0 auto' }}>
            <Col span={10} >

              <Card style={gridStyle}>
                <h1 style={{ textAlign: 'center', color: 'black' }}>DEPOSIT</h1>
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
                <h1 style={{ textAlign: 'center', color: 'black' }}>WITHDRAW</h1>
                <div style={divcenter}>
                  <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                  >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                  </Select>
                  <Input id="with_amount" placeholder="Enter value" style={selincss} value={this.state.with_amount} onChange={this.onChange} />

                  <Button type="primary" onClick={(e) => this.withdraw_eth_drupee(parseInt(this.state.with_amount))} >WITHDRAW</Button>
                </div>

              </Card>
            </Col>
          </Row>

          <div style={{ margin: '0 auto' }}>
            <h1>
              {this.state.deposited ? this.state.deposited : ""}
            </h1>
          </div>



        </div>

      </Content>
    );
  }
}

export default Pool;