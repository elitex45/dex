import React, { Component } from "react";

export class pool extends Component {
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
        
    async get_drupee_reserve(){
        const drupee_reserve = await this._token.get_drupees_reserve();
        this.setState({ drupee_reserve });
    }
    
    eth_drupee_price(input_amount,eth_reserve,drupee_reserve){
        let amount = ((drupee_reserve * input_amount)/eth_reserve);
        let total = ((997/1000) * amount) + 1;
        this.setState({ total });
    }
    
    drupee_eth_price(input_amount,drupee_reserve,eth_reserve){
        let amount = ((eth_reserve * input_amount)/drupee_reserve);
        let total = ((997/1000) * amount) + 1;
        this.setState({ total });
    }

    render(){
        return(
            <div>
                <h1>
                    Pool
                </h1>
            </div>
        )
    }
}
