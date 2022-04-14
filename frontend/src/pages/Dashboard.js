import React from "react";

import { Card } from 'antd';

import { Content } from "antd/lib/layout/layout";

const gridStyle = {
  width: '75%',
  margin: '0 auto',
  background: '#ededed',
  borderRadius: '20px'
};

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userAddress: this.props.addr,
      dexcon: this.props.dexcon,
      volumetraded: 0,
      deposited: 0

    }

  }

  componentDidMount() {
    //this.get_deposits(this.state.userAddress);
  }

  async get_volumetraded(addr) {
    let volumetraded = await this.state.dexcon.get_volumetraded(addr);
    volumetraded = parseInt(volumetraded);
    this.setState({ volumetraded });
  }

  async get_deposits(addr) {
    let deposited = await this.state.dexcon.totaldeposit_eth_drupee(addr);
    deposited = parseInt(deposited);
    this.setState({
      deposited: deposited
    });
  }


  render() {
    return (
      <Content>

        <div className="site-layout-content" style={{
          width: '100%',
          height: '82vh',
          padding: '24px',
          paddingTop: '8rem',
          background: '#bdbdbd'
        }}>
          <Card style={gridStyle}>
            <Card>
              <h3 >Hello {this.state.userAddress}</h3>



            </Card>
            <Card>
              <h5 onClick={() => this.get_deposits(this.state.userAddress)} style={{ textAlign: 'left', float: 'left' }}>Total Pool Value: </h5>
              <h3 style={{ textAlign: 'right', float: 'right' }}>{this.state.deposited} (dRupee+ETH)</h3>
            </Card>
            <Card>
              <h5 onClick={() => this.get_volumetraded(this.state.userAddress)} style={{ textAlign: 'left', float: 'left' }}>Total Volume Traded: </h5>
              <h3 style={{ textAlign: 'right', float: 'right' }}>{this.state.volumetraded}</h3>


            </Card>


          </Card>

        </div>

      </Content>
    );
  }
}

export default Dashboard;
