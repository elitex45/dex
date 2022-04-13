import React, { Component } from "react";

export class swap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokens_bought: null
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

async eth_to_drupee(){
    const tokens_bought = await this._token.ethTodrupee();
        this.setState({ tokens_bought });
}

async drupee_to_eth(){
    const tokens_bought = await this._token.drupeeToeth();
        this.setState({ tokens_bought });
}

render(){
    return(
        <div>
            <h1>
                swap
            </h1>
        </div>
    )
}

}

