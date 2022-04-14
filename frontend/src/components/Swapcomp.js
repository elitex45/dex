import React from "react";

import { Button, Select } from 'antd';
import { Input } from 'antd';

const { Option } = Select;

const selincss = {
    marginBottom:'20px',
    marginTop:'20px'
}

class Swapcomp extends React.Component {
    render() {
        return (
            <div>
                <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                    style={{ width: 120 }}
                >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                </Select>
                <Input placeholder="Enter value" style={selincss}/>

                <Select
                    labelInValue
                    defaultValue={{ value: 'Select' }}
                    style={{ width: 120 }}
                >
                    <Option value="ETH">ETH</Option>
                    <Option value="dRupee">dRupee</Option>
                </Select>
                <Input placeholder="Enter value" style={selincss}/>
                <p style={{textAlign:'right'}}>0.03% Fee only</p>

                <Button type="primary">SWAP</Button>

            </div>
        );
    }
}

export default Swapcomp;