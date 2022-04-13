import React, { Component } from "react";

export class deposit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liquidity_minted: null
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    async _deposit(){
        const liquidity_minted = await this._token.deposit();
            this.setState({ liquidity_minted });
    }
    render(){
        return(
            <div>
                <h1>
                    deposit
                </h1>
            </div>
        )
    }




}
