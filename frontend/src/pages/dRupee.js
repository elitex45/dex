import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import axios from "axios";
import { Card } from 'antd';

const gridStyle = {
    width: '75%',
    margin: '0 auto',
    background: '#ededed',
    borderRadius: '20px'
};

const selincss = {
    marginBottom: '20px',
    marginTop: '20px',
    padding: '10px',
};

const { Header, Content, Footer } = Layout;

class dRupee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            loadings: [],
            order: null,
            successData: null,
            dexcon: this.props.dexcon
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    enterLoading = async (index, e) => {
        e.preventDefault();
        console.log(this.state.dexcon)

        const obj = {
            amount: this.state.amount * 100
        }

        function loadScript(src) {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = () => {
                    resolve(true);
                };
                script.onerror = () => {
                    resolve(false);
                };
                document.body.appendChild(script);
            });
        }

        async function displayRazorpay() {
            const res = await loadScript(
                "https://checkout.razorpay.com/v1/checkout.js"
            );

            if (!res) {
                alert("Razorpay SDK failed to load. Are you online?");
                return;
            }

            const result = await axios.post("http://localhost:5000/payment/orders", obj);

            if (!result) {
                alert("Server error. Are you online?");
                return;
            }

            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: "rzp_test_XJ6NCXmvrHxZpz", // Enter the Key ID generated from the Dashboard
                amount: amount.toString(),
                currency: currency,
                name: "RexSwap",
                description: "Tokenize Rupee",
                order_id: order_id,

                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    console.log(data);

                    const result = await axios.post("http://localhost:5000/payment/success", data);

                    console.log(result.data)

                },
                prefill: {
                    name: "Akshay S P",
                    email: "Akshaysp@rexswap.finance",
                    contact: "1234567890",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        }
        displayRazorpay()


        // let res = await this.state.dexcon.tokenize(parseInt(this.state.amount), this.state.successData.digest, this.state.successData.signature)
        // let result = await res.wait()

        // console.log(result)
        //await this.toke()
    };

    toke = async (e) => {
        e.preventDefault()
        console.log("result")
        let res = await this.state.dexcon.tokenize(parseInt(this.state.amount), "abcd", "abcd")
        let result = await res.wait()

        console.log(result)
        if (result) {
            alert("Transaction is Successful")
        }
    }

    render() {
        const { loadings } = this.state;

        return (
            <div>
                <Content>
                    <div className="site-layout-content" style={{
                        width: '100%',
                        height: '500px',
                        padding: '24px',
                        background: '#bdbdbd'
                    }}>

                        <Card style={gridStyle}>

                            <h1>
                                Tokenize
                            </h1>
                            <p>
                                Rupee to dRupee
                            </p>


                            <div>
                                <Input id="amount" prefix="₹" placeholder="Enter Rupee To Tokenize" suffix="RUP" onChange={(e) => this.onChange(e)} value={this.state.amount} style={selincss} />
                            </div>
                            <Space style={{ width: '100%', height: "20%" }}>
                                <Button type="primary" loading={loadings[0]} onClick={(e) => this.enterLoading(0, e)} >
                                    Tokenize
                                </Button>
                                <Button id="btn1" type="primary" loading={loadings[0]} onClick={(e) => this.toke(e)}>
                                    Claim
                                </Button>
                            </Space>

                        </Card>
                    </div>
                </Content >
            </div >
        )
    }
}

export default dRupee;