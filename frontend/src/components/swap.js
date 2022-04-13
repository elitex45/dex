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