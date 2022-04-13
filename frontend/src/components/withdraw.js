import React, { Component } from "react";

export class withdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: null,
            eth_amount: null,
            token_amount: null
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
async _withdraw(){
    const result = await this._token.withdraw();
    const {eth_amount,token_amount} = result;

    this.setState( {eth_amount,eth_reserve} );

}
render(){
    return(
        <div>
            <h1>
                withdraw
            </h1>
        </div>
    )
}
}
