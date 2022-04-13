import React, { Component } from "react";
import Dexadd from "../contracts/Dex-address.json"

class Mint_Drupee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drucon: this.props.drucon,
            amount: undefined
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault()

        const { drucon } = this.state;

        console.log(Dexadd.name)

        let res = await drucon.mint_drupee(Dexadd.name);
        let result = await res.wait()

        console.log("Success: ", result)
    }

    render() {
        return (
            <div>
                <button onClick={this.onSubmit}>
                    Mint
                </button>
            </div>
        )
    }
}

export default Mint_Drupee;