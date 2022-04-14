import React from "react";

// We'll use ethers to interact with the Ethereum network and our contract
import { ethers } from "ethers";

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from "./contracts/Dex.json";
import contractAddress from "./contracts/Dex-address.json";
import Drupee from "./contracts/Drupee.json";
import DrupeeAdd from "./contracts/Drupee-address.json"

// All the logic of this dapp is contained in the App component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { NoWalletDetected } from "./components/NoWalletDetected";
import { ConnectWallet } from "./components/ConnectWallet";
import { Loading } from "./components/Loading";
import { Transfer } from "./components/Transfer";
import { TransactionErrorMessage } from "./components/TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./components/WaitingForTransactionMessage";
import { NoTokensMessage } from "./components/NoTokensMessage";

import 'antd/dist/antd.css';
import Topnavmenu from './components/Topnavmenu';

import { Layout } from 'antd';

import {
  Link, BrowserRouter as Router, Route, Routes
} from "react-router-dom";


import { Menu } from 'antd';
import Swap from "./pages/Swap";
import Pool from "./pages/Pool";
import Dashboard from "./pages/Dashboard";
import DRupeeComp from "./pages/dRupee";
import Mint_Drupee from "./pages/Mint_Drupee";

const { Header, Content, Footer } = Layout;

const HARDHAT_NETWORK_ID = '31337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

export class App extends React.Component {
  constructor(props) {
    super(props);

    // We store multiple things in App's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      tokenData: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
      dexcon: undefined,
      drucon: undefined
    };

    this.state = this.initialState;
  }

  render() {
    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install MetaMask.
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    if (!this.state.selectedAddress) {
      return (
        <ConnectWallet
          connectWallet={() => this._connectWallet()}
          networkError={this.state.networkError}
          dismiss={() => this._dismissNetworkError()}
        />
      );
    }


    return (
      <Layout className="layout">

        <Router>

          <Header>
            <div className="logo" />
            <Topnavmenu />
          </Header>

          {/* <Routes> */}
          <Route exact path="/" component={() => <Swap dexcon={this.state.dexcon} />}>
          </Route>
          <Route exact path="/pool" component={() => <Pool dexcon={this.state.dexcon} />}>
          </Route>
          <Route exact path="/drupee" component={() => <DRupeeComp dexcon={this.state.dexcon} />}>
          </Route>
          <Route exact path="/dashboard" component={() => <Dashboard dexcon={this.state.dexcon} />}>
          </Route>
          <Route exact path="/mint" component={() => <Mint_Drupee drucon={this.state.drucon} />}>
          </Route>
          {/* </Routes> */}
        </Router>
        <Footer style={{ textAlign: 'center', background: '#060004' }}>
          <p style={{ color: 'white' }}>
            RexSwap ©2022 Created by INVINCIBLES

          </p>
        </Footer>


      </Layout>


    );
  }

  async _connectWallet() {
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Once we have the address, we can initialize the application.

    this._initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the App from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
      }

      this._initialize(newAddress);
    });

    // We reset the dapp state if the network is changed
    window.ethereum.on("chainChanged", ([networkId]) => {
    });
  }

  _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    this._initializeEthers();
  }

  async _initializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    let dexcon = new ethers.Contract(
      contractAddress.name,
      TokenArtifact.abi,
      this._provider.getSigner(0)
    );
    this.setState({
      dexcon: dexcon
    })

    let drucon = new ethers.Contract(
      DrupeeAdd.name,
      Drupee.abi,
      this._provider.getSigner(0)
    );
    this.setState({
      drucon: drucon
    })
  }
}
