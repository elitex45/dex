import React from "react";

import { Content } from "antd/lib/layout/layout";

import { Row, Col } from "antd";
import Pricegraph from "../components/Pricegraph";
import Swapcomp from "../components/Swapcomp";
import { Card } from 'antd';
import { Button, Select } from 'antd';
import { Input } from 'antd';
import { parseBytes32String } from "ethers/lib/utils";

const { Option } = Select;

const selincss = {
  marginBottom: '20px',
  marginTop: '20px'
}

const gridStyle = {
  width: '75%',
  height: '400px',
  margin: '0 auto',
  background: '#ededed',
  borderRadius: '20px'
};

class Swap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens_bought: null,
      dexcon: this.props.dexcon,
      output_amount: undefined,
      input_amount: 0,
      total: undefined,
      eth_reserve: undefined,
      drupee_reserve: undefined
    }
  }



  onChange = async (e) => {
    this.setState({ [e.target.id]: e.target.value });

    console.log("Enter")
    await this.get_eth_reserve()
    console.log("Convert", parseInt(this.state.eth_reserve))
    await this.get_drupee_reserve()
    console.log("reserve", this.state.eth_reserve, this.state.drupee_reserve)
    await this.eth_drupee_price(this.state.input_amount);
    let total = this.state.total
    console.log("total", total)
    this.setState({ output_amount: total })
    console.log(this.state.output_amount, this.state.eth_reserve, this.state.drupee_reserve)
  };

  async get_eth_reserve() {
    console.log("eth_reserve")
    try {
      let eth_reserve = await this.state.dexcon.get_eth_reserve();
      eth_reserve = parseInt(eth_reserve)
      console.log("eth_reserve", eth_reserve)
      this.setState({ eth_reserve });
    }
    catch (error) {
      console.log(error)
    }

  }

  async get_drupee_reserve() {
    let drupee_reserve = await this.state.dexcon.get_drupees_reserve();
    drupee_reserve = parseInt(drupee_reserve)
    this.setState({ drupee_reserve });
  }

  async eth_to_drupee() {
    console.log("Swap", this.state.output_amount)
    let res = await this.state.dexcon.ethTodrupee({ value: parseInt(this.state.input_amount) });
    let result = await res.wait()
    //this.setState({ tokens_bought });
    alert("Swapped ")
  }

  async drupee_to_eth() {
    const tokens_bought = await this.state.dexcon.drupeeToeth();
    this.setState({ tokens_bought });
  }

  eth_drupee_price(input_amount) {
    if (this.state.eth_reserve == 0) {
      this.setState({ total: 0 });
      return 0
    }
    console.log("calc", this.state.drupee_reserve, input_amount, this.state.eth_reserve)
    let amount = ((this.state.drupee_reserve * input_amount) / this.state.eth_reserve);
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

          <Row>
            <Col span={14}>
              <Card style={gridStyle}>
                <Pricegraph />
              </Card>
            </Col>
            <Col span={10}>
              <Card style={gridStyle}>
                <h1 style={{ textAlign: 'center' }}>SWAP</h1>
                <div>
                  <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                    style={{ width: 120 }}
                  >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                  </Select>
                  <Input id="input_amount" placeholder="Enter value" style={selincss} value={this.state.input_amount} onChange={this.onChange} />

                  <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                    style={{ width: 120 }}
                  >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                  </Select>
                  <Input id="output_amount" placeholder="Enter value" style={selincss} value={this.state.output_amount} />
                  <p style={{ textAlign: 'right' }}>0.03% Fee only</p>

                  <Button type="primary" onClick={this.eth_to_drupee}>SWAP</Button>

                </div>
              </Card>
            </Col>
          </Row>

        </div>

      </Content>
    );
  }
}

export default Swap;