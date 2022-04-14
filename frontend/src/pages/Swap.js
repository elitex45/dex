import React from "react";

import { Content } from "antd/lib/layout/layout";

import { Row, Col } from "antd";
import Pricegraph from "../components/Pricegraph";
import Swapcomp from "../components/Swapcomp";

import { Card } from 'antd';

const gridStyle = {
  width: '75%',
  height:'400px',
  margin: '0 auto',
  background:'#ededed',
  borderRadius:'20px'
};

class Swap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens_bought: null
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  async eth_to_drupee() {
    const tokens_bought = await this._token.ethTodrupee();
    this.setState({ tokens_bought });
  }

  async drupee_to_eth() {
    const tokens_bought = await this._token.drupeeToeth();
    this.setState({ tokens_bought });
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
                <h1 style={{textAlign: 'center'}}>SWAP</h1>
                <Swapcomp />
              </Card>
            </Col>
          </Row>

        </div>

      </Content>
    );
  }
}

export default Swap;